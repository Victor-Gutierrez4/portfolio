# Scrollytelling Test Spec

## Goal

Turn the main portfolio sections into a small scrollytelling slideshow without making the site feel cluttered. The page should move through the portfolio story in four clear stages.

## Story

The scrollytelling slides should explain four moves:

1. Direction.
2. Projects.
3. Skills in progress.
4. Contact me.

## Acceptance Criteria

- The slideshow works inside the existing static site.
- It uses the current visual style and stays simple/professional.
- It uses the real portfolio sections, not a separate demo-only story block.
- It still reads normally on mobile.
- Space, ArrowDown, and PageDown advance when the portfolio slides are visible.
- Mobile tapping inside a slide advances to the next slide.
- Normal scrolling must not jitter or fight with JavaScript.
- The script updates the active slide indicator without forcing scroll on observer updates.
- The README includes the hosted GitHub Pages link.
