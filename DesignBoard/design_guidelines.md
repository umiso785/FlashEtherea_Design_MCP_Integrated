# Agent3-Style Panel Dashboard Design Guidelines

## Design Approach
**System-Based Approach with Agent3 Reference**
- Primary inspiration: Replit Agent3 interface aesthetic
- Supporting references: VS Code dark theme, Linear's clean UI
- Core principle: Professional developer tool with minimal distractions and maximum screen real estate for code

## Color Palette

**Dark Mode (Primary)**
- Background Primary: `220 15% 8%` (near-black, slightly warm)
- Background Secondary: `220 15% 12%` (panel backgrounds)
- Background Tertiary: `220 15% 16%` (hover states, elevated surfaces)
- Border Color: `220 15% 20%` (subtle panel dividers)
- Text Primary: `220 15% 95%` (high contrast white)
- Text Secondary: `220 10% 65%` (muted text, labels)
- Text Tertiary: `220 10% 50%` (disabled, hints)
- Accent Primary: `25 95% 55%` (orange - active tabs, highlights, CTAs)
- Accent Hover: `25 95% 60%` (orange hover state)
- Success: `142 70% 45%` (build success, file saved)
- Error: `0 70% 60%` (errors, warnings)
- Warning: `45 95% 55%` (warnings, modified indicators)

## Typography

**Font Families**
- UI Text: Inter (via CDN)
- Code/Monospace: JetBrains Mono (via CDN)

**Type Scale**
- Display: text-2xl font-semibold (panel titles)
- Heading: text-lg font-medium (section headers)
- Body: text-sm (default UI text)
- Caption: text-xs (metadata, timestamps)
- Code: text-sm font-mono (all code content)

## Layout System

**Spacing Primitives**
- Use Tailwind units: 1, 2, 3, 4, 6, 8 for consistent spacing
- Panel padding: `p-4`
- Panel gaps: `gap-2` to `gap-4`
- Section margins: `mb-6` to `mb-8`
- Icon-text spacing: `gap-2`

**Grid Structure**
- Multi-panel split layout using CSS Grid
- Resizable panels with drag handles (1px width)
- Min/max panel widths to prevent collapse
- Responsive breakpoints: collapse panels to tabs on mobile

## Component Library

**Core Panels**
- **Code Editor Panel**: Monaco Editor integration, full-height, dark theme
- **File Explorer Panel**: Tree structure, nested folders, file icons, search bar at top
- **Terminal Panel**: Console output, command input, scrollable history
- **Preview/Output Panel**: Tabbed interface for multiple views
- **Top Navigation**: Project name (left), tab controls (center), action buttons (right)

**Navigation & Tabs**
- Horizontal tab bar with orange underline for active tab
- Tab height: `h-10`
- Tab hover: subtle background lift `bg-white/5`
- Tab active: `border-b-2 border-orange-500 text-orange-500`
- Close buttons on tabs (x icon, appears on hover)

**Panel Dividers**
- Vertical/horizontal drag handles: 4px wide hit area, 1px visible line
- Hover state: orange tint `hover:bg-orange-500/20`
- Cursor: `cursor-col-resize` or `cursor-row-resize`

**Buttons & Actions**
- Primary: Orange filled button `bg-orange-500 hover:bg-orange-600`
- Secondary: Border button `border border-white/20 hover:bg-white/5`
- Icon buttons: Square `p-2`, hover lift `hover:bg-white/10`
- "Publish" button: Prominent orange, top-right position

**File Tree**
- Folder icons: Chevron right/down for expand/collapse
- File type icons: Distinct colors per extension (.js, .css, .html, etc.)
- Hover: `hover:bg-white/5`
- Selected: `bg-orange-500/10 text-orange-500`
- Indent per level: `pl-4` multiplied by depth

**Terminal/Console**
- Monospace font throughout
- Prompt symbol: `$` or `>`
- Input area: Bottom-fixed with subtle top border
- Output scrollable, max-height with auto-scroll to bottom
- Color-coded output: errors (red), success (green), info (blue)

**Search & Input Fields**
- Dark background: `bg-white/5`
- Border: `border border-white/10`
- Focus: `focus:border-orange-500 focus:ring-1 focus:ring-orange-500`
- Placeholder: `text-white/40`
- Height: `h-9` for consistency

## Interactions & States

**Hover States**
- Panels/Cards: No hover effect (static)
- Interactive elements: `hover:bg-white/5` or `hover:bg-white/10`
- Tabs: Background lift + maintain border
- Drag handles: Orange tint on hover

**Focus States**
- Inputs: Orange ring `ring-orange-500`
- Keyboard navigation: Orange outline `outline-orange-500`

**Active/Selected States**
- Active tab: Orange border-bottom
- Selected file: Orange tinted background
- Current panel: Subtle border glow

**Loading States**
- Skeleton screens: `bg-white/5 animate-pulse`
- Spinner: Orange circular loader for async operations

## Animations
**Minimal & Purposeful Only**
- Panel resize: Smooth transition `transition-all duration-200`
- Tab switch: Instant, no animation
- Dropdown menus: Fast fade-in `transition-opacity duration-150`
- No decorative animations - prioritize performance

## Layout Specifications

**Desktop Layout (1280px+)**
```
[Top Nav - h-12]
├─ [Left Panel: File Explorer - w-64, resizable]
├─ [Center Panel: Editor/Main - flex-1]
├─ [Right Panel: Preview/Output - w-96, resizable]
└─ [Bottom Panel: Terminal - h-48, resizable]
```

**Tablet/Mobile (<1024px)**
- Stack panels vertically
- Convert side panels to slide-out drawers
- Tab bar for panel switching
- Preserve terminal at bottom

**Key Measurements**
- Top nav height: `h-12`
- Default file explorer width: `w-64` (min: 200px, max: 400px)
- Default preview width: `w-96` (min: 300px, max: 600px)
- Terminal height: `h-48` (min: 120px, max: 400px)
- Drag handle width: 4px (1px visible, 3px padding each side)

## Critical Implementation Notes
- All panels must be independently scrollable
- Code editor should syntax-highlight based on file type
- Terminal must support ANSI color codes
- File tree should lazy-load large directories
- Preserve panel sizes in localStorage for persistence
- Support keyboard shortcuts for panel focus (Ctrl+1, Ctrl+2, etc.)