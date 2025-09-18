import React, { memo } from 'react';

/**
 * Experience component
 * Renders a static, accessible list of professional experiences including roles, companies, durations,
 * and key achievements. Designed with semantic HTML for screen readers and keyboard navigation.
 */
function Experience() {
  // Static experience data per project constraints (no dynamic fetching)
  const experiences = [
    {
      id: 'exp-neo',
      role: 'Senior Software Engineer',
      company: 'NeoTech Labs',
      location: 'Remote',
      start: { label: 'Apr 2022', dateTime: '2022-04' },
      end: { label: 'Present', dateTime: '' },
      summary:
        'Led frontend architecture and performance initiatives for a multi-tenant SaaS platform.',
      achievements: [
        'Owned migration to React 18 with concurrent features, reducing TTI by 28%.',
        'Established a11y standards and auditing workflow; improved Lighthouse Accessibility from 82 to 99.',
        'Built a reusable design system with Storybook, cutting feature delivery time by ~30%.',
        'Implemented CI with Playwright E2E smoke tests across critical journeys.',
      ],
      tech: ['React', 'TypeScript', 'Vite', 'Storybook', 'Playwright', 'Node.js'],
    },
    {
      id: 'exp-arc',
      role: 'Frontend Engineer',
      company: 'Arc Software',
      location: 'Hybrid — NYC',
      start: { label: 'Jan 2020', dateTime: '2020-01' },
      end: { label: 'Mar 2022', dateTime: '2022-03' },
      summary:
        'Contributed to a collaborative analytics product with real-time dashboards and permissions.',
      achievements: [
        'Introduced code-splitting and route-level data prefetching, reducing bundle size by 35%.',
        'Refactored forms to accessible patterns (labels, roles, error regions) with React Hook Form.',
        'Partnered with design to roll out a token-based theming system across the app.',
      ],
      tech: ['React', 'Redux Toolkit', 'React Query', 'Webpack', 'Jest', 'RTL'],
    },
    {
      id: 'exp-sky',
      role: 'Software Engineer',
      company: 'Skyline Digital',
      location: 'Onsite — Boston, MA',
      start: { label: 'Jun 2017', dateTime: '2017-06' },
      end: { label: 'Dec 2019', dateTime: '2019-12' },
      summary:
        'Worked across a range of client projects delivering responsive, accessible web applications.',
      achievements: [
        'Developed component libraries shared across 4 client teams with consistent API contracts.',
        'Implemented automated accessibility checks (axe) in CI pipelines.',
        'Mentored junior engineers on semantic HTML, ARIA, and performance best practices.',
      ],
      tech: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Sass', 'Gulp', 'Cypress'],
    },
  ];

  const headingId = 'experience-title';
  const descId = 'experience-description';

  return (
    <section
      className="experience"
      aria-labelledby={headingId}
      aria-describedby={descId}
    >
      <header className="experience-header">
        <h2 id={headingId} className="experience-title">
          Experience
        </h2>
        <p id={descId} className="experience-summary">
          Selected roles and accomplishments demonstrating leadership in frontend architecture,
          accessibility, and performance.
        </p>
      </header>

      {/* Ordered list to imply chronology (most recent first) */}
      <ol className="experience-list" aria-label="Professional experience in reverse chronological order">
        {experiences.map((exp) => (
          <li key={exp.id} className="experience-item">
            <article
              className="experience-card"
              aria-labelledby={`${exp.id}-role`}
              data-testid={`experience-${exp.id}`}
            >
              <header className="experience-card-header">
                <h3 id={`${exp.id}-role`} className="experience-role">
                  {exp.role}
                </h3>
                <p className="experience-company">
                  <span className="visually-hidden">Company:</span>
                  <strong>{exp.company}</strong>
                  <span className="experience-location"> — {exp.location}</span>
                </p>
                <p className="experience-duration">
                  <span className="visually-hidden">Duration:</span>
                  <time dateTime={exp.start.dateTime}>{exp.start.label}</time>
                  {' — '}
                  {exp.end.dateTime ? (
                    <time dateTime={exp.end.dateTime}>{exp.end.label}</time>
                  ) : (
                    <span aria-current="date">{exp.end.label}</span>
                  )}
                </p>
              </header>

              <p className="experience-overview">{exp.summary}</p>

              <div className="experience-details">
                <h4 className="experience-subtitle">Key achievements</h4>
                <ul className="experience-achievements">
                  {exp.achievements.map((item, idx) => (
                    <li key={`${exp.id}-ach-${idx}`} className="experience-achievement">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="experience-tech">
                <h4 className="experience-subtitle">Stack</h4>
                <ul className="experience-tech-list">
                  {exp.tech.map((t) => (
                    <li key={`${exp.id}-tech-${t}`} className="experience-tech-item">
                      <span className="skill-chip" aria-label={t}>
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default memo(Experience);