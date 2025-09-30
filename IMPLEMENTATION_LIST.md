# FlashEtherea_Design_MCP_Integrated 구조 적용 리스트

## 📁 현재 프로젝트 구조 분석

### ✅ 이미 구현된 부분
- `src/app/` - App.tsx, main.tsx, routes.tsx
- `src/components/` - 기본 컴포넌트들 (CodeEditor, Navigation, KPIBoard 등)
- `src/pages/` - Dashboard, Editor, Settings
- `src/services/` - API 서비스, MCP 훅
- `src/store/` - MobX 스토어 (adapters, editor)
- `MCP_Skeleton/server/` - FastAPI 백엔드
- `docker-compose.yml` - 컨테이너 설정

### 🔄 개선/재구성 필요한 부분

#### 1. 아키텍처 구조 개선
```
src/
├── core/                    # ✅ 이미 있음 - 확장 필요
│   ├── constants/          # ✅ 이미 있음
│   └── types/              # ✅ 이미 있음
├── features/               # ✅ 부분적으로 있음 - 확장 필요
│   ├── design-dashboard/   # 🆕 새로 생성
│   ├── execution-dashboard/# 🆕 새로 생성
│   ├── file-explorer/      # ✅ 이미 있음
│   └── mcp-server/         # ✅ 이미 있음
├── shared/                 # ✅ 이미 있음
│   ├── services/           # ✅ 이미 있음
│   └── hooks/              # ✅ 이미 있음
└── ui/                     # ✅ 이미 있음
    ├── components/         # ✅ 이미 있음
    └── layouts/            # ✅ 이미 있음
```

#### 2. 설계 대시보드 구현 (🆕 새로 생성)
- [ ] `src/features/design-dashboard/DesignDashboard.tsx`
- [ ] `src/features/design-dashboard/components/ComponentCard.tsx`
- [ ] `src/features/design-dashboard/components/ArchitectureView.tsx`
- [ ] `src/features/design-dashboard/components/DependencyGraph.tsx`
- [ ] `src/features/design-dashboard/hooks/useDesignComponents.ts`
- [ ] `src/features/design-dashboard/types/design.types.ts`

#### 3. 실행 대시보드 구현 (🆕 새로 생성)
- [ ] `src/features/execution-dashboard/ExecutionDashboard.tsx`
- [ ] `src/features/execution-dashboard/components/KPIMetrics.tsx`
- [ ] `src/features/execution-dashboard/components/SystemControls.tsx`
- [ ] `src/features/execution-dashboard/components/ResourceMonitor.tsx`
- [ ] `src/features/execution-dashboard/components/ExecutionLogs.tsx`
- [ ] `src/features/execution-dashboard/hooks/useExecution.ts`
- [ ] `src/features/execution-dashboard/types/execution.types.ts`

#### 4. MCP 백엔드 확장 (🔄 개선)
- [ ] `MCP_Skeleton/server/routers/design.py` - 설계 관련 API
- [ ] `MCP_Skeleton/server/routers/execution.py` - 실행 관련 API
- [ ] `MCP_Skeleton/server/models/design.py` - 설계 데이터 모델
- [ ] `MCP_Skeleton/server/models/execution.py` - 실행 데이터 모델
- [ ] `MCP_Skeleton/server/services/component_analyzer.py` - 컴포넌트 분석
- [ ] `MCP_Skeleton/server/services/execution_monitor.py` - 실행 모니터링

#### 5. 네비게이션 및 라우팅 개선 (🔄 개선)
- [ ] 설계/실행 대시보드 분리된 라우팅
- [ ] 네비게이션 메뉴 업데이트
- [ ] 브레드크럼 네비게이션 추가

## 🎯 우선순위별 구현 계획

### Phase 1: 기본 구조 설정 (High Priority)
1. **설계 대시보드 기본 UI** - 컴포넌트 목록, 상태 관리
2. **실행 대시보드 기본 UI** - KPI 모니터링, 시스템 제어
3. **라우팅 분리** - `/design`, `/execution` 경로 설정
4. **MCP 백엔드 API 확장** - 설계/실행 데이터 제공

### Phase 2: 고급 기능 (Medium Priority)
1. **컴포넌트 의존성 그래프** - 시각적 아키텍처 표현
2. **실시간 모니터링** - WebSocket 기반 실시간 데이터
3. **시스템 제어 기능** - Start/Stop/Restart/Rollback
4. **로그 스트리밍** - 실시간 로그 표시

### Phase 3: 고도화 (Low Priority)
1. **컴포넌트 에디터** - 인라인 편집 기능
2. **버전 관리 통합** - Git 연동
3. **성능 분석** - 컴포넌트별 성능 메트릭
4. **자동화 워크플로우** - CI/CD 통합

## 🛠️ 기술 스택 확인

### Frontend (✅ 이미 설정됨)
- React 18 + TypeScript
- Vite (빌드 도구)
- TailwindCSS (스타일링)
- Framer Motion (애니메이션)
- MobX (상태 관리)
- Monaco Editor (코드 에디터)
- Lucide React (아이콘)

### Backend (✅ 이미 설정됨)
- FastAPI (Python)
- Uvicorn (ASGI 서버)
- Pydantic (데이터 검증)
- CORS 미들웨어

### DevOps (✅ 이미 설정됨)
- Docker + Docker Compose
- Playwright (테스팅)

## 📋 즉시 구현 가능한 항목들

### 1. 설계 대시보드 컴포넌트
```typescript
// 컴포넌트 카드, 아키텍처 뷰, 의존성 그래프
```

### 2. 실행 대시보드 메트릭
```typescript
// KPI 보드, 시스템 상태, 리소스 모니터
```

### 3. MCP API 엔드포인트
```python
# /api/design/components - 컴포넌트 목록
# /api/execution/status - 실행 상태
# /api/execution/control - 시스템 제어
```

### 4. 라우팅 설정
```typescript
// /design - 설계 대시보드
// /execution - 실행 대시보드  
// /ide - IDE 레이아웃
```

## 🚀 다음 단계

1. **설계 대시보드 UI 구현** - 컴포넌트 목록 및 상태 표시
2. **실행 대시보드 UI 구현** - KPI 메트릭 및 시스템 제어
3. **MCP 백엔드 API 확장** - 설계/실행 데이터 제공
4. **라우팅 및 네비게이션 업데이트** - 분리된 대시보드 접근

이 구조를 기반으로 단계별로 구현해나가면 FlashEtherea의 완전한 설계/실행 분리 아키텍처를 구축할 수 있습니다.