import { create } from "zustand";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "streak" | "course" | "exercise" | "community" | "speed";
  unlockedAt?: string;
  progress: number; // 0 to 100
}

export interface GamificationState {
  xp: number;
  level: number;
  coins: number;
  streak: number;
  lastLoginDate: string;
  league: "Wood" | "Bronze" | "Silver" | "Gold" | "Diamond" | "Master" | "Grandmaster";
  badges: Badge[];
  hasSpunToday: boolean;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  incrementStreak: () => void;
  unlockBadge: (badgeId: string) => void;
  spinDailyWheel: () => { rewardType: "xp" | "coins" | "badge"; rewardValue: number | string };
}

const INITIAL_BADGES: Badge[] = [
  { id: "first-code", name: "Hello World", description: "Ran your first snippet in Monaco Editor", icon: "Code2", category: "exercise", progress: 100, unlockedAt: "2026-08-01" },
  { id: "streak-3", name: "On Fire", description: "Maintained a 3-day learning streak", icon: "Flame", category: "streak", progress: 100, unlockedAt: "2026-08-05" },
  { id: "streak-7", name: "Unstoppable", description: "Maintain a 7-day learning streak", icon: "Zap", category: "streak", progress: 70 },
  { id: "html-master", name: "Markup Architect", description: "Complete the HTML5 & Accessibility course", icon: "FileCode", category: "course", progress: 80 },
  { id: "css-wizard", name: "Style Maestro", description: "Complete CSS Modern Layouts & Animations", icon: "Palette", category: "course", progress: 45 },
  { id: "js-ninja", name: "Async Prodigy", description: "Complete Modern JavaScript Mastery", icon: "Terminal", category: "course", progress: 20 },
  { id: "algo-beast", name: "Problem Solver", description: "Solve 25 coding exercises", icon: "Brain", category: "exercise", progress: 60 },
  { id: "ai-collaborator", name: "AI Partner", description: "Use AI Tutor for 10 code explanations", icon: "Sparkles", category: "community", progress: 90 },
];

export const useGamificationStore = create<GamificationState>((set, get) => ({
  xp: 1450,
  level: 4,
  coins: 380,
  streak: 5,
  lastLoginDate: "2026-08-06",
  league: "Gold",
  badges: INITIAL_BADGES,
  hasSpunToday: false,

  addXP: (amount) => {
    set((state) => {
      const newXP = state.xp + amount;
      const newLevel = Math.floor(newXP / 400) + 1;
      return { xp: newXP, level: newLevel };
    });
  },

  addCoins: (amount) => {
    set((state) => ({ coins: state.coins + amount }));
  },

  incrementStreak: () => {
    set((state) => ({ streak: state.streak + 1 }));
  },

  unlockBadge: (badgeId) => {
    set((state) => ({
      badges: state.badges.map((b) =>
        b.id === badgeId
          ? { ...b, progress: 100, unlockedAt: new Date().toISOString().split("T")[0] }
          : b
      ),
    }));
  },

  spinDailyWheel: () => {
    const rewards = [
      { rewardType: "xp" as const, rewardValue: 150 },
      { rewardType: "coins" as const, rewardValue: 100 },
      { rewardType: "xp" as const, rewardValue: 300 },
      { rewardType: "coins" as const, rewardValue: 250 },
    ];
    const prize = rewards[Math.floor(Math.random() * rewards.length)];
    if (prize.rewardType === "xp") {
      get().addXP(prize.rewardValue as number);
    } else {
      get().addCoins(prize.rewardValue as number);
    }
    set({ hasSpunToday: true });
    return prize;
  },
}));
