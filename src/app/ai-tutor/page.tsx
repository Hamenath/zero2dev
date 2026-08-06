"use client";

import { useState } from "react";
import { Sparkles, Send, Wand2, HelpCircle, FileText, Briefcase, Bot, Code2, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function AiTutorPage() {
  const [activeTool, setActiveTool] = useState<"chat" | "explain" | "quiz" | "interview" | "career">("chat");

  // Chat Tool State
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Hello! I am ZeroToDev AI — your personal senior engineering tutor. Ask me about React 19, Next.js 16, TypeScript, Rust, System Design, or algorithm optimizations!",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");

  // Explain Tool State
  const [codeToExplain, setCodeToExplain] = useState(
    `async function fetchUserData(userId: string) {\n  const res = await fetch(\`/api/users/\${userId}\`, { next: { revalidate: 3600 } });\n  if (!res.ok) throw new Error("Failed to fetch user");\n  return res.json();\n}`
  );
  const [explanationOutput, setExplanationOutput] = useState<string | null>(null);

  // Quiz Tool State
  const [quizTopic, setQuizTopic] = useState("React 19 Server Components");
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery) return;
    const userText = inputQuery;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputQuery("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Regarding "${userText}": In modern software engineering, prioritizing clean modular architecture ensures high maintainability. Here is an optimized solution:\n\n\`\`\`typescript\nexport const config = {\n  runtime: 'edge',\n};\n\`\`\``,
        },
      ]);
    }, 600);
  };

  const handleExplainCode = () => {
    setExplanationOutput(
      "🤖 **Code Analysis**:\n1. `fetchUserData` is an asynchronous function taking a string `userId`.\n2. Uses Next.js 16 incremental static revalidation (`revalidate: 3600` seconds / 1 hour).\n3. Throws explicit runtime error if response status is not OK (200-299)."
    );
  };

  const handleGenerateQuiz = () => {
    setGeneratedQuiz({
      question: `What is a key benefit of ${quizTopic}?`,
      options: [
        "Eliminates client-side JavaScript bundle weight for static components",
        "Forces every page to execute synchronous blocking loops",
        "Disables CSS styling",
      ],
      answerIndex: 0,
    });
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>ZeroToDev AI Suite</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Precision AI Learning Assistant
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Supercharge your learning with context-aware AI tutoring, instant code debugging, custom quiz generation, and mock tech interviews.
        </p>
      </div>

      {/* Tool Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.06] pb-3 text-xs font-semibold">
        {[
          { id: "chat", label: "AI Tutor Chat", icon: Bot },
          { id: "explain", label: "AI Code Explainer", icon: Wand2 },
          { id: "quiz", label: "AI Quiz Generator", icon: HelpCircle },
          { id: "interview", label: "AI Mock Interview", icon: Briefcase },
        ].map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-black/[0.05]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tool.label}
            </button>
          );
        })}
      </div>

      {/* TOOL 1: CHAT */}
      {activeTool === "chat" && (
        <div className="premium-card p-6 flex flex-col h-[550px] bg-white">
          <div className="flex-1 overflow-y-auto space-y-4 p-2 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xl p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none border border-black/[0.04]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="pt-4 border-t border-black/[0.06] flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask AI anything about programming..."
              className="flex-1 px-4 py-3 text-xs rounded-xl bg-gray-50 border border-black/[0.08] focus:outline-none focus:border-purple-500 text-gray-900 font-medium"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      )}

      {/* TOOL 2: EXPLAINER */}
      {activeTool === "explain" && (
        <div className="premium-card p-8 space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Paste Code to Explain & Debug</h3>
          <textarea
            value={codeToExplain}
            onChange={(e) => setCodeToExplain(e.target.value)}
            rows={6}
            className="w-full p-4 rounded-xl bg-gray-900 text-green-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleExplainCode}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
          >
            Analyze Code with AI
          </button>

          {explanationOutput && (
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-medium leading-relaxed whitespace-pre-wrap">
              {explanationOutput}
            </div>
          )}
        </div>
      )}

      {/* TOOL 3: QUIZ GENERATOR */}
      {activeTool === "quiz" && (
        <div className="premium-card p-8 space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Generate Custom AI Quiz</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-black/[0.08] text-gray-900 font-semibold"
            />
            <button
              onClick={handleGenerateQuiz}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
            >
              Generate Quiz
            </button>
          </div>

          {generatedQuiz && (
            <div className="p-6 rounded-2xl bg-gray-50 border border-black/[0.06] space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Q: {generatedQuiz.question}</h4>
              <div className="space-y-2">
                {generatedQuiz.options.map((opt: string, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-800">
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
