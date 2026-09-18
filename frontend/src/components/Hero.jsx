import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Mail, FileDown, 
  Code2, Briefcase, FolderGit2, GraduationCap, FileText, 
  RotateCcw 
} from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Hero({ profile }) {
  const name = profile?.name || 'Sanjay Ashwin P';
  const title = profile?.title || 'Java & Full-Stack Developer';
  const bio = profile?.bio || 'Computer Science undergraduate focused on Java, Spring Boot, REST APIs, and modern full-stack engineering.';
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

  // Terminal history & state initialized with resume profile summary
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'ascii', content: 'ascii-banner' },
    { type: 'overview', content: 'initial-overview' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalBottomRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalHistory]);

  const executeCommand = (cmd) => {
    const cleanCmd = (cmd || '').trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear' || cleanCmd === 'cls') {
      setTerminalHistory([]);
      setInputVal('');
      return;
    }

    let output = null;

    switch (cleanCmd) {
      case 'skills':
      case 'skill':
      case 'tech':
      case 'stack':
        output = {
          type: 'skills',
          title: 'Technical Skills & Core Stack',
          sections: [
            { label: 'Backend Core', items: 'Java 21, Spring Boot 3, Spring Security, REST APIs, JWT Authentication' },
            { label: 'Database & ORM', items: 'MySQL, JPA / Hibernate, Relational Data Modeling, CRUD' },
            { label: 'Frontend', items: 'ReactJS, JavaScript (ES6+), HTML5, CSS3, Responsive UI' },
            { label: 'Architecture', items: 'Object-Oriented Programming (OOP), Java Collections, Microservices' },
            { label: 'Dev Tools & Cloud', items: 'Git, GitHub, Maven, Postman, AWS Cloud Foundations, IntelliJ, VS Code' }
          ]
        };
        break;

      case 'experience':
      case 'internship':
      case 'work':
        output = {
          type: 'experience',
          title: 'Professional Experience',
          company: 'Codveda Technologies',
          role: 'Java Development Intern',
          period: 'June 2026 – July 2026',
          location: 'Chennai, India',
          points: [
            'Engineered scalable RESTful APIs with Spring Boot and Java for core backend services.',
            'Implemented robust CRUD operations and integrated MySQL databases via JPA/Hibernate.',
            'Applied OOP principles and Java Collections Framework for modular, clean architecture.',
            'Conducted thorough API verification and automated endpoint testing using Postman and Maven.'
          ]
        };
        break;

      case 'projects':
      case 'project':
      case 'flagship':
        output = {
          type: 'projects',
          title: 'Featured Project: AI Integrated Online Coding Platform',
          year: '2025',
          tech: 'ReactJS, Spring Boot, Judge0 API, Google Gemini API, Monaco Editor, REST APIs',
          points: [
            'Integrated Judge0 API to enable secure, real-time remote compilation across languages.',
            'Implemented Gemini AI API to provide intelligent error explanations and automated hints.',
            'Built Spring Boot backend REST APIs to coordinate compiler jobs and manage submissions.',
            'Embedded Monaco Editor in React for an IDE-grade user experience with syntax highlighting.'
          ],
          repo: 'https://github.com/sanjayashwinP'
        };
        break;

      case 'education':
      case 'academic':
      case 'college':
        output = {
          type: 'education',
          title: 'Academic Credentials',
          institution: 'Saveetha Engineering College',
          degree: 'Bachelor of Engineering (B.E.)',
          major: 'Computer Science and Engineering',
          period: '2023 – 2027',
          cgpa: '8.4 / 10.0',
          location: 'Chennai, India',
          certifications: 'AWS Academy Cloud Foundations • Prompt Engineering (Simplilearn)'
        };
        break;

      case 'resume':
      case 'cv':
      case 'pdf':
        output = {
          type: 'resume',
          title: 'Resume Overview — Sanjay Ashwin P',
          summary: 'Java & Full-Stack Developer with strong backend foundation in Spring Boot, Spring Security, REST APIs, and modern React.',
          education: 'B.E. CSE @ Saveetha Engineering College (CGPA: 8.4)',
          experience: 'Java Dev Intern @ Codveda Technologies',
          file: 'Sanjay_Ashwin_Resume.pdf',
          hint: 'Click "Resume PDF" in the hero header to download the verified PDF.'
        };
        break;

      case 'contact':
      case 'email':
      case 'socials':
        output = {
          type: 'contact',
          title: 'Direct Contact Channels',
          items: [
            { label: 'Email', val: 'sanjayashwin502@gmail.com' },
            { label: 'LinkedIn', val: 'linkedin.com/in/sanjay-ashwin-62b566376' },
            { label: 'GitHub', val: 'github.com/sanjayashwinP' },
            { label: 'Phone', val: '+91-8870794020' },
            { label: 'Location', val: 'Chennai, Tamil Nadu, India' }
          ]
        };
        break;

      case 'whoami':
      case 'bio':
      case 'about':
        output = {
          type: 'text',
          text: `Sanjay Ashwin P — Computer Science and Engineering undergraduate & Java Full-Stack Developer specializing in Spring Boot microservices, secure REST APIs, and React interfaces.`
        };
        break;

      case 'help':
        output = {
          type: 'help',
          text: `Available interactive commands:\n  skills      - Technical skills and stack breakdown ⚡\n  experience  - Codveda Technologies internship details 💼\n  projects    - AI coding platform & architecture 🚀\n  education   - Saveetha Engineering College & CGPA 🎓\n  resume      - Resume summary & download info 📄\n  contact     - Direct contact channels & links 📬\n  whoami      - Professional bio and profile overview 👤\n  clear       - Clear the terminal console 🧹`
        };
        break;

      default:
        output = {
          type: 'error',
          text: `Command not recognized: "${cleanCmd}". Type "help" or click one of the quick chips above.`
        };
        break;
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', cmd: cleanCmd },
      output
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        {/* Left Column: Developer Overview & CTAs */}
        <div className="hero-content">
          <div className="hero-profile-row">
            <div className="hero-avatar-wrapper">
              {avatarUrl ? (
                <div className="hero-avatar-frame">
                  <img src={avatarUrl} alt={name} className="hero-avatar-img" />
                </div>
              ) : (
                <div className="hero-avatar-placeholder">
                  <span className="hero-avatar-initials">SA</span>
                </div>
              )}
            </div>

            <div className="hero-profile-meta">
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

          {/* Core Technical Stack Badges */}
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

        {/* Right Column: Professional Dev Console (Useful Resume & Engineering Data) */}
        <div className="hero-visual">
          <div className="terminal-card card">
            {/* Window Header */}
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title font-mono">
                sanjay@workstation: ~ (sanjay-cli)
              </div>
              <div className="terminal-badge font-mono">
                resume-shell v2.4 ⚡
              </div>
            </div>

            {/* Quick Interactive Command Pills */}
            <div className="terminal-quick-actions">
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('skills')}
                title="View Technical Skills & Stack"
              >
                <Code2 size={12} />
                <span>skills</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('experience')}
                title="View Work Experience & Internship"
              >
                <Briefcase size={12} />
                <span>experience</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('projects')}
                title="View Featured Projects"
              >
                <FolderGit2 size={12} />
                <span>projects</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('education')}
                title="View Academic Credentials & CGPA"
              >
                <GraduationCap size={12} />
                <span>education</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('resume')}
                title="View Resume Summary"
              >
                <FileText size={12} />
                <span>resume</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('contact')}
                title="View Contact Channels"
              >
                <Mail size={12} />
                <span>contact</span>
              </button>
              <button
                type="button"
                className="term-chip clear-chip"
                onClick={() => executeCommand('clear')}
                title="Clear screen"
              >
                <RotateCcw size={12} />
                <span>clear</span>
              </button>
            </div>

            {/* Terminal Screen Body */}
            <div className="terminal-body font-mono">
              {terminalHistory.map((item, idx) => {
                if (item.type === 'ascii') {
                  return (
                    <div key={idx} className="term-ascii-art">
                      <pre>
{`  ____    _    _   _     _    __   __
 / ___|  / \\  | \\ | |   | |  /\\ \\ / /
 \\___ \\ / _ \\ |  \\| |_  | | /  \\ V / 
  ___) / ___ \\| |\\  | |_| |/ /\\ \\| |  
 |____/_/   \\_\\_| \\_|\\___//_/  \\_\\_|`}
                      </pre>
                    </div>
                  );
                }

                if (item.type === 'overview') {
                  return (
                    <div key={idx} className="term-overview-block">
                      <div className="overview-header">
                        SANJAY ASHWIN P • Java & Full-Stack Developer
                      </div>
                      <div className="overview-sub">
                        Saveetha Engineering College • CGPA: 8.4 • Chennai, India
                      </div>
                      <div className="overview-divider"></div>
                      <div className="overview-row">
                        <span className="overview-key">Internship</span>
                        <span className="overview-val">Java Dev Intern @ Codveda Technologies</span>
                      </div>
                      <div className="overview-row">
                        <span className="overview-key">Core Stack</span>
                        <span className="overview-val amber-highlight">Java 21 • Spring Boot 3 • MySQL • ReactJS • REST APIs</span>
                      </div>
                      <div className="overview-row">
                        <span className="overview-key">Flagship</span>
                        <span className="overview-val">AI Integrated Online Coding Platform (Judge0 + Gemini)</span>
                      </div>
                      <div className="overview-row">
                        <span className="overview-key">Certifications</span>
                        <span className="overview-val green-highlight">AWS Cloud Foundations • Prompt Engineering</span>
                      </div>
                      <div className="overview-hint">
                        💡 Click a chip above or type <span className="amber-highlight">skills</span>, <span className="amber-highlight">experience</span>, or <span className="amber-highlight">projects</span>
                      </div>
                    </div>
                  );
                }

                if (item.type === 'command') {
                  return (
                    <div key={idx} className="term-input-echo">
                      <span className="term-prompt">sanjay@workstation:~$</span>
                      <span className="term-cmd-text">{item.cmd}</span>
                    </div>
                  );
                }

                if (item.type === 'skills') {
                  return (
                    <div key={idx} className="term-output-block skills">
                      <div className="term-section-title">⚡ {item.title}</div>
                      {item.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="term-skill-row">
                          <span className="term-skill-label">{sec.label}:</span>
                          <span className="term-skill-items">{sec.items}</span>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (item.type === 'experience') {
                  return (
                    <div key={idx} className="term-output-block experience">
                      <div className="term-section-title">💼 {item.title}</div>
                      <div className="term-company-header">
                        <span className="amber-highlight">{item.company}</span> — {item.role}
                      </div>
                      <div className="term-sub-detail">{item.period} • {item.location}</div>
                      <ul className="term-bullet-list">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx}>▹ {pt}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (item.type === 'projects') {
                  return (
                    <div key={idx} className="term-output-block projects">
                      <div className="term-section-title">🚀 {item.title}</div>
                      <div className="term-sub-detail"><span className="amber-highlight">Tech:</span> {item.tech}</div>
                      <ul className="term-bullet-list">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx}>▹ {pt}</li>
                        ))}
                      </ul>
                      <div className="term-sub-detail">
                        🔗 Codebase: <a href={item.repo} target="_blank" rel="noopener noreferrer" className="term-link">{item.repo}</a>
                      </div>
                    </div>
                  );
                }

                if (item.type === 'education') {
                  return (
                    <div key={idx} className="term-output-block education">
                      <div className="term-section-title">🎓 {item.title}</div>
                      <div className="term-company-header"><span className="amber-highlight">{item.institution}</span></div>
                      <div className="term-sub-detail">{item.degree} in {item.major}</div>
                      <div className="term-sub-detail">{item.period} • {item.location}</div>
                      <div className="term-sub-detail"><span className="green-highlight">Academic Performance:</span> CGPA {item.cgpa}</div>
                      <div className="term-sub-detail"><span className="amber-highlight">Certifications:</span> {item.certifications}</div>
                    </div>
                  );
                }

                if (item.type === 'resume') {
                  return (
                    <div key={idx} className="term-output-block resume">
                      <div className="term-section-title">📄 {item.title}</div>
                      <p className="term-resume-desc">{item.summary}</p>
                      <div className="term-sub-detail">• <span className="amber-highlight">Education:</span> {item.education}</div>
                      <div className="term-sub-detail">• <span className="amber-highlight">Experience:</span> {item.experience}</div>
                      <div className="term-sub-detail">• <span className="amber-highlight">File:</span> {item.file}</div>
                      <div className="term-resume-cta">
                        <a 
                          href={resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="term-action-btn"
                          download="Sanjay_Ashwin_Resume.pdf"
                        >
                          ⬇️ Open / Download Resume PDF
                        </a>
                      </div>
                    </div>
                  );
                }

                if (item.type === 'contact') {
                  return (
                    <div key={idx} className="term-output-block contact">
                      <div className="term-section-title">📬 {item.title}</div>
                      {item.items.map((ci, cIdx) => (
                        <div key={cIdx} className="term-contact-row">
                          <span className="term-contact-label">{ci.label}:</span>
                          <span className="term-contact-val">{ci.val}</span>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <div key={idx} className={`term-output-block ${item.type}`}>
                    <pre>{item.text}</pre>
                  </div>
                );
              })}

              {/* Live Interactive Input Line */}
              <div className="term-live-prompt-row">
                <span className="term-prompt">sanjay@workstation:~$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type 'skills', 'experience', 'projects', 'resume'..."
                  className="term-input-field"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <div ref={terminalBottomRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
