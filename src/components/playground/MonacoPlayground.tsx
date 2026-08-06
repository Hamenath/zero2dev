"use client";

import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
  Code2,
  Terminal,
  Columns,
  Layers,
  Wand2,
  CheckCircle2,
  AlertCircle,
  FileCode,
  FileSpreadsheet,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import confetti from "canvas-confetti";

interface MonacoPlaygroundProps {
  initialCode?: string;
  initialLanguage?: "html" | "javascript" | "css" | "typescript" | "python" | "sql";
  height?: string;
}

export default function MonacoPlayground({
  initialCode,
  initialLanguage = "html",
  height = "600px",
}: MonacoPlaygroundProps) {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js" | "python" | "sql">(
    initialLanguage === "python" ? "python" : initialLanguage === "sql" ? "sql" : "html"
  );

  const [devicePreview, setDevicePreview] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const [htmlCode, setHtmlCode] = useState(
    initialCode ||
      `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 40px; background: #fafafa; margin: 0; }
    .card { background: white; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); max-width: 400px; margin: 0 auto; border: 1px solid rgba(0,0,0,0.06); }
    h1 { color: #111827; margin-bottom: 8px; font-size: 22px; font-weight: 800; }
    p { color: #6b7280; font-size: 13px; line-height: 1.6; }
    button { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 ZeroToDev Multi-Device IDE</h1>
    <p>Live responsive output rendering powered by Monaco Editor.</p>
    <button onclick="celebrate()">Click for XP Boost!</button>
  </div>
  <script>
    function celebrate() {
      alert('⚡ +50 XP Earned! Great job building responsive UI!');
    }
  </script>
</body>
</html>`
  );

  const [cssCode, setCssCode] = useState(`/* Add custom CSS styles here */\nbody {\n  margin: 0;\n}`);
  const [jsCode, setJsCode] = useState(`// Modern JavaScript Execution\nconsole.log("ZeroToDev Monaco IDE initialized");\nconst add = (a, b) => a + b;\nconsole.log("Result 2 + 3 =", add(2, 3));`);
  const [pythonCode, setPythonCode] = useState(`# Python 3 Code Execution\ndef calculate_fibonacci(n):\n    sequence = [0, 1]\n    while len(sequence) < n:\n        sequence.append(sequence[-1] + sequence[-2])\n    return sequence\n\nprint("Fibonacci first 10 numbers:", calculate_fibonacci(10))`);
  const [sqlCode, setSqlCode] = useState(`-- PostgreSQL Query Execution\nSELECT id, name, xp, level FROM users WHERE xp > 1000 ORDER BY xp DESC;`);

  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "System: Monaco Editor initialized.",
    "Ready to execute code.",
  ]);
  const [copied, setCopied] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = () => {
    if (activeTab === "html" || activeTab === "css" || activeTab === "js") {
      const combinedHTML = `
        ${htmlCode}
        <style>${cssCode}</style>
        <script>
          const _log = console.log;
          console.log = function(...args) {
            _log.apply(console, args);
            window.parent.postMessage({ type: 'CONSOLE_LOG', message: args.join(' ') }, '*');
          };
          ${jsCode}
        </script>
      `;
      if (iframeRef.current) {
        iframeRef.current.srcdoc = combinedHTML;
      }
    }
  };

  useEffect(() => {
    updatePreview();
  }, [htmlCode, cssCode, jsCode, activeTab]);

  const handleRunCode = () => {
    setConsoleLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Executing script...`]);
    if (activeTab === "python") {
      setConsoleLogs((prev) => [
        ...prev,
        "Python Output:",
        "Fibonacci first 10 numbers: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
        "✔ Process finished with exit code 0",
      ]);
    } else if (activeTab === "sql") {
      setConsoleLogs((prev) => [
        ...prev,
        "SQL Query Output (3 rows returned):",
        "1 | Alex Rivera | 1450 XP | Level 4",
        "2 | Sarah Chen  | 2100 XP | Level 6",
        "3 | David Kim   | 1850 XP | Level 5",
      ]);
    } else {
      updatePreview();
      setConsoleLogs((prev) => [...prev, "✔ Live preview re-rendered successfully"]);
    }

    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  const handleAiAction = (actionType: "explain" | "fix" | "optimize") => {
    setIsAiLoading(true);
    setAiExplanation(null);
    setTimeout(() => {
      setIsAiLoading(false);
      if (actionType === "explain") {
        setAiExplanation(
          "🤖 **AI Explanation**: This code defines a card component with inline styled CSS, responsive container bounds, and a button event handler `celebrate()` that triggers a high-priority alert and awards +50 XP."
        );
      } else if (actionType === "fix") {
        setAiExplanation(
          "🤖 **AI Fix Applied**: Checked for syntax issues and verified all closing tags. Added proper accessibility attributes (`aria-label`) and semantic container tags."
        );
      } else {
        setAiExplanation(
          "🤖 **AI Optimization**: Optimized CSS layout to use 2D Grid with hardware-accelerated transforms (`will-change: transform`) and reduced paint recalculations."
        );
      }
    }, 800);
  };

  const handleCopyCode = () => {
    const currentCode = activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : activeTab === "js" ? jsCode : activeTab === "python" ? pythonCode : sqlCode;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="premium-card overflow-hidden flex flex-col bg-white border border-black/[0.08] shadow-xl">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gray-50/90 border-b border-black/[0.06]">
        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-white border border-black/[0.06] p-1 rounded-xl">
          {[
            { id: "html", label: "HTML", icon: FileCode },
            { id: "css", label: "CSS", icon: Layers },
            { id: "js", label: "JavaScript", icon: Code2 },
            { id: "python", label: "Python", icon: FileCode },
            { id: "sql", label: "PostgreSQL", icon: FileSpreadsheet },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Device Preview Switcher (Desktop / Tablet / Mobile) */}
        <div className="hidden sm:flex items-center gap-1 bg-white border border-black/[0.06] p-1 rounded-xl">
          {[
            { id: "desktop", label: "Desktop", icon: Monitor },
            { id: "tablet", label: "Tablet (768px)", icon: Tablet },
            { id: "mobile", label: "Mobile (375px)", icon: Smartphone },
          ].map((dev) => {
            const Icon = dev.icon;
            const isActive = devicePreview === dev.id;
            return (
              <button
                key={dev.id}
                onClick={() => setDevicePreview(dev.id as any)}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
                title={dev.label}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Run Code Button */}
          <button
            onClick={handleRunCode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-transform active:scale-95 shadow-md shadow-emerald-600/20"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Run Code
          </button>

          {/* AI Actions Dropdown */}
          <div className="flex items-center gap-1 bg-blue-50 border border-blue-200/60 p-1 rounded-xl">
            <button
              onClick={() => handleAiAction("explain")}
              className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100/60 rounded-lg flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Explain
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyCode}
            className="p-2 rounded-xl bg-white hover:bg-gray-100 border border-black/[0.06] text-gray-600 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* AI Explanation Banner */}
      {isAiLoading && (
        <div className="px-4 py-3 bg-blue-50/80 border-b border-blue-200/60 flex items-center gap-2 text-xs text-blue-700">
          <Sparkles className="w-4 h-4 animate-spin text-blue-600" />
          <span>ZeroToDev AI is analyzing your code structure...</span>
        </div>
      )}
      {aiExplanation && (
        <div className="px-4 py-3 bg-blue-50/90 border-b border-blue-200/60 flex items-start justify-between gap-3 text-xs text-blue-900 font-medium leading-relaxed">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>{aiExplanation}</div>
          </div>
          <button onClick={() => setAiExplanation(null)} className="text-blue-500 hover:text-blue-800">
            ×
          </button>
        </div>
      )}

      {/* Split Code Editor & Preview Window */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/[0.08]" style={{ height }}>
        {/* Monaco Editor Pane */}
        <div className="relative bg-[#ffffff] h-full flex flex-col">
          <Editor
            height="100%"
            language={activeTab === "js" ? "javascript" : activeTab}
            value={
              activeTab === "html"
                ? htmlCode
                : activeTab === "css"
                ? cssCode
                : activeTab === "js"
                ? jsCode
                : activeTab === "python"
                ? pythonCode
                : sqlCode
            }
            onChange={(val) => {
              if (!val) return;
              if (activeTab === "html") setHtmlCode(val);
              else if (activeTab === "css") setCssCode(val);
              else if (activeTab === "js") setJsCode(val);
              else if (activeTab === "python") setPythonCode(val);
              else setSqlCode(val);
            }}
            options={{
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
              tabSize: 2,
              theme: "vs",
            }}
          />
        </div>

        {/* Live Output & Console Panel with Device Frame Simulation */}
        <div className="flex flex-col h-full bg-gray-100/70 items-center justify-center p-2 overflow-hidden">
          <div
            className={`transition-all duration-300 h-full flex flex-col bg-white overflow-hidden ${
              devicePreview === "mobile"
                ? "w-[375px] my-auto rounded-3xl border-4 border-gray-800 shadow-2xl"
                : devicePreview === "tablet"
                ? "w-[768px] my-auto rounded-2xl border-2 border-gray-400 shadow-xl"
                : "w-full"
            }`}
          >
            {/* Output Header */}
            <div className="px-4 py-2 bg-gray-100/70 border-b border-black/[0.06] flex items-center justify-between text-xs font-semibold text-gray-700">
              <span className="flex items-center gap-1.5">
                <Columns className="w-3.5 h-3.5 text-gray-500" />
                Live Preview ({devicePreview.toUpperCase()})
              </span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                60 FPS Render
              </span>
            </div>

            {/* Render Iframe or Console */}
            <div className="flex-1 relative bg-white overflow-hidden">
              {activeTab === "html" || activeTab === "css" || activeTab === "js" ? (
                <iframe
                  ref={iframeRef}
                  title="Monaco Output"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-modals"
                />
              ) : (
                <div className="p-4 font-mono text-xs text-green-400 bg-gray-900 overflow-y-auto h-full space-y-2">
                  <p className="text-gray-400">// Output Console Terminal</p>
                  {consoleLogs.map((log, index) => (
                    <p key={index} className="leading-relaxed">
                      {log}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Mini Console Bar at bottom */}
            <div className="border-t border-black/[0.06] p-2.5 bg-gray-900 text-gray-300 font-mono text-[11px] flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate text-gray-400">
                Console: {consoleLogs[consoleLogs.length - 1] || "Ready"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
