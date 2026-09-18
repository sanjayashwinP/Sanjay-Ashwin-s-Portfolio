import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience({ experienceList }) {
  if (!experienceList || experienceList.length === 0) return null;

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Briefcase size={14} />
            <span>Practical Experience</span>
          </span>
          <h2 className="section-title">Work & Internships</h2>
          <p className="section-subtitle">
            Hands-on software development experience building backend applications, RESTful services, and database integration.
          </p>
        </div>

        <div className="experience-timeline">
          {experienceList.map((exp, index) => {
            const techList = (exp.technologies || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);

            return (
              <div key={exp.id || index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="marker-dot">
                    <Briefcase size={15} />
                  </div>
                  {index < experienceList.length - 1 && <div className="marker-line"></div>}
                </div>

                <div className="card timeline-content-card">
                  <div className="exp-card-header">
                    <div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <h4 className="exp-company">{exp.company}</h4>
                    </div>

                    <div className="exp-meta-pills">
                      <span className="badge badge-accent font-mono">
                        <Calendar size={13} />
                        <span>{exp.startDate} – {exp.endDate}</span>
                      </span>
                      {exp.location && (
                        <span className="badge font-mono">
                          <MapPin size={13} />
                          <span>{exp.location}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="exp-description">
                    <p>{exp.description}</p>
                  </div>

                  {techList.length > 0 && (
                    <div className="exp-tech-list">
                      {techList.map((tech) => (
                        <span key={tech} className="badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
