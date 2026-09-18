import React, { useState } from 'react';
import { ArrowRight, Mail, FileDown, Code2, Server, Cpu, Copy, Check, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Hero({ profile }) {
  const [activeTab, setActiveTab] = useState('code');
  const [copied, setCopied] = useState(false);

  const name = profile?.name || 'Sanjay Ashwin P';
  const title = profile?.title || 'Java & Full-Stack Developer';
  const bio = profile?.bio || 'Computer Science undergraduate focused on Java, Spring Boot, REST APIs, and full-stack development.';
  const githubUrl = profile?.githubUrl || 'https://github.com/sanjayashwinP';
  const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/sanjay-ashwin-62b566376';
  const resumeUrl = profile?.resumeUrl || '/Sanjay_Ashwin_Resume.pdf';
  const avatarUrl = profile?.avatarUrl || (typeof window !== 'undefined' ? localStorage.getItem('portfolio_avatar') : null);

  const formatHeroName = (rawName) => {
    if (!rawName) return 'Sanjay Ashwin P';
    const trimmed = rawName.trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1];
      if (lastPart.length <= 3) {
        return parts.slice(0, -1).join(' ') + '\u00A0' + lastPart;
      }
    }
    return trimmed;
  };

  const codeSnippet = `@RestController
@RequestMapping("/api/v1/code")
public class ExecutionController {

    private final Judge0ExecutionService judge0Service;
    private final GeminiAiDiagnosticService geminiService;

    @PostMapping("/execute")
    public ResponseEntity<ApiResponse<ExecutionResult>> execute(
            @Valid @RequestBody CodeSubmissionDto submission) {
        
        // Secure remote execution via Judge0
        ExecutionResult result = judge0Service.run(submission);
        
        if (result.hasError()) {
            // Contextual AI explanation & hints
            result.setAiExplanation(geminiService.diagnose(result));
        }
        
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        {/* Left Column: Developer Overview & Call to Action */}
        <div className="hero-content">
          <div className="hero-profile-row">
            <div className="hero-avatar-wrapper">
              {avatarUrl ? (
                <div className="hero-avatar-frame">
                  <img src={avatarUrl} alt={name} className="hero-avatar-img" />
                  <span className="hero-avatar-status" title="Open for SDE Roles & Internships"></span>
                </div>
              ) : (
                <div className="hero-avatar-placeholder">
                  <span className="hero-avatar-initials">SA</span>
                  <span className="hero-avatar-status" title="Open for SDE Roles & Internships"></span>
                </div>
              )}
            </div>

            <div className="hero-profile-meta">
              <div className="hero-status-pill">
                <span className="status-indicator-dot"></span>
                <span>Open for SDE Roles & Internships</span>
              </div>
              <div className="hero-meta-details">
                <div className="hero-meta-workplace">
                  Saveetha Engineering College • <span className="font-mono">CGPA 8.4</span>
                </div>
                <div className="hero-meta-loc">
                  Chennai, India
                </div>
              </div>
            </div>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="highlight-text">{formatHeroName(name)}</span>
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
              <span>Get In Touch</span>
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              download="Sanjay_Ashwin_Resume.pdf"
            >
              <FileDown size={16} />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Social Profiles */}
          <div className="hero-socials">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub Profile"
              >
                <Github size={17} />
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
                <Linkedin size={17} />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Engineering Spotlight (Replaces fake AI curl terminal) */}
        <div className="hero-visual">
          <div className="spotlight-card card">
            <div className="spotlight-header">
              <div className="spotlight-tabs">
                <button
                  type="button"
                  className={`spotlight-tab ${activeTab === 'code' ? 'active' : ''}`}
                  onClick={() => setActiveTab('code')}
                >
                  <Code2 size={15} />
                  <span>Spring Controller</span>
                </button>
                <button
                  type="button"
                  className={`spotlight-tab ${activeTab === 'arch' ? 'active' : ''}`}
                  onClick={() => setActiveTab('arch')}
                >
                  <Server size={15} />
                  <span>Architecture</span>
                </button>
                <button
                  type="button"
                  className={`spotlight-tab ${activeTab === 'metrics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('metrics')}
                >
                  <Cpu size={15} />
                  <span>Key Stats</span>
                </button>
              </div>

              {activeTab === 'code' && (
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="spotlight-copy-btn"
                  title={copied ? 'Copied to clipboard' : 'Copy code snippet'}
                >
                  {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <div className="spotlight-body">
              {activeTab === 'code' && (
                <div className="code-view font-mono">
                  <div className="code-meta-bar">
                    <span className="code-lang-pill">Java 21</span>
                    <span className="code-file-name">ExecutionController.java</span>
                  </div>
                  <pre className="code-block">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              )}

              {activeTab === 'arch' && (
                <div className="architecture-view">
                  <div className="arch-flow-title">
                    <Sparkles size={16} className="text-accent" />
                    <span>AI Online Coding Platform Data Flow</span>
                  </div>

                  <div className="arch-steps-grid">
                    <div className="arch-step-item">
                      <div className="arch-step-badge">1. Client</div>
                      <h4>React + Monaco Editor</h4>
                      <p>Syntax highlighting, multi-language code input, JWT session validation.</p>
                    </div>

                    <div className="arch-step-connector">↓</div>

                    <div className="arch-step-item highlight">
                      <div className="arch-step-badge">2. Backend Core</div>
                      <h4>Spring Boot 3 REST API</h4>
                      <p>Validation, submission routing, asynchronous rate limiting & security.</p>
                    </div>

                    <div className="arch-step-connector">↓</div>

                    <div className="arch-step-item">
                      <div className="arch-step-badge">3. Engines & Persistence</div>
                      <h4>Judge0 + Gemini AI + MySQL</h4>
                      <p>Remote sandboxed compilation, AI error diagnosis, and submission logs.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="metrics-view">
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <span className="metric-val">8.4</span>
                      <span className="metric-desc">Undergraduate CGPA</span>
                      <span className="metric-sub">Saveetha Engineering College</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-val">2027</span>
                      <span className="metric-desc">B.E. Computer Science</span>
                      <span className="metric-sub">Class of 2023 - 2027</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-val">Java Intern</span>
                      <span className="metric-desc">Codveda Technologies</span>
                      <span className="metric-sub">REST APIs & Spring Boot</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-val">3+ Certs</span>
                      <span className="metric-desc">AWS & Spring Boot</span>
                      <span className="metric-sub">Cloud & Backend Verified</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
