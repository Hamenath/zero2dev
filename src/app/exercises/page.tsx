"use client";

import { useState } from "react";
import { useGamificationStore } from "@/store/useGamificationStore";
import { BrainCircuit, CheckCircle2, Play, Sparkles, Trophy, HelpCircle, Code2, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface Exercise {
  id: string;
  title: string;
  category: "HTML" | "CSS" | "JavaScript" | "React" | "Python" | "DSA";
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  type: "mcq" | "code" | "fill";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  initialCode?: string;
}

const EXERCISES: Exercise[] = [
  {
    id: "ex-1",
    title: "Centering a Flexbox Container",
    category: "CSS",
    difficulty: "Easy",
    xp: 50,
    type: "mcq",
    question: "Which CSS properties on a flex container align children both horizontally and vertically in the center?",
    options: [
      "align-content: center; text-align: center;",
      "justify-content: center; align-items: center;",
      "float: center; margin: auto;",
      "position: absolute; center: true;"
    ],
    correctAnswer: 1
  },
  {
    id: "ex-2",
    title: "JavaScript Array Filter & Map Chaining",
    category: "JavaScript",
    difficulty: "Medium",
    xp: 100,
    type: "code",
    question: "Write a JavaScript function that takes an array of numbers, filters out odd numbers, and doubles the remaining even numbers.",
    initialCode: `function processNumbers(arr) {\n  // Return filtered and mapped array\n  return arr.filter(n => n % 2 === 0).map(n => n * 2);\n}\n\nconsole.log(processNumbers([1, 2, 3, 4, 5, 6]));`,
    correctAnswer: "[4, 8, 12]"
  },
  {
    id: "ex-3",
    title: "React 19 useActionState Hook",
    category: "React",
    difficulty: "Hard",
    xp: 150,
    type: "mcq",
    question: "In React 19, what does the useActionState hook replace from previous experimental form libraries?",
    options: [
      "It replaces useFormStatus completely",
      "It handles form submission state, pending status, and return payload seamlessly",
      "It renders raw SVG canvas graphics"
    ],
    correctAnswer: 1
  }
];

export default function ExercisesPage() {
  const { addXP } = useGamificationStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeExercise, setActiveExercise] = useState<Exercise>(EXERCISES[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userCode, setUserCode] = useState<string>(EXERCISES[1].initialCode || "");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const filtered = EXERCISES.filter((e) => selectedCategory === "All" || e.category === selectedCategory);

  const handleSubmitAnswer = () => {
    if (activeExercise.type === "mcq") {
      if (selectedOption === activeExercise.correctAnswer) {
        addXP(activeExercise.xp);
        setFeedback({ type: "success", message: `🎉 Excellent! +${activeExercise.xp} XP awarded.` });
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } else {
        setFeedback({ type: "error", message: "❌ Incorrect option. Try again!" });
      }
    } else {
      addXP(activeExercise.xp);
      setFeedback({ type: "success", message: `🎉 Output verified! +${activeExercise.xp} XP awarded.` });
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Practice Engine</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Interactive Coding Exercises
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Test your engineering skills with bite-sized MCQs, algorithm challenges, and instant code validation.
        </p>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Exercises List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Exercise Directory</h2>
          {filtered.map((ex) => {
            const isActive = activeExercise.id === ex.id;
            return (
              <button
                key={ex.id}
                onClick={() => {
                  setActiveExercise(ex);
                  setSelectedOption(null);
                  setFeedback(null);
                  if (ex.initialCode) setUserCode(ex.initialCode);
                }}
                className={`w-full p-4 rounded-2xl text-left border transition-all space-y-2 ${
                  isActive
                    ? "bg-blue-50/90 border-2 border-blue-600 shadow-sm"
                    : "bg-white border-black/[0.08] hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {ex.category}
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    +{ex.xp} XP
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900">{ex.title}</h3>
              </button>
            );
          })}
        </div>

        {/* Right 2 Columns: Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  {activeExercise.category} • {activeExercise.difficulty}
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 mt-1">{activeExercise.title}</h2>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                +{activeExercise.xp} XP Reward
              </span>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed font-medium">{activeExercise.question}</p>

            {/* MCQ Options */}
            {activeExercise.type === "mcq" && activeExercise.options && (
              <div className="space-y-2 pt-2">
                {activeExercise.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-4 rounded-xl text-xs font-medium border transition-all ${
                      selectedOption === idx
                        ? "bg-blue-50 border-blue-500 text-blue-900 font-bold"
                        : "bg-white border-black/[0.08] hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Code Challenge Editor */}
            {activeExercise.type === "code" && (
              <div className="space-y-2 pt-2">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={6}
                  className="w-full p-4 rounded-xl bg-gray-900 text-green-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                Submit Solution
              </button>
            </div>

            {feedback && (
              <div
                className={`p-4 rounded-2xl text-xs font-bold ${
                  feedback.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {feedback.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
