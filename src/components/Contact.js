import React, { useCallback, useMemo, useRef, useState, memo } from 'react';

/**
 * Contact component
 * Presents static contact details and social links with strong accessibility support.
 * Includes a progressive enhancement to copy the email address to the clipboard.
 */
function Contact() {
  // Static contact data (no fetching as per project constraints)
  const email = 'jane.doe@example.com';
  const website = 'https://janedoe.dev';
  const location = 'Remote (UTC−5)';

  const socials = useMemo(
    () => [
      {
        id: 'github',
        label: 'GitHub',
        url: 'https://github.com/janedoe',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/janedoe/',
      },
      {
        id: 'x',
        label: 'X (Twitter)',
        url: 'https://x.com/janedoe',
      },
    ],
    []
  );

  const [copyStatus, setCopyStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const liveRegionRef = useRef(null);

  // Copy email handler with robust fallbacks and error handling
  const handleCopyEmail = useCallback(async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers: create a temporary textarea to copy from
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy'); // Deprecated but used as a fallback
        document.body.removeChild(textarea);
        if (!ok) {
          throw new Error('Copy command not supported');
        }
      }
      setCopyStatus('success');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[Contact] Failed to copy email:', err);
      setCopyStatus('error');
    } finally {
      // Reset status after a delay to avoid persistent announcement
      window.clearTimeout(window.__contactCopyResetTimeout);
      window.__contactCopyResetTimeout = window.setTimeout(() => {
        setCopyStatus('idle');
      }, 3000);
      // Move focus to live region to ensure announcement in some screen readers
      if (liveRegionRef.current) {
        liveRegionRef.current.focus();
      }
    }
  }, [email]);

  const headingId = 'contact-title';
  const descId = 'contact-description';

  return (
    <section
      className="contact"
      aria-labelledby={headingId}
      aria-describedby={descId}
    >
      <header className="contact-header">
        <h2 id={headingId} className="contact-title">
          Contact
        </h2>
        <p id={descId} className="contact-summary">
          Prefer email for a quick response. I’m also active on GitHub and LinkedIn.
        </p>
      </header>

      {/* Contact details using definition list for term/description pairs */}
      <dl className="contact-details" data-testid="contact-details">
        <div className="contact-row">
          <dt className="contact-term">Email</dt>
          <dd className="contact-def">
            <a
              href={`mailto:${email}`}
              className="contact-link"
              data-testid="contact-email-link"
            >
              {email}
            </a>
            <button
              type="button"
              className="contact-copy-btn"
              onClick={handleCopyEmail}
              aria-label={`Copy email address ${email} to clipboard`}
              data-testid="contact-copy-button"
            >
              Copy
            </button>
          </dd>
        </div>

        <div className="contact-row">
          <dt className="contact-term">Website</dt>
          <dd className="contact-def">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              title="Open personal website in a new tab"
              data-testid="contact-website-link"
            >
              {website.replace(/^https?:\/\//, '')}
            </a>
          </dd>
        </div>

        <div className="contact-row">
          <dt className="contact-term">Location</dt>
          <dd className="contact-def">{location}</dd>
        </div>
      </dl>

      {/* Social links */}
      <div className="contact-social">
        <h3 className="contact-subtitle">Social</h3>
        <ul className="contact-social-list" role="list" data-testid="contact-social-list">
          {socials.map((s) => (
            <li key={s.id} className="contact-social-item">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                aria-label={`${s.label} profile`}
                title={`${s.label} profile (opens in new tab)`}
                data-testid={`contact-social-${s.id}`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ARIA live region for copy status announcements; visually hidden in CSS */}
      <p
        ref={liveRegionRef}
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        data-testid="contact-copy-status"
      >
        {copyStatus === 'success' && 'Email copied to clipboard.'}
        {copyStatus === 'error' && 'Sorry, copying failed. You can use the email link instead.'}
        {copyStatus === 'idle' && ''}
      </p>
    </section>
  );
}

export default memo(Contact);