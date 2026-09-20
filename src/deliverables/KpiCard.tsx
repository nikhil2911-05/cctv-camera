import React, { useState, useEffect } from 'react';
import { Camera, ShieldAlert, UserCheck, Car, ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

export interface KpiData {
  id: string;
  title: string;
  value: number;
  total?: number;
  unit: string;
  delta: string;
  isPositive: boolean;
  icon: 'Camera' | 'ShieldAlert' | 'UserCheck' | 'Car';
  sparkline: number[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Camera,
  ShieldAlert,
  UserCheck,
  Car
};

export function KpiCard({ data }: { data: KpiData }) {
  const [count, setCount] = useState(0);
  const IconComponent = ICON_MAP[data.icon] || Camera;

  useEffect(() => {
    let start = 0;
    const end = data.value;
    const duration = 1000;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

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

  const renderSparkline = (points: number[]) => {
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
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 border border-[#ECECEE]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {data.title}
          </span>
        </div>
        <div className={`flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
          data.isPositive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {data.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>{data.delta}</span>
        </div>
      </div>

      <div className="my-2 flex items-baseline justify-between">
        <div>
          <span className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
            {count.toLocaleString()}
          </span>
          {data.total && (
            <span className="text-xs font-medium text-slate-400 ml-1.5">
              / {data.total} {data.unit}
            </span>
          )}
        </div>
        <div>{renderSparkline(data.sparkline)}</div>
      </div>

      <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2">
        <span>vs previous 24h</span>
        <span className="font-mono text-[10px]">Live 1-sec sync</span>
      </div>
    </div>
  );
}
