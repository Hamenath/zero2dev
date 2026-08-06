"use client";

import { useState } from "react";
import { Users, ThumbsUp, MessageSquare, Bookmark, Tag, Plus, Search } from "lucide-react";

interface Post {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    author: "Elena Rostova",
    avatar: "ER",
    title: "Best practices for React 19 Server Actions in production?",
    content: "When using Server Actions in Next.js 16, should we validate input schemas directly inside the action using Zod, or handle pre-validation on the client component form?",
    category: "React 19",
    likes: 42,
    comments: 14,
    timeAgo: "2 hours ago",
  },
  {
    id: "p2",
    author: "Marcus Vance",
    avatar: "MV",
    title: "Understanding CSS Subgrid for multi-column cards",
    content: "CSS Subgrid allows nested card elements like headers and footers to align perfectly across independent rows. Here is a minimal example...",
    category: "CSS",
    likes: 67,
    comments: 19,
    timeAgo: "5 hours ago",
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    setPosts([
      {
        id: `p-${Date.now()}`,
        author: "Alex Rivera",
        avatar: "AR",
        title: newTitle,
        content: newContent,
        category: "General",
        likes: 1,
        comments: 0,
        timeAgo: "Just now",
      },
      ...posts,
    ]);
    setNewTitle("");
    setNewContent("");
    setShowModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Developer Discussions</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Community Forum & Q&A
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Start Discussion
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="premium-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{post.author}</h4>
                  <p className="text-[10px] text-gray-400">{post.timeAgo}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                {post.category}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">{post.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{post.content}</p>
            </div>

            <div className="pt-3 border-t border-black/[0.05] flex items-center gap-6 text-xs text-gray-500 font-semibold">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.likes} Upvotes</span>
              </button>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{post.comments} Replies</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <form onSubmit={handleCreatePost} className="w-full max-w-lg bg-white rounded-2xl p-6 space-y-4 shadow-2xl border border-black/10">
            <h3 className="text-lg font-bold text-gray-900">New Discussion Topic</h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Topic Title..."
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-black/[0.08] text-gray-900 font-semibold"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share details, code snippets, or questions..."
              rows={4}
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-black/[0.08] text-gray-900 leading-relaxed"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
              >
                Publish Topic
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
