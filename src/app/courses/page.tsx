"use client";

import { useCourseStore } from "@/store/useCourseStore";
import Link from "next/link";
import { useState } from "react";
import { Search, Filter, BookOpen, Star, Clock, Users, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function CoursesPage() {
  const { courses, enrolledCourseIds } = useCourseStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Frontend", "Full Stack", "Computer Science", "AI & Data"];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interactive Learning Modules</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Software Engineering Courses
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Comprehensive, hands-on courses equipped with real-time Monaco IDE exercises, quizzes, AI assistance, and verifiable certificates.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50/80 border border-black/[0.06]">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-black/[0.04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-black/[0.08] focus:outline-none focus:border-blue-500 text-gray-900"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(course.id);
          return (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="premium-card p-6 flex flex-col justify-between group hover:border-blue-400 transition-all relative overflow-hidden"
            >
              {isEnrolled && (
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Enrolled
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-gray-100 text-gray-700">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {course.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-black/[0.05] mt-6 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {course.durationHours}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    {(course.studentsEnrolled / 1000).toFixed(1)}k
                  </span>
                </div>

                <span className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  {isEnrolled ? "Continue" : "Start"} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
