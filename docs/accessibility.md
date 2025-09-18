# Accessibility Compliance Notes and Testing Checklist

This document outlines the accessibility standards, features, and testing procedures for the Developer Profile Page. The application is designed to be perceivable, operable, understandable, and robust, following WCAG 2.1 AA where applicable.

## Standards and Guidelines

- WCAG 2.1 Level AA (primary target)
- WAI-ARIA 1.2 (used sparingly to enhance native semantics)
- HTML Living Standard semantic elements (header, main, footer, nav, section, article, h1–h4, ul/ol/dl)
- Inclusive design best practices (keyboard-only, screen reader support, reduced motion)

## Implemented Accessibility Features

1. Semantic landmarks
   - Header: role="banner" (Site header)
   - Main: role="main" with aria-labelledby="page-title"
   - Footer: role="contentinfo"
   - Navigation: nav with aria-label="Primary" and in-page anchor links
2. Skip to content
   - A visible-on-focus “Skip to main content” link is provided at the top of the page and moves focus to the main landmark.
3. Keyboard navigation
   - All interactive elements are keyboard operable with logical tab order.
   - Visible focus indicators use the brand’s primary color via :focus-visible.
   - Mobile menu is controlled by a button with aria-expanded and aria-controls.
4. Headings and structure
   - h1 is present for the page title (visually hidden but available to screen readers).
   - Sections (Bio, Skills, Experience, Contact) have descriptive headings (h2) and subheadings (h3/h4).
5. Images and alternatives
   - Header logo has descriptive alt (and Footer logo is decorative with alt="" and aria-hidden="true").
   - Profile image includes meaningful alt text and a text fallback avatar when the image fails to load.
6. Color and contrast
   - Color palette is chosen for high contrast on a dark background.
   - Focus rings and links meet contrast guidelines against backgrounds.
7. State and live updates
   - Copy-to-clipboard announcements use a polite live region role="status" (Contact).
   - Error boundaries present a role="alert" region with a concise error summary.
8. Reduced motion
   - Respects prefers-reduced-motion and minimizes animation and transition durations.
9. ARIA usage
   - Used judiciously to label landmarks and controls. Native HTML semantics are preferred.
   - Button for menu toggle uses aria-expanded/aria-controls. Main uses aria-labelledby.
10. Forms
   - No user input forms at this time; any future form fields must have explicit labels, error regions, and accessible descriptions.

## Component-specific Notes

- Header
  - Nav toggle: <button aria-expanded aria-controls="primary-navigation"> with keyboard support (Enter/Space).
  - Escape closes the menu and returns focus to the toggle.
  - Outside clicks close the menu without stealing focus unexpectedly.
- App
  - Skip link focuses #main-content; temporary tabindex is applied for focus then removed to keep semantics clean.
- Bio
  - Article landmark with aria-labelledby and aria-describedby.
  - Avatar fallback uses role="img" with an aria-label.
- Skills
  - Uses list semantics for categories and skills.
  - Skill “chips” are non-interactive text, not buttons, so they do not add to tab order.
- Experience
  - Ordered list represents reverse-chronological order; uses time elements for dates.
- Contact
  - Definition list for term/description pairs (Email, Website, Location).
  - Polite live region communicates copy success/failure; focus is temporarily moved to ensure announcement in some SRs.
- Footer
  - Secondary navigation with links to in-page anchors and “Back to top”.

## Keyboard Interaction Checklist

- Global
  - [ ] Tab order proceeds logically: Skip link → Header → Nav → Main sections → Footer.
  - [ ] Focus is always visible (no focus trapping).
  - [ ] Shift+Tab works in reverse order.
- Header menu
  - [ ] Toggle opens/closes menu with Enter/Space.
  - [ ] aria-expanded reflects state changes.
  - [ ] Escape closes menu and returns focus to the toggle button.
  - [ ] Tabbing through the open menu reaches all links once, then exits.
- Skip link
  - [ ] Tab once from the top shows “Skip to main content”.
  - [ ] Activating skip link focuses #main-content heading region.
- Contact
  - [ ] Copy button is reachable and operable via keyboard.
  - [ ] Copy action announces status in a live region (success or error).
- ErrorBoundary
  - [ ] If a render error is simulated, an alert region is announced.

## Screen Reader Testing

Recommended screen readers:
- Windows: NVDA (latest) + Firefox/Chrome
- macOS: VoiceOver + Safari/Chrome
- iOS: VoiceOver (Safari)
- Android: TalkBack (Chrome)

Scenarios:
1. Page overview
   - On load, the screen reader announces the document title and the page-level heading (h1).
   - “Skip to main content” is discoverable via Tab and announced.
2. Landmarks
   - Navigate by landmarks and verify presence: banner, navigation, main, contentinfo.
3. Navigation
   - Confirm menu toggle is announced as a button with expanded/collapsed state and controls the primary navigation.
4. Sections and headings
   - Use heading navigation to traverse h2: Bio, Skills, Experience, Contact.
5. Images
   - Header logo’s alt text is read.
   - Footer logo should be skipped (decorative).
   - Bio image alt is read; simulate error and confirm fallback avatar’s label is announced.
6. Live updates
   - Activate copy-to-clipboard and ensure the “Email copied…” message is read.
7. Error handling
   - Simulate a component error to confirm “Something went wrong” alert is read.

## Color and Contrast

- Text vs background contrast meets or exceeds 4.5:1 for normal text and 3:1 for large text.
- Focus outline color vs adjacent background >= 3:1 where possible.
- Test with:
  - Axe DevTools or WAVE
  - Chrome DevTools color contrast checker
  - Manual sampling with a contrast checker tool

## Reduced Motion

- Verify that with “Reduce motion” enabled in OS/Browser:
  - Animations and transitions are effectively disabled or minimized.
  - No parallax or large motion effects exist.

## Responsive and Zoom

- Verify usability at:
  - 320px wide (small phones)
  - Tablets (768–1024px)
  - Desktop (≥1200px)
- Test browser zoom at 200% and 400%:
  - Layout remains readable and scrollable.
  - No content is cut off; text remains legible without horizontal scroll (except for code/URLs).

## Automated Testing

Tools:
- Axe DevTools browser extension (manual audits)
- Lighthouse (Accessibility category)
- Playwright/Cypress (optional E2E checks, not required here)
- Jest + React Testing Library (unit/integration tests)
  - Prefer queries byRole, byLabelText, byText
  - Example areas:
    - Header toggle button aria-expanded toggling
    - Contact live region announcements
    - Experience list rendering roles and dates
    - Bio image fallback behavior

Suggested (optional in development):
- @axe-core/react for runtime checks in dev mode

## Manual Testing Checklist

- [ ] Page has a descriptive title (e.g., “Developer Profile | Jane Doe”)
- [ ] Skip link is present and functional
- [ ] Landmarks: banner, navigation, main, contentinfo
- [ ] Headings are logical (single h1; h2 for sections; no level skipping)
- [ ] Keyboard-only navigation is fully supported and visible
- [ ] No keyboard traps or dead ends
- [ ] Visible focus across all interactive elements
- [ ] All images have appropriate alt attributes (or empty alt if decorative)
- [ ] Color contrast meets WCAG AA
- [ ] No reliance on color alone for meaning
- [ ] Live updates announced via role="status" (copy feedback)
- [ ] Mobile nav works with touch and keyboard; state reflected in aria-expanded
- [ ] Reduced motion honored
- [ ] Content reflows properly on small screens and high zoom
- [ ] External links use rel="noopener noreferrer" when target="_blank"
- [ ] No console errors related to accessibility during interactions

## Known Limitations and Notes

- The content is static and primarily presentational; there are no complex interactive widgets requiring advanced ARIA patterns.
- No forms are included. If added later, they must have explicit labels, error regions, and appropriate aria-describedby for hints and errors.
- Copy-to-clipboard uses the Clipboard API with a document.execCommand fallback; announcements are included for screen readers.

## Remediation Guidance

If any test fails:
1. Identify whether native semantics can solve the issue before adding ARIA.
2. Verify color tokens for contrast issues; adjust brand shades while respecting identity.
3. Ensure focus management aligns with user expectations; never steal focus unexpectedly.
4. Update heading structure to be linear and non-skipping.
5. Re-test with keyboard and screen reader after changes.

## References

- WCAG 2.1: https://www.w3.org/TR/WCAG21/
- ARIA Authoring Practices Guide (APG): https://www.w3.org/WAI/ARIA/apg/
- Axe DevTools: https://www.deque.com/axe/devtools/
- WAVE Web Accessibility Evaluation Tool: https://wave.webaim.org/