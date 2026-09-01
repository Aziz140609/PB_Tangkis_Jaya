---
name: Smash & Drive
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
  secondary: '#b7102a'
  on-secondary: '#ffffff'
  secondary-container: '#db313f'
  on-secondary-container: '#fffbff'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cba72f'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#284678'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b1'
  on-secondary-fixed: '#410007'
  on-secondary-fixed-variant: '#92001c'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Barlow Condensed
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Barlow Condensed
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Barlow Condensed
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Barlow Condensed
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  diagonal-offset: 4vw
---

## Brand & Style
The design system is engineered for a high-performance badminton environment, blending the prestige of professional athletics with the energy of a community-focused training club. The personality is competitive, disciplined, and kinetic.

The visual style leans into **High-Contrast / Bold** aesthetics with a focus on motion. Key design drivers include:
- **Kinetic Energy:** Frequent use of 8-degree diagonal slashes and skewed containers to mimic the speed and trajectory of a shuttlecock.
- **Athletic Precision:** A strict grid-based approach that maintains professional order amidst high-energy visual elements.
- **Inclusive Authority:** Using heavy weight and scale to command attention while maintaining a clean, open layout that feels accessible to families and beginners.

## Colors
The palette is rooted in a "Championship Navy" that provides a stable, professional foundation. 

- **Primary (Deep Navy):** Use for headers, primary buttons, and high-impact background sections. It represents stability and focus.
- **Accent Red (Vibrant Red):** Used sparingly for call-to-actions, "Live" indicators, or urgent training alerts. 
- **Accent Green (Shuttlecock Green):** Applied to success states, court availability, and achievement badges.
- **Accent Gold (Victory Gold):** Reserved for elite programs, coaching credentials, and "pro-tier" memberships.
- **Gradients:** Use linear gradients at 135 degrees from Primary Navy to a slightly lighter tint for surface depth on hero sections.

## Typography
Typography is the core of this design system's athletic identity. 

- **Headlines:** Must always be uppercase and high-weight. Use `display-lg` for hero sections and impact statements. On mobile, headlines should reduce in size but maintain their heavy weight to preserve the brand's "voice."
- **Body Text:** Uses a neutral sans-serif to ensure that schedules, coaching instructions, and pricing tables remain highly legible.
- **Labels:** Small labels for tags (e.g., "Intermediate," "Court 1") should utilize the condensed heading font to maintain a sporty look even at small scales.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** with generous gutters to allow the bold typography to breathe. 

- **Diagonal Logic:** Section dividers should utilize a CSS clip-path or background-image to create an 8-degree slope. Content within these sections should use "counter-skew" to remain level and readable.
- **Visual Rhythm:** Use a strict 8px base unit. Component padding should be generous (vertical 16px/24px) to emphasize a premium, uncluttered feel.
- **Mobile Adaptation:** On mobile, shift to a 4-column layout. Use horizontal scrolling (carousels) for training drills and coach profiles to keep the vertical scroll focused on primary calls to action.

## Elevation & Depth
Elevation in the design system is achieved through **Tonal Layers** and **Hard Shadows** rather than soft blurs, reinforcing a "tough" athletic feel.

- **Surfaces:** Use Off-white (`#F8F9FA`) as the primary canvas. High-impact cards use the Primary Navy with white text.
- **Shadows:** Use low-blur, medium-opacity shadows (e.g., `offset: 4px 4px, blur: 0px`) for a "pop-art" or "brutalist" athletic feel on buttons and active cards.
- **Depth:** Overlap elements (e.g., a player photo breaking the container edge of a diagonal section) to create a sense of 3D space and movement.

## Shapes
The shape language is primarily **Soft** but disciplined. 
- Use `0.25rem` (4px) for standard components like input fields and cards to maintain a crisp, professional edge.
- **Buttons:** Apply `rounded-xl` for a pill-shaped appearance to signify friendliness and ease of use for the community.
- **Graphic Elements:** Use 45-degree clipped corners on images and decorative containers to mirror the aerodynamic lines of a badminton court and racket.

## Components
- **Buttons:** Primary buttons are pill-shaped, Navy background, with white uppercase text. "Action" buttons for registration use a Red background with a slight 4px bottom shadow for a tactile feel.
- **Training Chips:** Small, condensed-font labels with background colors corresponding to level (Gold for Advanced, Navy for Intermediate, White for Beginner).
- **Cards (Coach/Court):** Use a subtle 1px border (`#DEE2E6`). On hover, cards should lift with a Navy 4px hard shadow.
- **Input Fields:** Minimalist, white background, with a 2px bottom border that turns Navy on focus.
- **Badges:** Circular badges for "Match Points" or "Club Rank," utilizing the Accent Gold and centered condensed typography.
- **Schedule List:** Alternating background colors (Off-white and pure White) with thick Navy left-side borders for the "current" time slot.