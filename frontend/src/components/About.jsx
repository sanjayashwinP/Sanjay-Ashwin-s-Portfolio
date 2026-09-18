import React from 'react';
import { User, Server, Database, Code2 } from 'lucide-react';

export default function About({ profile }) {
  const cgpa = profile?.cgpa || '8.4';
  const avatarUrl = profile?.avatarUrl || (typeof window !== 'undefined' ? localStorage.getItem('portfolio_avatar') : null);

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <User size={14} />
            <span>About Sanjay</span>
          </span>
          <h2 className="section-title">Background & Engineering Focus</h2>
          <p className="section-subtitle">
            A software developer passionate about building reliable backend systems, secure RESTful microservices, and cohesive full-stack applications.
          </p>
        </div>

        <div className="about-grid">
          {/* Narrative description & Metrics */}
          <div className="about-story">
            {avatarUrl && (
              <div className="about-avatar-preview card">
                <div className="about-avatar-img-wrap">
                  <img src={avatarUrl} alt={profile?.name || 'Sanjay Ashwin P'} className="about-avatar-img" />
                </div>
                <div className="about-avatar-caption">
                  <div className="about-avatar-header">
                    <h3 className="about-avatar-name">{profile?.name || 'Sanjay Ashwin P'}</h3>
                    <span className="badge badge-accent font-mono">CGPA {cgpa}</span>
                  </div>
                  <span className="avatar-role-text">{profile?.title || 'Java & Full-Stack Developer'}</span>
                  <span className="avatar-college-text font-mono">Saveetha Engineering College (2023–2027)</span>
                </div>
              </div>
            )}

            <div className="about-text-content">
              <p className="about-text">
                I am a Computer Science and Engineering undergraduate at <strong>Saveetha Engineering College</strong> (2023 – 2027) with an academic record of <strong>CGPA {cgpa}</strong>.
              </p>
              <p className="about-text">
                My primary expertise lies in <strong>Java backend development and modern full-stack web engineering</strong>. I focus on developing clean, testable, and maintainable systems using <strong>Spring Boot, Spring Security, MySQL, and ReactJS</strong>, following industry-standard REST architectural patterns.
              </p>
              <p className="about-text">
                Through my internship at <strong>Codveda Technologies</strong> and hands-on projects such as the <strong>AI Integrated Online Coding Platform</strong>, I have gained practical experience implementing JWT authentication, integrating external services (Judge0 compilation engine, Google Gemini AI), and managing collaborative Git workflows.
              </p>
            </div>

            {/* Elevated Highlights */}
            <div className="about-metrics">
              <div className="metric-box card">
                <span className="metric-number">{cgpa}</span>
                <span className="metric-label">Undergraduate CGPA</span>
              </div>
              <div className="metric-box card">
                <span className="metric-number">2027</span>
                <span className="metric-label">Graduation Year</span>
              </div>
              <div className="metric-box card">
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
              <div className="feature-text-content">
                <h3 className="feature-title">Backend Architecture & REST APIs</h3>
                <p className="feature-desc">
                  Building modular RESTful APIs using Spring Boot, Spring Security with stateless JWT authorization, request validation, and clean controller-service-repository patterns.
                </p>
              </div>
            </div>

            <div className="card about-feature-card">
              <div className="feature-icon-wrapper">
                <Database size={22} />
              </div>
              <div className="feature-text-content">
                <h3 className="feature-title">Database Design & Persistence</h3>
                <p className="feature-desc">
                  Structuring relational database schemas in MySQL, query optimization, indexing, and leveraging Spring Data JPA / Hibernate for transactional integrity.
                </p>
              </div>
            </div>

            <div className="card about-feature-card">
              <div className="feature-icon-wrapper">
                <Code2 size={22} />
              </div>
              <div className="feature-text-content">
                <h3 className="feature-title">Full-Stack Application Development</h3>
                <p className="feature-desc">
                  Bridging reactive ReactJS interfaces with secure Spring Boot services, integrating Monaco Editor environments, Judge0 sandbox executors, and AI APIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
