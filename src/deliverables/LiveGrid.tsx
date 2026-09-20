import React, { useState } from 'react';
import { Maximize2, Camera, Flag, Radio, AlertTriangle, Eye } from 'lucide-react';

export interface VideoTile {
  id: string;
  name: string;
  bop: string;
  sector: string;
  status: 'LIVE';
  streamUrl: string;
  detection?: {
    type: string;
    severity: 'critical' | 'warning' | 'info';
    label: string;
    confidence: number;
    box: { x: number; y: number; w: number; h: number };
    timestamp: string;
  } | null;
}

export function LiveGrid({ tiles }: { tiles: VideoTile[] }) {
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-900">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Live Surveillance Grid</h2>
            <p className="text-[11px] text-slate-400">4-Channel Synchronized RTSP Sub-streams</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
        {tiles.map((tile) => {
          const isCritical = tile.detection?.severity === 'critical';
          const isWarning = tile.detection?.severity === 'warning';

          return (
            <div
              key={tile.id}
              className={`relative rounded-xl overflow-hidden group bg-slate-950 aspect-[16/10] border transition-all duration-300 ${
                isCritical ? 'border-rose-500 ring-2 ring-rose-500/20' : isWarning ? 'border-amber-400' : 'border-slate-200'
              }`}
            >
              <img src={tile.streamUrl} alt={tile.name} className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                <div className="bg-white/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-900 shadow-sm flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="truncate">{tile.name}</span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold">
                  LIVE
                </div>
              </div>

              {tile.detection && (
                <div
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: `${tile.detection.box.x}%`,
                    top: `${tile.detection.box.y}%`,
                    width: `${tile.detection.box.w}%`,
                    height: `${tile.detection.box.h}%`,
                  }}
                >
                  <div className={`w-full h-full border ${isCritical ? 'border-rose-500 bg-rose-500/10' : 'border-amber-400 bg-amber-400/10'}`} />
                  <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 ${isCritical ? 'border-rose-500' : 'border-amber-400'}`} />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 ${isCritical ? 'border-rose-500' : 'border-amber-400'}`} />
                  <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 ${isCritical ? 'border-rose-500' : 'border-amber-400'}`} />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 ${isCritical ? 'border-rose-500' : 'border-amber-400'}`} />

                  <div className={`absolute -top-6 left-0 text-[10px] font-semibold px-2 py-0.5 rounded ${isCritical ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950'}`}>
                    {tile.detection.label} ({tile.detection.confidence}%)
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
