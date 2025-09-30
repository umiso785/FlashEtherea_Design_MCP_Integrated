# FlashEtherea IDE + MCP Server (All-in-One)

## 실행 방법

### 1. 프론트엔드 실행
```bash
cd src
npm install
npm run dev
```

### 2. MCP 서버 실행
```bash
cd MCP_Skeleton/server
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Docker 통합 실행
```bash
docker-compose up --build
```

## 구조
- src/: 프론트엔드 IDE
- MCP_Skeleton/: FastAPI 서버
- tests/: 프론트엔드/백엔드 통합 테스트
- docs/: UI 가이드 + API 명세
