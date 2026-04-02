import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma/prisma.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});


const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://final-year-project-ph964k3w7-ashiks-projects-75743e6d.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* =========================
   REGISTER
========================= */

app.post("/api/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ user, token });

  } catch (error) {

    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });

  }
});

/* =========================
   LOGIN
========================= */

app.post("/api/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });

  } catch (error) {

    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });

  }
});

/* =========================
   SAVE MOCK INTERVIEW
========================= */

app.post("/save-test", authMiddleware, async (req, res) => {
  try {

    const { summary, results } = req.body;
    const userId = req.user.id;

    const test = await prisma.test.create({
      data: {
        domain: summary.domain,
        score: summary.correctAnswers,
        total: summary.totalQuestions,
        performance: summary.performanceLevel,
        avgTime: summary.averageResponseTime,
        userId: userId,
      },
    });

    await prisma.questionResult.createMany({
      data: results.map((result) => ({
        questionId: result.questionId,
        selected: result.selectedAnswer,
        isCorrect: result.isCorrect,
        responseTime: result.responseTime,
        warned: result.wasWarned,
        testId: test.id,
      })),
    });

    res.json({
      success: true,
      message: "Test saved successfully",
    });

  } catch (err) {

    console.error("PRISMA ERROR:", err);
    res.status(500).json({ error: "Database failed" });

  }
});

/* =========================
   GET USER HISTORY
========================= */

app.get("/user-tests", authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id;

    const tests = await prisma.test.findMany({
      where: { userId },
      include: {
        questions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      tests,
    });

  } catch (err) {

    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch tests" });

  }
});

/* =========================
   GET SINGLE TEST
========================= */

app.get("/test/:id", authMiddleware, async (req, res) => {
  try {

    const { id } = req.params;

    const test = await prisma.test.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json(test);

  } catch (error) {

    console.error("Fetch test error:", error);
    res.status(500).json({ error: "Failed to fetch test" });

  }
});

/* =========================
   GET USER STATS
========================= */

app.get("/user-stats", authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id;

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get test statistics
    const tests = await prisma.test.findMany({
      where: { userId },
    });

    const testsCompleted = tests.length;
    const averageScore = tests.length > 0 
      ? Math.round(tests.reduce((sum, test) => sum + (test.score / test.total * 100), 0) / tests.length)
      : 0;

    res.json({
      name: user.name,
      email: user.email,
      joinDate: user.createdAt,
      testsCompleted,
      averageScore,
      skills: [],
      experienceLevel: "Not specified",
      interviewsCompleted: testsCompleted,
      skillLevel: averageScore >= 80 ? "Advanced" : averageScore >= 60 ? "Intermediate" : "Beginner",
    });

  } catch (error) {

    console.error("User stats error:", error);
    res.status(500).json({ error: "Failed to fetch user stats" });

  }
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", async (req, res) => {

  const count = await prisma.test.count();

  res.json({
    database: "connected",
    totalTests: count,
  });

});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});





// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { prisma } from "./prisma-client/prisma.js";
// import { authMiddleware } from "./middleware/authMiddleware.js";
// import path from "path";

// dotenv.config({
//   path: path.resolve(process.cwd(), ".env"),
// });

// const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// /* =========================
//    USER REGISTER
// ========================= */

// app.post("/api/register", async (req, res) => {
//   try {

//     const { name, email, password } = req.body;

//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//       select: { id: true, name: true, email: true },
//     });

//     const token = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ user, token });

//   } catch (error) {

//     console.error("Registration error:", error);
//     res.status(500).json({ error: "Registration failed" });

//   }
// });

// /* =========================
//    USER LOGIN
// ========================= */

// app.post("/api/login", async (req, res) => {
//   try {

//     const { email, password } = req.body;

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       user: { id: user.id, name: user.name, email: user.email },
//       token,
//     });

//   } catch (error) {

//     console.error("Login error:", error);
//     res.status(500).json({ error: "Login failed" });

//   }
// });

// /* =========================
//    SAVE MOCK INTERVIEW TEST
// ========================= */

// app.post("/save-test", authMiddleware, async (req, res) => {
//   try {

//     const { summary, results } = req.body;
//     const userId = req.user.id;

//     const test = await prisma.test.create({
//       data: {
//         domain: summary.domain,
//         score: summary.correctAnswers,
//         total: summary.totalQuestions,
//         performance: summary.performanceLevel,
//         avgTime: summary.averageResponseTime,
//         userId: userId,
//       },
//     });

//     await prisma.questionResult.createMany({
//       data: results.map((result) => ({
//         questionId: result.questionId,
//         selected: result.selectedAnswer,
//         isCorrect: result.isCorrect,
//         responseTime: result.responseTime,
//         warned: result.wasWarned,
//         testId: test.id,
//       })),
//     });

//     res.json({
//       success: true,
//       message: "Test saved successfully",
//     });

//   } catch (err) {

//     console.error("PRISMA ERROR:", err);
//     res.status(500).json({ error: "Database failed" });

//   }
// });

// /* =========================
//    GET USER MOCK HISTORY
// ========================= */

// app.get("/user-tests", authMiddleware, async (req, res) => {
//   try {

//     const userId = req.user.id;

//     const tests = await prisma.test.findMany({
//       where: { userId },
//       include: {
//         questions: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     res.json({
//       success: true,
//       tests,
//     });

//   } catch (err) {

//     console.error("Fetch error:", err);
//     res.status(500).json({ error: "Failed to fetch tests" });

//   }
// });

// /* =========================
//    GET SINGLE TEST DETAILS
// ========================= */

// app.get("/test/:id", authMiddleware, async (req, res) => {
//   try {

//     const { id } = req.params;

//     const test = await prisma.test.findUnique({
//       where: { id },
//       include: {
//         questions: true,
//       },
//     });

//     if (!test) {
//       return res.status(404).json({ error: "Test not found" });
//     }

//     res.json(test);

//   } catch (error) {

//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch test" });

//   }
// });

// /* =========================
//    HEALTH CHECK
// ========================= */

// app.get("/health", async (req, res) => {

//   const count = await prisma.test.count();

//   res.json({
//     database: "connected",
//     totalTests: count,
//   });

// });

// /* =========================
//    START SERVER
// ========================= */

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on port ${PORT}`);
// });