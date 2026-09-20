import React from 'react';
import { Camera } from 'lucide-react';

export interface BopHealth {
  bop: string;
  total: number;
  online: number;
  maintenance: number;
  uptime: number;
}

export function CameraHealth({ items }: { items: BopHealth[] }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-900">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Camera Health</h2>
            <p className="text-[11px] text-slate-400">RTSP Availability</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 flex flex-col justify-around">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-xs font-semibold text-slate-800">{item.bop}</div>
              <div className="text-[10px] text-slate-400">{item.online} / {item.total} online</div>
            </div>
            <div className="text-xs font-bold text-emerald-600">{item.uptime}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
