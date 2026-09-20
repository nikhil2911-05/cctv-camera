import React, { useState } from 'react';
import { MapPin, Shield, Radio, Activity, AlertCircle } from 'lucide-react';
import { MOCK_SECTORS } from '../../data/mockData';

export default function SectorHeatmap() {
  const [selectedSector, setSelectedSector] = useState(MOCK_SECTORS[0]);

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-navy-50 text-navy-700">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Border Sector Heatmap</h2>
            <p className="text-[11px] text-slate-400">BSF Command Outposts & Density</p>
          </div>
        </div>

        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-navy-50 text-navy-700">
          Western Border
        </span>
      </div>

      {/* Map Interactive Canvas Container */}
      <div className="relative flex-1 bg-slate-950/95 rounded-xl overflow-hidden min-h-[200px] border border-slate-800 p-3">
        {/* Subtle grid lines background */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Simplified India Western Border Vector Silhouette Path SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 stroke-slate-500 fill-slate-800/40">
          <path d="M 30,10 L 40,20 L 35,35 L 25,50 L 20,70 L 15,85 L 30,90 M 25,50 L 50,55 M 35,35 L 60,30" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>

        {/* Radar Rotating Scan Beam Simulation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-navy-500/20 pointer-events-none animate-radar opacity-40">
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-navy-500/30 to-transparent origin-bottom-right rounded-tl-full" />
        </div>

        {/* Pulsing Dots per Sector */}
        {MOCK_SECTORS.map((sector) => {
          const isSelected = selectedSector.id === sector.id;
          const isHigh = sector.status === 'high_alert';
          const isWarn = sector.status === 'warning';

          return (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector)}
              className="absolute group z-20 transition-all hover:scale-125"
              style={{ left: `${sector.x}%`, top: `${sector.y}%` }}
            >
              {/* Outer Pulsing Wave Ring */}
              <span className={`absolute -inset-2 rounded-full opacity-75 animate-ping ${
                isHigh ? 'bg-rose-500' : isWarn ? 'bg-amber-500' : 'bg-emerald-500'
              }`} />

              {/* Core Pin Dot */}
              <span className={`relative flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold text-white shadow-lg ${
                isHigh ? 'bg-rose-600' : isWarn ? 'bg-amber-600' : 'bg-emerald-600'
              } ${isSelected ? 'ring-4 ring-white shadow-glow-navy' : ''}`}>
                {sector.alerts}
              </span>

              {/* Label Hover Tooltip */}
              <div className="absolute left-6 top-0 bg-slate-900 text-white text-[10px] font-semibold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
                {sector.name} ({sector.alerts} alerts)
              </div>
            </button>
          );
        })}

        {/* Selected Sector Quick Stats Overlay */}
        <div className="absolute bottom-2 left-2 right-2 glass-pill p-2 rounded-xl text-xs text-white bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
          <div>
            <div className="font-semibold text-slate-100 flex items-center space-x-1.5">
              <span>{selectedSector.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">({selectedSector.code})</span>
            </div>
            <div className="text-[10px] text-slate-400">
              {selectedSector.cams} CCTVs · {selectedSector.alerts} active events
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            selectedSector.status === 'high_alert' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
            selectedSector.status === 'warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }`}>
            {selectedSector.status.toUpperCase().replace('_', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
}
