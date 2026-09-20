import React, { useState } from 'react';
import TopNav from './components/Navigation/TopNav';
import LeftRail from './components/Navigation/LeftRail';
import CommandPalette from './components/Navigation/CommandPalette';
import SettingsModal from './components/Navigation/SettingsModal';
import KpiCard from './components/Dashboard/KpiCard';
import LiveGrid from './components/Dashboard/LiveGrid';
import AlertsPanel from './components/Dashboard/AlertsPanel';
import TrendChart from './components/Dashboard/TrendChart';
import SectorHeatmap from './components/Dashboard/SectorHeatmap';
import CameraHealth from './components/Dashboard/CameraHealth';
import ActivityStream from './components/Dashboard/ActivityStream';
import Footer from './components/Dashboard/Footer';
import VehicleSearchSection from './components/Dashboard/VehicleSearchSection';
import ConnectCctvSection from './components/Dashboard/ConnectCctvSection';
import PersonalDetailsSection from './components/Dashboard/PersonalDetailsSection';
import FaceRecognitionSection from './components/Dashboard/FaceRecognitionSection';
import MotionDetectionSection from './components/Dashboard/MotionDetectionSection';
import MobileAppSimulator from './components/Mobile/MobileAppSimulator';
import ArchitectureView from './components/Architecture/ArchitectureView';
import { MOCK_KPIS } from './data/mockData';
import { ShieldCheck, UserCheck, Radio, MapPin, Camera, BarChart3 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'mobile' | 'architecture'
  const [activeNav, setActiveNav] = useState('dashboard'); // 'dashboard' | 'live' | 'motion' | 'cctv' | 'personnel' | 'alerts' | 'frs' | 'anpr' | 'zones' | 'cameras' | 'analytics'
  const [cmdOpen, setCmdOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleCommandSelect = (item) => {
    if (item.type === 'Camera') setActiveNav('live');
    else if (item.type === 'Alert') setActiveNav('alerts');
    else if (item.type === 'FRS') setActiveNav('frs');
    else if (item.type === 'ANPR') setActiveNav('anpr');
    else if (item.type === 'Sector') setActiveNav('zones');
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] bg-grain text-slate-900">
      {/* Sticky Top Navigation */}
      <TopNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setActiveNav={setActiveNav}
        onOpenCmd={setCmdOpen} 
        onOpenSettings={setSettingsOpen}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 relative">
        {/* Left Icon Rail */}
        <LeftRail 
          activeNav={activeNav} 
          setActiveNav={setActiveNav}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSettings={setSettingsOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden max-w-[1600px] mx-auto w-full">
          
          {/* TAB MODE 1: DESKTOP DASHBOARD SECTIONS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              
              {/* INDEX 1: FULL BENTO DASHBOARD OVERVIEW */}
              {activeNav === 'dashboard' && (
                <>
                  {/* Row 1: 4 KPI Mini-cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MOCK_KPIS.map((kpi) => (
                      <KpiCard key={kpi.id} data={kpi} />
                    ))}
                  </div>

                  {/* Row 2: Hero Zone */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[440px]">
                    <div className="lg:col-span-8 h-full">
                      <LiveGrid />
                    </div>
                    <div className="lg:col-span-4 h-full">
                      <AlertsPanel />
                    </div>
                  </div>

                  {/* Row 3: Analytics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch min-h-[320px]">
                    <div className="lg:col-span-5 h-full">
                      <TrendChart />
                    </div>
                    <div className="lg:col-span-4 h-full">
                      <SectorHeatmap />
                    </div>
                    <div className="lg:col-span-3 md:col-span-2 h-full">
                      <CameraHealth />
                    </div>
                  </div>

                  {/* Row 4: Activity Stream */}
                  <div className="w-full">
                    <ActivityStream />
                  </div>
                </>
              )}

              {/* INDEX 2: DEDICATED LIVE SURVEILLANCE GRID SECTION */}
              {activeNav === 'live' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-navy-700 text-white">
                      <Radio className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Live Video Surveillance Grid</h1>
                      <p className="text-xs text-slate-500">Dedicated 4-Channel Synchronized RTSP Sub-stream Monitoring</p>
                    </div>
                  </div>
                  <div className="h-[600px]">
                    <LiveGrid />
                  </div>
                </div>
              )}

              {/* INDEX 3: DEDICATED MOTION DETECTION ENGINE SECTION */}
              {activeNav === 'motion' && (
                <MotionDetectionSection />
              )}

              {/* INDEX 4: DEDICATED CONNECT CCTV CAMERA SECTION */}
              {activeNav === 'cctv' && (
                <ConnectCctvSection />
              )}

              {/* INDEX 5: DEDICATED PERSONAL DETAILS & BIOMETRIC INTELLIGENCE SECTION */}
              {activeNav === 'personnel' && (
                <PersonalDetailsSection />
              )}

              {/* INDEX 6: DEDICATED PRIORITY ALERTS SECTION */}
              {activeNav === 'alerts' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-rose-600 text-white">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Priority Alerts & Alarm Center</h1>
                      <p className="text-xs text-slate-500">Real-time Rule & AI Classifier Stream Log</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 h-[520px]">
                      <AlertsPanel />
                    </div>
                    <div className="space-y-3">
                      <div className="glass-panel p-4 rounded-2xl border border-slate-200">
                        <h3 className="font-bold text-sm text-slate-800 mb-2">Alert Rules Summary</h3>
                        <p className="text-xs text-slate-500">Active rules evaluating 128 streams at 5 FPS:</p>
                        <ul className="text-xs space-y-1.5 mt-2 text-slate-700">
                          <li>• FRS Watchlist Similarity &gt; 85%</li>
                          <li>• Thermal Perimeter Motion &gt; 3s</li>
                          <li>• ANPR Hotlisted License Plates</li>
                          <li>• Night Vision Loitering Detection</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* INDEX 7: DEDICATED FRS FACIAL RECOGNITION ENGINE SECTION */}
              {activeNav === 'frs' && (
                <FaceRecognitionSection />
              )}

              {/* INDEX 8: DEDICATED ANPR VEHICLE LICENSE PLATE SEARCH SECTION */}
              {activeNav === 'anpr' && (
                <VehicleSearchSection />
              )}

              {/* INDEX 9: DEDICATED SECTOR HEATMAP SECTION */}
              {activeNav === 'zones' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-navy-700 text-white">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Border Sector Radar Heatmap</h1>
                      <p className="text-xs text-slate-500">BSF Command Outpost Density & Threat Distribution</p>
                    </div>
                  </div>
                  <div className="h-[520px]">
                    <SectorHeatmap />
                  </div>
                </div>
              )}

              {/* INDEX 10: DEDICATED CAMERA HEALTH SECTION */}
              {activeNav === 'cameras' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Camera Health & RTSP Availability</h1>
                      <p className="text-xs text-slate-500">Real-time Ping, Codec, Bitrate & Maintenance Telemetry</p>
                    </div>
                  </div>
                  <div className="h-[480px]">
                    <CameraHealth />
                  </div>
                </div>
              )}

              {/* INDEX 11: DEDICATED ANALYTICS SECTION */}
              {activeNav === 'analytics' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-navy-700 text-white">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Temporal Detection Trend Analytics</h1>
                      <p className="text-xs text-slate-500">Comparative Analysis of Intrusion vs ANPR Scans over Time</p>
                    </div>
                  </div>
                  <div className="h-[480px]">
                    <TrendChart />
                  </div>
                </div>
              )}

              {/* Minimal Footer */}
              <Footer />
            </div>
          )}

          {/* TAB MODE 2: FIELD OFFICER COMPANION MOBILE APP PREVIEW */}
          {activeTab === 'mobile' && (
            <MobileAppSimulator />
          )}

          {/* TAB MODE 3: BACKEND SYSTEM ARCHITECTURE & MERMAID DIAGRAM */}
          {activeTab === 'architecture' && (
            <ArchitectureView />
          )}
        </main>
      </div>

      {/* Global Command Palette Modal (⌘K) */}
      <CommandPalette 
        isOpen={cmdOpen} 
        onClose={setCmdOpen} 
        onSelectAction={handleCommandSelect}
      />

      {/* Global Settings & API Key Configuration Modal */}
      <SettingsModal 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
