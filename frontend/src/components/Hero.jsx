import React from 'react';
import { ArrowRight, Mail, FileDown, Terminal, Code2, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Hero({ profile }) {
  const name = profile?.name || 'Sanjay Ashwin';
  const title = profile?.title || 'Java & Full-Stack Developer';
  const bio = profile?.bio || 'Computer Science undergraduate focused on Java, Spring Boot, REST APIs, and full-stack development.';
  const githubUrl = profile?.githubUrl || 'https://github.com/sanjayashwinP';
  const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/sanjay-ashwin-62b566376';
  const resumeUrl = profile?.resumeUrl || '/api/resume/download';
  const avatarUrl = profile?.avatarUrl;

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        <div className="hero-content">
          {/* Developer Profile Header with Medium Attractive Avatar */}
          <div className="hero-profile-row">
            <div className="hero-avatar-wrapper">
              {avatarUrl ? (
                <div className="hero-avatar-frame">
                  <img src={avatarUrl} alt={name} className="hero-avatar-img" />
                  <span className="hero-avatar-status" title="Active & Ready for Opportunities"></span>
                </div>
              ) : (
                <div className="hero-avatar-placeholder">
                  <span className="hero-avatar-initials">SA</span>
                  <span className="hero-avatar-status" title="Active & Ready for Opportunities"></span>
                </div>
              )}
            </div>

            <div className="hero-profile-meta">
              <div className="hero-meta-details">
                {(profile?.workplace || 'Saveetha Engineering College • CGPA 8.4') && (
                  <div className="hero-meta-workplace font-mono">
                    {profile?.workplace || 'Saveetha Engineering College • CGPA 8.4'}
                  </div>
                )}
                <div className="hero-meta-loc font-mono">
                  📍 {profile?.location || 'Chennai, India'}
                </div>
              </div>
            </div>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="highlight-text">{name}</span>
          </h1>

          <h2 className="hero-subtitle">{title}</h2>

          <p className="hero-description">{bio}</p>

          {/* Quick Technical Stack Badges */}
          <div className="hero-tags">
            <span className="badge badge-accent">Java 21</span>
            <span className="badge badge-accent">Spring Boot 3</span>
            <span className="badge badge-accent">Spring Security</span>
            <span className="badge badge-accent">REST APIs</span>
            <span className="badge badge-accent">MySQL</span>
            <span className="badge badge-accent">ReactJS</span>
          </div>

          {/* Action CTAs */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={16} />
            </a>

            <a href="#contact" className="btn btn-secondary">
              <Mail size={16} />
              <span>Contact Me</span>
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              download="Sanjay_Ashwin_Resume.pdf"
            >
              <FileDown size={16} />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Developer Terminal / System Profile Card */}
        <div className="hero-visual" aria-hidden="true">
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="control-dot red"></span>
                <span className="control-dot yellow"></span>
                <span className="control-dot green"></span>
              </div>
              <div className="terminal-title">sanjay@portfolio:~</div>
            </div>
            <div className="terminal-body font-mono">
              <div className="term-line">
                <span className="term-prompt">$</span>
                <span className="term-cmd">curl -s http://localhost:8080/api/profile</span>
              </div>
              <div className="term-output">
                <p>&#123;</p>
                <p className="indent">"developer": <span className="str">"Sanjay Ashwin"</span>,</p>
                <p className="indent">"education": <span className="str">"Saveetha Engineering College"</span>,</p>
                <p className="indent">"degree": <span className="str">"B.E. Computer Science (2023-2027)"</span>,</p>
                <p className="indent">"cgpa": <span className="num">8.4</span>,</p>
                <p className="indent">"primaryStack": [<span className="str">"Java"</span>, <span className="str">"Spring Boot"</span>, <span className="str">"React"</span>, <span className="str">"MySQL"</span>],</p>
                <p className="indent">"status": <span className="str green-text">"Ready for SDE Opportunities"</span></p>
                <p>&#125;</p>
              </div>
              <div className="term-line mt-2">
                <span className="term-prompt">$</span>
                <span className="term-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
