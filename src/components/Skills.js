import React, { memo } from 'react';

/**
 * Skills component
 * Renders a static, accessible list of categorized skills using semantic HTML.
 * Content is hardcoded to satisfy project constraints.
 */
function Skills() {
  // Static skill categories and items; kept inline for simplicity and performance.
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend',
      skills: [
        'React',
        'TypeScript',
        'JavaScript (ES2023)',
        'HTML5',
        'CSS3',
        'Styled Components',
        'CSS Modules',
        'Redux Toolkit',
        'React Query',
        'Vite',
      ],
    },
    {
      id: 'backend',
      title: 'Backend',
      skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'JWT', 'Prisma'],
    },
    {
      id: 'testing',
      title: 'Testing & QA',
      skills: ['Jest', 'React Testing Library', 'Playwright', 'Cypress', 'ESLint', 'Prettier'],
    },
    {
      id: 'devops',
      title: 'Tooling & DevOps',
      skills: ['Git', 'GitHub Actions', 'Docker', 'CI/CD', 'PNPM', 'NPM'],
    },
    {
      id: 'a11y_perf',
      title: 'Accessibility & Performance',
      skills: ['WCAG', 'ARIA', 'Lighthouse', 'Core Web Vitals', 'Semantic HTML'],
    },
    {
      id: 'design',
      title: 'Design & Collaboration',
      skills: ['Design Systems', 'Figma', 'Storybook', 'Agile', 'Documentation'],
    },
  ];

  // Accessible ids for headings and descriptions
  const headingId = 'skills-title';
  const descId = 'skills-description';

  return (
    <section
      className="skills"
      aria-labelledby={headingId}
      aria-describedby={descId}
    >
      <header className="skills-header">
        <h2 id={headingId} className="skills-title">
          Skills
        </h2>
        <p id={descId} className="skills-summary">
          A selection of core technologies and practices I use to build performant, accessible, and maintainable web apps.
        </p>
      </header>

      {/* Categories container; use list semantics for assistive tech */}
      <div className="skills-grid" role="list">
        {skillCategories.map((category) => (
          <article
            key={category.id}
            className="skills-category"
            role="listitem"
            aria-labelledby={`${category.id}-title`}
            data-testid={`skills-category-${category.id}`}
          >
            <h3 id={`${category.id}-title`} className="skills-category-title">
              {category.title}
            </h3>

            <ul className="skills-list">
              {category.skills.map((skill) => (
                <li key={skill} className="skill-item">
                  {/* Render skill as a static chip; button-like appearance is visual only, not interactive */}
                  <span className="skill-chip" aria-label={skill}>
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(Skills);