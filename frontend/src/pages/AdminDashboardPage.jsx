import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { portfolioService, defaultPortfolioData } from '../services/portfolioService';
import { adminService } from '../services/adminService';
import {
  Layers, User, Award, Briefcase, GraduationCap, Mail, CheckCircle2,
  AlertCircle, LogOut, ExternalLink, Plus, Trash2, Edit3, Save, X,
  Sun, Moon, Shield, RefreshCw, Eye, MessageSquare, Sparkles
} from 'lucide-react';

export default function AdminDashboardPage({ onNavigate }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Data states
  const [stats, setStats] = useState({ totalProjects: 0, totalSkills: 0, totalCertifications: 0, unreadMessages: 0 });
  const [profile, setProfile] = useState(defaultPortfolioData.profile);
  const [projects, setProjects] = useState([]);
  const [skillsByCategory, setSkillsByCategory] = useState({});
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modals & form states
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    year: '2025',
    tagline: '',
    description: '',
    technologies: '',
    features: '',
    githubUrl: '',
    liveDemoUrl: '',
    featured: true,
    problemStatement: '',
    solutionStatement: '',
    architectureNotes: '',
    contributions: '',
    futureImprovements: ''
  });

  const [newSkill, setNewSkill] = useState({ name: '', category: 'Languages', proficiencyLevel: 'Proficient' });
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceForm, setExperienceForm] = useState({
    company: '', role: '', location: '', startDate: '', endDate: '', isCurrent: false, description: '', technologies: ''
  });

  const [editingEducation, setEditingEducation] = useState(null);
  const [educationForm, setEducationForm] = useState({
    institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', cgpa: '', location: ''
  });

  const [editingCertification, setEditingCertification] = useState(null);
  const [certificationForm, setCertificationForm] = useState({
    name: '', issuer: '', issueDate: '', credentialUrl: '', credentialId: ''
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadAllData = async () => {
    setRefreshing(true);
    try {
      const [portfolioRes, statsRes, messagesRes] = await Promise.allSettled([
        portfolioService.getPortfolioData(),
        adminService.getDashboardStats(),
        adminService.getAllMessages()
      ]);

      if (portfolioRes.status === 'fulfilled' && portfolioRes.value) {
        const p = portfolioRes.value;
        if (p.profile) setProfile(p.profile);
        if (p.projects) setProjects(p.projects);
        if (p.skillsByCategory) setSkillsByCategory(p.skillsByCategory);
        if (p.experience) setExperience(p.experience);
        if (p.education) setEducation(p.education);
        if (p.certifications) setCertifications(p.certifications);
      }

      if (statsRes.status === 'fulfilled' && statsRes.value) {
        setStats(statsRes.value);
      }

      if (messagesRes.status === 'fulfilled' && messagesRes.value) {
        setMessages(messagesRes.value);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      showNotification("Failed to load some dashboard items from API.", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('/admin/login');
    } else {
      window.history.pushState({}, '', '/admin/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleViewLive = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // --- Profile handlers ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updated = await adminService.updateProfile(profile);
      setProfile(updated);
      showNotification("Profile details saved successfully!");
    } catch (err) {
      showNotification(err.message || "Failed to update profile", "error");
    }
  };

  // --- Project handlers ---
  const handleOpenProjectForm = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({ ...proj });
    } else {
      setEditingProject('new');
      setProjectForm({
        title: '',
        year: new Date().getFullYear().toString(),
        tagline: '',
        description: '',
        technologies: '',
        features: '',
        githubUrl: 'https://github.com/sanjayashwinP',
        liveDemoUrl: '',
        featured: true,
        problemStatement: '',
        solutionStatement: '',
        architectureNotes: '',
        contributions: '',
        futureImprovements: ''
      });
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject === 'new') {
        const created = await adminService.createProject(projectForm);
        setProjects([created, ...projects]);
        showNotification("Project created successfully!");
      } else {
        const updated = await adminService.updateProject(editingProject.id, projectForm);
        setProjects(projects.map(p => p.id === updated.id ? updated : p));
        showNotification("Project updated successfully!");
      }
      setEditingProject(null);
    } catch (err) {
      showNotification(err.message || "Failed to save project", "error");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await adminService.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      showNotification("Project deleted.");
    } catch (err) {
      showNotification(err.message || "Failed to delete project", "error");
    }
  };

  // --- Skill handlers ---
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    try {
      const created = await adminService.createSkill(newSkill);
      const cat = created.category || 'Languages';
      setSkillsByCategory(prev => ({
        ...prev,
        [cat]: [...(prev[cat] || []), created]
      }));
      setNewSkill({ name: '', category: newSkill.category, proficiencyLevel: 'Proficient' });
      showNotification(`Added skill "${created.name}"`);
    } catch (err) {
      showNotification(err.message || "Failed to add skill", "error");
    }
  };

  const handleDeleteSkill = async (id, cat) => {
    try {
      await adminService.deleteSkill(id);
      setSkillsByCategory(prev => ({
        ...prev,
        [cat]: (prev[cat] || []).filter(s => s.id !== id)
      }));
      showNotification("Skill removed.");
    } catch (err) {
      showNotification(err.message || "Failed to remove skill", "error");
    }
  };

  // --- Experience handlers ---
  const handleOpenExperienceForm = (exp = null) => {
    if (exp) {
      setEditingExperience(exp);
      setExperienceForm({ ...exp });
    } else {
      setEditingExperience('new');
      setExperienceForm({
        company: '', role: '', location: 'Chennai, India', startDate: '', endDate: '', isCurrent: false, description: '', technologies: ''
      });
    }
  };

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    try {
      if (editingExperience === 'new') {
        const created = await adminService.createExperience(experienceForm);
        setExperience([...experience, created]);
        showNotification("Experience added.");
      } else {
        const updated = await adminService.updateExperience(editingExperience.id, experienceForm);
        setExperience(experience.map(e => e.id === updated.id ? updated : e));
        showNotification("Experience updated.");
      }
      setEditingExperience(null);
    } catch (err) {
      showNotification(err.message || "Failed to save experience", "error");
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm("Delete this experience entry?")) return;
    try {
      await adminService.deleteExperience(id);
      setExperience(experience.filter(e => e.id !== id));
      showNotification("Experience deleted.");
    } catch (err) {
      showNotification(err.message || "Failed to delete experience", "error");
    }
  };

  // --- Education handlers ---
  const handleOpenEducationForm = (edu = null) => {
    if (edu) {
      setEditingEducation(edu);
      setEducationForm({ ...edu });
    } else {
      setEditingEducation('new');
      setEducationForm({
        institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', cgpa: '8.4', location: 'Chennai, India'
      });
    }
  };

  const handleSaveEducation = async (e) => {
    e.preventDefault();
    try {
      if (editingEducation === 'new') {
        const created = await adminService.createEducation(educationForm);
        setEducation([...education, created]);
        showNotification("Education entry added.");
      } else {
        const updated = await adminService.updateEducation(editingEducation.id, educationForm);
        setEducation(education.map(e => e.id === updated.id ? updated : e));
        showNotification("Education entry updated.");
      }
      setEditingEducation(null);
    } catch (err) {
      showNotification(err.message || "Failed to save education", "error");
    }
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm("Delete this education entry?")) return;
    try {
      await adminService.deleteEducation(id);
      setEducation(education.filter(e => e.id !== id));
      showNotification("Education entry deleted.");
    } catch (err) {
      showNotification(err.message || "Failed to delete education", "error");
    }
  };

  // --- Certification handlers ---
  const handleOpenCertificationForm = (cert = null) => {
    if (cert) {
      setEditingCertification(cert);
      setCertificationForm({ ...cert });
    } else {
      setEditingCertification('new');
      setCertificationForm({
        name: '', issuer: '', issueDate: '2024', credentialUrl: '', credentialId: ''
      });
    }
  };

  const handleSaveCertification = async (e) => {
    e.preventDefault();
    try {
      if (editingCertification === 'new') {
        const created = await adminService.createCertification(certificationForm);
        setCertifications([...certifications, created]);
        showNotification("Certification added.");
      } else {
        const updated = await adminService.updateCertification(editingCertification.id, certificationForm);
        setCertifications(certifications.map(c => c.id === updated.id ? updated : c));
        showNotification("Certification updated.");
      }
      setEditingCertification(null);
    } catch (err) {
      showNotification(err.message || "Failed to save certification", "error");
    }
  };

  const handleDeleteCertification = async (id) => {
    if (!window.confirm("Delete this certification?")) return;
    try {
      await adminService.deleteCertification(id);
      setCertifications(certifications.filter(c => c.id !== id));
      showNotification("Certification deleted.");
    } catch (err) {
      showNotification(err.message || "Failed to delete certification", "error");
    }
  };

  // --- Messages handlers ---
  const handleMarkAsRead = async (id) => {
    try {
      await adminService.markMessageAsRead(id);
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
      setStats(prev => ({ ...prev, unreadMessages: Math.max(0, (prev.unreadMessages || 1) - 1) }));
      showNotification("Message marked as read.");
    } catch (err) {
      showNotification("Failed to update message status", "error");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Delete this contact message?")) return;
    try {
      await adminService.deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
      showNotification("Message removed.");
    } catch (err) {
      showNotification("Failed to delete message", "error");
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="admin-dashboard-app">
      {/* Top Header */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-brand-badge">
            <Shield size={18} />
          </div>
          <div>
            <h1 className="admin-app-title">Portfolio CMS Console</h1>
            <span className="admin-user-pill">
              Logged in as: <strong>{user?.username || 'admin'}</strong>
            </span>
          </div>
        </div>

        <div className="admin-topbar-actions">
          <button
            type="button"
            onClick={loadAllData}
            disabled={refreshing}
            className="icon-btn"
            title="Refresh dashboard data"
          >
            <RefreshCw size={17} className={refreshing ? "spin-icon" : ""} />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            onClick={handleViewLive}
            className="btn btn-outline btn-sm admin-nav-btn"
          >
            <ExternalLink size={15} />
            <span>Live Portfolio</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-secondary btn-sm admin-logout-btn"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Alert Notification */}
      {notification && (
        <div className={`dashboard-toast ${notification.type}`}>
          {notification.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="admin-main-container">
        {/* Navigation Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-nav-menu">
            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Sparkles size={18} />
              <span>Overview</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              <span>Profile & Bio</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Layers size={18} />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <Award size={18} />
              <span>Skills Matrix</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <Briefcase size={18} />
              <span>Experience ({experience.length})</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <GraduationCap size={18} />
              <span>Education ({education.length})</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'certifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('certifications')}
            >
              <Award size={18} />
              <span>Certifications ({certifications.length})</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare size={18} />
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="unread-badge">{unreadCount}</span>
              )}
            </button>
          </nav>
        </aside>

        {/* Tab Content Panels */}
        <main className="admin-content-area">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <h2 className="admin-pane-title">System Metrics & Overview</h2>
              <div className="stats-cards-grid">
                <div className="stat-card card">
                  <div className="stat-icon-wrapper"><Layers size={22} /></div>
                  <div className="stat-details">
                    <span className="stat-number">{projects.length}</span>
                    <span className="stat-label">Projects Published</span>
                  </div>
                </div>

                <div className="stat-card card">
                  <div className="stat-icon-wrapper"><Award size={22} /></div>
                  <div className="stat-details">
                    <span className="stat-number">
                      {Object.values(skillsByCategory).flat().length}
                    </span>
                    <span className="stat-label">Technical Skills</span>
                  </div>
                </div>

                <div className="stat-card card">
                  <div className="stat-icon-wrapper"><Award size={22} /></div>
                  <div className="stat-details">
                    <span className="stat-number">{certifications.length}</span>
                    <span className="stat-label">Certifications</span>
                  </div>
                </div>

                <div className="stat-card card">
                  <div className="stat-icon-wrapper"><Mail size={22} /></div>
                  <div className="stat-details">
                    <span className="stat-number">{messages.length}</span>
                    <span className="stat-label">
                      Inquiries ({unreadCount} new)
                    </span>
                  </div>
                </div>
              </div>

              {/* System Health / Persistence Card */}
              <div className="card admin-info-card" style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={18} color="var(--accent-primary)" />
                  Database & API Engine Status
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  The backend REST API is running on Spring Boot 3 with Spring Security JWT enforcement. Any modifications made in this CMS persist directly to the database and reflect immediately on the public website without needing to redeploy or recompile React.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-accent">Spring Boot 3.2.5</span>
                  <span className="badge badge-accent">Java 21 LTS</span>
                  <span className="badge badge-accent">JPA / Hibernate</span>
                  <span className="badge badge-accent">Stateless JWT Auth</span>
                  <span className="badge badge-success">Live Synchronization Active</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="tab-pane">
              <h2 className="admin-pane-title">Personal Profile & Bio</h2>
              <form onSubmit={handleSaveProfile} className="admin-form card">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      value={profile.name || ''}
                      onChange={e => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Professional Title</label>
                    <input
                      type="text"
                      required
                      value={profile.title || ''}
                      onChange={e => setProfile({ ...profile, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Primary Email</label>
                    <input
                      type="email"
                      required
                      value={profile.email || ''}
                      onChange={e => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={profile.phone || ''}
                      onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={profile.location || ''}
                      onChange={e => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Academic CGPA</label>
                    <input
                      type="text"
                      value={profile.cgpa || ''}
                      onChange={e => setProfile({ ...profile, cgpa: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>GitHub Profile URL</label>
                    <input
                      type="url"
                      value={profile.githubUrl || ''}
                      onChange={e => setProfile({ ...profile, githubUrl: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={profile.linkedinUrl || ''}
                      onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Resume Download URL</label>
                    <input
                      type="text"
                      value={profile.resumeUrl || ''}
                      onChange={e => setProfile({ ...profile, resumeUrl: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Professional Bio</label>
                    <textarea
                      rows={4}
                      required
                      value={profile.bio || ''}
                      onChange={e => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-actions" style={{ marginTop: '1.5rem' }}>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="tab-pane">
              <div className="pane-header">
                <h2 className="admin-pane-title">Projects Management</h2>
                <button
                  type="button"
                  onClick={() => handleOpenProjectForm()}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Project Add/Edit Modal/Inline form */}
              {editingProject && (
                <div className="card admin-form-modal">
                  <div className="modal-header-row">
                    <h3>{editingProject === 'new' ? 'Create New Project' : `Edit Project: ${projectForm.title}`}</h3>
                    <button type="button" onClick={() => setEditingProject(null)} className="icon-btn">
                      <X size={18} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveProject} className="admin-form">
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Year</label>
                        <input
                          type="text"
                          required
                          value={projectForm.year}
                          onChange={e => setProjectForm({ ...projectForm, year: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Tagline</label>
                        <input
                          type="text"
                          required
                          value={projectForm.tagline}
                          onChange={e => setProjectForm({ ...projectForm, tagline: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Description</label>
                        <textarea
                          rows={3}
                          required
                          value={projectForm.description}
                          onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Technologies (comma separated)</label>
                        <input
                          type="text"
                          required
                          value={projectForm.technologies}
                          onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Key Features (semicolon separated)</label>
                        <input
                          type="text"
                          value={projectForm.features || ''}
                          onChange={e => setProjectForm({ ...projectForm, features: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>GitHub Repo URL</label>
                        <input
                          type="url"
                          value={projectForm.githubUrl || ''}
                          onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Live Demo URL (optional)</label>
                        <input
                          type="url"
                          value={projectForm.liveDemoUrl || ''}
                          onChange={e => setProjectForm({ ...projectForm, liveDemoUrl: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Problem Statement</label>
                        <textarea
                          rows={2}
                          value={projectForm.problemStatement || ''}
                          onChange={e => setProjectForm({ ...projectForm, problemStatement: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Solution Statement</label>
                        <textarea
                          rows={2}
                          value={projectForm.solutionStatement || ''}
                          onChange={e => setProjectForm({ ...projectForm, solutionStatement: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Architecture Notes</label>
                        <textarea
                          rows={2}
                          value={projectForm.architectureNotes || ''}
                          onChange={e => setProjectForm({ ...projectForm, architectureNotes: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={projectForm.featured}
                            onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })}
                          />
                          <span>Feature this project on main homepage showcase</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} />
                        <span>Save Project</span>
                      </button>
                      <button type="button" onClick={() => setEditingProject(null)} className="btn btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Projects Table */}
              <div className="admin-table-wrapper card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Year</th>
                      <th>Technologies</th>
                      <th>Featured</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(proj => (
                      <tr key={proj.id}>
                        <td>
                          <strong>{proj.title}</strong>
                        </td>
                        <td>{proj.year}</td>
                        <td>
                          <span className="table-tech-preview">{proj.technologies}</span>
                        </td>
                        <td>
                          {proj.featured ? (
                            <span className="badge badge-success">Featured</span>
                          ) : (
                            <span className="badge">Standard</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="table-actions">
                            <button
                              type="button"
                              onClick={() => handleOpenProjectForm(proj)}
                              className="icon-btn"
                              title="Edit"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(proj.id)}
                              className="icon-btn delete-btn"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === 'skills' && (
            <div className="tab-pane">
              <h2 className="admin-pane-title">Skills Matrix Management</h2>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} className="card admin-form" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>Add New Skill</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Skill Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Docker, Redis, Kubernetes"
                      value={newSkill.name}
                      onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Category</label>
                    <select
                      value={newSkill.category}
                      onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                    >
                      <option value="Languages">Languages</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Tools">Tools</option>
                      <option value="Cloud">Cloud</option>
                      <option value="Concepts">Concepts</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Proficiency</label>
                    <select
                      value={newSkill.proficiencyLevel}
                      onChange={e => setNewSkill({ ...newSkill, proficiencyLevel: e.target.value })}
                    >
                      <option value="Proficient">Proficient</option>
                      <option value="Basics">Basics</option>
                      <option value="Foundational">Foundational</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ height: '42px' }}>
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </form>

              {/* Categorized Skills List */}
              <div className="skills-admin-categories">
                {Object.entries(skillsByCategory).map(([category, list]) => (
                  <div key={category} className="card skill-admin-card" style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                      {category} ({list.length})
                    </h3>
                    <div className="skills-admin-pills">
                      {list.map(skill => (
                        <div key={skill.id} className="skill-admin-pill">
                          <span>{skill.name}</span>
                          <span className="skill-pill-level">({skill.proficiencyLevel || 'Proficient'})</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteSkill(skill.id, category)}
                            className="skill-remove-btn"
                            title={`Remove ${skill.name}`}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="tab-pane">
              <div className="pane-header">
                <h2 className="admin-pane-title">Professional Experience</h2>
                <button
                  type="button"
                  onClick={() => handleOpenExperienceForm()}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} />
                  <span>Add Experience</span>
                </button>
              </div>

              {editingExperience && (
                <div className="card admin-form-modal">
                  <div className="modal-header-row">
                    <h3>{editingExperience === 'new' ? 'Add Internship / Experience' : 'Edit Experience'}</h3>
                    <button type="button" onClick={() => setEditingExperience(null)} className="icon-btn">
                      <X size={18} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveExperience} className="admin-form">
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Company / Organization</label>
                        <input
                          type="text"
                          required
                          value={experienceForm.company}
                          onChange={e => setExperienceForm({ ...experienceForm, company: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Role / Designation</label>
                        <input
                          type="text"
                          required
                          value={experienceForm.role}
                          onChange={e => setExperienceForm({ ...experienceForm, role: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="text"
                          placeholder="e.g. June 2026"
                          required
                          value={experienceForm.startDate}
                          onChange={e => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>End Date</label>
                        <input
                          type="text"
                          placeholder="e.g. July 2026 or Present"
                          value={experienceForm.endDate || ''}
                          onChange={e => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Technologies Used</label>
                        <input
                          type="text"
                          value={experienceForm.technologies || ''}
                          onChange={e => setExperienceForm({ ...experienceForm, technologies: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Detailed Description</label>
                        <textarea
                          rows={4}
                          required
                          value={experienceForm.description}
                          onChange={e => setExperienceForm({ ...experienceForm, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} />
                        <span>Save Experience</span>
                      </button>
                      <button type="button" onClick={() => setEditingExperience(null)} className="btn btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-items-list">
                {experience.map(exp => (
                  <div key={exp.id} className="card admin-item-card" style={{ marginBottom: '1rem' }}>
                    <div className="admin-item-header">
                      <div>
                        <h3>{exp.role} &bull; <span style={{ color: 'var(--accent-primary)' }}>{exp.company}</span></h3>
                        <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {exp.startDate} - {exp.endDate || 'Present'} &bull; {exp.location}
                        </span>
                      </div>
                      <div className="table-actions">
                        <button type="button" onClick={() => handleOpenExperienceForm(exp)} className="icon-btn">
                          <Edit3 size={15} />
                        </button>
                        <button type="button" onClick={() => handleDeleteExperience(exp.id)} className="icon-btn delete-btn">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.92rem' }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EDUCATION */}
          {activeTab === 'education' && (
            <div className="tab-pane">
              <div className="pane-header">
                <h2 className="admin-pane-title">Education & Degrees</h2>
                <button
                  type="button"
                  onClick={() => handleOpenEducationForm()}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} />
                  <span>Add Education</span>
                </button>
              </div>

              {editingEducation && (
                <div className="card admin-form-modal">
                  <div className="modal-header-row">
                    <h3>{editingEducation === 'new' ? 'Add Education' : 'Edit Education'}</h3>
                    <button type="button" onClick={() => setEditingEducation(null)} className="icon-btn">
                      <X size={18} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveEducation} className="admin-form">
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Institution</label>
                        <input
                          type="text"
                          required
                          value={educationForm.institution}
                          onChange={e => setEducationForm({ ...educationForm, institution: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Degree</label>
                        <input
                          type="text"
                          required
                          value={educationForm.degree}
                          onChange={e => setEducationForm({ ...educationForm, degree: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Field of Study</label>
                        <input
                          type="text"
                          value={educationForm.fieldOfStudy || ''}
                          onChange={e => setEducationForm({ ...educationForm, fieldOfStudy: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>CGPA / Grade</label>
                        <input
                          type="text"
                          value={educationForm.cgpa || ''}
                          onChange={e => setEducationForm({ ...educationForm, cgpa: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Start Year</label>
                        <input
                          type="text"
                          value={educationForm.startDate || ''}
                          onChange={e => setEducationForm({ ...educationForm, startDate: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>End Year</label>
                        <input
                          type="text"
                          value={educationForm.endDate || ''}
                          onChange={e => setEducationForm({ ...educationForm, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} />
                        <span>Save Education</span>
                      </button>
                      <button type="button" onClick={() => setEditingEducation(null)} className="btn btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-items-list">
                {education.map(edu => (
                  <div key={edu.id} className="card admin-item-card" style={{ marginBottom: '1rem' }}>
                    <div className="admin-item-header">
                      <div>
                        <h3>{edu.degree}</h3>
                        <p style={{ color: 'var(--accent-primary)' }}>{edu.institution}</p>
                        <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {edu.startDate} - {edu.endDate} &bull; CGPA: {edu.cgpa}
                        </span>
                      </div>
                      <div className="table-actions">
                        <button type="button" onClick={() => handleOpenEducationForm(edu)} className="icon-btn">
                          <Edit3 size={15} />
                        </button>
                        <button type="button" onClick={() => handleDeleteEducation(edu.id)} className="icon-btn delete-btn">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="tab-pane">
              <div className="pane-header">
                <h2 className="admin-pane-title">Certifications & Credentials</h2>
                <button
                  type="button"
                  onClick={() => handleOpenCertificationForm()}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} />
                  <span>Add Certification</span>
                </button>
              </div>

              {editingCertification && (
                <div className="card admin-form-modal">
                  <div className="modal-header-row">
                    <h3>{editingCertification === 'new' ? 'Add Certification' : 'Edit Certification'}</h3>
                    <button type="button" onClick={() => setEditingCertification(null)} className="icon-btn">
                      <X size={18} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveCertification} className="admin-form">
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Certification Name</label>
                        <input
                          type="text"
                          required
                          value={certificationForm.name}
                          onChange={e => setCertificationForm({ ...certificationForm, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Issuer / Provider</label>
                        <input
                          type="text"
                          required
                          value={certificationForm.issuer}
                          onChange={e => setCertificationForm({ ...certificationForm, issuer: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Year / Issue Date</label>
                        <input
                          type="text"
                          value={certificationForm.issueDate || ''}
                          onChange={e => setCertificationForm({ ...certificationForm, issueDate: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Credential URL (optional)</label>
                        <input
                          type="url"
                          value={certificationForm.credentialUrl || ''}
                          onChange={e => setCertificationForm({ ...certificationForm, credentialUrl: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} />
                        <span>Save Certification</span>
                      </button>
                      <button type="button" onClick={() => setEditingCertification(null)} className="btn btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-items-list">
                {certifications.map(cert => (
                  <div key={cert.id} className="card admin-item-card" style={{ marginBottom: '1rem' }}>
                    <div className="admin-item-header">
                      <div>
                        <h3>{cert.name}</h3>
                        <p style={{ color: 'var(--accent-primary)' }}>{cert.issuer} &bull; {cert.issueDate}</p>
                      </div>
                      <div className="table-actions">
                        <button type="button" onClick={() => handleOpenCertificationForm(cert)} className="icon-btn">
                          <Edit3 size={15} />
                        </button>
                        <button type="button" onClick={() => handleDeleteCertification(cert.id)} className="icon-btn delete-btn">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="tab-pane">
              <h2 className="admin-pane-title">Contact Inquiries Inbox</h2>
              {messages.length === 0 ? (
                <div className="card empty-messages-box">
                  <Mail size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                  <p>No messages received yet. Inquiries submitted via the contact form will appear here.</p>
                </div>
              ) : (
                <div className="admin-messages-list">
                  {messages.map(msg => (
                    <div key={msg.id} className={`card message-item-card ${!msg.isRead ? 'unread' : ''}`}>
                      <div className="message-header-row">
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.05rem' }}>{msg.name}</h3>
                            {!msg.isRead && <span className="badge badge-accent">New</span>}
                          </div>
                          <span className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                            {msg.email} &bull; {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="table-actions">
                          {!msg.isRead && (
                            <button
                              type="button"
                              onClick={() => handleMarkAsRead(msg.id)}
                              className="btn btn-outline btn-sm"
                              title="Mark as Read"
                            >
                              <CheckCircle2 size={14} />
                              <span>Mark Read</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="icon-btn delete-btn"
                            title="Delete Message"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <p className="message-subject"><strong>Subject:</strong> {msg.subject}</p>
                      <p className="message-body">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
