import React from 'react';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

export default function Certifications({ certificationsList }) {
  if (!certificationsList || certificationsList.length === 0) return null;

  return (
    <section className="section certifications-section" id="certifications">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Award size={14} />
            <span>Verified Credentials</span>
          </span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Industry-recognized credentials in cloud computing, backend frameworks, and AI prompt engineering.
          </p>
        </div>

        <div className="certifications-grid">
          {certificationsList.map((cert, index) => (
            <div key={cert.id || index} className="card certification-card">
              <div className="cert-card-top">
                <div className="cert-icon-wrapper">
                  <ShieldCheck size={22} />
                </div>

                {cert.issueDate && (
                  <span className="badge font-mono">
                    <Calendar size={12} />
                    <span>{cert.issueDate}</span>
                  </span>
                )}
              </div>

              <div className="cert-card-content">
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>

                {cert.credentialId && (
                  <p className="cert-id font-mono">
                    ID: <span>{cert.credentialId}</span>
                  </p>
                )}
              </div>

              {cert.credentialUrl && (
                <div className="cert-card-footer">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
