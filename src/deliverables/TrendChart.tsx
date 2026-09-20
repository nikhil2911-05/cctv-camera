import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export function TrendChart({ data }: { data: Record<string, Array<{ time: string; Intrusion: number; ANPR: number }>> }) {
  const [range, setRange] = useState('24H');
  const chartData = data[range] || data['24H'];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-900">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Detection Trend</h2>
            <p className="text-[11px] text-slate-400">Temporal distribution of events</p>
          </div>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
          {['1H', '24H', '7D', '30D'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-lg text-[11px] ${range === r ? 'bg-white text-blue-900 font-semibold shadow-sm' : 'text-slate-500'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-56 flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="navyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.30}/>
                <stop offset="95%" stopColor="#D97706" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip />
            <Area type="monotone" dataKey="Intrusion" stroke="#1E3A8A" strokeWidth={2.5} fillOpacity={1} fill="url(#navyGradient)" />
            <Area type="monotone" dataKey="ANPR" stroke="#D97706" strokeWidth={2} fillOpacity={1} fill="url(#amberGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
