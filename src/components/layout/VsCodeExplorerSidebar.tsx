"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechTree } from "@/data/documentationTrees";
import { Search, Folder, FolderOpen, FileCode, CheckCircle2, ChevronRight, ChevronDown, Layers, X } from "lucide-react";

interface VsCodeExplorerSidebarProps {
  tree: TechTree;
  activeSlug: string;
}

export default function VsCodeExplorerSidebar({ tree, activeSlug }: VsCodeExplorerSidebarProps) {
  const pathname = usePathname();
  const [filterQuery, setFilterQuery] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);

  // Initialize expanded folders state from localStorage or default all open
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`zerotodev_tree_${tree.id}`);
      if (stored) {
        setExpandedFolders(JSON.parse(stored));
      } else {
        const defaults: Record<string, boolean> = {};
        tree.folders.forEach((f) => (defaults[f.id] = true));
        setExpandedFolders(defaults);
      }
    } catch {
      const defaults: Record<string, boolean> = {};
      tree.folders.forEach((f) => (defaults[f.id] = true));
      setExpandedFolders(defaults);
    }
  }, [tree.id]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = { ...prev, [folderId]: !prev[folderId] };
      try {
        localStorage.setItem(`zerotodev_tree_${tree.id}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const renderContent = () => (
    <div className="space-y-4">
      {/* VS Code Explorer Header */}
      <div className="space-y-3 pb-3 border-b border-white/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: tree.color }}
            />
            <h3 className="text-xs font-black uppercase tracking-wider text-[#CCFF00] truncate">
              {tree.name} Explorer
            </h3>
          </div>
          {mobileExplorerOpen && (
            <button
              onClick={() => setMobileExplorerOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-white/10 text-white/70"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Input Filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-white/50 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Search ${tree.name}...`}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#CCFF00] font-medium"
          />
        </div>
      </div>

      {/* VS Code Tree Folder List */}
      <div className="space-y-2 text-xs font-mono">
        {tree.folders.map((folder) => {
          const isOpen = expandedFolders[folder.id] ?? true;
          const filteredItems = folder.items.filter((item) =>
            item.title.toLowerCase().includes(filterQuery.toLowerCase())
          );

          if (filterQuery && filteredItems.length === 0) return null;

          return (
            <div key={folder.id} className="space-y-1">
              {/* Folder Node */}
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors text-left font-sans font-bold"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-white/50 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
                  )}
                  {isOpen ? (
                    <FolderOpen className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                  ) : (
                    <Folder className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                  )}
                  <span className="text-xs text-white">{folder.name}</span>
                </div>
              </button>

              {/* Collapsible Children File Nodes */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden space-y-0.5 pl-4 border-l border-white/15 ml-2"
                  >
                    {filteredItems.map((item) => {
                      const isActive = activeSlug === item.slug;
                      return (
                        <Link
                          key={item.slug}
                          href={`/docs/${tree.id}/${item.slug}`}
                          onClick={() => setMobileExplorerOpen(false)}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                            isActive
                              ? "bg-[#CCFF00] text-black font-extrabold shadow-sm"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate min-w-0">
                            {item.completed ? (
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-black" : "text-[#CCFF00]"}`} />
                            ) : (
                              <FileCode className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-black" : "text-white/50"}`} />
                            )}
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span className={`text-[10px] font-normal shrink-0 ml-1 ${isActive ? "text-black/70" : "text-white/50"}`}>
                            {item.duration}
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-80 shrink-0 hidden lg:block sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto pr-4 space-y-4 border-r border-white/15 select-none">
        {renderContent()}
      </aside>

      {/* Mobile Floating Trigger Button */}
      <div className="lg:hidden fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setMobileExplorerOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#CCFF00] text-black font-black text-xs shadow-2xl active:scale-95 transition-transform"
        >
          <Layers className="w-4 h-4 text-black" />
          <span>Docs Explorer</span>
        </button>
      </div>

      {/* Mobile Sidebar Modal Drawer */}
      <AnimatePresence>
        {mobileExplorerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileExplorerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative w-80 max-w-[85vw] bg-[#0038FF] text-white h-full p-5 overflow-y-auto shadow-2xl z-10 border-r border-white/20"
            >
              {renderContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
