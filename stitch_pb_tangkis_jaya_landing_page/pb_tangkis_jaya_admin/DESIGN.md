---
name: PB Tangkis Jaya Admin
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#43474f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#415e91'
  primary: '#002451'
  on-primary: '#ffffff'
  primary-container: '#1a3a6b'
  on-primary-container: '#89a5dd'
  inverse-primary: '#abc7ff'
  secondary: '#575f67'
  on-secondary: '#ffffff'
  secondary-container: '#d8e1ea'
  on-secondary-container: '#5b646b'
  tertiary: '#3c1e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#5b3000'
  on-tertiary-container: '#d7985f'
  error: '#dc3545'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#284678'
  secondary-fixed: '#dbe4ed'
  secondary-fixed-dim: '#bfc8d0'
  on-secondary-fixed: '#141d23'
  on-secondary-fixed-variant: '#3f484f'
  tertiary-fixed: '#ffdcc1'
  tertiary-fixed-dim: '#fcb87d'
  on-tertiary-fixed: '#2e1500'
  on-tertiary-fixed-variant: '#693c0a'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  success: '#28a745'
  warning: '#ffc107'
  surface-border: '#dee2e6'
  text-main: '#212529'
  text-muted: '#6c757d'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar-width: 260px
  gutter: 1.5rem
  container-padding: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
---

## Brand & Style

The design system for the admin dashboard is defined by a **Minimalist, Utility-Focused** aesthetic. While the brand is rooted in the energy of badminton, the administrative interface prioritizes professional clarity, operational efficiency, and high information density. It avoids the aggressive "sporty" decorative elements of the consumer-facing site in favor of a clean, structured environment.

The personality is **reliable, precise, and authoritative**. The UI utilizes a neutral foundation to allow data and management tools to take precedence, ensuring that club administrators can focus on scheduling, member management, and financial reporting without visual distraction.

## Colors

The color palette is anchored by **Club Navy (#1a3a6b)**, which serves as the primary identifier for navigation and primary actions. 

- **Primary:** Used for the sidebar, primary buttons, and active states.
- **Secondary:** A neutral gray for secondary actions and less prominent UI elements.
- **Backgrounds:** The interface uses a tiered background approach. The main canvas is **Light Gray (#f8f9fa)**, while white is reserved for cards, tables, and input containers to create clear separation.
- **Status Colors:** Standardized semantic colors (Green, Yellow, Red) are used strictly for system feedback and data status indicators.

## Typography

This design system uses **Inter** exclusively to ensure maximum readability and a professional, modern feel. The typographic hierarchy is designed for functional clarity:

- **Headlines:** Kept to modest sizes (max 24px) to save vertical space for data tables and dashboard modules.
- **Body Text:** The standard size is 14px for density, with 16px used for prominent card descriptions.
- **Labels:** Used for table headers, metadata, and form labels. Table headers should be set in `label-sm` with all-caps for distinct separation from row data.

## Layout & Spacing

The layout follows a **Fixed Sidebar + Fluid Content** model. This ensures navigation is always accessible while data tables have maximum horizontal room to expand.

- **Sidebar:** Fixed at 260px. It uses the Primary Navy color for high contrast against the content area.
- **Main Canvas:** A 12-column grid is used within the content area. On tablets, the sidebar collapses to an icon-only rail or hides behind a hamburger menu.
- **Spacing Rhythm:** Based on an 8px (0.5rem) scale. Large dashboard views use 32px (2rem) margins to feel airy and organized, while internal card padding is tightened to 16px-24px for density.

## Elevation & Depth

To maintain a minimalist and utility-focused aesthetic, this design system uses **Tonal Layers** and **Low-Contrast Outlines** instead of heavy shadows.

- **Canvas Tiering:** The background is `#f8f9fa`. Cards and containers are pure `#ffffff` with a subtle 1px border (`#dee2e6`). 
- **Interactive Depth:** Shadows are reserved for floating elements like **Modals** and **Dropdown Menus**. Use a soft, diffused shadow: `0px 4px 12px rgba(0, 0, 0, 0.08)`.
- **Active States:** Nav items and active buttons use color fills (Primary Navy) rather than elevation to indicate state.

## Shapes

The shape language is **Soft** and disciplined, aligning with a professional admin tool. 

- **Components:** Standard buttons, input fields, and cards use a 4px-6px corner radius.
- **Avatars:** Circular (full round) to provide a soft contrast against the otherwise rectangular, grid-heavy dashboard.
- **Tables:** Table containers should have rounded corners on the outer boundary, while internal cells remain sharp to maintain alignment.

## Components

- **Sidebar Navigation:** Use a dark theme (Navy) for the sidebar. Icons should be simple line-art. Active states are indicated by a solid left-edge border and a subtle background tint.
- **Data Tables:** Pure white background. Headers use a light gray tint (`#f3f4f5`) with bold, uppercase labels. Rows include a subtle hover effect (a slightly darker gray tint).
- **Buttons:**
    - **Primary:** Club Navy background, white text.
    - **Secondary:** Light gray background, dark text.
    - **Ghost:** No background, primary color text (used for table actions).
- **Form Inputs:** 1px border, 4px radius. On focus, the border changes to Primary Navy with a subtle glow.
- **Stats Cards:** Large numeric displays with a small trend indicator (Green for up, Red for down).
- **Modals:** Centered on screen with a dark, semi-transparent overlay (60% opacity). Modals must have a clear header, body, and footer action area.
- **Chips/Badges:** Used for status (e.g., "Paid," "Pending"). Use light-colored backgrounds with high-contrast text of the same hue.