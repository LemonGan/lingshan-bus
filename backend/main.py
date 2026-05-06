"""
灵山公交小程序 - 简易后端服务
提供留言反馈接口
"""
import html
import json
import os
import shutil
import sys
import tempfile
import time
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, Field, field_validator
import uvicorn

app = FastAPI(title="灵山公交后端", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 配置 ---
DATA_DIR = Path(__file__).parent / "data"
FEEDBACK_FILE = DATA_DIR / "feedback.json"
FEEDBACK_BAK = DATA_DIR / "feedback.json.bak"
RATE_LIMIT_PER_MIN = 30  # 单 IP 每分钟最多 30 次
_rate_cache: dict[str, list[float]] = defaultdict(list)

# --- 统一错误格式 ---
@app.exception_handler(RequestValidationError)
async def validation_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    first_msg = errors[0]["msg"] if errors else "参数无效"
    return JSONResponse(
        status_code=200,  # 返回 200 而非 422，前端能正常读 res.data.message
        content={"ok": False, "message": first_msg}
    )

# --- 文件工具 ---
def _ensure_data():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not FEEDBACK_FILE.exists():
        FEEDBACK_FILE.write_text("[]", encoding="utf-8")

def _load():
    _ensure_data()
    try:
        return json.loads(FEEDBACK_FILE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError) as e:
        print(f"[WARN] feedback.json 损坏: {e}")
        if FEEDBACK_BAK.exists():
            print(f"[INFO] 尝试从备份恢复...")
            try:
                data = json.loads(FEEDBACK_BAK.read_text(encoding="utf-8"))
                FEEDBACK_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
                print(f"[INFO] 已从备份恢复 {len(data)} 条记录")
                return data
            except Exception as bak_e:
                print(f"[ERR] 备份恢复也失败: {bak_e}")
        print("[INFO] 重置为空数组")
        FEEDBACK_FILE.write_text("[]", encoding="utf-8")
        return []
    except Exception as e:
        print(f"[ERR] 读取失败: {e}")
        return []

def _save(items):
    """原子写入：先写 tmp 再 rename，避免中途崩溃留下截断文件"""
    tmp = FEEDBACK_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    # 写成功后再备份旧文件
    if FEEDBACK_FILE.exists():
        shutil.copy2(FEEDBACK_FILE, FEEDBACK_BAK)
    shutil.move(str(tmp), str(FEEDBACK_FILE))

# --- 速率限制 ---
def _check_rate_limit(ip: str) -> bool:
    now = time.time()
    window = 60
    _rate_cache[ip] = [t for t in _rate_cache[ip] if now - t < window]
    if len(_rate_cache[ip]) >= RATE_LIMIT_PER_MIN:
        return False
    _rate_cache[ip].append(now)
    return True

# --- Model ---
class FeedbackCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=500)
    contact: str = Field("", max_length=100)
    source: str = Field("lingshan-bus")

    @field_validator("content")
    @classmethod
    def content_not_whitespace(cls, v):
        if v.strip() == "":
            raise ValueError("留言内容不能仅为空白字符")
        return v.strip()

# --- 请求日志 ---
@app.middleware("http")
async def log_requests(request: Request, call_next):
    t = datetime.now().strftime("%H:%M:%S")
    print(f"[{t}] {request.method} {request.url.path}", flush=True)
    response = await call_next(request)
    print(f"[{t}] {request.method} {request.url.path} -> {response.status_code}", flush=True)
    return response

# --- API ---
@app.post("/api/feedback")
async def submit_feedback(data: FeedbackCreate, request: Request):
    ip = request.client.host if request.client else "unknown"
    if not _check_rate_limit(ip):
        return {"ok": False, "message": "提交太频繁，请稍后再试"}

    items = _load()
    new_id = max((item["id"] for item in items), default=0) + 1
    items.append({
        "id": new_id,
        "content": html.escape(data.content),
        "contact": html.escape(data.contact),
        "source": data.source,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })
    _save(items)
    print(f"[OK] 留言 #{new_id} ({len(data.content)} chars) from {ip}")
    return {"ok": True, "message": "提交成功"}

@app.get("/api/feedback")
async def list_feedback():
    items = _load()
    print(f"[OK] 查询留言: {len(items)} 条")
    return items

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "lingshan-bus-backend"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8882"))
    print(f"[lingshan-bus] Backend start on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
