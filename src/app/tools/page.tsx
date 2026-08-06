"use client";

import { useState } from "react";
import {
  Wrench,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Layers,
  Code2,
  FileText,
  Sliders,
  Maximize2,
} from "lucide-react";

export default function DeveloperToolsPage() {
  const [activeTab, setActiveTab] = useState<"css" | "json" | "regex" | "crypto">("css");
  const [shadowBlur, setShadowBlur] = useState(20);
  const [shadowSpread, setShadowSpread] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.15);
  const [copied, setCopied] = useState(false);

  const [jsonInput, setJsonInput] = useState('{"name":"ZeroToDev","status":"operational","features":["Monaco IDE","VS Code Explorer","100% Free"]}');
  const [jsonOutput, setJsonOutput] = useState("");
  const [jsonError, setJsonError] = useState("");

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError("");
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON syntax");
      setJsonOutput("");
    }
  };

  const shadowCss = `box-shadow: 0px 10px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, ${shadowOpacity});`;

  const handleCopyShadow = () => {
    navigator.clipboard.writeText(shadowCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen blue-grid-bg text-white">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-10">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#CCFF00] text-xs font-black">
            <Wrench className="w-3.5 h-3.5" />
            <span>Browser-Based Developer Utilities Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            12+ Instant Developer Tools
          </h1>
          <p className="text-sm text-white/70 leading-relaxed font-normal">
            Generate CSS layout code, format JSON payloads, test regex expressions, and encode string data completely offline in your browser.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-white/15 pb-4 overflow-x-auto">
          {[
            { id: "css", label: "CSS Visual Generators" },
            { id: "json", label: "JSON Formatter & Validator" },
            { id: "regex", label: "Regex Expression Tester" },
            { id: "crypto", label: "UUID & Password Generator" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === tab.id
                  ? "bg-[#CCFF00] text-black shadow-md"
                  : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/15"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tool Workspace */}
        {activeTab === "css" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls Panel */}
            <div className="glass-card p-8 space-y-6 border-white/25">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#CCFF00]" /> Box Shadow Generator
              </h3>

              <div className="space-y-4 text-xs font-bold text-white/90">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Blur Radius ({shadowBlur}px)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={shadowBlur}
                    onChange={(e) => setShadowBlur(Number(e.target.value))}
                    className="w-full accent-[#CCFF00]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Spread Radius ({shadowSpread}px)</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="50"
                    value={shadowSpread}
                    onChange={(e) => setShadowSpread(Number(e.target.value))}
                    className="w-full accent-[#CCFF00]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Opacity ({(shadowOpacity * 100).toFixed(0)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={shadowOpacity}
                    onChange={(e) => setShadowOpacity(Number(e.target.value))}
                    className="w-full accent-[#CCFF00]"
                  />
                </div>
              </div>

              {/* Generated CSS Code Box */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/15 font-mono text-xs text-[#CCFF00] flex items-center justify-between">
                <code>{shadowCss}</code>
                <button
                  onClick={handleCopyShadow}
                  className="px-3 py-1.5 rounded-xl bg-[#CCFF00] text-black font-extrabold flex items-center gap-1 hover:bg-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[350px]">
              <div
                className="w-64 h-64 rounded-3xl bg-white flex items-center justify-center font-bold text-gray-900 shadow-2xl transition-all"
                style={{
                  boxShadow: `0px 10px ${shadowBlur}px ${shadowSpread}px rgba(0,0,0,${shadowOpacity})`,
                }}
              >
                <span>Live Card Preview</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "json" && (
          <div className="glass-card p-8 space-y-6 border-white/25">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#CCFF00]" /> JSON Formatter & Validator
              </h3>
              <button
                onClick={handleFormatJson}
                className="px-5 py-2 rounded-full bg-[#CCFF00] text-black font-extrabold text-xs hover:bg-white transition-colors shadow-md"
              >
                Format JSON
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste raw JSON here..."
                rows={10}
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/20 font-mono text-xs text-white focus:outline-none focus:border-[#CCFF00]"
              />
              <div className="p-4 rounded-2xl bg-black/40 border border-white/20 font-mono text-xs text-[#CCFF00] overflow-auto">
                {jsonError ? (
                  <span className="text-rose-400 font-bold">{jsonError}</span>
                ) : (
                  <pre>{jsonOutput || "Click 'Format JSON' to format."}</pre>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
