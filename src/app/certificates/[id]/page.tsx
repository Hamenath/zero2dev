"use client";

import { useParams } from "next/navigation";
import { Award, ShieldCheck, Download, Share2, CheckCircle2, Code2 } from "lucide-react";

export default function CertificateVerificationPage() {
  const params = useParams();
  const certId = (params?.id as string) || "CERT-84920-HTML5";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      {/* Top Verification Status Badge */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Verified Authentic Certificate • ZeroToDev Official Record</span>
        </div>
        <span className="font-mono text-[10px] text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-200">
          ID: {certId}
        </span>
      </div>

      {/* Printable Certificate Frame */}
      <div className="premium-card p-12 md:p-16 border-4 border-double border-blue-600/30 bg-white shadow-2xl relative overflow-hidden space-y-10 text-center">
        {/* Corner Watermarks */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />

        {/* Header Logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Code2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            ZeroTo<span className="text-blue-600">Dev</span>
          </span>
        </div>

        {/* Certificate Text */}
        <div className="space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase">
            Certificate of Completion
          </span>
          <p className="text-xs text-gray-500 font-medium">This is proudly awarded to</p>
          <h1 className="text-4xl font-extrabold text-gray-900 font-serif tracking-tight">
            Alex Rivera
          </h1>
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
            for successfully mastering the advanced architectural curriculum and completing all interactive code challenges for
          </p>
          <h2 className="text-2xl font-extrabold text-blue-600">
            HTML5 & Modern Web Semantics
          </h2>
        </div>

        {/* Signatures & Verification Stamp */}
        <div className="pt-12 border-t border-black/[0.08] flex items-center justify-between gap-6 text-xs text-gray-600">
          <div className="text-left space-y-1">
            <p className="font-bold text-gray-900 font-mono">2026-08-06</p>
            <p className="text-[10px] text-gray-400">Date Issued</p>
          </div>

          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center font-bold text-[9px] text-blue-700 tracking-wider uppercase shadow-inner">
            VERIFIED
          </div>

          <div className="text-right space-y-1">
            <p className="font-bold text-gray-900">Dr. Sarah Jenkins</p>
            <p className="text-[10px] text-gray-400">Lead Curriculum Architect</p>
          </div>
        </div>
      </div>

      {/* Share / Download Actions */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
        >
          <Download className="w-4 h-4" /> Download PDF / Print
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Certificate URL copied!");
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-gray-50 border border-black/[0.08] text-gray-800 font-bold text-xs"
        >
          <Share2 className="w-4 h-4" /> Share Verification Link
        </button>
      </div>
    </div>
  );
}
