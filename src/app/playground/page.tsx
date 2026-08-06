"use client";

import MonacoPlayground from "@/components/playground/MonacoPlayground";
import { Code2, Sparkles, Download, Share2, Terminal } from "lucide-react";
import { useState } from "react";

export default function FullscreenPlaygroundPage() {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Monaco IDE Studio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            Multi-Language Sandbox
          </h1>
          <p className="text-xs text-gray-500">
            Real-time execution environment for HTML/CSS/JS, Python, & SQL with integrated AI debugging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 border border-black/[0.08] text-gray-700 font-semibold text-xs transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Code
          </button>
          <button
            onClick={() => alert("Downloading workspace source code archive (.zip)...")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Download Project
          </button>
        </div>
      </div>

      {/* Main Monaco Component */}
      <MonacoPlayground height="650px" />

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 space-y-4 shadow-2xl border border-black/10">
            <h3 className="text-lg font-bold text-gray-900">Share Code Playground</h3>
            <p className="text-xs text-gray-500">
              Anyone with this link can view and run your code in ZeroToDev Monaco IDE.
            </p>
            <input
              type="text"
              readOnly
              value="https://zerotodev.com/playground?share=code_x84920k"
              className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-black/[0.08] text-gray-800 font-mono"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("https://zerotodev.com/playground?share=code_x84920k");
                  setShowShareModal(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
              >
                Copy Share Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
