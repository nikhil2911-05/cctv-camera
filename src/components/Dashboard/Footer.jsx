import React from 'react';
import { CheckCircle2, Server, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-[#ECECEE] py-4 px-4 bg-white/60 backdrop-blur-md text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Left */}
      <div className="flex items-center space-x-2">
        <span className="font-medium text-slate-700">© 2025 IBVAP – Intelligent Border Video Analytics Platform</span>
        <span className="text-slate-300">·</span>
        <span className="text-slate-400 font-mono text-[11px]">v2.0 (Build 2025.09)</span>
      </div>

      {/* Center: System Status Pills */}
      <div className="flex items-center space-x-2">
        {['Ingest', 'AI Engine', 'Alerts', 'API'].map((system) => (
          <div
            key={system}
            className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{system}</span>
          </div>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
        <span className="flex items-center">
          <Server className="w-3 h-3 mr-1 text-slate-400" />
          Latency p95: <span className="text-emerald-600 font-semibold ml-1">14ms</span>
        </span>
        <span className="text-slate-300">·</span>
        <span className="flex items-center">
          <Globe className="w-3 h-3 mr-1 text-slate-400" />
          Region: <span className="text-slate-600 font-semibold ml-1">ap-south-1 (Punjab Edge)</span>
        </span>
      </div>
    </footer>
  );
}
