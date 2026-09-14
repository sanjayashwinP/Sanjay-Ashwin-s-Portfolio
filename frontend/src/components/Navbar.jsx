import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, FileDown, Lock, Code2 } from 'lucide-react';

export default function Navbar({ profile }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const resumeUrl = profile?.resumeUrl || '/Sanjay_Ashwin_Resume.pdf';

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="nav-brand" aria-label="Sanjay Ashwin Portfolio Home">
          <span className="brand-badge"><Code2 size={18} /></span>
          <span className="brand-name">{profile?.name || 'Sanjay Ashwin'}</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Resume Download CTA */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm resume-btn"
            download="Sanjay_Ashwin_Resume.pdf"
            aria-label="Download Sanjay Ashwin Resume PDF"
          >
            <FileDown size={15} />
            <span>Resume</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Admin Dashboard Entry */}
          <a
            href="/admin/dashboard"
            className="icon-btn admin-link-btn"
            aria-label="Admin Dashboard"
            title="Admin Dashboard"
          >
            <Lock size={16} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="icon-btn mobile-menu-toggle"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" id="mobileMenu">
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mobile-nav-divider"></li>
              <li>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mobile-resume-btn"
                  download="Sanjay_Ashwin_Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileDown size={16} />
                  Download Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
