import React, { useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, Activity, ExternalLink } from 'lucide-react';
import { MOCK_ACTIVITY_STREAM } from '../../data/mockData';

export default function ActivityStream() {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 border border-[#ECECEE]">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-navy-50 text-navy-700">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Recent Detection Stream</h2>
            <p className="text-[11px] text-slate-400">Horizontal Event Timeline Carousel</p>
          </div>
        </div>

        {/* Navigation Arrow Controls */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleScroll('left')}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex space-x-3 overflow-x-auto scroll-smooth pb-2 pt-1 no-scrollbar snap-x"
        style={{ scrollbarWidth: 'none' }}
      >
        {MOCK_ACTIVITY_STREAM.map((item) => {
          const isCritical = item.severity === 'critical';
          const isWarning = item.severity === 'warning';

          return (
            <div
              key={item.id}
              className="snap-start shrink-0 w-64 bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md hover:border-navy-300 transition-all duration-200 flex space-x-3 group cursor-pointer"
            >
              {/* Event Crop Thumbnail */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className={`absolute top-0.5 right-0.5 w-2 h-2 rounded-full ${
                  isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isCritical ? 'bg-rose-100 text-rose-700' : isWarning ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                </div>

                <h4 className="text-xs font-semibold text-slate-800 truncate mt-1 group-hover:text-navy-700 transition-colors">
                  {item.title}
                </h4>

                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {item.location}
                </p>

                <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                  <span>Conf: {item.confidence}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover:text-navy-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
