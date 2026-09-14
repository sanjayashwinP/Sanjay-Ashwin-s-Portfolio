import React from 'react';
import { Server, Database, Code, Award, GraduationCap, Briefcase } from 'lucide-react';

export default function About({ profile }) {
  const cgpa = profile?.cgpa || '8.4';
  const educationSummary = profile?.educationSummary || 'B.E. Computer Science and Engineering, Saveetha Engineering College (2023 - 2027)';

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">01 // Background</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A developer passionate about building reliable backend services, secure RESTful APIs, and full-stack software applications.
          </p>
        </div>

        <div className="about-grid">
          {/* Narrative description */}
          <div className="about-story">
            <p className="about-text">
              I am a Computer Science and Engineering undergraduate at <strong>Saveetha Engineering College</strong> (2023 – 2027) with a current <strong>CGPA of {cgpa}</strong>.
            </p>
            <p className="about-text">
              My core technical focus centers on <strong>Java backend development and modern full-stack web engineering</strong>. I have built comprehensive applications using <strong>Spring Boot, Spring Security, MySQL, and ReactJS</strong>, emphasizing clean code, modular architecture, and industry-standard REST API design.
            </p>
            <p className="about-text">
              Through my internship at <strong>Codveda Technologies</strong> and hands-on projects like the <strong>AI Integrated Online Coding Platform</strong>, I have gained real-world experience designing CRUD operations, integrating third-party APIs (Judge0 compilation engine, Google Gemini AI), and writing maintainable code with Maven and Git.
            </p>

            {/* Quick Metrics */}
            <div className="about-metrics">
              <div className="metric-box">
                <span className="metric-number">{cgpa}</span>
                <span className="metric-label">Undergraduate CGPA</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">2027</span>
                <span className="metric-label">Graduation Year</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">Java & Spring</span>
                <span className="metric-label">Core Specialization</span>
              </div>
            </div>
          </div>

          {/* Core Competencies Cards */}
          <div className="about-cards-col">
            <div className="card about-feature-card">
              <div className="feature-icon-wrapper">
                <Server size={22} />
              </div>
              <div>
                <h3 className="feature-title">Backend & REST APIs</h3>
                <p className="feature-desc">
                  Developing high-performance RESTful APIs with Spring Boot, Spring Security, JWT authentication, and structured validation.
                </p>
              </div>
            </div>

            <div className="card about-feature-card">
              <div className="feature-icon-wrapper">
                <Database size={22} />
              </div>
              <div>
                <h3 className="feature-title">Database & Persistence</h3>
                <p className="feature-desc">
                  Designing relational schemas in MySQL, writing optimized SQL queries, and utilizing Spring Data JPA for persistent data integrity.
                </p>
              </div>
            </div>

            <div className="card about-feature-card">
              <div className="feature-icon-wrapper">
                <Code size={22} />
              </div>
              <div>
                <h3 className="feature-title">Full-Stack Integration</h3>
                <p className="feature-desc">
                  Bridging ReactJS frontends with Spring Boot backends, embedding Monaco Editor IDE support, and integrating real-time compilation engines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
