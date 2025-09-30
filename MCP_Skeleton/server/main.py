from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging
from typing import Dict, Any
import traceback
import time
import random
from routes import logs
from routes import logs

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="FlashEtherea MCP Server",
    description="AI/SEO Automation Battle System - MCP Integration",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include WebSocket logs router
app.include_router(logs.router)

# Include WebSocket logs router
app.include_router(logs.router)

# Global state for execution tracking
execution_state = {
    "is_running": True,
    "start_time": time.time(),
    "total_requests": 0,
    "total_errors": 0,
    "adapters": {
        "ollama": {"status": "healthy", "latency": 45, "requests": 1247, "errors": 0},
        "deepseek": {"status": "warning", "latency": 120, "requests": 892, "errors": 3},
        "local_llm": {"status": "error", "latency": 0, "requests": 0, "errors": 15}
    }
}

# Request/Response Models
class CodeRequest(BaseModel):
    code: str

class SystemControlRequest(BaseModel):
    action: str  # start, stop, restart, rollback

class PredictResponse(BaseModel):
    output: str

class ExplainResponse(BaseModel):
    explanation: str

class HealthResponse(BaseModel):
    status: str
    version: str
    adapters: Dict[str, str]

class ExecutionStatusResponse(BaseModel):
    is_running: bool
    uptime: str
    total_requests: int
    total_errors: int
    adapters: Dict[str, Dict[str, Any]]
    system_stats: Dict[str, str]

# Health Check
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """System health and adapter status check"""
    execution_state["total_requests"] += 1
    return HealthResponse(
        status="ok",
        version="1.0.0",
        adapters={
            name: data["status"] for name, data in execution_state["adapters"].items()
        }
    )

# Execution Status
@app.get("/execution/status", response_model=ExecutionStatusResponse)
async def get_execution_status():
    """Get detailed execution status for dashboard"""
    execution_state["total_requests"] += 1
    
    uptime_seconds = int(time.time() - execution_state["start_time"])
    hours = uptime_seconds // 3600
    minutes = (uptime_seconds % 3600) // 60
    
    # Simulate system stats
    system_stats = {
        "cpu": f"{random.randint(15, 35)}%",
        "memory": f"{random.randint(60, 75)}%",
        "disk": f"{random.randint(40, 50)}%",
        "network": f"{random.randint(100, 150)} MB/s"
    }
    
    return ExecutionStatusResponse(
        is_running=execution_state["is_running"],
        uptime=f"{hours}h {minutes}m",
        total_requests=execution_state["total_requests"],
        total_errors=execution_state["total_errors"],
        adapters=execution_state["adapters"],
        system_stats=system_stats
    )

# System Control
@app.post("/execution/control")
async def system_control(request: SystemControlRequest):
    """Control system execution state"""
    action = request.action.lower()
    
    if action == "start":
        execution_state["is_running"] = True
        logger.info("System started")
        return {"status": "started", "message": "시스템이 시작되었습니다"}
    
    elif action == "stop":
        execution_state["is_running"] = False
        logger.info("System stopped")
        return {"status": "stopped", "message": "시스템이 중지되었습니다"}
    
    elif action == "restart":
        execution_state["is_running"] = True
        execution_state["start_time"] = time.time()
        logger.info("System restarted")
        return {"status": "restarted", "message": "시스템이 재시작되었습니다"}
    
    elif action == "rollback":
        execution_state["total_errors"] = 0
        for adapter in execution_state["adapters"].values():
            adapter["errors"] = 0
        logger.warning("Emergency rollback executed")
        return {"status": "rollback", "message": "긴급 롤백이 실행되었습니다"}
    
    else:
        raise HTTPException(status_code=400, detail=f"Unknown action: {action}")

# Code Prediction/Execution
@app.post("/predict", response_model=PredictResponse)
async def predict_code(request: CodeRequest):
    """Execute or analyze code through MCP adapters"""
    execution_state["total_requests"] += 1
    
    if not execution_state["is_running"]:
        raise HTTPException(status_code=503, detail="System is not running")
    
    try:
        code = request.code.strip()
        
        # Basic code analysis
        if not code:
            raise HTTPException(status_code=400, detail="Empty code provided")
        
        # Simulate processing time
        time.sleep(0.1)
        
        # Mock execution result
        char_count = len(code)
        line_count = len(code.split('\n'))
        
        # Simulate different responses based on code content
        if "error" in code.lower() or "exception" in code.lower():
            execution_state["total_errors"] += 1
            output = f"⚠️ Potential issues detected in {char_count} chars, {line_count} lines"
        elif "print" in code or "console.log" in code:
            output = f"✅ Output operation detected: {char_count} chars processed"
        else:
            output = f"✅ Code analysis complete: {char_count} chars, {line_count} lines"
        
        logger.info(f"Code prediction completed: {char_count} characters")
        return PredictResponse(output=output)
        
    except Exception as e:
        execution_state["total_errors"] += 1
        logger.error(f"Prediction error: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# Code Explanation
@app.post("/explain", response_model=ExplainResponse)
async def explain_code(request: CodeRequest):
    """Provide AI-powered code explanation"""
    execution_state["total_requests"] += 1
    
    if not execution_state["is_running"]:
        raise HTTPException(status_code=503, detail="System is not running")
    
    try:
        code = request.code.strip()
        
        if not code:
            raise HTTPException(status_code=400, detail="Empty code provided")
        
        # Simulate processing time
        time.sleep(0.2)
        
        # Mock AI explanation based on code patterns
        explanations = []
        
        if "function" in code or "def " in code:
            explanations.append("🔧 Function definition detected")
        if "if" in code or "else" in code:
            explanations.append("🔀 Conditional logic found")
        if "for" in code or "while" in code:
            explanations.append("🔄 Loop structure identified")
        if "import" in code or "require" in code:
            explanations.append("📦 Module dependencies detected")
        if "class" in code:
            explanations.append("🏗️ Object-oriented structure found")
        
        if not explanations:
            explanations.append("📝 Basic code structure")
        
        explanation = " | ".join(explanations) + f" | Lines: {len(code.split())}"
        
        logger.info(f"Code explanation generated for {len(code)} characters")
        return ExplainResponse(explanation=explanation)
        
    except Exception as e:
        execution_state["total_errors"] += 1
        logger.error(f"Explanation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Explanation failed: {str(e)}")

# Additional MCP endpoints for FlashEtherea
@app.get("/adapters/status")
async def get_adapter_status():
    """Get detailed adapter status for FlashEtherea system"""
    execution_state["total_requests"] += 1
    
    # Simulate some variance in adapter performance
    for name, adapter in execution_state["adapters"].items():
        if adapter["status"] == "healthy":
            adapter["latency"] = random.randint(40, 60)
        elif adapter["status"] == "warning":
            adapter["latency"] = random.randint(100, 150)
    
    return {
        "adapters": [
            {
                "name": name,
                "status": data["status"],
                "latency": f"{data['latency']}ms" if data["latency"] > 0 else "timeout",
                "requests": data["requests"],
                "errors": data["errors"]
            }
            for name, data in execution_state["adapters"].items()
        ],
        "system": {
            "cpu_usage": f"{random.randint(15, 35)}%",
            "memory_usage": f"{random.randint(60, 75)}%",
            "uptime": f"{int((time.time() - execution_state['start_time']) / 3600)}h {int(((time.time() - execution_state['start_time']) % 3600) / 60)}m"
        }
    }

@app.post("/system/rollback")
async def system_rollback():
    """Emergency rollback functionality"""
    execution_state["total_errors"] = 0
    for adapter in execution_state["adapters"].values():
        adapter["errors"] = 0
    logger.warning("System rollback initiated")
    return {"status": "rollback_initiated", "timestamp": "2024-01-15T10:30:00Z"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )