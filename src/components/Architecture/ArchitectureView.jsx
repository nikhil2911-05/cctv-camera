import React, { useState } from 'react';
import { Copy, Check, GitBranch, Layers, ShieldCheck, Database, Cpu, Radio, Sparkles, FileCode } from 'lucide-react';
import { MOCK_MERMAID_SYNTAX } from '../../data/mockData';

export default function ArchitectureView() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'mermaid'

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_MERMAID_SYNTAX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const layers = [
    {
      num: 'LAYER 1',
      title: 'EDGE SURVEILLANCE & INGESTION',
      color: 'border-blue-200 bg-blue-50/50',
      nodes: ['Existing CCTV (RTSP/ONVIF)', 'Edge AI Nodes (Jetson Orin Nano / Hailo-8)', 'Protocol Adapters']
    },
    {
      num: 'LAYER 2',
      title: 'TRANSPORT & FABRIC',
      color: 'border-slate-200 bg-slate-50/50',
      nodes: ['4G/5G Private Mesh', 'VSAT Satellite', 'Fiber Backbone', 'gRPC / Protobuf Streams']
    },
    {
      num: 'LAYER 3',
      title: 'STREAM INGESTION & BUS',
      color: 'border-purple-200 bg-purple-50/50',
      nodes: ['Stream Ingest (GStreamer/MediaMTX)', 'Frame Sampler (1-5 FPS)', 'Apache Kafka / Redpanda Bus']
    },
    {
      num: 'LAYER 4',
      title: 'AI INFERENCE ENGINE (CORE)',
      color: 'border-emerald-200 bg-emerald-50/50',
      nodes: ['NVIDIA Triton Server / KServe', 'FRS (SCRFD + ArcFace)', 'ANPR (YOLOv8 + PaddleOCR)', 'Intrusion (ByteTrack)', 'Milvus Vector Search (kNN)']
    },
    {
      num: 'LAYER 5',
      title: 'EVENT & ALERT CORRELATION',
      color: 'border-amber-200 bg-amber-50/50',
      nodes: ['Apache Flink Engine', 'Priority Alert Scorer ML', 'WebSocket / FCM Router']
    },
    {
      num: 'LAYER 6',
      title: 'STORAGE & DATA LAKE',
      color: 'border-slate-300 bg-slate-100/50',
      nodes: ['MinIO / S3 Object Store', 'PostgreSQL + TimescaleDB', 'Redis Hot Watchlist', 'OpenSearch Logs']
    },
    {
      num: 'LAYER 7',
      title: 'CONSUMPTION & INTERFACES',
      color: 'border-navy-200 bg-navy-50/50',
      nodes: ['Next.js 15 Web Dashboard', 'Field Officer Mobile App (Expo)', 'BSF Command OpenAPI']
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Header */}
      <div className="glass-panel rounded-2xl p-5 border border-[#ECECEE] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-navy-700 text-white shadow-md">
              <GitBranch className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Architecture & Pipeline</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Modern, enterprise-grade border AI surveillance topology built on microservices, NVIDIA Triton inference, Kafka event bus, and Milvus vector search over existing CCTV infrastructure.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'visual' ? 'bg-white text-navy-700 font-semibold shadow-sm' : 'text-slate-500'
              }`}
            >
              Visual Layers
            </button>
            <button
              onClick={() => setActiveTab('mermaid')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'mermaid' ? 'bg-white text-navy-700 font-semibold shadow-sm' : 'text-slate-500'
              }`}
            >
              Mermaid Syntax
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-navy-700 text-white text-xs font-semibold hover:bg-navy-600 transition-colors shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Code!' : 'Copy Mermaid'}</span>
          </button>
        </div>
      </div>

      {/* Visual Swimlane Diagram View */}
      {activeTab === 'visual' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {layers.map((layer, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 border ${layer.color} transition-all duration-200 hover:shadow-md relative`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white uppercase">
                      {layer.num}
                    </span>
                    <span className="text-xs font-bold text-slate-800 tracking-wide">{layer.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Low Latency Pipeline</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {layer.nodes.map((node, i) => (
                    <div
                      key={i}
                      className="bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-800 flex items-center space-x-2 hover:border-navy-400 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-navy-500" />
                      <span>{node}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Cutting Sidebar Panel */}
          <div className="glass-panel rounded-2xl p-4 border border-rose-200 bg-rose-50/20">
            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-rose-600" />
              Cross-Cutting Security, Observability & Governance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold block text-slate-900">Security & Keycloak:</span>
                RBAC/ABAC, mTLS between services, Vault secrets management, AES-256 at rest.
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold block text-slate-900">Observability:</span>
                OpenTelemetry collectors → Grafana metrics + Loki logs + Tempo distributed traces.
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold block text-slate-900">Governance & Audit:</span>
                Append-only audit trail for all alert acknowledgements, PII facial masking for non-targets.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mermaid Code Display View */
        <div className="glass-panel rounded-2xl p-5 border border-slate-200 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto relative">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
            <span className="flex items-center">
              <FileCode className="w-4 h-4 mr-1.5 text-emerald-400" />
              Mermaid v2 Syntax (Ready to paste into mermaid.live or documentation)
            </span>
            <span>graph TB</span>
          </div>
          <pre className="text-slate-200 leading-relaxed whitespace-pre-wrap">{MOCK_MERMAID_SYNTAX}</pre>
        </div>
      )}

      {/* Data Flow Narrative Panel */}
      <div className="glass-panel rounded-2xl p-5 border border-[#ECECEE] bg-white">
        <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
          <Sparkles className="w-4 h-4 mr-1.5 text-navy-700" />
          Data Flow Narrative: End-to-End Watchlist Match Path
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          1. <strong>RTSP Ingestion:</strong> Existing IP cameras at <em>CHK-11 Gujarat Creek Post</em> stream sub-streams to the GStreamer frame sampler at 5 FPS.<br />
          2. <strong>Event Bus:</strong> Sampled frames are published as Protobuf messages to Kafka topic <code>border-cctv-frames</code>.<br />
          3. <strong>Triton GPU Worker:</strong> Triton Inference Server executes face detection (SCRFD) & embedding extraction (ArcFace) on an NVIDIA L4 GPU pool in 8ms.<br />
          4. <strong>Milvus Vector kNN:</strong> Extracted 512-d embeddings are queried against 100,000+ watchlist vectors in Milvus. Match returned with 94.1% confidence.<br />
          5. <strong>Flink Rule Engine:</strong> Flink scores priority, updates TimescaleDB event log, and dispatches real-time WebSocket signals to the Web Dashboard and FCM push notifications to nearby Field Officers in &lt; 50ms.
        </p>
      </div>
    </div>
  );
}
