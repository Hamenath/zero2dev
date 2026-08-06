"use client";

import { useGamificationStore } from "@/store/useGamificationStore";
import { useCourseStore } from "@/store/useCourseStore";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Trophy,
  Flame,
  Zap,
  BookOpen,
  Award,
  Bookmark,
  FileText,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { xp, level, streak, coins, league } = useGamificationStore();
  const { courses, enrolledCourseIds, bookmarkedLessonIds, notes } = useCourseStore();

  // Focus Mode Pomodoro Timer state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Overview Header */}
      <div className="premium-card p-8 bg-gradient-to-r from-gray-900 via-gray-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-extrabold text-xl text-white ring-4 ring-white/10 shadow-lg">
            AR
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Alex Rivera</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                PRO ENGINEER
              </span>
            </div>
            <p className="text-xs text-gray-300">
              Level {level} Architect • {league} League Tier • Joined August 2026
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{streak} Day Streak</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400 fill-blue-400" />
            <span>{xp.toLocaleString()} XP</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>{coins} Gems</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Enrolled Courses, Heatmap & Notes */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enrolled Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                My Active Learning Modules ({enrolledCourses.length})
              </h2>
              <Link href="/courses" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                Browse More
              </Link>
            </div>

            <div className="space-y-3">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="premium-card p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-500">{course.lessons.length} Lessons total</p>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shrink-0"
                  >
                    Resume Lesson
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub-style Activity Heatmap */}
          <div className="premium-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-500" /> 2026 Learning Activity Heatmap
              </h3>
              <span className="text-xs text-gray-500 font-semibold">142 Lessons Completed</span>
            </div>

            <div className="grid grid-cols-12 gap-1.5 pt-2">
              {[...Array(60)].map((_, i) => {
                const intensity = (i * 7) % 5;
                const colors = [
                  "bg-gray-100",
                  "bg-emerald-200",
                  "bg-emerald-400",
                  "bg-emerald-600",
                  "bg-emerald-700",
                ];
                return (
                  <div
                    key={i}
                    className={`h-4 rounded-sm ${colors[intensity]} hover:scale-125 transition-transform`}
                    title={`Day ${i + 1}: ${intensity * 2} coding activities`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Focus Mode Timer & Certificate Quick Link */}
        <div className="space-y-8">
          {/* Focus Mode Pomodoro Timer */}
          <div className="premium-card p-6 space-y-6 text-center bg-gray-50/80">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-blue-600" /> Focus Mode Timer
            </div>

            <div className="text-4xl font-mono font-extrabold text-gray-900 tracking-tight">
              {formatTimer(timerSeconds)}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isTimerRunning ? "Pause" : "Start Focus"}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(25 * 60);
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-gray-100 border border-black/[0.08] text-gray-600"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Certificate Banner */}
          <div className="premium-card p-6 space-y-4 bg-blue-50/60 border border-blue-200/60">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-blue-900">HTML5 Verified Certificate</h4>
                <p className="text-[11px] text-blue-700">Issued Aug 2026 • Verified QR</p>
              </div>
            </div>
            <Link
              href="/certificates/cert-84920"
              className="w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-bold block text-center hover:bg-blue-700 transition-colors"
            >
              View Verification Certificate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
