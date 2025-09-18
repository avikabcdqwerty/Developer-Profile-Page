# Developer Profile Page

A static, responsive developer profile page built with React 18. It showcases a developer’s bio, skills, experience, and contact information. The app follows strong accessibility practices, uses brand-compliant visuals, and is optimized for performance.

## Features

- Static, single-page React application (no backend, no data fetching)
- Sections: Bio, Skills, Experience, Contact
- Responsive design for mobile, tablet, and desktop
- Brand-compliant styles (color tokens, typography, logo)
- Keyboard navigation and semantic HTML with ARIA where needed
- Lightweight and performant; print stylesheet included
- Basic error boundaries and safe fallbacks for resilience

## Tech Stack

- React 18
- Vite (dev server and build)
- CSS (brand.css, responsive.css)
- ESLint + Prettier
- Jest + React Testing Library (for component tests)

## Getting Started

Prerequisites:
- Node.js >= 18
- npm >= 9 (or pnpm/yarn; examples below use npm)

Install dependencies:
```bash
npm install
```

Start the dev server:
```bash
npm run dev
```
This starts Vite at http://localhost:5173 (default). The app supports HMR.

Build for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

Run tests:
```bash
npm test
```

Lint and fix:
```bash
npm run lint
npm run lint:fix
```

Format code:
```bash
npm run format
```

## Project Structure

```
.
├─ src/
│  ├─ App.js                 # Main layout composition with sections + ErrorBoundary
│  ├─ index.js               # React entry; renders App and provides a fallback
│  ├─ assets/
│  │  ├─ logo.svg            # Brand logo asset (accessible SVG)
│  │  └─ profile.jpg         # Developer profile photo (local, embedded)
│  ├─ components/
│  │  ├─ Bio.js              # Bio: name, role, photo, summary
│  │  ├─ Skills.js           # Skills: categorized, accessible lists
│  │  ├─ Experience.js       # Experience: roles, companies, durations, achievements
│  │  ├─ Contact.js          # Contact: email, website, socials with copy-to-clipboard
│  │  ├─ Header.js           # Header: logo + primary navigation (in-page anchors)
│  │  └─ Footer.js           # Footer: brand info, nav, copyright
│  └─ styles/
│     ├─ brand.css           # Brand tokens (colors, typography), base + component styles
│     └─ responsive.css      # Progressive responsive enhancements + print styles
├─ README.md                 # This file
├─ docs/
│  └─ accessibility.md       # Accessibility checklist and compliance notes
└─ package.json              # Scripts and dependencies
```

## Accessibility

The application adheres to basic accessibility guidelines:
- Semantic landmarks: header, main, footer
- In-page navigation via Header and a “Skip to main content” link
- Focus-visible styles using brand color
- ARIA attributes where necessary (e.g., status messages)
- ErrorBoundary surfaces accessible alerts on render failures
- Keyboard-friendly interactions (menu toggle, skip link)
- Images include alt text; decorative logo in Footer uses empty alt and aria-hidden

Refer to docs/accessibility.md for the full checklist and testing notes.

## Performance

- Static content (no network data dependencies)
- Vite’s modern bundling and code-splitting when applicable
- Lazy decoding and responsive imagery considerations where meaningful
- Minimal runtime logic; largely presentational
- Print stylesheet avoids unnecessary ink/graphics

Tips:
- Run npm run build and inspect output
- Use Lighthouse/Core Web Vitals to validate performance

## Testing

Unit/component tests (Jest + React Testing Library) are recommended:
- Components are functional, small, and testable
- Accessibility queries (byRole, byLabelText) should be used in tests
- Example areas to test:
  - Header navigation and menu toggle behavior
  - Contact copy-to-clipboard announcements (status live region)
  - Experience rendering order and content
  - Bio image fallback behavior

Example test command:
```bash
npm test
```

## Linting & Formatting

- ESLint enforces best practices and consistent code style
- Prettier auto-formats code

Commands:
```bash
npm run lint
npm run lint:fix
npm run format
```

## Deployment

The project builds to a static bundle (dist). You can deploy to any static host.

Common options:
- Vercel: connect repository and set framework to Vite
- Netlify: set build command npm run build and publish directory dist/
- GitHub Pages: use a workflow to build and publish the dist folder

Local production preview:
```bash
npm run build
npm run preview
```

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Edge, Safari)
- Graceful degradation of non-critical features (e.g., clipboard fallback)

## Security

- No user input or external data fetching
- Clipboard operations guarded with fallbacks and error handling
- External links use rel="noopener noreferrer"

## Troubleshooting

- If the app fails to start, check Node version and reinstall deps:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Dev port conflicts: specify a different port:
  ```bash
  npm run dev -- --port=5174
  ```
- Build issues: clear cache and rebuild
  ```bash
  rm -rf node_modules .vite
  npm install
  npm run build
  ```

## License

All rights reserved. For internal/demo purposes.