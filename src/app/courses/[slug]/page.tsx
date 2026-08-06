"use client";

import { useCourseStore } from "@/store/useCourseStore";
import { useGamificationStore } from "@/store/useGamificationStore";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import MonacoPlayground from "@/components/playground/MonacoPlayground";
import {
  BookOpen,
  CheckCircle2,
  Play,
  Bookmark,
  Sparkles,
  FileText,
  HelpCircle,
  Clock,
  Zap,
  ArrowLeft,
  ChevronRight,
  Plus,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { courses, completedLessonIds, toggleLessonComplete, bookmarkedLessonIds, toggleBookmark, notes, addNote } =
    useCourseStore();
  const { addXP } = useGamificationStore();

  const course = courses.find((c) => c.slug === slug) || courses[0];
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"lesson" | "playground" | "quiz" | "notes" | "ai">("lesson");

  const currentLesson = course.lessons[activeLessonIndex] || course.lessons[0];
  const isLessonCompleted = completedLessonIds.includes(currentLesson.id);
  const isBookmarked = bookmarkedLessonIds.includes(currentLesson.id);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Notes state
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // AI Chat state
  const [aiChatQuery, setAiChatQuery] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: `Hello! I am your ZeroToDev AI Assistant for ${course.title}. Ask me any questions about ${currentLesson.title}!`,
    },
  ]);

  const handleCompleteLesson = () => {
    if (!isLessonCompleted) {
      toggleLessonComplete(currentLesson.id);
      addXP(currentLesson.xpReward);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (selectedOption === 1) {
      addXP(50);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteContent) return;
    addNote({
      courseId: course.id,
      lessonId: currentLesson.id,
      title: noteTitle,
      content: noteContent,
    });
    setNoteTitle("");
    setNoteContent("");
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatQuery) return;
    const userMsg = aiChatQuery;
    setAiMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setAiChatQuery("");

    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Great question regarding "${currentLesson.title}"! In modern software architecture, adhering to WCAG AA accessibility standards and clean semantic HTML ensures high SEO rankings and screen-reader compatibility. Here is an optimized code pattern:\n\n\`\`\`html\n<button aria-label="Action Button">Submit</button>\n\`\`\``,
        },
      ]);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button & Course Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/courses")}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <span>{course.category}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{course.title}</h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(currentLesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              isBookmarked
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-white text-gray-600 border-black/[0.08] hover:bg-gray-50"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          <button
            onClick={handleCompleteLesson}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isLessonCompleted
                ? "bg-emerald-100 text-emerald-800"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isLessonCompleted ? "Lesson Completed (+ " + currentLesson.xpReward + " XP)" : "Mark Complete"}
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Lesson Index Tree */}
        <div className="lg:col-span-1 space-y-4">
          <div className="premium-card p-4 space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Course Modules</h3>

            <div className="space-y-1">
              {course.lessons.map((lesson, idx) => {
                const isCurrent = idx === activeLessonIndex;
                const isDone = completedLessonIds.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all ${
                      isCurrent
                        ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/60"
                        : "hover:bg-gray-50 text-gray-700 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <span
                          className={`w-4 h-4 rounded-full border border-gray-300 text-[9px] flex items-center justify-center shrink-0 ${
                            isCurrent ? "border-blue-600 text-blue-600 font-bold" : "text-gray-400"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0 ml-1">{lesson.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Main Panel: Lesson Content, Monaco IDE, Quiz, Notes, AI */}
        <div className="lg:col-span-3 space-y-6">
          {/* Module Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2 text-xs font-semibold">
            {[
              { id: "lesson", label: "Lesson Text", icon: BookOpen },
              { id: "playground", label: "Monaco IDE Sandbox", icon: Play },
              { id: "quiz", label: "Module Quiz", icon: HelpCircle },
              { id: "notes", label: "Notes & Annotations", icon: FileText },
              { id: "ai", label: "AI Tutor Drawer", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: LESSON TEXT */}
          {activeTab === "lesson" && (
            <div className="premium-card p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentLesson.duration} read</span>
                  <span>•</span>
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>+{currentLesson.xpReward} XP Reward</span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">{currentLesson.title}</h2>
              </div>

              <div className="prose prose-blue text-sm text-gray-700 leading-relaxed space-y-4">
                <p>{currentLesson.content}</p>
                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/60 text-blue-900 text-xs leading-relaxed space-y-2">
                  <h4 className="font-bold text-blue-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" /> Architectural Tip
                  </h4>
                  <p>
                    Always decouple your presenter logic from data fetching. In modern Next.js 16 App Router applications, perform initial data resolution on the server component boundary.
                  </p>
                </div>
              </div>

              {/* Code Snippet Box */}
              {currentLesson.initialCode && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-900">Interactive Snippet Preview</h3>
                  <div className="p-4 rounded-2xl bg-gray-900 text-gray-100 font-mono text-xs overflow-x-auto">
                    <pre>{currentLesson.initialCode}</pre>
                  </div>
                  <button
                    onClick={() => setActiveTab("playground")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 pt-2"
                  >
                    Open this code in Monaco IDE <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MONACO IDE SANDBOX */}
          {activeTab === "playground" && (
            <div className="space-y-4">
              <MonacoPlayground initialCode={currentLesson.initialCode} height="550px" />
            </div>
          )}

          {/* TAB 3: QUIZ */}
          {activeTab === "quiz" && (
            <div className="premium-card p-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Knowledge Check Quiz</h2>
              <p className="text-xs text-gray-500">
                Answer correctly to claim +50 Bonus XP towards your league standing.
              </p>

              <div className="space-y-4 pt-2">
                <p className="text-sm font-semibold text-gray-900">
                  Q: What is the primary purpose of semantic HTML tags like &lt;header&gt; and &lt;article&gt;?
                </p>

                <div className="space-y-2">
                  {[
                    "A. To apply default blue background styling to elements",
                    "B. To provide contextual meaning to search engines and assistive accessibility tools",
                    "C. To automatically compile code to WebAssembly",
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-4 rounded-xl text-xs font-medium border transition-all ${
                        selectedOption === idx
                          ? "bg-blue-50 border-blue-500 text-blue-900 font-semibold"
                          : "bg-white border-black/[0.08] hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md"
                >
                  Submit Answer
                </button>

                {quizSubmitted && (
                  <div
                    className={`p-4 rounded-2xl text-xs font-semibold ${
                      selectedOption === 1
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {selectedOption === 1
                      ? "🎉 Correct! +50 XP awarded to your account."
                      : "❌ Incorrect. Option B is correct. Semantic tags clarify content structure."}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: NOTES */}
          {activeTab === "notes" && (
            <div className="premium-card p-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Notes & Annotations</h2>

              <form onSubmit={handleSaveNote} className="space-y-4">
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note Title..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-black/[0.08] focus:outline-none focus:border-blue-500 text-gray-900 font-semibold"
                />
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write your personal notes, code snippets, or key takeaways..."
                  rows={4}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-black/[0.08] focus:outline-none focus:border-blue-500 text-gray-900 leading-relaxed"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Save Note
                </button>
              </form>

              {/* Saved Notes List */}
              <div className="space-y-3 pt-4 border-t border-black/[0.06]">
                <h3 className="text-xs font-bold text-gray-700">Saved Lesson Notes</h3>
                {notes.map((n) => (
                  <div key={n.id} className="p-4 rounded-2xl bg-gray-50 border border-black/[0.05] space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-gray-400 font-normal">{n.createdAt}</span>
                    </div>
                    <p className="text-xs text-gray-600">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AI TUTOR DRAWER */}
          {activeTab === "ai" && (
            <div className="premium-card p-6 flex flex-col h-[500px]">
              <div className="pb-3 border-b border-black/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <h3 className="text-xs font-bold text-gray-900">ZeroToDev AI Assistant</h3>
                </div>
                <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-semibold border border-purple-200">
                  Context Aware
                </span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {aiMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none border border-black/[0.04]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendAiMessage} className="pt-3 border-t border-black/[0.06] flex gap-2">
                <input
                  type="text"
                  value={aiChatQuery}
                  onChange={(e) => setAiChatQuery(e.target.value)}
                  placeholder="Ask AI about this lesson..."
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-gray-50 border border-black/[0.08] focus:outline-none focus:border-purple-500 text-gray-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
