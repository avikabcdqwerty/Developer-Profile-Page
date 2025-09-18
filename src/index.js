import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Retrieve or create the root container to support both CRA and custom HTML setups
function getOrCreateRootContainer() {
  let container = document.getElementById('root');
  if (!container) {
    // Create a root container if missing (defensive for non-CRA scaffolds)
    container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);
  }
  return container;
}

let rootInstance = null;

/**
 * Initializes the React root if not already created.
 */
function ensureRoot() {
  if (!rootInstance) {
    const container = getOrCreateRootContainer();
    rootInstance = createRoot(container);
  }
  return rootInstance;
}

/**
 * Renders the application with error safety.
 * Exported for testability (Jest/RTL can import and invoke).
 */
export function renderApp() {
  try {
    const root = ensureRoot();
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[index] Failed to render application:', err);
    // Render a minimal accessible fallback to inform the user
    const container = getOrCreateRootContainer();
    container.innerHTML = `
      <section role="alert" aria-live="assertive" aria-atomic="true" style="
        padding: 1rem; margin: 1rem; border: 1px solid #f5c2c2; border-radius: 8px;
        background: #ffe6e6; color: #8a1f1f; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
        <h2>Application failed to load</h2>
        <p>We’re sorry, an unexpected error prevented the app from starting.</p>
      </section>
    `;
  }
}

// Boot the app immediately
renderApp();

// Basic hot module replacement support for Vite
if (import.meta && import.meta.hot) {
  import.meta.hot.accept();
}

// Export the root instance for potential testing or integration hooks
export const root = rootInstance;