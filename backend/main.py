"""
灵山公交小程序 - 简易后端服务
提供留言反馈接口
"""
import json
import os
from datetime import datetime
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn

app = FastAPI(title="灵山公交后端", version="1.0.0")

# CORS - 允许小程序访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据存储
DATA_DIR = Path(__file__).parent / "data"
FEEDBACK_FILE = DATA_DIR / "feedback.json"

class FeedbackCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=500)
    contact: str = Field("", max_length=100)
    source: str = Field("lingshan-bus")

class FeedbackResponse(BaseModel):
    ok: bool
    message: str

def _ensure_data():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not FEEDBACK_FILE.exists():
        FEEDBACK_FILE.write_text("[]", encoding="utf-8")

# Fix encoding for print
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

def _load():
    _ensure_data()
    try:
        return json.loads(FEEDBACK_FILE.read_text(encoding="utf-8"))
    except:
        return []

def _save(items):
    FEEDBACK_FILE.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")

@app.post("/api/feedback")
async def submit_feedback(data: FeedbackCreate):
    items = _load()
    items.append({
        "id": len(items) + 1,
        "content": data.content,
        "contact": data.contact,
        "source": data.source,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })
    _save(items)
    return {"ok": True, "message": "提交成功"}

@app.get("/api/feedback")
async def list_feedback():
    return _load()

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "lingshan-bus-backend"}

if __name__ == "__main__":
    print("[lingshan-bus] Backend start...")
    uvicorn.run(app, host="0.0.0.0", port=8882)
