import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export interface SectorNode {
  id: string;
  name: string;
  code: string;
  alerts: number;
  cams: number;
  status: string;
  x: number;
  y: number;
}

export function SectorHeatmap({ sectors }: { sectors: SectorNode[] }) {
  const [selected, setSelected] = useState(sectors[0]);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-900">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Sector Heatmap</h2>
            <p className="text-[11px] text-slate-400">Pulsing Radar Density</p>
          </div>
        </div>
      </div>

      <div className="relative flex-1 bg-slate-950 rounded-xl overflow-hidden min-h-[200px] border border-slate-800 p-3">
        {sectors.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s)}
            className="absolute group z-20"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <span className="absolute -inset-2 rounded-full opacity-75 animate-ping bg-rose-500" />
            <span className="relative flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold text-white bg-rose-600">
              {s.alerts}
            </span>
          </button>
        ))}

        <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl text-xs text-white bg-slate-900/90 backdrop-blur-md border border-slate-700">
          <div className="font-semibold">{selected?.name} ({selected?.code})</div>
          <div className="text-[10px] text-slate-400">{selected?.cams} CCTVs · {selected?.alerts} active events</div>
        </div>
      </div>
    </div>
  );
}
