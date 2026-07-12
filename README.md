# Nilotpal Guha — Personal Portfolio

A professional, multi-page cybersecurity portfolio built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools required.

## Live Site

**https://nilotpalguha.dev**

## Architecture

```
/
├── index.html              # Home / Hero
├── about.html              # Bio, education, skills matrix
├── projects.html           # Classified Ops — project grid
├── experience.html         # Professional experience timeline
├── certifications.html     # Certification badge grid
├── research.html           # Publications
├── achievements.html       # Honors & achievements
├── contact.html            # Terminal-style contact
├── 404.html                # Custom error page
├── style.css               # Shared design system
├── script.js               # Shared animation logic
├── robots.txt              # Crawler directives
├── sitemap.xml             # XML sitemap (14 pages)
└── projects/
    ├── trinityos.html      # TrinityOS deep-dive
    ├── pinaca.html         # PINACA deep-dive
    ├── meghnad.html        # Meghnad deep-dive
    ├── nes.html            # NES cipher deep-dive
    ├── kalki.html          # Kalki framework deep-dive
    └── iskabon.html        # Iskabon capture engine deep-dive
```

## Features

### Theme
- Mr. Robot / fsociety aesthetic
- CRT scanline overlay, VHS noise texture
- Terminal green (#00ff41) palette on pure black
- Monospace typography (JetBrains Mono / Fira Code)
- Boot sequence animations (unique per page)
- Matrix rain canvas (homepage full, subpages light)
- Glitch text effects on hover
- 3D card tilt toward cursor
- Skill chip floating 3D rotation

### SEO
- Unique `<title>` and meta description on every page
- Canonical URLs, Open Graph, Twitter Card tags
- JSON-LD structured data (Person, SoftwareSourceCode, ScholarlyArticle)
- Semantic HTML with single `<h1>` per page
- Internal linking: every page reachable within 1-2 clicks
- Persistent footer sitemap on every page
- `robots.txt` and `sitemap.xml`
- `<noscript>` fallbacks with plain-text content

### Performance
- Deferred JavaScript, lazy-loaded Matrix rain and Three.js
- Page Visibility API pauses animations when tab is hidden
- `requestAnimationFrame` throttling for scroll effects
- `IntersectionObserver` for scroll-triggered reveals
- `prefers-reduced-motion` support
- Print styles

### Accessibility
- WCAG AA contrast ratios for body text
- `aria-label` on interactive elements
- `aria-hidden` on decorative elements
- Focus-visible outlines
- Semantic HTML5 elements
- Keyboard-navigable menu

## Deployment

This is a static site with no build step. Upload the files to any web host:

```bash
# GitHub Pages
git checkout main
git push origin main

# Netlify / Vercel / Cloudflare Pages
# Just point to the repo root

# Traditional hosting
scp -r . user@host:/var/www/nilotpalguha.dev/
```

## Customization

### Colors
Edit CSS custom properties in `style.css`:
```css
:root {
  --green: #00ff41;
  --red: #ff0000;
  --cyan: #0d7377;
  --text: #c0c0c0;
}
```

### Content
All content lives in the HTML files as raw text. Edit any `.html` file directly. No template processing required.

### Canonical URLs
Update `https://nilotpalguha.dev` across all files when deploying to a different domain.

## Browser Support

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

Graceful degradation for older browsers. Three.js hero requires WebGL.

## License

All rights reserved. Content and design by Nilotpal Guha.
