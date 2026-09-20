import React from 'react';
import { Camera, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { MOCK_CAMERA_HEALTH } from '../../data/mockData';

export default function CameraHealth() {
  const renderCircularProgress = (percentage, colorClass, strokeHex) => {
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke={strokeHex}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-[11px] font-bold text-slate-800 tabular-nums">
          {percentage}%
        </span>
      </div>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-navy-50 text-navy-700">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Camera Health</h2>
            <p className="text-[11px] text-slate-400">RTSP Stream Availability</p>
          </div>
        </div>

        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          95.6% Total
        </span>
      </div>

      {/* Circular Progress Rings per BOP */}
      <div className="flex-1 space-y-3 flex flex-col justify-around">
        {MOCK_CAMERA_HEALTH.map((item, index) => {
          const isHigh = item.uptime >= 96;
          const isMid = item.uptime >= 94 && item.uptime < 96;
          const strokeColor = isHigh ? '#059669' : isMid ? '#3B5BC0' : '#D97706';

          return (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-100/80 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {renderCircularProgress(item.uptime, '', strokeColor)}
                <div>
                  <div className="text-xs font-semibold text-slate-800">{item.bop}</div>
                  <div className="text-[10px] text-slate-400">
                    {item.online} / {item.total} online · {item.maintenance} maint.
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isHigh ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-100 text-navy-700'
                }`}>
                  Optimal
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span>128 Online · 6 Maintenance</span>
        <span className="font-mono text-slate-500">PING &lt; 15ms</span>
      </div>
    </div>
  );
}
