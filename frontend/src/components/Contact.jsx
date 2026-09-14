import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioService } from '../services/portfolioService';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  const email = profile?.email || 'sanjayashwin502@gmail.com';
  const phone = profile?.phone || '+91-8870794020';
  const location = profile?.location || 'Chennai, India';
  const githubUrl = profile?.githubUrl;
  const linkedinUrl = profile?.linkedinUrl;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    try {
      setSubmitting(true);
      const res = await portfolioService.submitContact(formData);
      setStatusMessage({
        type: 'success',
        text: res?.message || 'Thank you! Your message has been sent successfully.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to send message. Please try again or reach out directly by email.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">06 // Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Interested in discussing full-stack software development roles, Java internships, or technical opportunities? Send a message.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Contact Information */}
          <div className="contact-info-col">
            <div className="card contact-direct-card">
              <h3 className="direct-title">Contact Information</h3>
              <p className="direct-subtitle">
                Feel free to contact me directly via email or phone.
              </p>

              <div className="contact-links-list">
                <a href={`mailto:${email}`} className="contact-item">
                  <div className="contact-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Email</span>
                    <span className="contact-value font-mono">{email}</span>
                  </div>
                </a>

                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-item">
                  <div className="contact-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Phone</span>
                    <span className="contact-value font-mono">{phone}</span>
                  </div>
                </a>

                <div className="contact-item static">
                  <div className="contact-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Location</span>
                    <span className="contact-value font-mono">{location}</span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="contact-socials-wrap">
                <span className="socials-heading">Profiles</span>
                <div className="socials-buttons">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      aria-label="GitHub Profile"
                    >
                      <Github size={15} />
                      <span>GitHub</span>
                    </a>
                  )}

                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={15} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="card contact-form" noValidate>
              <h3 className="form-title">Send a Message</h3>

              {statusMessage && (
                <div
                  className={`alert-box ${
                    statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'
                  }`}
                  role="alert"
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@company.com"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack / Backend Developer Opportunity"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message <span className="required-star">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about the role, project, or inquiry..."
                  required
                  className="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary form-submit-btn"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
