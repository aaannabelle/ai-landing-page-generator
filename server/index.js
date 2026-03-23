import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

console.log("API KEY:", process.env.OPENAI_API_KEY ? "LOADED ✅" : "MISSING ❌");



const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- Helper fallback ---
const generateFallback = (prompt) => ({
  headline: `AI-powered solution for ${prompt}`,
  subheadline: `Build and scale your ${prompt} faster using AI-driven workflows.`,
  cta: "Get Started",
  features: [
    { title: "Fast Setup", description: "Launch quickly with minimal effort." },
    { title: "Smart Automation", description: "Let AI handle repetitive tasks." },
    { title: "Scalable Growth", description: "Expand without limits." },
  ],
});

// --- Generate Landing Page ---
app.post("/api/generate", async (req, res) => {
  const { input, sections } = req.body; // support sections from frontend
  const sectionText =
    sections && sections.length > 0
      ? `Include sections: ${sections.join(", ")}.`
      : "";

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
            content: `Generate a SaaS landing page for: "${input}". ${sectionText} Return JSON only.`,
          },
        ],
      }),
    });

    //const data = await response.json();
    console.log("STATUS:", response.status);

    const text = await response.text();
    console.log("RAW RESPONSE TEXT:", text);

    const data = JSON.parse(text);

    let parsedOutput = null;
    try {
      const aiText = data?.choices?.[0]?.message?.content || "";
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      parsedOutput = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      parsedOutput = null;
    }

    if (!parsedOutput) {
      parsedOutput = generateFallback(input);
    }

    res.json(parsedOutput);
  } catch (err) {
    console.error("AI request failed:", err);
    res.status(500).json(generateFallback(input));
  }
});

// --- Refine Landing Page ---
app.post("/api/refine", async (req, res) => {
  const { originalPrompt, refinement } = req.body;

  try {
    const combinedPrompt = `${originalPrompt}. Refine with: ${refinement}`;

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
              "Return ONLY valid JSON with: headline, subheadline, cta, features (3 items with title + description). Make it sound like a real SaaS product.",
          },
          {
            role: "user",
            content: combinedPrompt,
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

    if (!parsedOutput) parsedOutput = generateFallback(originalPrompt);

    res.json(parsedOutput);
  } catch (err) {
    console.error("AI refinement failed:", err);
    res.status(500).json(generateFallback(originalPrompt));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});