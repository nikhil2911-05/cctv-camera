import React, { useState, useEffect } from 'react';
import { Camera, ShieldAlert, UserCheck, Car, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ICON_MAP = {
  Camera: Camera,
  ShieldAlert: ShieldAlert,
  UserCheck: UserCheck,
  Car: Car
};

export default function KpiCard({ data }) {
  const [count, setCount] = useState(0);
  const IconComponent = ICON_MAP[data.icon] || Camera;

  // Simple smooth numeric count-up animation
  useEffect(() => {
    let start = 0;
    const end = data.value;
    const duration = 1200; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [data.value]);

  // Mini sparkline SVG generator
  const renderSparkline = (points) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const width = 120;
    const height = 24;
    const range = max - min || 1;

    const pathD = points.map((pt, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((pt - min) / range) * (height - 4) - 2;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathD}
          fill="none"
          stroke={data.isPositive ? '#059669' : '#E11D48'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5 border border-[#ECECEE]">
      {/* Top Row: Icon & Delta Pill */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {data.title}
          </span>
        </div>

        {/* Delta Chip */}
        <div className={`flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
          data.isPositive 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {data.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>{data.delta}</span>
        </div>
      </div>

      {/* Middle Row: Big Tabular Metric */}
      <div className="my-2 flex items-baseline justify-between">
        <div>
          <span className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums font-sans">
            {count.toLocaleString()}
          </span>
          {data.total && (
            <span className="text-xs font-medium text-slate-400 ml-1.5">
              / {data.total} {data.unit}
            </span>
          )}
        </div>

        {/* Sparkline at bottom right */}
        <div className="opacity-80 group-hover:opacity-100 transition-opacity">
          {renderSparkline(data.sparkline)}
        </div>
      </div>

      {/* Bottom Subtext */}
      <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100/80 pt-2">
        <span>vs previous 24h</span>
        <span className="font-mono text-[10px] text-slate-400">Live 1-sec sync</span>
      </div>
    </div>
  );
}
