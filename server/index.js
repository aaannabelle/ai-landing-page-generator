import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import "./index.css";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  const { input } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Return ONLY valid JSON with: headline, subheadline, cta, features (3 items with title + description). Make it sound like a real SaaS product. Avoid generic phrases.",
          },
          {
            role: "user",
            content: `Generate a SaaS landing page for: "${input}". Return JSON only.`,
          },
        ],
      }),
    });

    const data = await response.json();

    let parsedOutput = null;
    try {
      const aiText = data?.choices?.[0]?.message?.content || "";
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      parsedOutput = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      parsedOutput = null;
    }

    if (!parsedOutput) {
      parsedOutput = {
        headline: `AI-powered solution for ${input}`,
        subheadline: `Build and scale your ${input} faster using AI-driven workflows.`,
        cta: "Get Started",
      };
    }

    res.json(parsedOutput);
  } catch (err) {
    console.error("AI request failed:", err);
    res.status(500).json({
      headline: `AI-powered solution for ${input}`,
      subheadline: `Build and scale your ${input} faster using AI-driven workflows.`,
      cta: "Get Started",
      error: "AI request failed, using fallback",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});