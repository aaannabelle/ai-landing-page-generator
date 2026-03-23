import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [refinement, setRefinement] = useState("");
  const [outputs, setOutputs] = useState([]);
  const [history, setHistory] = useState([]);
  const [preview, setPreview] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [sections, setSections] = useState({
    hero: true,
    features: true,
    pricing: true,
    testimonials: true,
  });
  const [darkTheme, setDarkTheme] = useState(false);

  const generateFallback = (prompt) => ({
    headline: `Revolutionise your ${prompt}`,
    subheadline: `Build and scale your ${prompt} with powerful, modern tools.`,
    cta: "Get Started",
    features: [
      { title: "Fast Setup", description: "Launch quickly with minimal effort." },
      { title: "Smart Automation", description: "Let AI handle repetitive tasks." },
      { title: "Scalable Growth", description: "Expand without limits." },
    ],
  });

  const generateLanding = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const requests = [1, 2, 3].map(() =>
        fetch("http://localhost:5000/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input,
            sections: Object.keys(sections).filter((key) => sections[key]),
          }),
        }).then((res) => res.json())
      );

      const results = await Promise.all(requests);
      setOutputs(results);
      setHistory([{ prompt: input, outputs: results }, ...history]);
    } catch (err) {
      console.error(err);
      const fallback = [
        generateFallback(input),
        generateFallback(input),
        generateFallback(input),
      ];
      setOutputs(fallback);
      setError("AI failed, using fallback.");
    } finally {
      setLoading(false);
    }
  };

  const refineLanding = async () => {
    if (!refinement.trim() || !input.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalPrompt: input, refinement }),
      });

      const data = await response.json();
      setOutputs([data]);
      setPreview(data);
      setHistory([{ prompt: `${input} → ${refinement}`, outputs: [data] }, ...history]);
      setRefinement("");
    } catch (err) {
      console.error(err);
      setError("Refinement failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- AI Logo Generation ---
  const generateLogo = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName: input }),
      });

      const data = await response.json();
      if (data.logoUrl) {
        setLogoUrl(data.logoUrl); // save the returned logo URL
      } else {
        setError("Logo generation failed");
      }
    } catch (err) {
      console.error(err);
      setError("Logo generation failed");
    } finally {
      setLoading(false);
    }
  };

  const generateCode = (landing) => `
  <section class="text-center p-16">
    ${logoUrl ? `<img src="${logoUrl}" alt="Logo" class="h-24 w-auto mb-4 mx-auto"/>` : ""}
    <h1 class="text-4xl font-bold">${landing.headline}</h1>
    <p class="mt-4 text-lg">${landing.subheadline}</p>
    <button class="mt-6 px-6 py-3 bg-orange-300 rounded-full">${landing.cta}</button>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      ${(landing.features || [])
        .map(
          (f) => `<div class="p-6 bg-white rounded-xl shadow">
          <h3 class="font-semibold text-lg">${f.title}</h3>
          <p class="text-sm text-gray-600">${f.description}</p>
        </div>`
        )
        .join("")}
    </div>
  </section>
  `;

  const copyCode = () => navigator.clipboard.writeText(generateCode(preview));

  return (
    <div className={`${darkTheme ? "dark-theme" : ""} min-h-screen font-sans flex flex-col items-center p-6 bg-cover bg-center`} style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/047/121/034/small_2x/delicate-nude-background-abstract-blurred-pastel-color-banner-minimalist-aesthetic-design-vector.jpg')" }}>
      
      {/* Header */}
      <div className="mb-20 text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
          Build landing pages for your SaaS
          <span className="block text-orange-400">instantly.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Generate structured, AI-powered landing pages with real UI components and exportable code, not just mockups.
        </p>
      </div>

      {/* Generate + Refine + Logo Buttons */}
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 mb-4">
        <input
          className="flex-1 p-4 rounded-xl border border-gray-200 shadow-sm bg-white"
          placeholder="Describe your SaaS idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={generateLanding}
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-xl font-semibold bg-orange-300 hover:bg-orange-400 transition"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <button
          onClick={() => generateLogo(input)}
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-xl font-semibold bg-green-400 hover:bg-green-500 transition"
        >
          {loading ? "Generating Logo..." : "Generate Logo"}
        </button>
      </div>

      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 mb-8">
        <input
          className="flex-1 p-4 rounded-xl border border-gray-200 shadow-sm bg-white"
          placeholder="Refine your landing page..."
          value={refinement}
          onChange={(e) => setRefinement(e.target.value)}
        />
        <button
          onClick={refineLanding}
          disabled={loading || !refinement.trim()}
          className="px-6 py-3 rounded-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white transition"
        >
          {loading ? "Refining..." : "Refine"}
        </button>
      </div>

      {logoUrl && (
        <div className="my-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Generated Logo:</h2>
          <img src={logoUrl} alt="Generated Logo" className="mx-auto w-48 h-48 object-contain rounded-lg shadow" />
        </div>
      )}

      {/* Section toggles */}
      <div className="section-toggles my-4 flex gap-4">
        {["hero", "features", "pricing", "testimonials"].map((sec) => (
          <label key={sec} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sections[sec]}
              onChange={() => setSections({ ...sections, [sec]: !sections[sec] })}
            />
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </label>
        ))}
      </div>

      {/* Theme switcher */}
      <button onClick={() => setDarkTheme(!darkTheme)} className="mt-2 px-3 py-1 border rounded">
        Toggle Dark/Light
      </button>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded shadow-sm w-full max-w-2xl">{error}</div>
      )}

      {/* Outputs */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {outputs.map((out, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">{out.headline}</h2>
              <p className="text-gray-600">{out.subheadline}</p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button onClick={() => { setPreview(out); setShowCode(false); }} className="bg-orange-300 text-gray-800 px-4 py-2 rounded-full hover:bg-orange-400 transition">Preview</button>
              <button onClick={() => { setPreview(out); setShowCode(true); }} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition">View Code</button>
            </div>
          </div>
        ))}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Prompt History</h3>
          {history.map((h, i) => (
            <div key={i} className="mb-6 border-b border-gray-200 pb-4">
              <p className="italic text-gray-500 mb-2">Prompt: "{h.prompt}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 overflow-auto bg-gray-50 z-50 p-6">
          <button onClick={() => setPreview(null)} className="mb-4 text-orange-500 hover:underline">Close</button>
          {showCode ? (
            <>
              <pre className="bg-gray-900 text-green-300 p-6 rounded-xl overflow-auto text-sm">{generateCode(preview)}</pre>
              <button onClick={copyCode} className="mt-4 text-orange-500 hover:underline">Copy Code</button>
            </>
          ) : (
            <div className="max-w-6xl mx-auto rounded-3xl shadow-xl overflow-hidden">
              {/* Hero */}
              {sections.hero && (
                <section className="bg-white p-16 text-center rounded-b-3xl flex flex-col items-center shadow-inner">
                  {logoUrl && <img src={logoUrl} alt="Brand Logo" className="h-24 w-auto mb-6 mx-auto" />}
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900">{preview.headline}</h1>
                  <p className="text-lg md:text-xl mb-6 max-w-2xl text-gray-600">{preview.subheadline}</p>
                  <button className="bg-orange-300 text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-orange-400 transition transform hover:scale-105 mb-6">{preview.cta}</button>
                </section>
              )}

              {/* Features */}
              {sections.features && (
                <section className="p-12 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50">
                  {(preview.features || []).map((feature, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col items-center text-center">
                      <div className="h-24 w-24 mb-4 rounded-full bg-orange-100 flex items-center justify-center text-gray-400 shadow-sm"><span className="italic">Icon</span></div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </section>
              )}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        body.dark-theme {
          background-color: #1e1e1e;
          color: #f5f5f5;
        }
        body.dark-theme .card {
          background-color: #2a2a2a;
          color: #f5f5f5;
        }
      `}</style>
    </div>
  );
}