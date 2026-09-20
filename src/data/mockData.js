export const MOCK_KPIS = [
  {
    id: 'active_cameras',
    title: 'ACTIVE CAMERAS',
    value: 128,
    total: 134,
    unit: 'online',
    delta: '+3.2%',
    isPositive: true,
    icon: 'Camera',
    sparkline: [118, 120, 122, 124, 125, 127, 128]
  },
  {
    id: 'alerts_today',
    title: 'ALERTS TODAY',
    value: 42,
    unit: 'events',
    delta: '-12.5%',
    isPositive: true,
    icon: 'ShieldAlert',
    sparkline: [58, 62, 51, 48, 44, 45, 42]
  },
  {
    id: 'frs_matches',
    title: 'FRS WATCHLIST MATCHES',
    value: 14,
    unit: 'verified',
    delta: '+18.0%',
    isPositive: false,
    icon: 'UserCheck',
    sparkline: [8, 9, 11, 10, 12, 13, 14]
  },
  {
    id: 'vehicles_scanned',
    title: 'VEHICLES SCANNED (ANPR)',
    value: 1892,
    unit: 'scanned',
    delta: '+5.4%',
    isPositive: true,
    icon: 'Car',
    sparkline: [1420, 1550, 1680, 1720, 1810, 1840, 1892]
  }
];

export const MOCK_LIVE_TILES = [
  {
    id: 'cam_01',
    name: 'BOP-14 Punjab · Gate 3',
    bop: 'BOP-14 Punjab',
    sector: 'Punjab Sector',
    status: 'LIVE',
    videoType: 'border_fence',
    streamUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    detection: {
      type: 'Intrusion Alert',
      severity: 'critical',
      label: 'Unauthorized Perimeter Movement',
      confidence: 96.4,
      box: { x: 22, y: 35, w: 28, h: 42 },
      timestamp: 'Just now'
    }
  },
  {
    id: 'cam_02',
    name: 'CHK-07 Rajasthan · Hwy 15',
    bop: 'CHK-07 Rajasthan',
    sector: 'Rajasthan Sector',
    status: 'LIVE',
    videoType: 'highway_checkpost',
    streamUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    detection: {
      type: 'ANPR Flag',
      severity: 'warning',
      label: 'MH12 AB 1234 (Hotlisted SUV)',
      confidence: 98.2,
      box: { x: 45, y: 48, w: 32, h: 30 },
      timestamp: '2 min ago'
    }
  },
  {
    id: 'cam_03',
    name: 'BOP-22 Jammu · Riverine Belt',
    bop: 'BOP-22 Jammu',
    sector: 'Jammu Sector',
    status: 'LIVE',
    videoType: 'riverine',
    streamUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    detection: null
  },
  {
    id: 'cam_04',
    name: 'CHK-11 Gujarat · Creek Post',
    bop: 'CHK-11 Gujarat',
    sector: 'Gujarat Sector',
    status: 'LIVE',
    videoType: 'coastal',
    streamUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    detection: {
      type: 'FRS Match',
      severity: 'critical',
      label: 'Watchlist #8821 Match',
      confidence: 94.1,
      box: { x: 58, y: 25, w: 22, h: 35 },
      timestamp: '5 min ago'
    }
  }
];

export const MOCK_ALERTS = [
  {
    id: 'ALT-8901',
    severity: 'critical', // red
    title: 'Watchlist FRS Match (High Confidence)',
    subtitle: 'Target #8821 matched with 94.1% confidence at CHK-11 Creek Post',
    bop: 'CHK-11 Gujarat',
    time: '2 mins ago',
    type: 'FRS',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    isNew: true
  },
  {
    id: 'ALT-8900',
    severity: 'critical', // red
    title: 'Perimeter Intrusion Detected',
    subtitle: 'Infrared motion threshold breached near Smart Fence Sensor 14B',
    bop: 'BOP-14 Punjab',
    time: '4 mins ago',
    type: 'Intrusion',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=150&q=80',
    isNew: false
  },
  {
    id: 'ALT-8899',
    severity: 'warning', // amber
    title: 'Flagged ANPR Vehicle Match',
    subtitle: 'White Mahindra Thar (MH12 AB 1234) detected heading West',
    bop: 'CHK-07 Rajasthan',
    time: '8 mins ago',
    type: 'ANPR',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=150&q=80',
    isNew: false
  },
  {
    id: 'ALT-8898',
    severity: 'warning', // amber
    title: 'Camera Loitering / Thermal Anomaly',
    subtitle: 'Static object detected near BSF Outpost 22 Riverbed for > 8 mins',
    bop: 'BOP-22 Jammu',
    time: '14 mins ago',
    type: 'Thermal',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
    isNew: false
  },
  {
    id: 'ALT-8897',
    severity: 'info', // green/blue
    title: 'Scheduled Patrol Verified',
    subtitle: 'BSF Patrol Team Delta-4 cleared Checkpoint 09',
    bop: 'BOP-14 Punjab',
    time: '22 mins ago',
    type: 'Patrol',
    image: null,
    isNew: false
  }
];

export const MOCK_TREND_DATA = {
  '1H': [
    { time: '11:00', Intrusion: 2, ANPR: 12 },
    { time: '11:15', Intrusion: 4, ANPR: 18 },
    { time: '11:30', Intrusion: 1, ANPR: 25 },
    { time: '11:45', Intrusion: 7, ANPR: 22 },
    { time: '12:00', Intrusion: 5, ANPR: 29 },
  ],
  '24H': [
    { time: '00:00', Intrusion: 4, ANPR: 45 },
    { time: '04:00', Intrusion: 9, ANPR: 20 },
    { time: '08:00', Intrusion: 3, ANPR: 110 },
    { time: '12:00', Intrusion: 8, ANPR: 185 },
    { time: '16:00', Intrusion: 6, ANPR: 140 },
    { time: '20:00', Intrusion: 12, ANPR: 95 },
  ],
  '7D': [
    { time: 'Mon', Intrusion: 34, ANPR: 820 },
    { time: 'Tue', Intrusion: 28, ANPR: 910 },
    { time: 'Wed', Intrusion: 42, ANPR: 870 },
    { time: 'Thu', Intrusion: 19, ANPR: 940 },
    { time: 'Fri', Intrusion: 51, ANPR: 1050 },
    { time: 'Sat', Intrusion: 39, ANPR: 1120 },
    { time: 'Sun', Intrusion: 45, ANPR: 980 },
  ],
  '30D': [
    { time: 'Week 1', Intrusion: 180, ANPR: 5400 },
    { time: 'Week 2', Intrusion: 210, ANPR: 5900 },
    { time: 'Week 3', Intrusion: 165, ANPR: 6200 },
    { time: 'Week 4', Intrusion: 240, ANPR: 6800 },
  ]
};

export const MOCK_SECTORS = [
  { id: 'punjab', name: 'Punjab Sector', code: 'BOP-14', alerts: 18, cams: 42, status: 'high_alert', x: 28, y: 25 },
  { id: 'rajasthan', name: 'Rajasthan Sector', code: 'CHK-07', alerts: 12, cams: 38, status: 'warning', x: 22, y: 48 },
  { id: 'jammu', name: 'Jammu & Kashmir', code: 'BOP-22', alerts: 8, cams: 30, status: 'normal', x: 32, y: 15 },
  { id: 'gujarat', name: 'Gujarat Creek', code: 'CHK-11', alerts: 4, cams: 24, status: 'normal', x: 18, y: 68 }
];

export const MOCK_CAMERA_HEALTH = [
  { bop: 'BOP-14 Punjab', total: 42, online: 40, maintenance: 2, uptime: 95.2 },
  { bop: 'CHK-07 Rajasthan', total: 38, online: 37, maintenance: 1, uptime: 97.4 },
  { bop: 'BOP-22 Jammu', total: 30, online: 28, maintenance: 2, uptime: 93.3 },
  { bop: 'CHK-11 Gujarat', total: 24, online: 23, maintenance: 1, uptime: 95.8 }
];

export const MOCK_ACTIVITY_STREAM = [
  {
    id: 'act_1',
    type: 'FRS Match',
    title: 'Watchlist Target #8821',
    location: 'CHK-11 Gujarat · Creek Post',
    time: '12:04:18 PM',
    confidence: '94.1%',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    severity: 'critical'
  },
  {
    id: 'act_2',
    type: 'ANPR',
    title: 'MH12 AB 1234 (SUV)',
    location: 'CHK-07 Rajasthan · Hwy 15',
    time: '12:02:45 PM',
    confidence: '98.2%',
    thumbnail: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=150&q=80',
    severity: 'warning'
  },
  {
    id: 'act_3',
    type: 'Intrusion',
    title: 'Fence Line Sensor 14B',
    location: 'BOP-14 Punjab · Gate 3',
    time: '12:00:11 PM',
    confidence: '96.4%',
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=150&q=80',
    severity: 'critical'
  },
  {
    id: 'act_4',
    type: 'Thermal',
    title: 'Riverbed Anomaly',
    location: 'BOP-22 Jammu · Riverine Belt',
    time: '11:54:30 AM',
    confidence: '89.5%',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
    severity: 'warning'
  },
  {
    id: 'act_5',
    type: 'ANPR',
    title: 'PB08 CX 9918 (Truck)',
    location: 'BOP-14 Punjab · Cargo Gate',
    time: '11:48:12 AM',
    confidence: '99.0%',
    thumbnail: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=150&q=80',
    severity: 'info'
  },
  {
    id: 'act_6',
    type: 'Patrol',
    title: 'Team Delta-4 Checkin',
    location: 'BOP-14 Punjab · Checkpoint 09',
    time: '11:42:00 AM',
    confidence: '100%',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=150&q=80',
    severity: 'info'
  }
];

export const MOCK_MERMAID_SYNTAX = `graph TB
    %% Styling Classes
    classDef edgeStyle fill:#EFF6FF,stroke:#3B82F6,stroke-width:1.5px,rx:12px;
    classDef transportStyle fill:#F8FAFC,stroke:#94A3B8,stroke-width:1.5px,rx:12px;
    classDef ingestStyle fill:#F3E8FF,stroke:#A855F7,stroke-width:1.5px,rx:12px;
    classDef aiStyle fill:#ECFDF5,stroke:#10B981,stroke-width:2px,rx:12px;
    classDef eventStyle fill:#FFFBEB,stroke:#F59E0B,stroke-width:1.5px,rx:12px;
    classDef storageStyle fill:#F1F5F9,stroke:#64748B,stroke-width:1.5px,rx:12px;
    classDef uiStyle fill:#FFFFFF,stroke:#1E3A8A,stroke-width:2px,rx:12px;
    classDef secStyle fill:#FEF2F2,stroke:#EF4444,stroke-width:1.5px,rx:12px;

    subgraph L1["LAYER 1 — EDGE (Border CCTVs & Outposts)"]
        cctv["Existing CCTV Cameras<br/>(RTSP / ONVIF / IP)"] ::: edgeStyle
        edgeNode["Edge AI Node<br/>(Jetson Orin / Hailo-8)"] ::: edgeStyle
    end

    subgraph L2["LAYER 2 — TRANSPORT"]
        network["Network Fabric<br/>(4G/5G · VSAT · Fiber · RF Mesh)"] ::: transportStyle
    end

    subgraph L3["LAYER 3 — INGESTION & MESSAGING"]
        ingest["Stream Ingest & Sampler<br/>(GStreamer / MediaMTX / 1-5 FPS)"] ::: ingestStyle
        kafka["Kafka / Redpanda Bus<br/>(Topics: frames, detections, alerts)"] ::: ingestStyle
    end

    subgraph L4["LAYER 4 — AI INFERENCE CORE"]
        triton["NVIDIA Triton Server / KServe"] ::: aiStyle
        frs["FRS Model Worker<br/>(SCRFD + ArcFace)"] ::: aiStyle
        anpr["ANPR Model Worker<br/>(YOLOv8 + PaddleOCR)"] ::: aiStyle
        intrusion["Intrusion Worker<br/>(YOLOv10 + ByteTrack)"] ::: aiStyle
        milvus["Milvus Vector Search<br/>(Face Embeddings kNN)"] ::: aiStyle
    end

    subgraph L5["LAYER 5 — EVENT & ALERT ENGINE"]
        flink["Apache Flink Stream Engine<br/>(Stateful Correlation)"] ::: eventStyle
        priority["Priority Alert Scorer<br/>(Confidence & Zone ML)"] ::: eventStyle
        router["Notification Router<br/>(WebSocket · FCM/APNs)"] ::: eventStyle
    end

    subgraph L6["LAYER 6 — STORAGE LAYER"]
        minio["MinIO / S3 Object Store<br/>(Clips, Face & Plate Crops)"] ::: storageStyle
        postgres["PostgreSQL + TimescaleDB<br/>(Metadata & Events Log)"] ::: storageStyle
        redis["Redis Cache<br/>(Hot Watchlist & State)"] ::: storageStyle
    end

    subgraph L7["LAYER 7 — CONSUMPTION"]
        dashboard["Next.js 15 Web Dashboard<br/>(Bento Grid · React 19)"] ::: uiStyle
        mobileApp["Field Officer Mobile App<br/>(React Native / Expo)"] ::: uiStyle
        externalApi["Public BSF API / OpenAPI"] ::: uiStyle
    end

    subgraph SB["SIDEBAR — CROSS-CUTTING SECURITY & GOVERNANCE"]
        keycloak["Keycloak RBAC / mTLS / Vault"] ::: secStyle
        otel["OpenTelemetry / Grafana / Loki"] ::: secStyle
    end

    %% Flows
    cctv -->|"RTSP Sub-stream"| network
    edgeNode -->|"Protobuf Detections"| network
    network --> ingest
    ingest -->|"Sampled Frames"| kafka
    kafka -->|"gRPC Batch"| triton
    triton --> frs
    triton --> anpr
    triton --> intrusion
    frs <-->|"Vector Search"| milvus
    triton -->|"Detections JSON"| flink
    flink --> priority
    priority --> router
    router -->|"Live WebSocket"| dashboard
    router -->|"Push FCM/APNs"| mobileApp
    triton -->|"Crops / Clips"| minio
    flink -->|"Append Event"| postgres
    kafka <-->|"Hot Lookup"| redis
    SB -.- L4
    SB -.- L5
`;
