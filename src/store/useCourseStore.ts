import { create } from "zustand";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  xpReward: number;
  completed: boolean;
  content: string;
  initialCode?: string;
  solutionCode?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  iconName: string;
  color: string;
  durationHours: number;
  studentsEnrolled: number;
  rating: number;
  lessons: Lesson[];
}

export interface Note {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface CourseState {
  courses: Course[];
  completedLessonIds: string[];
  enrolledCourseIds: string[];
  bookmarkedLessonIds: string[];
  notes: Note[];
  toggleLessonComplete: (lessonId: string) => void;
  enrollCourse: (courseId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
}

const INITIAL_COURSES: Course[] = [
  {
    id: "html5-mastery",
    slug: "html5-mastery",
    title: "HTML5 & Modern Web Semantics",
    category: "Frontend",
    description: "Master modern document architecture, accessibility (a11y), responsive media, and semantic markup.",
    level: "Beginner",
    iconName: "FileCode",
    color: "#E34F26",
    durationHours: 6,
    studentsEnrolled: 42350,
    rating: 4.9,
    lessons: [
      {
        id: "html-1",
        title: "Modern HTML5 Document Architecture",
        duration: "15 min",
        xpReward: 50,
        completed: true,
        content: `HTML5 introduces semantic tags like <header>, <nav>, <article>, and <section>. These elements provide structure and context for both search engines and accessibility tools.`,
        initialCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>ZeroToDev HTML5</title>\n</head>\n<body>\n  <!-- Write semantic header and main section here -->\n  <h1>Welcome to ZeroToDev</h1>\n</body>\n</html>`,
        solutionCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>ZeroToDev HTML5</title>\n</head>\n<body>\n  <header>\n    <nav>\n      <a href="#">Home</a>\n      <a href="#">Courses</a>\n    </nav>\n  </header>\n  <main>\n    <h1>Welcome to ZeroToDev</h1>\n  </main>\n</body>\n</html>`
      },
      {
        id: "html-2",
        title: "Accessibility (WCAG AA) & ARIA Attributes",
        duration: "20 min",
        xpReward: 60,
        completed: true,
        content: `Web Content Accessibility Guidelines (WCAG) ensure that everyone can interact with your applications. Use aria-label, role, and keyboard navigation focus trap.`,
        initialCode: `<button class="icon-btn">\n  <svg>...</svg>\n</button>`,
        solutionCode: `<button class="icon-btn" aria-label="Close modal dialog">\n  <svg aria-hidden="true">...</svg>\n</button>`
      },
      {
        id: "html-3",
        title: "Forms, Inputs, & Form Validation",
        duration: "25 min",
        xpReward: 75,
        completed: false,
        content: `Build robust user forms with HTML5 validation attributes: required, pattern, type="email", and autocomplete.`,
        initialCode: `<form>\n  <input type="text" placeholder="Email" />\n  <button type="submit">Submit</button>\n</form>`,
        solutionCode: `<form action="/api/register" method="POST">\n  <label for="email">Email Address</label>\n  <input id="email" type="email" required placeholder="user@example.com" />\n  <button type="submit">Submit</button>\n</form>`
      }
    ]
  },
  {
    id: "css-layouts",
    slug: "css-layouts",
    title: "CSS Modern Layouts & Flexbox/Grid",
    category: "Frontend",
    description: "Deep dive into CSS Flexbox, 2D CSS Grid, Container Queries, and butter-smooth Framer Motion integration.",
    level: "Intermediate",
    iconName: "Palette",
    color: "#1572B6",
    durationHours: 12,
    studentsEnrolled: 38900,
    rating: 4.95,
    lessons: [
      {
        id: "css-1",
        title: "Flexbox Layout Engine Mechanics",
        duration: "20 min",
        xpReward: 60,
        completed: true,
        content: `Learn main-axis vs cross-axis alignment, flex-grow, flex-shrink, and flex-basis for responsive component design.`,
        initialCode: `<div class="container">\n  <div class="card">Box 1</div>\n  <div class="card">Box 2</div>\n</div>\n\n<style>\n.container {\n  /* Display flex here */\n}\n</style>`,
        solutionCode: `<div class="container">\n  <div class="card">Box 1</div>\n  <div class="card">Box 2</div>\n</div>\n\n<style>\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n}\n</style>`
      },
      {
        id: "css-2",
        title: "2D CSS Grid Architectures & auto-fit",
        duration: "30 min",
        xpReward: 90,
        completed: false,
        content: `Create auto-responsive grid layouts without media queries using repeat(auto-fit, minmax(280px, 1fr)).`,
        initialCode: `<div class="grid-container">...</div>`,
        solutionCode: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}`
      }
    ]
  },
  {
    id: "js-modern",
    slug: "js-modern",
    title: "Modern JavaScript Mastery & Async ESNext",
    category: "Full Stack",
    description: "Promises, Async/Await, Closures, Prototypes, Event Loop, ES Modules, and Memory Performance Optimization.",
    level: "Intermediate",
    iconName: "Terminal",
    color: "#F7DF1E",
    durationHours: 18,
    studentsEnrolled: 51200,
    rating: 4.98,
    lessons: [
      {
        id: "js-1",
        title: "JavaScript Event Loop & Microtask Queue",
        duration: "25 min",
        xpReward: 80,
        completed: false,
        content: `Understand call stack execution, web APIs, Task Queue vs Microtask Queue (Promise callbacks).`,
        initialCode: `console.log('Start');\nsetTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\nconsole.log('End');`,
        solutionCode: `// Expected Output:\n// Start\n// End\n// Promise (Microtask queue executed first)\n// Timeout (Macrotask queue executed second)`
      }
    ]
  },
  {
    id: "react-19-next-16",
    slug: "react-19-next-16",
    title: "React 19 & Next.js 16 App Router Enterprise",
    category: "Frontend",
    description: "Server Components, Server Actions, Streaming SSR, Suspense Boundaries, Dynamic Routing, and Parallel Routes.",
    level: "Advanced",
    iconName: "Atom",
    color: "#00D8FF",
    durationHours: 24,
    studentsEnrolled: 64100,
    rating: 5.0,
    lessons: [
      {
        id: "react-1",
        title: "React Server Components vs Client Components",
        duration: "30 min",
        xpReward: 100,
        completed: false,
        content: `Understand the client-server boundary in Next.js App Router, bundle size benefits, and data fetching strategies.`,
        initialCode: `// Server Component by default\nexport default async function Page() {\n  const data = await fetch('https://api.example.com');\n  return <div>Data loaded</div>;\n}`,
        solutionCode: `// Server Component with suspense boundary\nimport { Suspense } from 'react';\n\nexport default function Page() {\n  return (\n    <Suspense fallback={<p>Loading stream...</p>}>\n      <AsyncDataComponent />\n    </Suspense>\n  );\n}`
      }
    ]
  },
  {
    id: "dsa-system-design",
    slug: "dsa-system-design",
    title: "Data Structures, Algorithms & System Design",
    category: "Computer Science",
    description: "Trees, Graphs, Dynamic Programming, Load Balancers, Distributed Caching, and Microservice Architectures.",
    level: "Advanced",
    iconName: "Network",
    color: "#10B981",
    durationHours: 30,
    studentsEnrolled: 29800,
    rating: 4.96,
    lessons: [
      {
        id: "dsa-1",
        title: "Binary Tree Traversal & BFS / DFS",
        duration: "40 min",
        xpReward: 120,
        completed: false,
        content: `Master depth-first search (Pre-order, In-order, Post-order) and breadth-first search using queue buffers.`,
        initialCode: `class TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n}`,
        solutionCode: `function inorderTraversal(root: TreeNode | null): number[] {\n  const res: number[] = [];\n  function dfs(node: TreeNode | null) {\n    if (!node) return;\n    dfs(node.left);\n    res.push(node.val);\n    dfs(node.right);\n  }\n  dfs(root);\n  return res;\n}`
      }
    ]
  },
  {
    id: "ai-engineer-rag",
    slug: "ai-engineer-rag",
    title: "AI Engineering: RAG & LLM Architectures",
    category: "AI & Data",
    description: "Build production AI apps with Vector Embeddings, LangChain, Hybrid Search, and Local Ollama Models.",
    level: "Advanced",
    iconName: "Cpu",
    color: "#8B5CF6",
    durationHours: 20,
    studentsEnrolled: 34500,
    rating: 4.97,
    lessons: [
      {
        id: "ai-1",
        title: "Vector Embeddings & Semantic Search",
        duration: "35 min",
        xpReward: 110,
        completed: false,
        content: `Convert text into high-dimensional vector embeddings and perform cosine similarity search for Retrieval-Augmented Generation.`,
        initialCode: `import { OpenAIEmbeddings } from '@langchain/openai';\n// Create embedding vector`,
        solutionCode: `const embeddings = new OpenAIEmbeddings();\nconst vector = await embeddings.embedQuery("What is ZeroToDev?");`
      }
    ]
  }
];

export const useCourseStore = create<CourseState>((set) => ({
  courses: INITIAL_COURSES,
  completedLessonIds: ["html-1", "html-2", "css-1"],
  enrolledCourseIds: ["html5-mastery", "css-layouts", "react-19-next-16"],
  bookmarkedLessonIds: ["html-2", "react-1"],
  notes: [
    {
      id: "note-1",
      courseId: "html5-mastery",
      lessonId: "html-2",
      title: "ARIA Labels Rule of Thumb",
      content: "Always add aria-label to icon buttons without visible text for screen readers.",
      createdAt: "2026-08-04"
    }
  ],

  toggleLessonComplete: (lessonId) => {
    set((state) => {
      const isCompleted = state.completedLessonIds.includes(lessonId);
      const newCompleted = isCompleted
        ? state.completedLessonIds.filter((id) => id !== lessonId)
        : [...state.completedLessonIds, lessonId];
      return { completedLessonIds: newCompleted };
    });
  },

  enrollCourse: (courseId) => {
    set((state) => {
      if (state.enrolledCourseIds.includes(courseId)) return state;
      return { enrolledCourseIds: [...state.enrolledCourseIds, courseId] };
    });
  },

  toggleBookmark: (lessonId) => {
    set((state) => {
      const isBookmarked = state.bookmarkedLessonIds.includes(lessonId);
      return {
        bookmarkedLessonIds: isBookmarked
          ? state.bookmarkedLessonIds.filter((id) => id !== lessonId)
          : [...state.bookmarkedLessonIds, lessonId]
      };
    });
  },

  addNote: (noteData) => {
    set((state) => ({
      notes: [
        ...state.notes,
        {
          ...noteData,
          id: `note-${Date.now()}`,
          createdAt: new Date().toISOString().split("T")[0]
        }
      ]
    }));
  }
}));
