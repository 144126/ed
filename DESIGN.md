# Design System Inspired by xAI

> Category: Portfolio
> Dark-first, monospace-driven brutalist minimalism with gold, green, and navy accents.

## 1. Visual Theme & Atmosphere

Dark-first minimalism anchored to a near-black navy background (`#0a0e17`). Gold (`#d4a047`) serves as the primary accent -- warm, premium, technical. Green (`#22c55e`) adds a secondary accent for interactive/status elements. Navy (`#0f1a2e`) provides surface depth. The aesthetic is sharp, architectural, and confident -- like xAI's monochrome brutality but warmed by metallic gold and deep navy.

No gradients, no decorative frills. Depth comes from contrast and whitespace, not shadows.

## 2. Color Palette

### Base
- `--bg`: `#0a0e17` -- deep navy-black canvas
- `--fg`: `#f0f2f5` -- warm white text
- `--fg-secondary`: `rgba(240, 242, 245, 0.7)`
- `--fg-muted`: `rgba(240, 242, 245, 0.5)`

### Surfaces
- `--surface`: `#0f1a2e` -- navy depth layer
- `--surface-hover`: `rgba(15, 26, 46, 0.8)`
- `--surface-elevated`: `rgba(255, 255, 255, 0.03)`
- `--border`: `rgba(212, 160, 71, 0.15)`
- `--border-strong`: `rgba(212, 160, 71, 0.3)`

### Accents
- `--accent`: `#d4a047` -- gold (primary accent, links, CTAs)
- `--accent-hover`: `#e0b860` -- gold hover
- `--accent-dim`: `rgba(212, 160, 71, 0.5)`
- `--green`: `#22c55e` -- secondary accent, success
- `--green-hover`: `#4ade80`
- `--green-dim`: `rgba(34, 197, 94, 0.5)`

### Functional
- `--success`: `#22c55e`
- `--warning`: `#f59e0b`
- `--destructive`: `#ef4444`
- `--info`: `#3b82f6`

## 3. Typography

- **Display / Mono**: `GeistMono`, `ui-monospace`, `SFMono-Regular`, monospace
- **Body / Sans**: `Inter`, `system-ui`, sans-serif

### Scale
| Role | Family | Size | Weight | LHeight | Tracking |
|------|--------|------|--------|---------|----------|
| Hero | GeistMono | clamp(2.5rem, 8vw, 5rem) | 300 | 1.1 | -0.02em |
| H2 | Inter | 1.75rem | 500 | 1.2 | -0.01em |
| H3 | Inter | 1.25rem | 500 | 1.3 | normal |
| Body | Inter | 1rem | 400 | 1.6 | normal |
| Small | Inter | 0.875rem | 400 | 1.5 | normal |
| Mono | GeistMono | 0.875rem | 400 | 1.5 | normal |
| Button | GeistMono | 0.8125rem | 400 | 1 | 0.08em |

## 4. Components

### Buttons
- **Primary**: gold bg (`#d4a047`), dark text, 0 radius, GeistMono 0.8125rem uppercase 0.08em tracking, 12px 24px pad
- **Ghost**: transparent, `1px solid rgba(212,160,71,0.3)` border, gold text, same type treatment
- **Text**: none, gold text, hover to `rgba(212,160,71,0.7)`

### Cards
- Bg: `#0f1a2e`, border: `1px solid rgba(212,160,71,0.15)`, 0 radius, pad: 24px
- Hover: border to `rgba(212,160,71,0.3)`

### Badges
- Mono 0.75rem uppercase 0.05em tracking, 1px solid border, 4px 8px pad, 0 radius

## 5. Layout

- 8px base grid. Scale: 4, 8, 16, 24, 32, 48, 64, 96
- Max content: 1200px
- Sharp 0 radius default, 4px for secondary containers
- No box-shadows -- depth through border opacity + bg shifts
- Section padding: clamp(3rem, 8vw, 6rem)

## 6. Responsive

- Mobile-first. Breakpoints: 640, 768, 1024, 1280
- Touch targets min 44px height
- Full-width buttons on mobile
- Single column <768, multi-column above

## 7. Motion

- Transitions: 200ms ease-out
- Hover: border/opacity shifts, no scale transforms
- Reduced motion respected

## 8. Anti-patterns

- No shadows, no gradients, no decorative illustrations
- No rounded corners >4px
- No purple/blue primary accents (gold is the accent)
- No bold weights for display type
