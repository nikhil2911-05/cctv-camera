"""
IBVAP – Intelligent Border Video Analytics Platform — Production Backend Microservice (FastAPI + WebSockets)
Fast2SMS GET & POST Real Cellular SMS Integration for Target +91 7807483763
"""

import os
import asyncio
import json
import random
import time
from typing import List, Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from send_real_sms import send_fast2sms_get

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = FastAPI(
    title="IBVAP Backend Core & Remote Alert Engine",
    description="High-performance AI video analytics API, WebSocket Remote Gateway & Automated Fast2SMS Engine",
    version="2.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REGISTERED_MOBILES = [
    {"name": "Duty Officer (Primary)", "phone": "7807483763", "rank": "Field Commander", "bop": "BOP-14 Punjab", "enabled": True},
    {"name": "Insp. S. Singh", "phone": "9876543210", "rank": "Outpost Commander", "bop": "CHK-11 Gujarat", "enabled": True},
    {"name": "Capt. V. Sharma", "phone": "9876588912", "rank": "Duty Officer", "bop": "BSF Tactical HQ", "enabled": True}
]

# WebSocket Manager for Remote Dashboards
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

class RealSMSRequest(BaseModel):
    phone_number: str = "7807483763"
    message: Optional[str] = None
    alert_id: Optional[str] = "ALT-8901"
    fast2sms_api_key: Optional[str] = ""

class AutoAlertTriggerRequest(BaseModel):
    title: str
    subtitle: str
    bop: str
    severity: str = "critical"
    type: str = "Intrusion"
    confidence: float = 94.2
    target_phone: Optional[str] = "7807483763"
    auto_sms: bool = True

@app.get("/")
async def root():
    api_key_configured = bool(os.environ.get("FAST2SMS_API_KEY", "").strip())
    return {
        "status": "online",
        "service": "IBVAP Remote Dashboard & Automated Alert Engine",
        "target_phone": "7807483763",
        "active_remote_dashboards": len(manager.active_connections),
        "fast2sms_api_configured": api_key_configured,
        "endpoints": {
            "send_sms": "/api/v2/send-real-sms",
            "auto_trigger": "/api/v2/alerts/auto-trigger",
            "websocket": "/ws/alerts"
        }
    }

@app.websocket("/ws/alerts")
async def websocket_alerts(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Echo ping / client messages if needed
            await websocket.send_json({"type": "PONG", "payload": data})
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.post("/api/v2/alerts/auto-trigger")
async def auto_trigger_alert(req: AutoAlertTriggerRequest):
    """
    Automated endpoint triggered by AI detection models (YOLO / OpenCV / FRS / Thermal).
    1. Generates alert payload.
    2. Broadcasts instantly via WebSocket to all Remote Dashboards.
    3. Automatically dispatches Fast2SMS alert message to the target user.
    """
    timestamp = time.strftime("%H:%M:%S")
    alert_id = f"ALT-{random.randint(1000, 9999)}"
    
    alert_payload = {
        "id": alert_id,
        "title": req.title,
        "subtitle": req.subtitle,
        "bop": req.bop,
        "severity": req.severity,
        "type": req.type,
        "confidence": f"{req.confidence}%",
        "time": timestamp,
        "status": "AUTOMATED_TRIGGER"
    }

    # 1. Broadcast to remote dashboards
    await manager.broadcast({
        "event": "SUSPICIOUS_ACTIVITY_DETECTED",
        "data": alert_payload
    })

    # 2. Automated SMS Dispatch
    sms_result = None
    if req.auto_sms:
        phone = req.target_phone or "7807483763"
        msg_text = f"🚨 AUTOMATED BSF ALERT [{req.severity.upper()}]: {req.title} detected at {req.bop}. Confidence: {req.confidence}%. Alert ID: {alert_id}. Immediate response required."
        api_key = os.environ.get("FAST2SMS_API_KEY", "").strip() or "VyhXH87NwCcRPTEKtSsBoY50eOJ6kAgqUvFx2ImWGiDZpQbl9a4awFEeBRSq7GxUDTLoAPIQ2OY6pyzZ"
        
        if api_key and api_key != "YOUR_FAST2SMS_API_KEY_HERE":
            sms_result = send_fast2sms_get(phone, msg_text, api_key)
        else:
            sms_result = {
                "status": "FORMATTED_FOR_FAST2SMS",
                "phone": phone,
                "message": msg_text,
                "url": f"https://www.fast2sms.com/dev/bulkV2?route=q&message={msg_text}&numbers={phone}"
            }

    return {
        "success": True,
        "message": "Automated Alert Processed",
        "alert": alert_payload,
        "remote_dashboards_notified": len(manager.active_connections),
        "auto_sms_dispatch": sms_result
    }

@app.post("/api/v2/send-real-sms")
async def send_real_sms_endpoint(req: RealSMSRequest):
    phone = req.phone_number or "7807483763"
    msg_text = req.message or f"🚨 BSF EMERGENCY AI ALERT: Critical intruder matched at CHK-11 Gujarat. Alert ID: {req.alert_id}. Immediate response required."

    api_key = req.fast2sms_api_key or os.environ.get("FAST2SMS_API_KEY", "").strip() or "VyhXH87NwCcRPTEKtSsBoY50eOJ6kAgqUvFx2ImWGiDZpQbl9a4awFEeBRSq7GxUDTLoAPIQ2OY6pyzZ"

    if api_key and api_key != "YOUR_FAST2SMS_API_KEY_HERE":
        response_data = send_fast2sms_get(phone, msg_text, api_key)
        return {
            "success": True,
            "provider": "Fast2SMS (Cellular Network)",
            "phone": phone,
            "fast2sms_response": response_data
        }
    else:
        return {
            "success": True,
            "provider": "Fast2SMS Gateway Ready",
            "phone": phone,
            "message_sent": msg_text,
            "status": "Formatted for Fast2SMS. Please paste your Fast2SMS API key in backend/.env or UI input.",
            "fast2sms_url": f"https://www.fast2sms.com/dev/bulkV2?route=q&message={msg_text}&numbers={phone}"
        }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting IBVAP FastAPI Backend on http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)

