import React from 'react';
import { ArrowUp, Mail, Phone, Code2 } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-title">
              <span className="brand-badge"><Code2 size={16} /></span>
              <h3 className="footer-name">{profile?.name || 'Sanjay Ashwin'}</h3>
            </div>
            <p className="footer-bio">
              Computer Science & Engineering student specializing in full-stack Java, Spring Boot 3, REST API architecture, and modern web applications.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-nav">
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#certifications">Certifications</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Connect</h4>
              <ul className="footer-social-links">
                {(profile?.githubUrl || profile?.github) && (
                  <li>
                    <a href={profile.githubUrl || profile.github} target="_blank" rel="noopener noreferrer">
                      <Github size={15} />
                      <span>GitHub</span>
                    </a>
                  </li>
                )}
                {(profile?.linkedinUrl || profile?.linkedin) && (
                  <li>
                    <a href={profile.linkedinUrl || profile.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={15} />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                )}
                {profile?.email && (
                  <li>
                    <a href={`mailto:${profile.email}`}>
                      <Mail size={15} />
                      <span>{profile.email}</span>
                    </a>
                  </li>
                )}
                {profile?.phone && (
                  <li>
                    <a href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
                      <Phone size={15} />
                      <span>{profile.phone}</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            <p>© {currentYear} Sanjay Ashwin P. Engineered with React & Spring Boot.</p>
          </div>

          <div className="footer-actions">
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={15} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
