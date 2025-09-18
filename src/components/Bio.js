import React, { useState, memo } from 'react';
import profilePhoto from '../assets/profile.jpg';

/**
 * Bio component
 * Displays developer's photo, name, role, and a short, accessible summary.
 * Content is intentionally static/hardcoded to satisfy project constraints.
 */
function Bio() {
  const [imageError, setImageError] = useState(false);

  // Accessible identifiers for the article landmark
  const headingId = 'bio-title';
  const descId = 'bio-description';

  return (
    <article
      className="bio"
      aria-labelledby={headingId}
      aria-describedby={descId}
    >
      <header className="bio-header">
        <h2 id={headingId} className="bio-title">
          Jane Doe
        </h2>
        <p className="bio-role">Senior Software Engineer</p>
      </header>

      <div className="bio-body">
        {/* Profile photo with accessible alt text and graceful error fallback */}
        <div className="bio-photo" aria-hidden={imageError ? 'true' : 'false'}>
          {!imageError ? (
            <img
              src={profilePhoto}
              alt="Portrait of Jane Doe"
              width="200"
              height="200"
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
          ) : (
            // Fallback avatar when image fails to load
            <div className="bio-photo-fallback" role="img" aria-label="Avatar for Jane Doe">
              <span aria-hidden="true">JD</span>
            </div>
          )}
        </div>

        {/* Summary section with semantic content */}
        <div className="bio-content">
          <p id={descId} className="bio-summary">
            I’m a product-minded engineer focused on crafting fast, accessible, and reliably tested web experiences.
            I specialize in React, TypeScript, and Node.js, and I care deeply about design systems, performance,
            and inclusive UX.
          </p>

          <ul className="bio-highlights">
            <li>
              8+ years building scalable frontend applications and component libraries.
            </li>
            <li>
              Accessibility advocate: semantic HTML, ARIA best practices, and keyboard-first workflows.
            </li>
            <li>
              Performance-oriented: Core Web Vitals optimization and bundle discipline.
            </li>
            <li>
              Collaborates across design, product, and QA to deliver maintainable solutions.
            </li>
          </ul>

          <dl className="bio-meta">
            <div className="bio-meta-row">
              <dt className="bio-meta-term">Location</dt>
              <dd className="bio-meta-def">Remote (UTC−5)</dd>
            </div>
            <div className="bio-meta-row">
              <dt className="bio-meta-term">Focus</dt>
              <dd className="bio-meta-def">Frontend Engineering, DX, Accessibility</dd>
            </div>
            <div className="bio-meta-row">
              <dt className="bio-meta-term">Status</dt>
              <dd className="bio-meta-def">Open to impactful opportunities</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}

export default memo(Bio);