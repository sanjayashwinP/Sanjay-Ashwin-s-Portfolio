import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Mail, FileDown, Sparkles, Coffee, Music, Dice5, HelpCircle, RotateCcw } from 'lucide-react';
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

  // Unique Non-Project Developer Quotes
  const quotes = [
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
    '"Make it work, make it right, make it fast." — Kent Beck',
    '"Code is like humor. When you have to explain it, it’s bad." — Cory House',
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler'
  ];

  const tracks = [
    '🎵 Lofi Beats to Code/Relax to (ChilledCow / Lofi Girl)',
    '🎧 Synthwave Chill / Retrowave Instrumental',
    '☕ Coffee Shop Ambient Jazz & Coding Flow',
    '🚀 Hans Zimmer - Interstellar OST / Focus Engine'
  ];

  // Terminal history & state
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'ascii', content: 'ascii-banner' },
    { type: 'sysinfo', content: 'initial-sysinfo' }
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
      case 'coffee':
      case 'brew':
        output = {
          type: 'coffee',
          text: `[Brewing...] 100% Arabica beans ground.\nWater heated to 94°C.\nExtraction complete!\n\n   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   \`----\nFresh espresso brewed! Coffee Level: 100% ☕`
        };
        break;
      case 'quote':
      case 'wisdom':
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        output = {
          type: 'quote',
          text: `💡 Engineering Philosophy:\n${randomQuote}`
        };
        break;
      case 'music':
      case 'vibe':
      case 'soundtrack':
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        output = {
          type: 'music',
          text: `Current Audio Stream:\n${randomTrack}\nStatus: Playing • 128kbps stereo`
        };
        break;
      case 'roll':
      case 'dice':
        const rollVal = Math.floor(Math.random() * 20) + 1;
        const msg = rollVal === 20 ? 'CRITICAL HIT! (Natural 20) 🎯' : rollVal === 1 ? 'Critical fumble! (Natural 1) 😅' : `You rolled: ${rollVal} on a D20.`;
        output = {
          type: 'roll',
          text: `🎲 ${msg}`
        };
        break;
      case 'sysinfo':
      case 'neofetch':
        output = {
          type: 'sysinfo',
          content: 'user-sysinfo'
        };
        break;
      case 'help':
        output = {
          type: 'text',
          text: `Available interactive commands:\n  coffee     - Brew a virtual espresso cup ☕\n  quote      - Display an inspiring engineering quote 💡\n  music      - Check current coding soundtrack 🎧\n  roll       - Roll a 20-sided polyhedral die 🎲\n  sysinfo    - Print developer workstation profile ⚡\n  clear      - Clear the console screen 🧹`
        };
        break;
      default:
        output = {
          type: 'error',
          text: `Command not found: "${cleanCmd}". Type "help" or click one of the preset pills above.`
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

        {/* Right Column: Unique Interactive Developer Console (Zero Project Info) */}
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
                sanjay@workstation: ~ (zsh)
              </div>
              <div className="terminal-badge font-mono">
                live ⚡
              </div>
            </div>

            {/* Quick Interactive Command Pills */}
            <div className="terminal-quick-actions">
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('coffee')}
                title="Brew virtual espresso"
              >
                <Coffee size={12} />
                <span>coffee</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('quote')}
                title="Generate wisdom quote"
              >
                <Sparkles size={12} />
                <span>quote</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('music')}
                title="Coding soundtrack"
              >
                <Music size={12} />
                <span>music</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('roll')}
                title="Roll a 20-sided die"
              >
                <Dice5 size={12} />
                <span>roll</span>
              </button>
              <button
                type="button"
                className="term-chip"
                onClick={() => executeCommand('help')}
                title="List all commands"
              >
                <HelpCircle size={12} />
                <span>help</span>
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

                if (item.type === 'sysinfo') {
                  return (
                    <div key={idx} className="term-sysinfo-block">
                      <div className="sysinfo-line"><span className="sys-key">user</span>     <span className="sys-val">sanjay ashwin</span></div>
                      <div className="sysinfo-line"><span className="sys-key">role</span>     <span className="sys-val">software developer</span></div>
                      <div className="sysinfo-line"><span className="sys-key">shell</span>    <span className="sys-val">zsh 5.9 (x86_64-devbox)</span></div>
                      <div className="sysinfo-line"><span className="sys-key">editors</span>  <span className="sys-val">intellij idea & vs code</span></div>
                      <div className="sysinfo-line"><span className="sys-key">fuel</span>     <span className="sys-val amber-highlight">double espresso ☕ (98%)</span></div>
                      <div className="sysinfo-line"><span className="sys-key">audio</span>    <span className="sys-val">synthwave & lofi beats 🎧</span></div>
                      <div className="sysinfo-line"><span className="sys-key">uptime</span>   <span className="sys-val green-highlight">continuous learning & building</span></div>
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
                  placeholder="type 'coffee', 'quote', 'music', 'roll'..."
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
