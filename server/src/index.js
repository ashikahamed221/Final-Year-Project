import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./prisma.js";
import { clerkAuth } from "./clerkMiddleware.js";


dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());




app.post("/save-test",clerkAuth, async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { summary, results, userId } = req.body;

    // Ensure user exists before creating test
    if (userId) {
      await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: { id: userId },
      });
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

    // Save question results
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

    console.log("✅ STORED:", test.id);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ PRISMA ERROR:", err);
    res.status(500).json({ error: "DB failed" });
  }
});




// Get user's test history
app.get("/user-tests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const tests = await prisma.test.findMany({
      where: { userId },
      include: {
        questions: true,
      },
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

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});

