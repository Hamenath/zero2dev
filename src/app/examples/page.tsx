"use client";

import { useState } from "react";
import CodeBlock from "@/components/tutorial/CodeBlock";
import { Layers, Search, Filter, Play, Code2 } from "lucide-react";

interface CodeExample {
  id: string;
  title: string;
  category: "HTML" | "CSS" | "JavaScript" | "React" | "Python" | "SQL";
  description: string;
  code: string;
}

const EXAMPLES: CodeExample[] = [
  {
    id: "ex-1",
    title: "Centering with CSS Grid Place-Items",
    category: "CSS",
    description: "Center any element horizontally and vertically using 2 lines of CSS Grid.",
    code: `.container {\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n}`,
  },
  {
    id: "ex-2",
    title: "JavaScript Debounce Helper Function",
    category: "JavaScript",
    description: "Delay execution of high-frequency events like window resize or search input.",
    code: `function debounce(fn, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}`,
  },
  {
    id: "ex-3",
    title: "React 19 Custom Hook for LocalStorage",
    category: "React",
    description: "Persist component state seamlessly to browser local storage.",
    code: `import { useState, useEffect } from 'react';\n\nexport function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : initialValue;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}`,
  },
];

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = EXAMPLES.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive Code Snippets Catalog</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Featured Developer Code Examples
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Production-ready code snippets with instant Monaco IDE execution, one-click copy, and zero friction.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50/80 border border-black/[0.06]">
        <div className="flex flex-wrap gap-1.5">
          {["All", "HTML", "CSS", "JavaScript", "React", "Python", "SQL"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-black/[0.04]"
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
            placeholder="Search examples..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-black/[0.08] text-gray-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
            </div>
            <p className="text-xs text-gray-500">{item.description}</p>
            <CodeBlock title={item.title} language={item.category.toLowerCase()} code={item.code} />
          </div>
        ))}
      </div>
    </div>
  );
}
