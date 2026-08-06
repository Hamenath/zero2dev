import { create } from "zustand";

export interface SearchStoreState {
  isOpen: boolean;
  query: string;
  activeCategory: "all" | "courses" | "exercises" | "roadmaps" | "references" | "ai";
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setQuery: (q: string) => void;
  setActiveCategory: (cat: "all" | "courses" | "exercises" | "roadmaps" | "references" | "ai") => void;
}

export const useSearchStore = create<SearchStoreState>((set) => ({
  isOpen: false,
  query: "",
  activeCategory: "all",
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: "" }),
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen })),
  setQuery: (q) => set({ query: q }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
}));
