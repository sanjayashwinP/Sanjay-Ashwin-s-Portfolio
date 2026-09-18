import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education({ educationList }) {
  if (!educationList || educationList.length === 0) return null;

  return (
    <section className="section education-section" id="education">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Undergraduate foundations in computer science, data structures, algorithms, database systems, and software engineering.
          </p>
        </div>

        <div className="education-grid">
          {educationList.map((edu, index) => (
            <div key={edu.id || index} className="card education-card">
              <div className="edu-icon-col">
                <div className="edu-icon-badge">
                  <GraduationCap size={24} />
                </div>
              </div>

              <div className="edu-info-col">
                <div className="edu-header-row">
                  <div>
                    <h3 className="edu-degree">{edu.degree}</h3>
                    <h4 className="edu-institution">{edu.institution}</h4>
                  </div>

                  {edu.cgpa && (
                    <div className="edu-cgpa-box">
                      <span className="cgpa-label">CGPA</span>
                      <span className="cgpa-val font-mono">{edu.cgpa}</span>
                    </div>
                  )}
                </div>

                <div className="edu-meta-row">
                  <span className="badge font-mono">
                    <Calendar size={13} />
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </span>
                  {edu.location && (
                    <span className="badge font-mono">
                      <MapPin size={13} />
                      <span>{edu.location}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
