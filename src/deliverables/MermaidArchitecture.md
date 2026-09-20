# IBVAP – Intelligent Border Video Analytics Platform — Modern Backend Architecture (2025)

Paste the block below into [mermaid.live](https://mermaid.live/) to render or export a high-resolution SVG diagram.

```mermaid
graph TB
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
```

## Data Flow Narrative (Face Detection Example)
1. **RTSP Sub-stream**: Existing IP cameras stream sub-streams via TCP to GStreamer frame samplers.
2. **Kafka Queueing**: Sampled frames at 1-5 FPS are buffered in Kafka/Redpanda.
3. **Batch Inference**: Triton Inference Server pulls gRPC batches and executes FRS (SCRFD face detection + ArcFace 512-d embeddings) on NVIDIA GPUs.
4. **kNN Vector Lookup**: Milvus executes top-k similarity search against 100k+ watchlist vectors.
5. **Real-time Alerting**: Flink correlation engine scores priority, writes event to TimescaleDB, and dispatches WebSocket notifications to the Web Dashboard and FCM push to Mobile Field Officers.
