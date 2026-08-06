"use client";

import { useGamificationStore } from "@/store/useGamificationStore";
import { useState } from "react";
import {
  Trophy,
  Flame,
  Zap,
  Award,
  Sparkles,
  Lock,
  CheckCircle2,
  Gift,
  Crown,
  Users,
  Shield,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function GamificationPage() {
  const { xp, level, coins, league, badges, spinDailyWheel, hasSpunToday } = useGamificationStore();
  const [activeTab, setActiveTab] = useState<"leaderboard" | "badges" | "tree">("leaderboard");
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const LEADERBOARD = [
    { rank: 1, name: "Marcus Vance", xp: 4850, level: 12, league: "Grandmaster", avatar: "MV" },
    { rank: 2, name: "Elena Rostova", xp: 4210, level: 10, league: "Master", avatar: "ER" },
    { rank: 3, name: "Priya Sharma", xp: 3950, level: 9, league: "Master", avatar: "PS" },
    { rank: 4, name: "Alex Rivera (You)", xp: 1450, level: 4, league: "Gold", avatar: "AR", isUser: true },
    { rank: 5, name: "David Kim", xp: 1280, level: 3, league: "Gold", avatar: "DK" },
    { rank: 6, name: "Sofia Rodriguez", xp: 1100, level: 3, league: "Silver", avatar: "SR" },
  ];

  const handleSpin = () => {
    if (hasSpunToday) return;
    const prize = spinDailyWheel();
    setSpinResult(`🎉 You won +${prize.rewardValue} ${prize.rewardType.toUpperCase()}!`);
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Developer Gamification Hub</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            League Tiers & Achievements
          </h1>
        </div>

        {/* Daily Spin Wheel Box */}
        <div className="premium-card p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center gap-4">
          <Gift className="w-8 h-8 shrink-0 animate-bounce" />
          <div>
            <h4 className="text-xs font-bold">Daily Wheel Spin</h4>
            <p className="text-[11px] opacity-90">Spin every 24h to claim bonus XP or Gems.</p>
          </div>
          <button
            onClick={handleSpin}
            disabled={hasSpunToday}
            className="px-4 py-2 rounded-xl bg-white text-amber-700 font-bold text-xs hover:bg-amber-50 transition-colors disabled:opacity-50 shrink-0"
          >
            {hasSpunToday ? "Claimed Today" : "Spin Wheel"}
          </button>
        </div>
      </div>

      {spinResult && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs text-center animate-in fade-in">
          {spinResult}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2 text-xs font-semibold">
        {[
          { id: "leaderboard", label: "Global Leaderboards", icon: Crown },
          { id: "badges", label: "Achievements & Badges", icon: Award },
          { id: "tree", label: "Developer Skill Tree", icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                isActive ? "bg-blue-600 text-white font-bold shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: LEADERBOARD */}
      {activeTab === "leaderboard" && (
        <div className="premium-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Gold League Standings (Weekly Reset)
            </h3>
            <span className="text-xs text-gray-500 font-medium">Top 3 advance to Diamond Tier</span>
          </div>

          <div className="space-y-2">
            {LEADERBOARD.map((item) => (
              <div
                key={item.rank}
                className={`p-4 rounded-2xl flex items-center justify-between transition-all ${
                  item.isUser
                    ? "bg-blue-50 border-2 border-blue-500 font-bold shadow-sm"
                    : "bg-white border border-black/[0.05] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-extrabold flex items-center justify-center ${
                      item.rank === 1
                        ? "bg-amber-400 text-amber-950"
                        : item.rank === 2
                        ? "bg-gray-300 text-gray-900"
                        : item.rank === 3
                        ? "bg-amber-700 text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {item.rank}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                    <p className="text-[10px] text-gray-500">{item.league} Tier • Lvl {item.level}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-extrabold text-blue-600">
                  <Zap className="w-3.5 h-3.5 fill-blue-500" />
                  <span>{item.xp.toLocaleString()} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BADGES & ACHIEVEMENTS */}
      {activeTab === "badges" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const isUnlocked = badge.progress === 100;
            return (
              <div
                key={badge.id}
                className={`premium-card p-6 flex flex-col justify-between space-y-4 ${
                  isUnlocked ? "bg-white" : "bg-gray-50/50 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white ${
                      isUnlocked ? "bg-blue-600 shadow-md shadow-blue-500/20" : "bg-gray-300"
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  {isUnlocked ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900">{badge.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                </div>

                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: SKILL TREE */}
      {activeTab === "tree" && (
        <div className="premium-card p-8 text-center space-y-4">
          <Sparkles className="w-8 h-8 text-blue-600 mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-gray-900">Interactive Skill Tree Unlocks</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Spend your earned Gems to unlock specialized architectural masterclasses and premium certificates.
          </p>
        </div>
      )}
    </div>
  );
}
