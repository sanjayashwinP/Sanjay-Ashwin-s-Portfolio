import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Cpu, CheckCircle, Lightbulb, Compass } from 'lucide-react';
import { Github } from './Icons';

export default function ProjectModal({ project, isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Fallback for light-dismiss on browsers without closedby support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInside) {
        onClose();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => dialog.removeEventListener('click', handleBackdropClick);
  }, [onClose]);

  if (!project) return null;

  const techList = (project.technologies || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const featureList = (project.features || '')
    .split(';')
    .map((f) => f.trim())
    .filter(Boolean);

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="modalProjectTitle"
      onClose={onClose}
      className="project-dialog"
    >
      <div className="dialog-header">
        <div className="dialog-title-group">
          <div className="dialog-badge-row">
            <span className="badge badge-accent font-mono">{project.year}</span>
            <span className="badge font-mono">Full-Stack Project</span>
          </div>
          <h2 id="modalProjectTitle" className="dialog-title">{project.title}</h2>
          {project.tagline && <p className="dialog-tagline">{project.tagline}</p>}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="dialog-close-btn"
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>
      </div>

      <div className="dialog-body">
        {/* Technologies Badges */}
        <div className="dialog-section">
          <h3 className="dialog-section-heading">Technologies Used</h3>
          <div className="dialog-tech-tags">
            {techList.map((tech) => (
              <span key={tech} className="badge badge-accent">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem Statement */}
        {project.problemStatement && (
          <div className="dialog-section">
            <h3 className="dialog-section-heading">
              <Lightbulb size={16} className="inline-icon" />
              Problem
            </h3>
            <p className="dialog-text">{project.problemStatement}</p>
          </div>
        )}

        {/* Solution Statement */}
        {project.solutionStatement && (
          <div className="dialog-section">
            <h3 className="dialog-section-heading">
              <CheckCircle size={16} className="inline-icon text-success" />
              Solution
            </h3>
            <p className="dialog-text">{project.solutionStatement}</p>
          </div>
        )}

        {/* Architecture Notes */}
        {project.architectureNotes && (
          <div className="dialog-section">
            <h3 className="dialog-section-heading">
              <Cpu size={16} className="inline-icon" />
              System Architecture
            </h3>
            <div className="architecture-box font-mono">
              <p>{project.architectureNotes}</p>
            </div>
          </div>
        )}

        {/* Key Features */}
        {featureList.length > 0 && (
          <div className="dialog-section">
            <h3 className="dialog-section-heading">Key Features</h3>
            <ul className="dialog-features-list">
              {featureList.map((feature, idx) => (
                <li key={idx} className="feature-list-item">
                  <span className="feature-check">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contributions */}
        {project.contributions && (
          <div className="dialog-section">
            <h3 className="dialog-section-heading">My Contributions</h3>
            <p className="dialog-text">{project.contributions}</p>
          </div>
        )}

        {/* Future Improvements */}
        {project.futureImprovements && (
          <div className="dialog-section">
            <h3 className="dialog-section-heading">
              <Compass size={16} className="inline-icon" />
              Future Improvements
            </h3>
            <p className="dialog-text">{project.futureImprovements}</p>
          </div>
        )}
      </div>

      <div className="dialog-footer">
        <div className="dialog-footer-actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github size={16} />
              <span>View GitHub</span>
            </a>
          )}

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        <button type="button" onClick={onClose} className="btn btn-outline">
          Close
        </button>
      </div>
    </dialog>
  );
}
