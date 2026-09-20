import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Layers } from 'lucide-react';
import { MOCK_TREND_DATA } from '../../data/mockData';

export default function TrendChart() {
  const [timeRange, setTimeRange] = useState('24H');
  const data = MOCK_TREND_DATA[timeRange] || MOCK_TREND_DATA['24H'];

  // Custom Glass Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-xl shadow-xl text-xs border border-slate-200">
          <div className="font-semibold text-slate-800 mb-1 border-b border-slate-100 pb-1">
            Time: {label}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4 text-navy-700">
              <span className="flex items-center font-medium">
                <span className="w-2 h-2 rounded-full bg-navy-700 mr-1.5" />
                Intrusions:
              </span>
              <span className="font-bold tabular-nums">{payload[0]?.value}</span>
            </div>
            <div className="flex items-center justify-between space-x-4 text-amber-600">
              <span className="flex items-center font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
                ANPR Scans:
              </span>
              <span className="font-bold tabular-nums">{payload[1]?.value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-navy-50 text-navy-700">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Detection Trend Analysis</h2>
            <p className="text-[11px] text-slate-400">Temporal distribution of Security Events</p>
          </div>
        </div>

        {/* Time-range Segmented Control */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
          {['1H', '24H', '7D', '30D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                timeRange === range
                  ? 'bg-white text-navy-700 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Chart Container */}
      <div className="w-full h-56 flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <XAxis 
              dataKey="time" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 11 }} 
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 11 }} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="Intrusion" 
              stroke="#1E3A8A" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#navyGradient)" 
            />
            <Area 
              type="monotone" 
              dataKey="ANPR" 
              stroke="#D97706" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#amberGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend at bottom */}
      <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-navy-700 inline-block" />
          <span>Perimeter Intrusion</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
          <span>ANPR Vehicle Scans</span>
        </div>
      </div>
    </div>
  );
}
