import React from 'react';
import { Activity } from 'lucide-react';

export interface StreamEvent {
  id: string;
  type: string;
  title: string;
  location: string;
  time: string;
  confidence: string;
  thumbnail: string;
  severity: string;
}

export function ActivityStream({ events }: { events: StreamEvent[] }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-[#ECECEE]">
      <div className="flex items-center space-x-2 mb-3">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-900">
          <Activity className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-semibold text-slate-900">Activity Stream</h2>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2">
        {events.map((evt) => (
          <div key={evt.id} className="shrink-0 w-64 bg-white rounded-xl border border-slate-200 p-3 flex space-x-3">
            <img src={evt.thumbnail} alt={evt.title} className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1 truncate">
              <div className="text-[10px] font-bold text-blue-900">{evt.type} · {evt.time}</div>
              <div className="text-xs font-semibold text-slate-800 truncate">{evt.title}</div>
              <div className="text-[10px] text-slate-400 truncate">{evt.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
