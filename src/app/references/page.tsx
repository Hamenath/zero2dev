"use client";

import { useState } from "react";
import { FileText, Search, Code2, Globe, Check, Copy } from "lucide-react";

interface ReferenceItem {
  id: string;
  name: string;
  category: "HTML" | "CSS" | "JavaScript" | "React";
  syntax: string;
  description: string;
  compatibility: { chrome: string; firefox: string; safari: string };
  exampleCode: string;
}

const REFERENCES: ReferenceItem[] = [
  {
    id: "ref-1",
    name: "Array.prototype.reduce()",
    category: "JavaScript",
    syntax: "array.reduce(callbackFn, initialValue)",
    description: "Executes a user-supplied reducer callback function on each element of the array, resulting in a single output value.",
    compatibility: { chrome: "1.0+", firefox: "1.5+", safari: "3.0+" },
    exampleCode: `const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);\nconsole.log(sum); // Output: 10`,
  },
  {
    id: "ref-2",
    name: "grid-template-columns",
    category: "CSS",
    syntax: "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));",
    description: "Defines the line names and track sizing functions of the grid columns.",
    compatibility: { chrome: "57.0+", firefox: "52.0+", safari: "10.1+" },
    exampleCode: `.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}`,
  },
  {
    id: "ref-3",
    name: "<dialog> HTML5 Element",
    category: "HTML",
    syntax: "<dialog open> ... </dialog>",
    description: "Represents a dialog box or other interactive component, such as an dismissible alert, inspector, or modal window.",
    compatibility: { chrome: "37.0+", firefox: "98.0+", safari: "15.4+" },
    exampleCode: `<dialog id="favDialog">\n  <form method="dialog">\n    <p>ZeroToDev Modal</p>\n    <button>Close</button>\n  </form>\n</dialog>`,
  },
];

export default function ReferencesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<ReferenceItem>(REFERENCES[0]);
  const [copied, setCopied] = useState(false);

  const filtered = REFERENCES.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(activeItem.exampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Documentation Index</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          API & Syntax Documentation Library
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50/80 border border-black/[0.06]">
        <div className="flex gap-2">
          {["All", "HTML", "CSS", "JavaScript", "React"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                selectedCategory === cat ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-black/[0.05]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search API methods..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-black/[0.08] text-gray-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Method List */}
        <div className="space-y-2">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`w-full p-4 rounded-2xl text-left border transition-all ${
                activeItem.id === item.id
                  ? "bg-blue-50 border-2 border-blue-600 shadow-sm"
                  : "bg-white border-black/[0.08] hover:border-blue-300"
              }`}
            >
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-gray-900 mt-1">{item.name}</h3>
            </button>
          ))}
        </div>

        {/* Right 2 Cols: Details & Syntax */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">{activeItem.category} Reference</span>
                <h2 className="text-2xl font-extrabold text-gray-900 mt-1">{activeItem.name}</h2>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase">Syntax Signature</h4>
              <div className="p-3.5 rounded-xl bg-gray-100 font-mono text-xs text-gray-800 border border-black/[0.05]">
                {activeItem.syntax}
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">{activeItem.description}</p>

            {/* Code Example Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900 uppercase">Code Example</h4>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy Snippet"}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-gray-900 text-green-400 font-mono text-xs overflow-x-auto">
                {activeItem.exampleCode}
              </pre>
            </div>

            {/* Compatibility Table */}
            <div className="pt-4 border-t border-black/[0.06] space-y-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase">Browser Compatibility</h4>
              <div className="grid grid-cols-3 gap-4 text-center text-xs font-semibold">
                <div className="p-3 rounded-xl bg-gray-50 border border-black/[0.05]">Chrome: {activeItem.compatibility.chrome}</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-black/[0.05]">Firefox: {activeItem.compatibility.firefox}</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-black/[0.05]">Safari: {activeItem.compatibility.safari}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
