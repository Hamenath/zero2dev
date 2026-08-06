<div align="center">

# ZeroToDev — Learn. Build. Master.

**The world's premier 100% free, open-source developer documentation & learning platform.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

*Inspired by Apple, Linear, Vercel, Raycast, Notion, and GitHub Docs.*

[**Live Demo**](https://github.com/Hamenath/zero2dev) • [**Documentation**](https://github.com/Hamenath/zero2dev/tree/main/src/data) • [**Developer Tools**](https://github.com/Hamenath/zero2dev) • [**Contribute**](https://github.com/Hamenath/zero2dev)

</div>

---

## ⚡ Core Mission & Principles

ZeroToDev is built for developers who value precision, deep technical mastery, and zero friction.

- **100% Free & Open Source**: No accounts required. No login barriers. No paywalls. No ads. Everything works instantly upon opening the website.
- **VS Code Explorer Architecture**: Every programming language features its own independent documentation tree (HTML5, CSS Layouts, JavaScript, React 19, Python 3, Node.js, Next.js, SQL, AI).
- **Instant Raycast Command Palette**: Powered by `Fuse.js` for instant fuzzy search across 100+ tutorials, reference APIs, code snippets, and developer tools (`⌘K` or `/`).
- **Real-Time Monaco IDE**: Zero-setup in-browser code runner supporting HTML/CSS/JS, Python 3, and PostgreSQL with responsive device preview frames (Desktop, Tablet, Mobile).
- **Built-in Developer Utilities Suite**: 12+ browser-based generators working offline (CSS Shadow, Gradient, Border Radius, Flexbox/Grid, JSON Formatter, Regex Tester, Base64 Encoder, UUID/Password Generator).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 App Router](https://nextjs.org) with React 19 Server Components
- **Language**: [TypeScript](https://www.typescriptlang.org) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Code Editor**: [@monaco-editor/react](https://github.com/suenty/monaco-react)
- **Search Engine**: [Fuse.js](https://fusejs.io)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Effects & Confetti**: `canvas-confetti`

---

## 📁 Repository Structure

```
zero2dev/
├── src/
│   ├── app/
│   │   ├── docs/[tech]/[slug]/   # Universal VS Code Explorer documentation route
│   │   ├── tutorials/            # Tutorial index catalog
│   │   ├── references/           # API documentation index
│   │   ├── examples/             # Code snippet catalog
│   │   ├── playground/           # Fullscreen Monaco IDE
│   │   ├── tools/                # Developer utilities hub
│   │   ├── roadmaps/             # Visual career pathways
│   │   ├── open-source/          # GitHub contributor showcase
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Design tokens & typography scale
│   ├── components/
│   │   ├── layout/               # Navbar, VsCodeExplorerSidebar, TocRightSidebar
│   │   ├── playground/           # MonacoPlayground component
│   │   ├── search/               # CommandPalette component
│   │   └── tutorial/             # CodeBlock component
│   ├── data/                     # Documentation tree definitions
│   └── store/                    # Zustand state stores
```

---

## 🚀 Quick Start & Development

### 1. Clone the repository
```bash
git clone https://github.com/Hamenath/zero2dev.git
cd zero2dev
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🤝 Contributing

Contributions are warmly welcomed! ZeroToDev is built transparently by developers worldwide.

1. Fork the repository on GitHub.
2. Create your feature branch (`git checkout -b feature/amazing-docs`).
3. Commit your changes (`git commit -m 'feat: add Python RAG tutorial'`).
4. Push to the branch (`git push origin feature/amazing-docs`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  Crafted with ❤️ by <a href="https://github.com/Hamenath/zero2dev">Hamenath</a> and the open-source community.
</div>
