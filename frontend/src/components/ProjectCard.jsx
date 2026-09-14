import React from 'react';
import { ExternalLink, Code2, Layers, ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';

export default function ProjectCard({ project, onOpenDetails, onOpenModal }) {
  const handleOpen = onOpenDetails || onOpenModal;
  const techList = (project.technologies || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const featureList = (project.features || '')
    .split(';')
    .map((f) => f.trim())
    .filter(Boolean)
    .slice(0, 4); // Display up to 4 key highlights on card

  return (
    <article className="card project-card">
      <div className="project-card-header">
        <div className="project-type-tag">
          <Code2 size={16} className="project-icon" />
          <span className="font-mono text-muted">{project.year || '2025'}</span>
        </div>

        <div className="project-links-top">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-icon-link"
              aria-label={`GitHub repository for ${project.title}`}
              title="GitHub Repository"
            >
              <Github size={18} />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-icon-link"
              aria-label={`Live demo for ${project.title}`}
              title="Live Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        {project.tagline && <p className="project-tagline">{project.tagline}</p>}

        <p className="project-description">{project.description}</p>

        {/* Feature Highlights */}
        {featureList.length > 0 && (
          <div className="project-features-list">
            {featureList.map((feature, i) => (
              <div key={i} className="card-feature-item">
                <span className="feature-indicator">›</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="project-tech-stack">
          {techList.map((tech) => (
            <span key={tech} className="badge badge-accent">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="project-card-footer">
        <button
          type="button"
          onClick={() => handleOpen && handleOpen(project)}
          className="btn btn-primary btn-sm details-btn"
        >
          <span>Architecture & Details</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}
