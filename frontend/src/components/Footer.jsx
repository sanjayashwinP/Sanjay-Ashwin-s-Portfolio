import React from 'react';
import { ArrowUp, Mail, Phone, Lock, Heart } from 'lucide-react';
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
            <h3 className="footer-name">{profile?.name || 'Sanjay Ashwin'}</h3>
            <p className="footer-bio">
              Computer Science Engineering student specializing in full-stack Java, Spring Boot, and scalable web architectures.
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
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Connect</h4>
              <ul className="footer-social-links">
                {(profile?.githubUrl || profile?.github) && (
                  <li>
                    <a href={profile.githubUrl || profile.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  </li>
                )}
                {(profile?.linkedinUrl || profile?.linkedin) && (
                  <li>
                    <a href={profile.linkedinUrl || profile.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                )}
                {profile?.email && (
                  <li>
                    <a href={`mailto:${profile.email}`}>
                      <Mail size={16} />
                      <span>{profile.email}</span>
                    </a>
                  </li>
                )}
                {profile?.phone && (
                  <li>
                    <a href={`tel:${profile.phone}`}>
                      <Phone size={16} />
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
            <p>© {currentYear} Sanjay Ashwin. Built with Spring Boot 3, Java 21, React & MySQL.</p>
          </div>

          <div className="footer-actions">
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
