import React, { useEffect } from 'react';
import Header from './components/Header';
import Bio from './components/Bio';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/brand.css';
import './styles/responsive.css';

/**
 * ErrorBoundary component to catch rendering errors from child components.
 * Provides accessible feedback and logs error details for diagnostics.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, errorMessage: error?.message || 'Unknown error' };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging; in production, this could be replaced with a logging service
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', { error, errorInfo });
  }

  render() {
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      return (
        <section
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className="app-error"
          style={{
            padding: '1rem',
            background: '#ffe6e6',
            color: '#8a1f1f',
            border: '1px solid #f5c2c2',
            borderRadius: '8px',
            margin: '1rem',
          }}
        >
          <h2 tabIndex={-1}>Something went wrong</h2>
          <p>We’re sorry, but an unexpected error occurred while rendering this page.</p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              background: '#fff',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #f0d4d4',
            }}
          >
            {errorMessage}
          </pre>
        </section>
      );
    }
    // Render children when no error
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

/**
 * Main application component.
 * Renders the developer profile sections with accessible, semantic layout.
 */
function App() {
  // Manage document meta and initial focus management for accessibility
  useEffect(() => {
    document.title = 'Developer Profile | Jane Doe';
  }, []);

  // Handler for keyboard users to skip to main content
  const handleSkipToContent = (e) => {
    e.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.setAttribute('tabindex', '-1'); // Make focusable if not already
      main.focus();
      // Remove tabindex after focusing to maintain semantics
      const cleanup = () => {
        main.removeAttribute('tabindex');
        main.removeEventListener('blur', cleanup);
      };
      main.addEventListener('blur', cleanup);
    }
  };

  return (
    <div className="app-root">
      {/* Skip link for keyboard navigation */}
      <a
        href="#main-content"
        className="skip-link"
        onClick={handleSkipToContent}
      >
        Skip to main content
      </a>

      {/* Header with brand logo and optional navigation */}
      <Header />

      {/* Main content landmark for improved accessibility */}
      <main id="main-content" role="main" aria-labelledby="page-title">
        {/* Page title used by screen readers; visually hidden style should be defined in CSS */}
        <h1 id="page-title" className="visually-hidden">
          Developer Profile - Jane Doe
        </h1>

        {/* Sections wrapped in ErrorBoundary to prevent single failure from breaking entire page */}
        <ErrorBoundary>
          <section id="bio" aria-label="Developer biography" className="section section-bio">
            <Bio />
          </section>
        </ErrorBoundary>

        <ErrorBoundary>
          <section id="skills" aria-label="Skills and competencies" className="section section-skills">
            <Skills />
          </section>
        </ErrorBoundary>

        <ErrorBoundary>
          <section id="experience" aria-label="Professional experience" className="section section-experience">
            <Experience />
          </section>
        </ErrorBoundary>

        <ErrorBoundary>
          <section id="contact" aria-label="Contact information" className="section section-contact">
            <Contact />
          </section>
        </ErrorBoundary>
      </main>

      {/* Footer with brand and legal info */}
      <Footer />
    </div>
  );
}

export default App;