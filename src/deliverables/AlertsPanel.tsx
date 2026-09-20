import React, { useState } from 'react';
import { ShieldAlert, RefreshCw, AlertOctagon, CheckCircle2 } from 'lucide-react';

export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  subtitle: string;
  bop: string;
  time: string;
  type: string;
  image?: string | null;
}

export function AlertsPanel({ alerts }: { alerts: AlertItem[] }) {
  const [filter, setFilter] = useState('All');
  const [ack, setAck] = useState<Record<string, boolean>>({});

  const filtered = alerts.filter(a => filter === 'All' || a.type === filter);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Priority Alerts</h2>
            <p className="text-[11px] text-slate-400">Real-time Rule & AI Stream</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-500">
          <RefreshCw className="w-3 h-3 animate-spin text-blue-900" />
          <span>5s Auto-refresh</span>
        </div>
      </div>

      <div className="flex items-center space-x-1 mb-3 bg-slate-100 p-1 rounded-xl text-xs font-medium">
        {['All', 'FRS', 'Intrusion', 'ANPR'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`flex-1 py-1 rounded-lg text-[11px] ${filter === t ? 'bg-white text-blue-900 font-semibold shadow-sm' : 'text-slate-500'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2 overflow-y-auto max-h-[380px]">
        {filtered.map((alert) => (
          <div key={alert.id} className="relative rounded-xl bg-white border border-slate-200 p-3 overflow-hidden">
            <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${alert.severity === 'critical' ? 'bg-rose-600' : 'bg-amber-500'}`} />
            <div className="pl-2 flex justify-between items-start">
              <div>
                <div className="text-xs font-semibold text-slate-900">{alert.title}</div>
                <div className="text-[11px] text-slate-500">{alert.subtitle}</div>
                <div className="text-[10px] text-slate-400 mt-1">{alert.bop} · {alert.time}</div>
              </div>
              <button
                onClick={() => setAck(prev => ({ ...prev, [alert.id]: true }))}
                className="px-2 py-1 rounded text-[10px] font-semibold bg-blue-50 text-blue-900"
              >
                {ack[alert.id] ? 'ACK' : 'ACKNOWLEDGE'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
