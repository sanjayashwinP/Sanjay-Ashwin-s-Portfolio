import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, MessageCircle } from 'lucide-react';
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
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '', fallback: boolean, mailtoUrl?: string }
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = profile?.email || 'sanjayashwin502@gmail.com';
  const phone = profile?.phone || '+91-8870794020';
  const location = profile?.location || 'Chennai, India';
  const githubUrl = profile?.githubUrl;
  const linkedinUrl = profile?.linkedinUrl;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill in all required fields before submitting.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid email address (e.g. name@example.com).'
      });
      return;
    }

    const prefilledMailto = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Hi Sanjay,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    )}`;

    try {
      setSubmitting(true);
      const res = await portfolioService.submitContact(formData);
      
      setStatusMessage({
        type: 'success',
        text: res?.message || 'Thank you! Your message has been received successfully.',
        fallback: res?.fallback || false,
        mailtoUrl: prefilledMailto
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Unable to connect to the messaging server. You can click below to email directly.',
        mailtoUrl: prefilledMailto
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Send size={14} />
            <span>Direct Communication</span>
          </span>
          <h2 className="section-title">Let's Connect & Build</h2>
          <p className="section-subtitle">
            Interested in discussing full-stack engineering roles, Java internships, or technical collaboration? Reach out directly or send a message below.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Contact Information Card */}
          <div className="contact-info-col">
            <div className="card contact-direct-card">
              <h3 className="direct-title">Contact Channels</h3>
              <p className="direct-subtitle">
                Available for software developer roles, technical internships, and engineering discussions.
              </p>

              <div className="contact-links-list">
                {/* Email with direct click & copy button */}
                <div className="contact-item contact-item-with-action">
                  <a href={`mailto:${email}`} className="contact-item-link" title="Send email directly">
                    <div className="contact-icon">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="contact-label">Email Address</span>
                      <span className="contact-value font-mono">{email}</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="icon-btn copy-email-btn"
                    title={copiedEmail ? "Copied!" : "Copy email to clipboard"}
                  >
                    {copiedEmail ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Phone */}
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-item" title="Call directly">
                  <div className="contact-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Phone / WhatsApp</span>
                    <span className="contact-value font-mono">{phone}</span>
                  </div>
                </a>

                {/* Location */}
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

              {/* Instant Social and WhatsApp Quick Actions */}
              <div className="contact-socials-wrap">
                <span className="socials-heading">Direct Links & Profiles</span>
                <div className="socials-buttons">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
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
                      className="btn btn-secondary btn-sm"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={15} />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  <a
                    href="https://wa.me/918870794020?text=Hi%20Sanjay%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    aria-label="Chat on WhatsApp"
                  >
                    <MessageCircle size={15} className="text-success" />
                    <span>WhatsApp</span>
                  </a>
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
                  <div className="alert-content-row">
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 size={18} className="alert-icon" />
                    ) : (
                      <AlertCircle size={18} className="alert-icon" />
                    )}
                    <span className="alert-text">{statusMessage.text}</span>
                  </div>

                  {/* Instant 1-Click Mail Fallback Option */}
                  {statusMessage.mailtoUrl && (
                    <div className="alert-action-row">
                      <a
                        href={statusMessage.mailtoUrl}
                        className="btn btn-sm btn-outline alert-mailto-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail size={14} />
                        <span>Open in Your Email Client</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
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
                  placeholder="e.g. Java / Full-Stack Developer Opportunity"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="message" className="form-label">
                    Message <span className="required-star">*</span>
                  </label>
                  <span className="char-count font-mono">{formData.message.length} / 2000</span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  maxLength="2000"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe the opportunity, technical challenge, or inquiry..."
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
