import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Tv, 
  ShieldAlert, 
  UserCheck, 
  Car, 
  MapPin, 
  Camera, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Smartphone,
  GitBranch,
  Video,
  User,
  Activity
} from 'lucide-react';

export default function LeftRail({ activeNav, setActiveNav, activeTab, setActiveTab, onOpenSettings }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const mainItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Grid', icon: Tv },
    { id: 'motion', label: 'Motion Detection', icon: Activity },
    { id: 'cctv', label: 'Connect CCTV', icon: Video },
    { id: 'personnel', label: 'Personal Details', icon: User },
    { id: 'alerts', label: 'Priority Alerts', icon: ShieldAlert },
    { id: 'frs', label: 'FRS Watchlist', icon: UserCheck },
    { id: 'anpr', label: 'ANPR Vehicles', icon: Car },
    { id: 'zones', label: 'Border Heatmap', icon: MapPin },
    { id: 'cameras', label: 'Camera Health', icon: Camera },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const viewModes = [
    { id: 'mobile', label: 'Field Mobile App', icon: Smartphone },
    { id: 'architecture', label: 'System Architecture', icon: GitBranch }
  ];

  return (
    <aside 
      className={`sticky top-14 h-[calc(100vh-3.5rem)] bg-white/90 backdrop-blur-md border-r border-[#ECECEE] transition-all duration-300 z-30 flex flex-col justify-between py-4 ${
        isCollapsed ? 'w-16 items-center px-2' : 'w-56 px-3'
      }`}
    >
      {/* Top Main Navigation Items */}
      <div className="space-y-1 w-full">
        {mainItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === 'dashboard' && activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab('dashboard');
                setActiveNav(item.id);
              }}
              className={`group relative flex items-center w-full rounded-xl p-2.5 transition-all duration-200 ${
                isActive 
                  ? 'bg-navy-700 text-white shadow-md shadow-navy-700/20 font-medium' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 text-xs font-medium truncate">{item.label}</span>
              )}

              {/* Tooltip on Collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}

        <div className="my-3 border-t border-slate-200/60 mx-1" />

        {/* Deliverables / App View Switchers */}
        <div className="space-y-1 w-full">
          {viewModes.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center w-full rounded-xl p-2.5 transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-navy-700 to-navy-600 text-white shadow-md font-medium' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 text-xs font-medium truncate">{item.label}</span>
                )}

                {/* Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-1 w-full">
        <button
          onClick={() => onOpenSettings && onOpenSettings(true)}
          className="group relative flex items-center w-full rounded-xl p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="ml-3 text-xs font-medium">Settings & API Keys</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-50 shadow-lg">
              Settings & API Keys
            </div>
          )}
        </button>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full rounded-xl p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
