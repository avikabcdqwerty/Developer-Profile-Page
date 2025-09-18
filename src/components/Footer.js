import React, { memo } from 'react';
import logo from '../assets/logo.svg';

/**
 * Footer component
 * Displays brand identity and copyright information within a contentinfo landmark.
 * Provides a back-to-top link and space for auxiliary links.
 */
function Footer() {
  // All content is intentionally hardcoded to satisfy project constraints.
  const brandName = 'Jane Doe';
  const year = '2025';

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Footer">
      <div className="footer-inner">
        {/* Brand block */}
        <div className="footer-brand">
          <a href="#top" className="footer-logo-link" aria-label={`${brandName} home`}>
            <img
              src={logo}
              alt=""
              className="footer-logo"
              width="28"
              height="28"
              decoding="async"
              aria-hidden="true"
            />
            <span className="footer-brand-name">{brandName}</span>
          </a>
          <p className="footer-tagline">
            Building fast, accessible, and maintainable web experiences.
          </p>
        </div>

        {/* Utility links and back-to-top; using list semantics for clarity */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <ul className="footer-links" role="list">
            <li className="footer-link-item">
              <a href="#bio" className="footer-link">Bio</a>
            </li>
            <li className="footer-link-item">
              <a href="#skills" className="footer-link">Skills</a>
            </li>
            <li className="footer-link-item">
              <a href="#experience" className="footer-link">Experience</a>
            </li>
            <li className="footer-link-item">
              <a href="#contact" className="footer-link">Contact</a>
            </li>
            <li className="footer-link-item">
              <a href="#top" className="footer-link" aria-label="Back to top">Top ↑</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Legal line */}
      <div className="footer-legal">
        <p className="footer-copy">
          © {year} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default memo(Footer);