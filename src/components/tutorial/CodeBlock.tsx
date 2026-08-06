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
    router.push(`/playground?lang=${language}`);
  };

  return (
    <div
      className={`glass-card overflow-hidden my-6 border border-white/20 shadow-2xl transition-all ${
        isFullscreen ? "fixed inset-4 z-50 my-0 max-w-none bg-[#001D80]" : "relative"
      }`}
    >
      {/* Code Header Bar */}
      <div className="bg-[#0022A3]/90 px-4 py-3 border-b border-white/15 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] inline-block" />
          </div>
          <Code2 className="w-4 h-4 text-[#CCFF00]" />
          <span className="font-bold text-white truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {allowRun && (
            <button
              onClick={handleRunInMonaco}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#CCFF00] text-black font-extrabold text-[11px] hover:bg-white transition-colors shadow-sm"
              title="Run live in Monaco Sandbox"
            >
              <Play className="w-3 h-3 fill-black" />
              <span>Run Live</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#CCFF00]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Content Container */}
      <div className="p-4 overflow-x-auto bg-[#001D80]/90 text-white font-mono text-xs leading-relaxed scrollbar-thin">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
