import React, { useState, useEffect } from 'react';
import { Search, Camera, ShieldAlert, Car, UserCheck, MapPin, X } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onSelectAction }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { type: 'Camera', icon: Camera, title: 'BOP-14 Punjab Gate 3', subtitle: 'Live CCTV Stream · 4K Infrared', tag: 'Online' },
    { type: 'Camera', icon: Camera, title: 'CHK-07 Rajasthan Hwy 15', subtitle: 'Highway Checkpost Camera', tag: 'Online' },
    { type: 'Alert', icon: ShieldAlert, title: 'ALT-8901: Watchlist FRS Match', subtitle: 'Confidence 94.1% at CHK-11 Creek', tag: 'Critical' },
    { type: 'ANPR', icon: Car, title: 'Vehicle MH12 AB 1234', subtitle: 'White Mahindra Thar (Hotlisted)', tag: 'Warning' },
    { type: 'FRS', icon: UserCheck, title: 'Watchlist Target #8821', subtitle: 'Cross-border Person of Interest', tag: 'High Risk' },
    { type: 'Sector', icon: MapPin, title: 'BOP-22 Jammu Riverine Belt', subtitle: 'Border Outpost Sector B', tag: 'Active' },
  ];

  const filtered = items.filter(
    item => item.title.toLowerCase().includes(query.toLowerCase()) || 
            item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 border-b border-slate-100 py-3">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Search cameras, alerts, vehicle plates, BOP sectors... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
          />
          <button onClick={() => onClose(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              No results found for "<span className="text-slate-600">{query}</span>"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectAction(item);
                    onClose(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-navy-50 text-navy-700 group-hover:bg-navy-700 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800 group-hover:text-navy-700">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.subtitle}</div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    item.tag === 'Critical' ? 'bg-rose-100 text-rose-700' :
                    item.tag === 'Warning' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.tag}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="bg-slate-50 px-4 py-2 text-xs text-slate-400 flex justify-between items-center border-t border-slate-100">
          <span>Tip: Use ↑ ↓ to navigate, Enter to select</span>
          <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">⌘K</span>
        </div>
      </div>
    </div>
  );
}
