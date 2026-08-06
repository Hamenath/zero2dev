"use client";

import { useState } from "react";
import { Wrench, Copy, Check, Sparkles, RefreshCw, Eye, Code2, Layers, Sliders, Hash, Key, FileText, CheckCircle2 } from "lucide-react";

export default function DevToolsPage() {
  const [activeTool, setActiveTool] = useState<
    "shadow" | "gradient" | "radius" | "json" | "base64" | "regex" | "uuid" | "password" | "timestamp"
  >("shadow");

  const [copied, setCopied] = useState(false);

  const triggerCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tool 1: CSS Shadow Generator State
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(12);
  const [shadowBlur, setShadowBlur] = useState(32);
  const [shadowSpread, setShadowSpread] = useState(-4);
  const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.1)");
  const cssShadowOutput = `box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};`;

  // Tool 2: Gradient Generator State
  const [gradAngle, setGradAngle] = useState(135);
  const [gradColor1, setGradColor1] = useState("#2563eb");
  const [gradColor2, setGradColor2] = useState("#9333ea");
  const cssGradientOutput = `background: linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2});`;

  // Tool 3: Border Radius State
  const [radiusTL, setRadiusTL] = useState(20);
  const [radiusTR, setRadiusTR] = useState(20);
  const [radiusBR, setRadiusBR] = useState(20);
  const [radiusBL, setRadiusBL] = useState(20);
  const cssRadiusOutput = `border-radius: ${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px;`;

  // Tool 4: JSON Formatter State
  const [jsonInput, setJsonInput] = useState(`{"name":"ZeroToDev","openSource":true,"toolsCount":12}`);
  const [jsonOutput, setJsonOutput] = useState("");
  const [jsonError, setJsonError] = useState("");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError("");
    } catch (e: any) {
      setJsonError("Invalid JSON: " + e.message);
      setJsonOutput("");
    }
  };

  // Tool 5: Base64 State
  const [base64Input, setBase64Input] = useState("ZeroToDev Open Source");
  const [base64Encoded, setBase64Encoded] = useState(btoa("ZeroToDev Open Source"));

  // Tool 6: Regex Tester State
  const [regexPattern, setRegexPattern] = useState("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  const [regexString, setRegexString] = useState("developer@zerotodev.com");
  const isRegexMatch = (() => {
    try {
      return new RegExp(regexPattern).test(regexString);
    } catch {
      return false;
    }
  })();

  // Tool 7: UUID Generator State
  const [uuidList, setUuidList] = useState<string[]>([
    "c8a1b2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
    "f9e8d7c6-5b4a-3f2e-1d0c-9b8a7f6e5d4c",
  ]);

  const generateUuid = () => {
    const newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setUuidList((prev) => [newUuid, ...prev.slice(0, 4)]);
  };

  // Tool 8: Password Generator State
  const [generatedPass, setGeneratedPass] = useState("zDev#2026!SecuredPass");

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let res = "";
    for (let i = 0; i < 16; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPass(res);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5 text-blue-600" />
          <span>Instant Developer Tools Suite</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Developer Utilities & Generators
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Zero login required. 100% free browser-based generators, formatters, and previewers designed for speed and productivity.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.06] pb-3 text-xs font-semibold">
        {[
          { id: "shadow", label: "CSS Box Shadow", icon: Sliders },
          { id: "gradient", label: "CSS Gradient", icon: Layers },
          { id: "radius", label: "Border Radius", icon: Eye },
          { id: "json", label: "JSON Formatter", icon: Code2 },
          { id: "base64", label: "Base64 Encoder", icon: Hash },
          { id: "regex", label: "Regex Tester", icon: Sparkles },
          { id: "uuid", label: "UUID Generator", icon: Key },
          { id: "password", label: "Password Generator", icon: Key },
        ].map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-black/[0.05]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tool.label}
            </button>
          );
        })}
      </div>

      {/* TOOL 1: SHADOW GENERATOR */}
      {activeTool === "shadow" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="premium-card p-8 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Shadow Controls</h3>
            <div className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <label className="flex justify-between mb-1">
                  <span>X Offset: {shadowX}px</span>
                </label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowX}
                  onChange={(e) => setShadowX(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <label className="flex justify-between mb-1">
                  <span>Y Offset: {shadowY}px</span>
                </label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowY}
                  onChange={(e) => setShadowY(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <label className="flex justify-between mb-1">
                  <span>Blur Radius: {shadowBlur}px</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <label className="flex justify-between mb-1">
                  <span>Spread Radius: {shadowSpread}px</span>
                </label>
                <input
                  type="range"
                  min="-20"
                  max="50"
                  value={shadowSpread}
                  onChange={(e) => setShadowSpread(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 uppercase">CSS Code</span>
                <button
                  onClick={() => triggerCopy(cssShadowOutput)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy CSS"}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-gray-900 text-green-400 font-mono text-xs overflow-x-auto">
                {cssShadowOutput}
              </pre>
            </div>
          </div>

          <div className="premium-card p-8 flex items-center justify-center bg-gray-50/60 min-h-[350px]">
            <div
              className="w-48 h-48 rounded-2xl bg-white flex items-center justify-center font-bold text-xs text-gray-800 transition-all"
              style={{ boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` }}
            >
              Shadow Preview
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: GRADIENT GENERATOR */}
      {activeTool === "gradient" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="premium-card p-8 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Gradient Controls</h3>
            <div className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <label className="flex justify-between mb-1">
                  <span>Angle: {gradAngle}°</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={gradAngle}
                  onChange={(e) => setGradAngle(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Color 1</label>
                  <input
                    type="color"
                    value={gradColor1}
                    onChange={(e) => setGradColor1(e.target.value)}
                    className="w-full h-10 rounded-xl cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block mb-1">Color 2</label>
                  <input
                    type="color"
                    value={gradColor2}
                    onChange={(e) => setGradColor2(e.target.value)}
                    className="w-full h-10 rounded-xl cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 uppercase">CSS Code</span>
                <button
                  onClick={() => triggerCopy(cssGradientOutput)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy CSS"}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-gray-900 text-green-400 font-mono text-xs overflow-x-auto">
                {cssGradientOutput}
              </pre>
            </div>
          </div>

          <div className="premium-card p-8 flex items-center justify-center min-h-[350px]">
            <div
              className="w-full h-64 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg text-sm tracking-wider"
              style={{ background: `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})` }}
            >
              Gradient Preview Box
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: JSON FORMATTER */}
      {activeTool === "json" && (
        <div className="premium-card p-8 space-y-6">
          <h3 className="text-lg font-bold text-gray-900">JSON Formatter & Validator</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Input JSON</label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={10}
                className="w-full p-4 rounded-xl bg-gray-900 text-green-400 font-mono text-xs focus:outline-none"
              />
              <button
                onClick={formatJson}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                Format & Validate JSON
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Formatted Output</label>
              {jsonError ? (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-mono border border-red-200">
                  {jsonError}
                </div>
              ) : (
                <pre className="w-full p-4 rounded-xl bg-gray-900 text-green-400 font-mono text-xs h-64 overflow-y-auto">
                  {jsonOutput || "Click format to render pretty JSON..."}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 7: UUID GENERATOR */}
      {activeTool === "uuid" && (
        <div className="premium-card p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">UUID v4 Generator</h3>
            <button
              onClick={generateUuid}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Generate New UUID
            </button>
          </div>

          <div className="space-y-3">
            {uuidList.map((id, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-gray-50 border border-black/[0.06] flex items-center justify-between font-mono text-xs text-gray-900"
              >
                <span>{id}</span>
                <button
                  onClick={() => triggerCopy(id)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
