import React from 'react';
import { ArrowRight, Mail, FileDown, Terminal, CheckCircle2 } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Hero({ profile }) {
  const name = profile?.name || 'Sanjay Ashwin';
  const title = profile?.title || 'Java & Full-Stack Developer';
  const bio = profile?.bio || 'Computer Science undergraduate focused on Java, Spring Boot, REST APIs and full-stack development.';
  const githubUrl = profile?.githubUrl;
  const linkedinUrl = profile?.linkedinUrl;
  const resumeUrl = profile?.resumeUrl || '/Sanjay_Ashwin_Resume.pdf';

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        <div className="hero-content">
          {/* Status Badge */}
          <div className="hero-badge">
            <span className="status-dot"></span>
            <span className="badge-text">Available for Software Engineering Roles & Internships</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="highlight-text">{name}</span>
          </h1>

          <h2 className="hero-subtitle">{title}</h2>

          <p className="hero-description">{bio}</p>

          {/* Quick Technical Highlights */}
          <div className="hero-tags">
            <span className="badge badge-accent">Java 21</span>
            <span className="badge badge-accent">Spring Boot 3</span>
            <span className="badge badge-accent">Spring Security</span>
            <span className="badge badge-accent">REST APIs</span>
            <span className="badge badge-accent">ReactJS</span>
            <span className="badge badge-accent">MySQL</span>
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

          {/* Social Links (displayed only when configured) */}
          <div className="hero-socials">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub Profile"
              >
                <Github size={19} />
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
                <Linkedin size={19} />
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
