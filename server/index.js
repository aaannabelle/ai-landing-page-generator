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
  const { input, sections } = req.body;
  const sectionText = sections?.length ? `Include sections: ${sections.join(", ")}.` : "";

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

    const text = await response.text();
    const data = JSON.parse(text);

    let parsedOutput = null;
    try {
      const aiText = data?.choices?.[0]?.message?.content || "";
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      parsedOutput = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      parsedOutput = null;
    }

    if (!parsedOutput) parsedOutput = generateFallback(input);
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
          { role: "user", content: combinedPrompt },
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

// --- Generate Multiple Logos ---
app.post("/api/generate-logo", async (req, res) => {
  const { brandName } = req.body;
  if (!brandName) return res.status(400).json({ error: "Brand name required" });

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Logo for: "${brandName}" in a modern, minimal style, transparent background`,
        n: 3, // generate 3 logos
        size: "512x512",
      }),
    });

    const data = await response.json();
    // DEBUG: log the full response
    console.log("OpenAI logo response:", JSON.stringify(data, null, 2));

    if (!data?.data || !Array.isArray(data.data)) {
      return res.status(500).json({ error: "No logos returned from OpenAI" });
    }

    const logoUrls = data.data
      .map((item) => item.url)
      .filter(Boolean);

    if (logoUrls.length === 0) {
      return res.status(500).json({ error: "Logo generation returned empty URLs" });
    }

    res.json({ logoUrls });
  } catch (err) {
    console.error("Logo generation failed:", err);
    res.status(500).json({ error: "Logo generation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});