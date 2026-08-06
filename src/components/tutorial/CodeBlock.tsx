"use client";

import { useState } from "react";
import { Copy, Check, Play, Download, Maximize2, Minimize2, Code2 } from "lucide-react";
import { useRouter } from "next/navigation";

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  allowRun?: boolean;
}

export default function CodeBlock({
  code,
  language = "html",
  title = "Interactive Example",
  allowRun = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snippet.${language === "javascript" ? "js" : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunInMonaco = () => {
    router.push(`/playground?code=${encodeURIComponent(code)}&lang=${language}`);
  };

  return (
    <div
      className={`premium-card overflow-hidden my-6 border border-black/[0.08] transition-all ${
        isFullscreen ? "fixed inset-4 z-50 shadow-2xl flex flex-col m-0" : ""
      }`}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 text-gray-300 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-semibold text-gray-200">{title}</span>
          <span className="text-[10px] text-gray-500 uppercase bg-gray-800 px-2 py-0.5 rounded font-mono">
            {language}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {allowRun && (
            <button
              onClick={handleRunInMonaco}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-sans text-[11px] font-bold transition-colors"
            >
              <Play className="w-3 h-3 fill-white" /> Run in Monaco
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            title="Download Code"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Text Area */}
      <pre
        className={`p-4 bg-gray-950 text-gray-100 font-mono text-xs overflow-x-auto leading-relaxed ${
          isFullscreen ? "flex-1 overflow-y-auto" : "max-h-96"
        }`}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
