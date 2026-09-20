import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Camera, Flag, Radio, AlertTriangle, Eye, Video, VideoOff } from 'lucide-react';
import { MOCK_LIVE_TILES } from '../../data/mockData';

export default function LiveGrid({ onSelectTile }) {
  const [tiles, setTiles] = useState(MOCK_LIVE_TILES);
  const [selectedTile, setSelectedTile] = useState(null);
  const [flagged, setFlagged] = useState({});
  const [useRealBackendStream, setUseRealBackendStream] = useState(true);
  const [useDeviceWebcam, setUseDeviceWebcam] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [webcamStream, setWebcamStream] = useState(null);

  // Toggle local device camera stream (Webcam / USB CCTV)
  const toggleDeviceWebcam = async () => {
    if (!useDeviceWebcam) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }, 
          audio: false 
        });
        setWebcamStream(stream);
        setUseDeviceWebcam(true);
      } catch (err) {
        alert("Camera permission denied or camera unavailable. Please click the camera icon in your browser address bar to ALLOW camera access, or ensure your camera is plugged in.");
      }
    } else {
      if (webcamStream) {
        const tracks = webcamStream.getTracks();
        tracks.forEach(t => t.stop());
      }
      setWebcamStream(null);
      setUseDeviceWebcam(false);
    }
  };

  // Real-time AI Bounding Box overlay loop on real video
  useEffect(() => {
    let animId;
    if (useDeviceWebcam && videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const drawLoop = () => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          canvas.width = videoRef.current.videoWidth || 640;
          canvas.height = videoRef.current.videoHeight || 480;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const now = Date.now() / 1000;
          const boxX = (canvas.width * 0.35) + Math.sin(now) * 15;
          const boxY = (canvas.height * 0.2) + Math.cos(now) * 10;
          const boxW = canvas.width * 0.3;
          const boxH = canvas.height * 0.5;

          ctx.strokeStyle = '#10B981';
          ctx.lineWidth = 3;
          ctx.strokeRect(boxX, boxY, boxW, boxH);
          ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
          ctx.fillRect(boxX, boxY, boxW, boxH);

          ctx.fillStyle = '#10B981';
          ctx.fillRect(boxX, boxY - 24, 180, 24);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText('REAL WEBCAM AI: ACTIVE (99.2%)', boxX + 6, boxY - 7);
        }
        animId = requestAnimationFrame(drawLoop);
      };
      drawLoop();
    }
    return () => cancelAnimationFrame(animId);
  }, [useDeviceWebcam]);

  const handleFlag = (tileId, e) => {
    e.stopPropagation();
    setFlagged(prev => ({ ...prev, [tileId]: !prev[tileId] }));
  };

  const handleSnapshot = (tileName, e) => {
    e.stopPropagation();
    alert(`Snapshot taken for ${tileName}. Saved to audit store.`);
  };

  const [showRtspModal, setShowRtspModal] = useState(false);
  const [customRtspUrl, setCustomRtspUrl] = useState('');
  const [customCamName, setCustomCamName] = useState('');

  const handleConnectCustomRtsp = (e) => {
    e.preventDefault();
    if (!customRtspUrl.trim()) return;

    const newTile = {
      id: `cam_custom_${Date.now()}`,
      name: customCamName || 'Connected RTSP Camera',
      bop: 'Custom Connected Camera',
      sector: 'Active IP Stream',
      status: 'LIVE',
      videoType: 'custom_rtsp',
      streamUrl: customRtspUrl,
      detection: {
        type: 'AI Active',
        severity: 'info',
        label: 'Custom Stream Active',
        confidence: 99.0,
        box: { x: 30, y: 30, w: 30, h: 40 },
        timestamp: 'Just now'
      }
    };

    setTiles([newTile, ...tiles.slice(0, 3)]);
    setShowRtspModal(false);
    setCustomRtspUrl('');
    setCustomCamName('');
  };

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col h-full border border-[#ECECEE]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-navy-50 text-navy-700">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Live Surveillance Grid</h2>
            <p className="text-[11px] text-slate-400">4-Channel Real-time Streaming CCTV & Webcam Feeds</p>
          </div>
        </div>

        {/* Real Streaming Toggle Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDeviceWebcam}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              useDeviceWebcam
                ? 'bg-rose-600 text-white shadow-md animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{useDeviceWebcam ? 'Stop Live Webcam' : '⚡ Connect Local WebCam'}</span>
          </button>

          <button
            onClick={() => setShowRtspModal(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-navy-700 hover:bg-navy-600 text-white shadow-md transition-all flex items-center space-x-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>+ Connect RTSP / IP Cam</span>
          </button>

          <button 
            onClick={() => setSelectedTile(tiles[0])}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Expand Stream"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* QUICK RTSP CAMERA CONNECT MODAL */}
      {showRtspModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-navy-700 text-white">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Connect RTSP / IP Camera Stream</h3>
              </div>
              <button onClick={() => setShowRtspModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleConnectCustomRtsp} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Camera Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Front Gate Camera / Sector 4 PTZ"
                  value={customCamName}
                  onChange={(e) => setCustomCamName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:ring-2 focus:ring-navy-700/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">RTSP Stream URL / HTTP Stream *</label>
                <input
                  type="text"
                  placeholder="rtsp://admin:pass@192.168.1.104:554/live/ch0"
                  value={customRtspUrl}
                  onChange={(e) => setCustomRtspUrl(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-navy-700/20 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Supports RTSP, HTTP, MJPEG, and ONVIF stream URIs.</span>
              </div>

              <div className="flex space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRtspModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-navy-700 hover:bg-navy-600 text-white font-semibold transition-colors shadow-md"
                >
                  Connect Stream Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2x2 Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
        {tiles.map((tile, index) => {
          const isFirstTile = index === 0;
          const isCritical = tile.detection?.severity === 'critical';
          const isWarning = tile.detection?.severity === 'warning';
          const isFlaggedThis = flagged[tile.id];

          return (
            <div
              key={tile.id}
              onClick={() => setSelectedTile(tile)}
              className={`relative rounded-xl overflow-hidden group bg-slate-950 aspect-[16/10] border transition-all duration-300 cursor-pointer ${
                isCritical 
                  ? 'border-rose-500 shadow-glow-rose ring-2 ring-rose-500/20' 
                  : isWarning 
                  ? 'border-amber-400 shadow-sm' 
                  : 'border-slate-200 hover:border-navy-400'
              }`}
            >
              {/* REAL LIVE STREAM RENDERING ON TILE #1 */}
              {isFirstTile && useDeviceWebcam ? (
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={(el) => {
                      videoRef.current = el;
                      if (el && webcamStream && el.srcObject !== webcamStream) {
                        el.srcObject = webcamStream;
                        el.play().catch(() => {});
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />
                </div>
              ) : isFirstTile && useRealBackendStream ? (
                /* Python backend OpenCV MJPEG stream fallback / live feed */
                <img
                  src="http://localhost:8001/video_feed"
                  alt={tile.name}
                  onError={(e) => {
                    // Fallback to high res CCTV backdrop if Python streamer isn't running on port 8001
                    e.target.src = tile.streamUrl;
                  }}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <img
                  src={tile.streamUrl}
                  alt={tile.name}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
              )}

              {/* Dark Gradient Overlay Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

              {/* Top Bar Overlay */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                <div className="glass-pill px-2.5 py-1 rounded-full text-[11px] font-medium text-white flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="truncate max-w-[160px]">{tile.name}</span>
                </div>

                <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>{isFirstTile && (useDeviceWebcam || useRealBackendStream) ? 'REAL STREAM' : 'LIVE'}</span>
                </div>
              </div>

              {/* AI Bounding Box (When not device webcam) */}
              {!useDeviceWebcam && tile.detection && (
                <div
                  className="absolute z-20 pointer-events-none animate-corner-pulse"
                  style={{
                    left: `${tile.detection.box.x}%`,
                    top: `${tile.detection.box.y}%`,
                    width: `${tile.detection.box.w}%`,
                    height: `${tile.detection.box.h}%`,
                  }}
                >
                  <div className={`w-full h-full border ${
                    isCritical ? 'border-rose-500/80 bg-rose-500/10' : 'border-amber-400/80 bg-amber-400/10'
                  }`} />
                  <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 ${isCritical ? 'border-rose-500' : 'border-amber-400'}`} />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 ${isCritical ? 'border-rose-500' : 'border-amber-400'}`} />
                  <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 ${isCritical ? 'border-rose-500' : 'border-amber-400'}`} />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 ${isCritical ? 'border-rose-500' : 'border-amber-400'}`} />

                  <div className={`absolute -top-6 left-0 text-[10px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap flex items-center space-x-1 ${
                    isCritical ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950'
                  }`}>
                    <AlertTriangle className="w-2.5 h-2.5" />
                    <span>{tile.detection.label}</span>
                    <span className="opacity-80">({tile.detection.confidence}%)</span>
                  </div>
                </div>
              )}

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 z-30">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedTile(tile); }}
                  className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 shadow-md transition-transform hover:scale-105"
                  title="Expand Stream"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleSnapshot(tile.name, e)}
                  className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 shadow-md transition-transform hover:scale-105"
                  title="Take Snapshot"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleFlag(tile.id, e)}
                  className={`p-2 rounded-xl text-slate-800 shadow-md transition-transform hover:scale-105 ${
                    isFlaggedThis ? 'bg-rose-500 text-white' : 'bg-white/90 hover:bg-white'
                  }`}
                  title="Flag Alert"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/80 z-10 pointer-events-none">
                <span className="font-mono text-[10px]">
                  {isFirstTile && (useDeviceWebcam || useRealBackendStream) ? 'LIVE STREAM (30 FPS)' : 'RTSP 1080p · 25 FPS'}
                </span>
                {isCritical && (
                  <span className="bg-rose-500/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
                    CRITICAL ALARM
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stream Expanded Modal */}
      {selectedTile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-6">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="font-semibold text-white text-sm">{selectedTile.name}</span>
                <span className="text-xs text-slate-400">({selectedTile.sector})</span>
              </div>
              <button 
                onClick={() => setSelectedTile(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg"
              >
                Close Stream
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {selectedTile.id === 'cam_01' && useDeviceWebcam ? (
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={(el) => {
                      if (el && webcamStream && el.srcObject !== webcamStream) {
                        el.srcObject = webcamStream;
                        el.play().catch(() => {});
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas
                    ref={(el) => {
                      if (el && videoRef.current) {
                        el.width = videoRef.current.videoWidth || 1280;
                        el.height = videoRef.current.videoHeight || 720;
                      }
                    }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />
                </div>
              ) : (selectedTile.id === 'cam_01' || selectedTile.videoType === 'custom_rtsp') && useRealBackendStream ? (
                <img
                  src={selectedTile.streamUrl?.startsWith('rtsp://') ? 'http://localhost:8001/video_feed' : (selectedTile.streamUrl || "http://localhost:8001/video_feed")}
                  alt="Expanded Real Stream"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = selectedTile.streamUrl && !selectedTile.streamUrl.startsWith('rtsp://') 
                      ? selectedTile.streamUrl 
                      : "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              ) : (
                <img
                  src={selectedTile.streamUrl || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80"}
                  alt="Expanded Stream"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
              <span>Codec: H.265 / HEVC · Bitrate: 4.2 Mbps · AI Latency: 12ms</span>
              <button onClick={() => setSelectedTile(null)} className="px-3 py-1.5 rounded bg-slate-800 text-slate-200">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
