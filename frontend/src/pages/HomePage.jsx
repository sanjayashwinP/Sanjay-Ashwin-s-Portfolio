import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { portfolioService, defaultPortfolioData } from '../services/portfolioService';
import { Layers, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [data, setData] = useState(defaultPortfolioData);
  const [_loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const result = await portfolioService.getPortfolioData();
        if (isMounted && result) {
          setData(result);
        }
      } catch (err) {
        console.error("Error loading portfolio data:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = data?.projects || [];
  const projectCategories = ['All', 'Featured', 'Full-Stack', 'AI/ML'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return project.featured;
    if (activeFilter === 'Full-Stack') {
      return (
        project.technologies?.toLowerCase().includes('react') &&
        project.technologies?.toLowerCase().includes('spring')
      );
    }
    if (activeFilter === 'AI/ML') {
      return (
        project.technologies?.toLowerCase().includes('gemini') ||
        project.technologies?.toLowerCase().includes('ai')
      );
    }
    return true;
  });

  return (
    <div className="portfolio-app">
      {/* Top Navigation */}
      <Navbar profile={data.profile} />

      <main id="main-content">
        {/* Hero Section */}
        <Hero profile={data.profile} />

        {/* About Section */}
        <About profile={data.profile} education={data.education} />

        {/* Skills Section */}
        <Skills skillsByCategory={data.skillsByCategory} />

        {/* Projects Showcase Section */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">
                <Layers size={14} />
                <span>Featured Engineering Work</span>
              </span>
              <h2 className="section-title">Projects & Systems</h2>
              <p className="section-subtitle">
                Production-grade applications and technical prototypes demonstrating end-to-end full-stack development, API design, and third-party integrations.
              </p>

              {/* Category Filter Pills */}
              <div className="project-filter-tabs">
                {projectCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-tab-btn ${activeFilter === cat ? 'active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {cat === 'Featured' && <Sparkles size={13} />}
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenModal={handleOpenProjectModal}
                  />
                ))
              ) : (
                <div className="empty-projects-msg">
                  <p>No projects found matching the selected filter.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <Experience experienceList={data.experience} />

        {/* Education Section */}
        <Education educationList={data.education} />

        {/* Certifications Section */}
        <Certifications certificationsList={data.certifications} />

        {/* Contact Section */}
        <Contact profile={data.profile} />
      </main>

      {/* Footer */}
      <Footer profile={data.profile} />

      {/* Accessible Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
