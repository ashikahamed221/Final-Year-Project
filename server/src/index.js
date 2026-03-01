// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { prisma } from "./prisma.js";
// import { clerkAuth } from "./clerkMiddleware.js";


// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: "https://final-year-project-iota-seven.vercel.app",
//   credentials : true
// }));
// app.use(express.json());




// app.post("/save-test",clerkAuth, async (req, res) => {
//   try {
//     console.log("BODY:", req.body);

//     const { summary, results, userId } = req.body;

//     // Ensure user exists before creating test
//     if (userId) {
//       await prisma.user.upsert({
//         where: { id: userId },
//         update: {},
//         create: { id: userId },
//       });
//     }

//     const test = await prisma.test.create({
//       data: {
//         domain: summary.domain,
//         score: summary.correctAnswers,
//         total: summary.totalQuestions,
//         performance: summary.performanceLevel,
//         avgTime: summary.averageResponseTime,
//         userId: userId || null,
//       },
//     });

//     // Save question results
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

//     console.log("✅ STORED:", test.id);

//     res.json({ success: true });
//   } catch (err) {
//     console.error("❌ PRISMA ERROR:", err);
//     res.status(500).json({ error: "DB failed" });
//   }
// });




// // Get user's test history
// app.get("/user-tests/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const tests = await prisma.test.findMany({
//       where: { userId },
//       include: {
//         questions: true,
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     res.json({ success: true, tests });
//   } catch (err) {
//     console.error("❌ FETCH ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch tests" });
//   }
// });

// // Health check
// app.get("/health", async (req, res) => {
//   const count = await prisma.test.count();
//   res.json({ db: "connected", count });
// });

// app.listen(5000, () => {
//   console.log("🚀 Backend running on http://localhost:5000");
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma.js";
import { authMiddleware } from "./authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173",],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Auth endpoints
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: { id: true, name: true, email: true }
    });

    // Create token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Save test
app.post("/save-test", authMiddleware, async (req, res) => {
  try {
    const { summary, results } = req.body;
    const userId = req.user.id;

    console.log("✅ Saving test for user:", req.user);

    if (userId) {
      // User already exists since we're using authMiddleware
    }

    const test = await prisma.test.create({
      data: {
        domain: summary.domain,
        score: summary.correctAnswers,
        total: summary.totalQuestions,
        performance: summary.performanceLevel,
        avgTime: summary.averageResponseTime,
        userId: userId || null,
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

    res.json({ success: true });

  } catch (err) {
    console.error("❌ PRISMA ERROR:", err);
    res.status(500).json({ error: "DB failed" });
  }
});

// Get user tests
app.get("/user-tests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const tests = await prisma.test.findMany({
      where: { userId },
      include: { questions: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, tests });

  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch tests" });
  }
});

// Health check
app.get("/health", async (req, res) => {
  const count = await prisma.test.count();
  res.json({ db: "connected", count });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
