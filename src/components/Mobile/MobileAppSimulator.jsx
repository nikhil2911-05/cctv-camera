import React, { useState } from 'react';
import { 
  Bell, 
  Tv, 
  MapPin, 
  FileText, 
  User, 
  Plus, 
  ShieldAlert, 
  Check, 
  ChevronLeft, 
  Share2, 
  PhoneCall, 
  Upload, 
  WifiOff,
  Clock,
  Car,
  UserCheck,
  Maximize2,
  ChevronUp,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export default function MobileAppSimulator() {
  const [activeMobileTab, setActiveMobileTab] = useState('alerts');
  const [activeSegment, setActiveSegment] = useState('All');
  const [bottomSheetSnap, setBottomSheetSnap] = useState('collapsed'); // 'collapsed' | 'half' | 'full'
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportStep, setReportStep] = useState(1);
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [alertsList, setAlertsList] = useState([
    {
      id: 'm1',
      type: 'FRS',
      title: 'Watchlist Match',
      confidence: '94%',
      bop: 'CHK-11 Gujarat',
      time: '2 min ago',
      severity: 'critical',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      ack: false
    },
    {
      id: 'm2',
      type: 'Intrusion',
      title: 'Perimeter Sensor 14B',
      confidence: '96%',
      bop: 'BOP-14 Punjab',
      time: '5 min ago',
      severity: 'warning',
      isMap: true,
      ack: false
    },
    {
      id: 'm3',
      type: 'ANPR',
      title: 'MH12 AB 1234',
      confidence: '98%',
      bop: 'CHK-07 Rajasthan',
      time: '12 min ago',
      severity: 'warning',
      isPlate: true,
      ack: false
    }
  ]);

  const handleAckMobile = (id) => {
    setAlertsList(prev => prev.map(a => a.id === id ? { ...a, ack: true } : a));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[850px] p-4 bg-slate-100/60 rounded-3xl border border-slate-200 my-4">
      {/* Simulation Header Notice */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-navy-50 text-navy-700 text-xs font-semibold rounded-full border border-navy-200">
          <span>Field Officer Companion App (Mobile View)</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Simulated on iPhone 15 Pro (393 × 852 px)</p>
      </div>

      {/* iPhone 15 Pro Chassis Frame */}
      <div className="relative w-[393px] h-[852px] bg-slate-950 rounded-[52px] p-3 shadow-2xl ring-1 ring-slate-800 flex flex-col justify-between overflow-hidden select-none">
        
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-32 h-7 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-white truncate">AI: 3 alerts</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-navy-500/80 border border-white/20" />
        </div>

        {/* Screen Content Window */}
        <div className="w-full h-full bg-[#FAFAFA] rounded-[42px] overflow-hidden flex flex-col relative pt-9 pb-16">
          
          {/* SCREEN 1: ALERTS FEED */}
          {activeMobileTab === 'alerts' && (
            <div className="flex-1 flex flex-col p-4 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mt-2 mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Alerts</h1>
                  <p className="text-xs font-medium text-slate-400">BOP-14 · Punjab Sector</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600">
                  <Bell className="w-4 h-4" />
                </div>
              </div>

              {/* Segmented Filter */}
              <div className="flex space-x-1 bg-slate-200/80 p-1 rounded-full mb-4 text-xs font-medium">
                {['All', 'Intrusion', 'ANPR', 'FRS'].map(seg => (
                  <button
                    key={seg}
                    onClick={() => setActiveSegment(seg)}
                    className={`flex-1 py-1.5 rounded-full text-[11px] transition-all ${
                      activeSegment === seg ? 'bg-white text-navy-700 font-semibold shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {seg}
                  </button>
                ))}
              </div>

              {/* Alert Cards */}
              <div className="space-y-3 flex-1">
                {alertsList
                  .filter(a => activeSegment === 'All' || a.type === activeSegment)
                  .map(alert => (
                    <div 
                      key={alert.id}
                      className={`bg-white rounded-2xl p-3.5 shadow-sm border transition-all ${
                        alert.ack ? 'opacity-60 border-slate-200' : 'border-slate-200/80 hover:border-navy-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {alert.image ? (
                            <img src={alert.image} alt="Crop" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                          ) : alert.isMap ? (
                            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center relative overflow-hidden">
                              <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
                              <MapPin className="w-5 h-5 text-white absolute" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 font-mono font-bold text-xs flex items-center justify-center border border-amber-200">
                              MH12
                            </div>
                          )}

                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-slate-900">{alert.title}</span>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                                {alert.confidence}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{alert.bop} · {alert.time}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Swipe left to dismiss</span>
                        <button
                          onClick={() => handleAckMobile(alert.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            alert.ack 
                              ? 'bg-slate-100 text-slate-400' 
                              : 'bg-gradient-to-r from-navy-700 to-navy-600 text-white shadow-md shadow-navy-700/20'
                          }`}
                        >
                          {alert.ack ? 'ACKNOWLEDGED' : 'ACKNOWLEDGE'}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Floating FAB */}
              <button
                onClick={() => setReportModalOpen(true)}
                className="absolute bottom-20 right-5 w-12 h-12 rounded-full bg-gradient-to-r from-navy-700 to-indigo-600 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-30"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* SCREEN 2: LIVE CAMERA (FULL-BLEED STREAM & VAUL BOTTOM SHEET) */}
          {activeMobileTab === 'live' && (
            <div className="flex-1 relative bg-black flex flex-col justify-between">
              {/* Stream Video Background */}
              <img 
                src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80" 
                alt="Full stream" 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />

              {/* Top Scrim Bar */}
              <div className="relative z-10 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white">
                <button onClick={() => setActiveMobileTab('alerts')} className="p-1.5 rounded-full bg-black/40 backdrop-blur-md">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium flex items-center space-x-1.5 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>BOP-14 Cam 03</span>
                </div>
                <div className="text-xs font-mono">5G · 1080p</div>
              </div>

              {/* AI Animated Corner Bounding Box */}
              <div className="absolute top-1/3 left-1/4 w-36 h-40 border-2 border-rose-500 bg-rose-500/10 rounded-lg animate-corner-pulse z-10">
                <div className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded -top-5 left-0 absolute">
                  Intruder (96.4%)
                </div>
              </div>

              {/* Vaul Bottom Sheet Simulation */}
              <div className={`relative z-20 bg-white/95 backdrop-blur-xl rounded-t-3xl border-t border-slate-200/80 p-4 transition-all duration-300 ${
                bottomSheetSnap === 'collapsed' ? 'h-24' : bottomSheetSnap === 'half' ? 'h-64' : 'h-full'
              }`}>
                {/* Drag Handle */}
                <button 
                  onClick={() => setBottomSheetSnap(bottomSheetSnap === 'collapsed' ? 'half' : bottomSheetSnap === 'half' ? 'full' : 'collapsed')}
                  className="w-full flex justify-center py-1 mb-2"
                >
                  <div className="w-10 h-1 bg-slate-300 rounded-full" />
                </button>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">BOP-14 Punjab Gate 3</h3>
                    <p className="text-xs text-slate-400">Infrared Perimeter Camera · Live Sync</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                    ALERT ACTIVE
                  </span>
                </div>

                {bottomSheetSnap !== 'collapsed' && (
                  <div className="mt-4 space-y-3 border-t border-slate-100 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">GPS Coords:</span>
                      <span className="font-mono text-slate-700">31.6340° N, 74.8723° E</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Stream Codec:</span>
                      <span className="font-mono text-slate-700">H.265 / 24 FPS</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button 
                        onClick={() => alert("Alert dispatched to BSF HQ Command Center.")}
                        className="py-2.5 rounded-xl bg-navy-700 text-white text-xs font-semibold flex items-center justify-center space-x-1"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Send to HQ</span>
                      </button>
                      <button 
                        onClick={() => alert("Calling nearest backup team...")}
                        className="py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold flex items-center justify-center space-x-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call Backup</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 3: MAP VIEW */}
          {activeMobileTab === 'map' && (
            <div className="flex-1 relative bg-slate-900 overflow-hidden flex flex-col justify-end">
              {/* Map Canvas Background */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />
              
              {/* Simulated Pins */}
              <div className="absolute top-1/3 left-1/3 p-2 bg-navy-700 text-white rounded-full shadow-lg text-xs font-bold animate-bounce">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="absolute top-1/2 right-1/4 p-2 bg-rose-600 text-white rounded-full shadow-lg text-xs font-bold animate-pulse">
                <ShieldAlert className="w-5 h-5" />
              </div>

              {/* Bottom Glass Sheet */}
              <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-t-3xl p-4 border-t border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-2">Nearby Border Outposts</h3>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-slate-800">BOP-14 Punjab</div>
                      <div className="text-slate-400">0.8 km away · 42 Cameras</div>
                    </div>
                    <span className="text-emerald-600 font-bold">Online</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-slate-800">CHK-07 Rajasthan</div>
                      <div className="text-slate-400">4.2 km away · 38 Cameras</div>
                    </div>
                    <span className="text-amber-600 font-bold">1 Alert</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: REPORTS LIST */}
          {activeMobileTab === 'reports' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h1 className="text-2xl font-bold text-slate-900 mb-3">Incident Reports</h1>
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">REP-2025-089</div>
                      <div className="text-xs text-slate-400 mt-0.5">Unidentified Vehicle Loitering</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                      SYNCED
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">Filed by Inspector S. Singh · Today 10:14 AM</div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 5: PROFILE & DUTY STATUS */}
          {activeMobileTab === 'profile' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {/* Profile Card */}
              <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-navy-700 text-white font-bold text-lg flex items-center justify-center">
                  SS
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Insp. S. Singh</h2>
                  <p className="text-xs text-slate-400">Field Commander · Punjab Sector</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    ON DUTY
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-lg font-bold text-navy-700">28</div>
                  <div className="text-[10px] text-slate-400">Alerts Handled</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-lg font-bold text-navy-700">6</div>
                  <div className="text-[10px] text-slate-400">Reports Filed</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-lg font-bold text-emerald-600">1.4m</div>
                  <div className="text-[10px] text-slate-400">Avg Response</div>
                </div>
              </div>

              {/* End Shift Button */}
              <button 
                onClick={() => setIsOnDuty(!isOnDuty)}
                className="w-full py-3 rounded-2xl bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                {isOnDuty ? 'End Shift' : 'Start Shift'}
              </button>
            </div>
          )}

          {/* INCIDENT REPORT MULTI-STEP MODAL */}
          {reportModalOpen && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end">
              <div className="w-full bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[90%] overflow-y-auto animate-in slide-in-from-bottom">
                
                {/* Step Indicators */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">New Incident Report</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3].map(st => (
                      <span key={st} className={`w-2 h-2 rounded-full ${reportStep === st ? 'bg-navy-700' : 'bg-slate-200'}`} />
                    ))}
                  </div>
                </div>

                {/* Step 1: Media Drop Zone */}
                {reportStep === 1 && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Step 1: Attach photo or video evidence</p>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-semibold text-slate-700">Tap to upload snapshot</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Auto-filled Fields */}
                {reportStep === 2 && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Step 2: Auto-detected telemetry</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono">
                        GPS: 31.6340° N
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono">
                        CAM: BOP-14-03
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 3: Type & Submit */}
                {reportStep === 3 && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Step 3: Notes & Severity</p>
                    <textarea 
                      placeholder="Enter field notes..."
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:ring-2 focus:ring-navy-700 focus:outline-none"
                    />
                    <div className="flex items-center space-x-2 text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200">
                      <WifiOff className="w-4 h-4 shrink-0" />
                      <span>No connection · Will auto-sync when online</span>
                    </div>
                  </div>
                )}

                {/* Modal Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <button 
                    onClick={() => {
                      if (reportStep > 1) setReportStep(reportStep - 1);
                      else setReportModalOpen(false);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold"
                  >
                    {reportStep === 1 ? 'Cancel' : 'Back'}
                  </button>
                  <button 
                    onClick={() => {
                      if (reportStep < 3) setReportStep(reportStep + 1);
                      else {
                        alert("Incident report queued locally for sync.");
                        setReportModalOpen(false);
                        setReportStep(1);
                      }
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-navy-700 text-white text-xs font-semibold"
                  >
                    {reportStep === 3 ? 'Submit Report' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FLOATING GLASS BOTTOM NAV (5 TABS) */}
          <div className="absolute bottom-2 left-3 right-3 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl py-2 px-3 shadow-lg flex items-center justify-around z-40">
            {[
              { id: 'alerts', label: 'Alerts', icon: ShieldAlert },
              { id: 'live', label: 'Live', icon: Tv },
              { id: 'map', label: 'Map', icon: MapPin },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'profile', label: 'Profile', icon: User },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeMobileTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMobileTab(tab.id)}
                  className={`flex flex-col items-center justify-center space-y-0.5 transition-all ${
                    isActive ? 'text-navy-700 scale-110' : 'text-slate-400'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${isActive ? 'bg-navy-50' : ''}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
