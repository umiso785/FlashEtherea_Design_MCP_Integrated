from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
import time
from datetime import datetime

router = APIRouter()

# 연결된 WebSocket 클라이언트들을 관리
connected_clients = set()

@router.websocket("/ws/logs")
async def websocket_logs(websocket: WebSocket):
    """실시간 로그 스트리밍 WebSocket 엔드포인트"""
    await websocket.accept()
    connected_clients.add(websocket)
    
    try:
        # 연결 성공 메시지
        await websocket.send_text("🔗 WebSocket 로그 연결 성공")
        
        # 주기적으로 시스템 로그 전송
        while True:
            timestamp = datetime.now().strftime("%H:%M:%S")
            
            # 다양한 로그 메시지 시뮬레이션
            log_messages = [
                f"[{timestamp}] 🚀 FlashEtherea 시스템 정상 작동",
                f"[{timestamp}] 📊 KPI 메트릭 업데이트 완료",
                f"[{timestamp}] ⚡ AI 어댑터 상태 확인 중...",
                f"[{timestamp}] 🛡️ Do-No-Harm 정책 활성화",
                f"[{timestamp}] 📡 MCP 서버 헬스체크 완료",
                f"[{timestamp}] 🔧 시스템 리소스 모니터링 중",
            ]
            
            # 랜덤하게 로그 메시지 선택
            import random
            message = random.choice(log_messages)
            await websocket.send_text(message)
            
            # 3초마다 로그 전송
            await asyncio.sleep(3)
            
    except WebSocketDisconnect:
        connected_clients.discard(websocket)
        print("WebSocket client disconnected")
    except Exception as e:
        connected_clients.discard(websocket)
        print(f"WebSocket error: {e}")

async def broadcast_log(message: str):
    """모든 연결된 클라이언트에게 로그 브로드캐스트"""
    if connected_clients:
        disconnected = set()
        for websocket in connected_clients:
            try:
                await websocket.send_text(message)
            except:
                disconnected.add(websocket)
        
        # 연결이 끊어진 클라이언트 제거
        connected_clients -= disconnected