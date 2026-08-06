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
      <div className="space-y-3 pb-3 border-b border-black/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: tree.color }}
            />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 truncate">
              {tree.name} Explorer
            </h3>
          </div>
          {mobileExplorerOpen && (
            <button
              onClick={() => setMobileExplorerOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Input Filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Search ${tree.name}...`}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 border border-black/[0.06] text-gray-900 focus:outline-none focus:border-blue-500 font-medium"
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
                className="w-full flex items-center justify-between py-1 px-1.5 rounded-lg text-gray-700 hover:bg-gray-100/70 transition-colors text-left"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  )}
                  {isOpen ? (
                    <FolderOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  ) : (
                    <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  )}
                  <span className="font-bold font-sans text-xs text-gray-800">{folder.name}</span>
                </div>
              </button>

              {/* Collapsible Children File Nodes with Framer Motion Animation */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden space-y-0.5 pl-5 border-l border-black/[0.06] ml-2"
                  >
                    {filteredItems.map((item) => {
                      const isActive = activeSlug === item.slug;
                      return (
                        <Link
                          key={item.slug}
                          href={`/docs/${tree.id}/${item.slug}`}
                          onClick={() => setMobileExplorerOpen(false)}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                            isActive
                              ? "bg-blue-50 text-blue-600 font-bold border border-blue-200/60 shadow-sm"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate min-w-0">
                            {item.completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <FileCode className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                            )}
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-normal shrink-0 ml-1">
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
      <aside className="w-80 shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-6.5rem)] overflow-y-auto pr-4 space-y-4 border-r border-black/[0.05] select-none">
        {renderContent()}
      </aside>

      {/* Mobile Floating Trigger Button */}
      <div className="lg:hidden fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setMobileExplorerOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 text-white font-bold text-xs shadow-xl active:scale-95 transition-transform"
        >
          <Layers className="w-4 h-4 text-blue-400" />
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative w-80 max-w-[85vw] bg-white h-full p-5 overflow-y-auto shadow-2xl z-10"
            >
              {renderContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
