export interface DocItem {
  slug: string;
  title: string;
  duration: string;
  completed?: boolean;
}

export interface DocFolder {
  id: string;
  name: string;
  items: DocItem[];
}

export interface TechTree {
  id: string;
  name: string;
  iconName: string;
  color: string;
  description: string;
  folders: DocFolder[];
}

export const DOCUMENTATION_TREES: Record<string, TechTree> = {
  html: {
    id: "html",
    name: "HTML5",
    iconName: "FileCode",
    color: "#E34F26",
    description: "Modern document architecture, WCAG AA accessibility, forms, and web APIs.",
    folders: [
      {
        id: "html-getting-started",
        name: "Getting Started",
        items: [
          { slug: "introduction", title: "Introduction to HTML5", duration: "5 min", completed: true },
          { slug: "installation", title: "Setup & Web Editors", duration: "6 min", completed: true },
          { slug: "first-page", title: "Your First HTML Page", duration: "8 min", completed: true },
        ],
      },
      {
        id: "html-basics",
        name: "Basics",
        items: [
          { slug: "elements", title: "HTML Elements & Tags", duration: "10 min" },
          { slug: "attributes", title: "Attributes & Properties", duration: "8 min" },
          { slug: "headings-paragraphs", title: "Headings & Paragraphs", duration: "7 min" },
          { slug: "styles-formatting", title: "Inline Styles & Formatting", duration: "9 min" },
        ],
      },
      {
        id: "html-media",
        name: "Media",
        items: [
          { slug: "images", title: "Responsive Images & Picture", duration: "12 min" },
          { slug: "audio-video", title: "Audio & Video Elements", duration: "10 min" },
          { slug: "canvas-svg", title: "HTML5 Canvas & Inline SVG", duration: "15 min" },
        ],
      },
      {
        id: "html-forms",
        name: "Forms & Controls",
        items: [
          { slug: "forms-intro", title: "Forms & Input Types", duration: "12 min" },
          { slug: "validation", title: "Native Form Validation", duration: "11 min" },
          { slug: "textarea-select", title: "Select, Textarea & Buttons", duration: "9 min" },
        ],
      },
      {
        id: "html-advanced",
        name: "Advanced & Accessibility",
        items: [
          { slug: "semantic-html", title: "Semantic HTML Architecture", duration: "14 min" },
          { slug: "accessibility-aria", title: "Accessibility (a11y) & ARIA", duration: "16 min" },
          { slug: "web-components", title: "Web Components & Templates", duration: "18 min" },
        ],
      },
      {
        id: "html-apis",
        name: "Web APIs",
        items: [
          { slug: "drag-and-drop", title: "HTML5 Drag & Drop API", duration: "15 min" },
          { slug: "web-storage", title: "LocalStorage & SessionStorage", duration: "12 min" },
          { slug: "geolocation", title: "Geolocation API", duration: "10 min" },
        ],
      },
      {
        id: "html-projects",
        name: "Projects",
        items: [
          { slug: "portfolio-project", title: "Build a Developer Portfolio", duration: "25 min" },
          { slug: "landing-page-project", title: "Build a High-Converting Landing Page", duration: "30 min" },
        ],
      },
    ],
  },
  css: {
    id: "css",
    name: "CSS Layouts",
    iconName: "Layers",
    color: "#1572B6",
    description: "Modern CSS Grid, 1D Flexbox, Container Queries, and Animations.",
    folders: [
      {
        id: "css-basics",
        name: "Basics",
        items: [
          { slug: "introduction", title: "Introduction to CSS", duration: "6 min" },
          { slug: "syntax-selectors", title: "Syntax & Specificity", duration: "10 min" },
          { slug: "box-model", title: "The CSS Box Model", duration: "12 min" },
        ],
      },
      {
        id: "css-flexbox",
        name: "Flexbox Layout",
        items: [
          { slug: "flexbox-container", title: "Flex Container & Alignment", duration: "14 min" },
          { slug: "flexbox-items", title: "Flex Grow, Shrink & Basis", duration: "12 min" },
        ],
      },
      {
        id: "css-grid",
        name: "CSS Grid",
        items: [
          { slug: "grid-template", title: "2D Grid Template Columns", duration: "16 min" },
          { slug: "grid-subgrid", title: "Subgrid & Responsive Auto-Fit", duration: "18 min" },
        ],
      },
      {
        id: "css-animation",
        name: "Animations & Transitions",
        items: [
          { slug: "transitions", title: "CSS Transitions & Easing", duration: "10 min" },
          { slug: "keyframes", title: "Keyframe Animations", duration: "15 min" },
        ],
      },
    ],
  },
  javascript: {
    id: "javascript",
    name: "JavaScript",
    iconName: "Terminal",
    color: "#F7DF1E",
    description: "Promises, Async/Await, Event Loop, Closures, DOM, and ESNext.",
    folders: [
      {
        id: "js-basics",
        name: "Basics",
        items: [
          { slug: "introduction", title: "JS Syntax & Variables", duration: "8 min" },
          { slug: "operators", title: "Operators & Conditionals", duration: "10 min" },
          { slug: "functions", title: "Functions & Arrow Functions", duration: "12 min" },
        ],
      },
      {
        id: "js-data",
        name: "Arrays & Objects",
        items: [
          { slug: "arrays", title: "Array Methods (Map, Filter, Reduce)", duration: "15 min" },
          { slug: "objects", title: "Object Prototypes & Destructuring", duration: "14 min" },
        ],
      },
      {
        id: "js-async",
        name: "Async JS & Event Loop",
        items: [
          { slug: "promises", title: "Promises & Microtasks", duration: "18 min" },
          { slug: "async-await", title: "Async / Await Mechanics", duration: "16 min" },
          { slug: "event-loop", title: "V8 Event Loop & Execution Stack", duration: "20 min" },
        ],
      },
    ],
  },
  react: {
    id: "react",
    name: "React 19",
    iconName: "Atom",
    color: "#00D8FF",
    description: "Server Components (RSC), Server Actions, Hooks, and Suspense.",
    folders: [
      {
        id: "react-intro",
        name: "Introduction",
        items: [
          { slug: "introduction", title: "React 19 Overview & JSX", duration: "10 min" },
          { slug: "components-props", title: "Components & Props", duration: "12 min" },
        ],
      },
      {
        id: "react-hooks",
        name: "State & Hooks",
        items: [
          { slug: "usestate", title: "useState & State Immutability", duration: "14 min" },
          { slug: "useeffect", title: "useEffect & Event Listeners", duration: "16 min" },
          { slug: "use-hook", title: "React 19 use() Hook", duration: "15 min" },
        ],
      },
      {
        id: "react-rsc",
        name: "Server Components (RSC)",
        items: [
          { slug: "rsc-architecture", title: "Server Components vs Client", duration: "20 min" },
          { slug: "server-actions", title: "Server Actions & Mutations", duration: "22 min" },
        ],
      },
    ],
  },
  python: {
    id: "python",
    name: "Python 3",
    iconName: "Cpu",
    color: "#3776AB",
    description: "Syntax, Functions, OOP, Data Science, and RAG AI Architectures.",
    folders: [
      {
        id: "py-basics",
        name: "Basics",
        items: [
          { slug: "introduction", title: "Python Syntax & Types", duration: "8 min" },
          { slug: "loops-functions", title: "Loops & Function Defs", duration: "12 min" },
        ],
      },
      {
        id: "py-ai",
        name: "AI & Vector Embeddings",
        items: [
          { slug: "embeddings", title: "High-Dimensional Vector Embeddings", duration: "20 min" },
          { slug: "langchain-rag", title: "LangChain RAG Architecture", duration: "25 min" },
        ],
      },
    ],
  },
};
