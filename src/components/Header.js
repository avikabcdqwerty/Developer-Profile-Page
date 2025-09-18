import React, { useEffect, useRef, useState, memo } from 'react';
import logo from '../assets/logo.svg';

/**
 * Header component
 * Displays brand logo and in-page navigation for the profile sections.
 * Accessible and keyboard-friendly with a responsive menu toggle for mobile.
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const toggleBtnRef = useRef(null);

  // Close menu when user presses Escape while focus is within the nav
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        // Return focus to the toggle button for context
        toggleBtnRef.current?.focus();
      }
    };
    const navEl = navRef.current;
    navEl?.addEventListener('keydown', handleKeyDown);
    return () => {
      navEl?.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Close the menu on outside click for better UX on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuOpen) return;
      const navEl = navRef.current;
      const btnEl = toggleBtnRef.current;
      if (navEl && !navEl.contains(e.target) && btnEl && !btnEl.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [menuOpen]);

  // Toggle menu with error safety
  const onToggleMenu = () => {
    try {
      setMenuOpen((prev) => !prev);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[Header] Failed to toggle menu:', err);
      setMenuOpen(false);
    }
  };

  // On selecting a nav link, close the menu (useful on mobile)
  const onNavSelect = () => {
    setMenuOpen(false);
  };

  const navId = 'primary-navigation';

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        {/* Brand area with logo; clicking logo scrolls to top/home */}
        <a href="#top" className="brand" aria-label="Home">
          {/* Logo image must include meaningful alt text per brand guidelines */}
          <img
            src={logo}
            alt="Jane Doe — Developer"
            className="brand-logo"
            width="40"
            height="40"
            decoding="async"
          />
          <span className="brand-name">Jane Doe</span>
        </a>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          className="nav-toggle"
          aria-controls={navId}
          aria-expanded={menuOpen ? 'true' : 'false'}
          onClick={onToggleMenu}
          ref={toggleBtnRef}
        >
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          {/* Simple icon using CSS; text hidden for visual users */}
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        {/* Primary navigation with in-page anchors */}
        <nav
          id={navId}
          className={`primary-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Primary"
          ref={navRef}
        >
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#bio" className="nav-link" onClick={onNavSelect}>
                Bio
              </a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link" onClick={onNavSelect}>
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a href="#experience" className="nav-link" onClick={onNavSelect}>
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={onNavSelect}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Anchor target for back-to-top linking */}
      <span id="top" className="visually-hidden" aria-hidden="true" />
    </header>
  );
}

export default memo(Header);