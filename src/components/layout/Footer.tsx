import Link from "next/link";
import { Code2, ArrowUpRight, ShieldCheck, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50/60 border-t border-black/[0.05] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-black/[0.05]">
          {/* Brand & Newsletter */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                ZeroTo<span className="text-blue-600">Dev</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              The world’s premier developer learning platform. Crafted for engineers who value precision, elegance, and deep mastery.
            </p>
            <div className="pt-2">
              <label htmlFor="newsletter" className="block text-xs font-semibold text-gray-700 mb-2">
                Join 100,000+ developers receiving weekly architectural deep-dives
              </label>
              <div className="flex gap-2 max-w-sm">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="name@workemail.com"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-black/[0.08] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                />
                <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-900 hover:bg-black text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><Link href="/courses" className="hover:text-blue-600 transition-colors">Interactive Courses</Link></li>
              <li><Link href="/roadmaps" className="hover:text-blue-600 transition-colors">Developer Roadmaps</Link></li>
              <li><Link href="/playground" className="hover:text-blue-600 transition-colors">Monaco IDE Sandbox</Link></li>
              <li><Link href="/exercises" className="hover:text-blue-600 transition-colors">Coding Exercises</Link></li>
              <li><Link href="/ai-tutor" className="hover:text-blue-600 transition-colors">AI Learning Suite</Link></li>
              <li><Link href="/references" className="hover:text-blue-600 transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Gamification</h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><Link href="/gamification" className="hover:text-blue-600 transition-colors">Global Leaderboard</Link></li>
              <li><Link href="/gamification" className="hover:text-blue-600 transition-colors">Skill Tree Nodes</Link></li>
              <li><Link href="/gamification" className="hover:text-blue-600 transition-colors">Achievements & Badges</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-600 transition-colors">Activity Heatmap</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-600 transition-colors">Focus Mode Timer</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Enterprise</h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><Link href="/certificates/cert-84920" className="hover:text-blue-600 transition-colors flex items-center gap-1">Certificate Verification <ArrowUpRight className="w-3 h-3 text-gray-400" /></Link></li>
              <li><Link href="/admin" className="hover:text-blue-600 transition-colors">Platform Admin Console</Link></li>
              <li><Link href="/community" className="hover:text-blue-600 transition-colors">Community Forum</Link></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-1">System Architecture <ArrowUpRight className="w-3 h-3 text-gray-400" /></a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ZeroToDev Inc. Built for ambitious developers.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>All Systems Operational • 99.99% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
