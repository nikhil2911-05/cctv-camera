import React, { useState } from 'react';
import { Shield, Search, Bell, Activity, CheckCircle2, ChevronDown, User, Settings } from 'lucide-react';

export default function TopNav({ activeTab, setActiveTab, setActiveNav, onOpenCmd, onOpenSettings }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleOpenPersonalDetails = () => {
    if (setActiveTab) setActiveTab('dashboard');
    if (setActiveNav) setActiveNav('personnel');
  };

  return (
    <header className="sticky top-0 z-40 h-14 bg-white/80 backdrop-blur-md border-b border-[#ECECEE] px-4 flex items-center justify-between shadow-soft">
      {/* Left Branding */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-navy-700 to-navy-500 flex items-center justify-center text-white shadow-md shadow-navy-700/20">
          <Shield className="w-4 h-4" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="font-semibold text-slate-900 tracking-tight text-base" title="Intelligent Border Video Analytics Platform">IBVAP</span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-navy-50 text-navy-700 border border-navy-100 uppercase tracking-wide">
            v2.0
          </span>
        </div>
      </div>

      {/* Center Search Command Bar */}
      <button 
        onClick={() => onOpenCmd(true)}
        className="hidden md:flex items-center space-x-3 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-1.5 w-80 text-xs text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-navy-700/10"
      >
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span className="flex-1 text-left text-slate-500">Search cameras, alerts, plates...</span>
        <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-mono text-slate-400">
          ⌘K
        </kbd>
      </button>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* View Segmented Toggle */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium space-x-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'dashboard'
                ? 'bg-white text-navy-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'mobile'
                ? 'bg-white text-navy-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Field Mobile App
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'architecture'
                ? 'bg-white text-navy-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Architecture
          </button>
        </div>

        {/* Live status pill */}
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tabular-nums">128 cams online</span>
        </div>

        {/* Settings Key Option Button */}
        <button
          onClick={() => onOpenSettings && onOpenSettings(true)}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-navy-700 hover:bg-slate-50 transition-colors"
          title="Settings & API Key Options"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-800">Priority Notifications</span>
                <span className="text-[10px] bg-rose-50 text-rose-600 font-medium px-2 py-0.5 rounded-full">
                  3 Unread
                </span>
              </div>
              <div className="py-2 space-y-2 max-h-64 overflow-y-auto">
                <div className="p-2 rounded-xl bg-rose-50/50 border border-rose-100 text-xs">
                  <div className="font-medium text-rose-900">Watchlist Match at CHK-11</div>
                  <div className="text-slate-500 text-[11px]">2 mins ago · Target #8821 matched</div>
                </div>
                <div className="p-2 rounded-xl bg-amber-50/50 border border-amber-100 text-xs">
                  <div className="font-medium text-amber-900">ANPR Flag: MH12 AB 1234</div>
                  <div className="text-slate-500 text-[11px]">8 mins ago · CHK-07 Rajasthan</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="font-medium text-slate-800">Perimeter Sensor Calibrated</div>
                  <div className="text-slate-500 text-[11px]">24 mins ago · BOP-14 Punjab</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User VS Avatar -> Click opens Personal Details */}
        <div 
          onClick={handleOpenPersonalDetails}
          className="flex items-center space-x-2 pl-1 cursor-pointer hover:opacity-80 transition-opacity"
          title="Click to view Capt. V. Sharma's Personal Details & Officer Dossier"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-navy-700 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-navy-700/20 shadow-sm hover:ring-navy-700 transition-all">
              VS
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-800 leading-none">Capt. V. Sharma</div>
            <div className="text-[10px] text-slate-400 leading-tight">Duty Officer · BSF HQ</div>
          </div>
        </div>
      </div>
    </header>
  );
}
