import Link from "next/link";
import { Code2, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#002BD4] text-white border-t border-white/20 relative overflow-hidden mt-20">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Brand Logo & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-1 group">
              <div className="bg-white text-black font-black tracking-tight text-xs md:text-sm px-3 py-1.5 rounded-2xl rounded-bl-sm relative shadow-sm flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                ZERO
                <div
                  className="absolute -bottom-1.5 left-0 w-3 h-3 bg-white"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                />
              </div>
              <div className="bg-[#CCFF00] text-black font-black text-xs md:text-sm px-3 py-1.5 rounded-full border-[1.5px] border-white shadow-sm">
                DEV
              </div>
            </Link>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              The world’s premier 100% free open-source developer learning platform. No login required, zero paywalls, zero ads, and built by global engineers.
            </p>

            <div className="pt-2">
              <a
                href="https://github.com/Hamenath/zero2dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#CCFF00] text-black font-black text-xs hover:bg-white transition-colors shadow-md"
              >
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                Star on GitHub (Hamenath/zero2dev)
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-black text-[#CCFF00] tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-medium">
              <li><Link href="/tutorials" className="hover:text-[#CCFF00] transition-colors">Tutorials Hub</Link></li>
              <li><Link href="/roadmaps" className="hover:text-[#CCFF00] transition-colors">Developer Roadmaps</Link></li>
              <li><Link href="/playground" className="hover:text-[#CCFF00] transition-colors">Monaco IDE Sandbox</Link></li>
              <li><Link href="/references" className="hover:text-[#CCFF00] transition-colors">API References</Link></li>
              <li><Link href="/examples" className="hover:text-[#CCFF00] transition-colors">Code Examples</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-black text-[#CCFF00] tracking-wider uppercase mb-4">Documentation</h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-medium">
              <li><Link href="/docs/html/introduction" className="hover:text-[#CCFF00] transition-colors">HTML5 Specs</Link></li>
              <li><Link href="/docs/css/introduction" className="hover:text-[#CCFF00] transition-colors">CSS Layouts & Grid</Link></li>
              <li><Link href="/docs/javascript/introduction" className="hover:text-[#CCFF00] transition-colors">Async JavaScript</Link></li>
              <li><Link href="/docs/react/introduction" className="hover:text-[#CCFF00] transition-colors">React 19 RSC</Link></li>
              <li><Link href="/docs/python/introduction" className="hover:text-[#CCFF00] transition-colors">Python AI & RAG</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-xs font-black text-[#CCFF00] tracking-wider uppercase mb-4">Open Source</h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-medium">
              <li><Link href="/open-source" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1">GitHub Showcase <ArrowUpRight className="w-3 h-3 text-white/50" /></Link></li>
              <li><Link href="/tools" className="hover:text-[#CCFF00] transition-colors">12+ Dev Generators</Link></li>
              <li><a href="https://github.com/Hamenath/zero2dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1">MIT License <ArrowUpRight className="w-3 h-3 text-white/50" /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© {new Date().getFullYear()} ZeroToDev Open-Source Engine. Built for ambitious developers worldwide.</p>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#CCFF00] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
            <span>100% Operational • Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
