import { useState } from 'react';
import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  PhoneCall,
  User,
  MessageSquare,
  HelpCircle,
  Building
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    orderNumber: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        orderNumber: '',
        message: ''
      });
    }, 800);
  };

  return (
    <div className="contact-page page-container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{
        marginBottom: '2.5rem',
        textAlign: 'center',
        maxWidth: '680px',
        margin: '0 auto 2.5rem auto'
      }}>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--color-primary-600)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Sprint 06 Phase 1 Deliverable
        </span>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 800,
          color: 'var(--text-main)',
          margin: '0.35rem 0 0.75rem 0'
        }}>
          Contact Support &amp; Residency Sync
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Have inquiries regarding product inventory, routing architecture, or scheduling your mandatory 1-on-1 sprint check-in? Reach our engineering team below.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Functional Contact Form */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            Send Us an Inquiry
          </h2>

          {submitted ? (
            <div style={{
              backgroundColor: 'var(--color-success-bg)',
              border: '1px solid #a7f3d0',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <CheckCircle2 size={30} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065f46', marginBottom: '0.5rem' }}>
                Inquiry Dispatched Successfully!
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#047857', marginBottom: '1.5rem' }}>
                Your message has been routed to our technical support pipeline. A team member will follow up via email within 4 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn btn-secondary btn-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    className="form-input"
                    placeholder="alex@residency.dev"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">
                    Subject / Topic *
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="general">General Catalog Inquiry</option>
                    <option value="order">Order Tracking &amp; Shipping</option>
                    <option value="returns">Refunds &amp; Returns</option>
                    <option value="residency">Residency Standup Check-In</option>
                    <option value="bug">Technical Architecture Bug Report</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-order">
                    Order ID (Optional)
                  </label>
                  <input
                    id="contact-order"
                    type="text"
                    name="orderNumber"
                    className="form-input"
                    placeholder="ORD-123456"
                    value={formData.orderNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Message Details *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="form-textarea"
                  placeholder="Describe your inquiry, order question, or engineering residency blockers..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {loading ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Residency Standup Desk & Support Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Mr. Nakul 1-on-1 Sync Card */}
          <div style={{
            backgroundColor: '#1e1b4b',
            color: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid #312e81'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.85rem' }}>
              <PhoneCall size={12} />
              <span>Mandatory Residency Action</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              Mid-Pipeline 1-on-1 Sync
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#c7d2fe', lineHeight: 1.55, marginBottom: '1.25rem' }}>
              You are one-third of the way through your engineering residency. Contact <strong>Mr. Nakul</strong> through your official residency channel at least once this week for your concise 3-minute sync. Evaluated for your Technical Communication KPI.
            </p>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>Point of Contact</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>Mr. Nakul</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>Contact Channel</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Provided by your coordinator</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>Calling Window</span>
                <span style={{ fontSize: '0.8rem', color: '#e0e7ff' }}>Mon–Fri | 9 AM – 6 PM IST</span>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#a5b4fc', marginTop: '0.85rem', marginBottom: 0, fontStyle: 'italic' }}>
              Note: If line is busy, assume he is in another stand-up and call back.
            </p>
          </div>

          {/* Standard Support Channels Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Additional Support Channels
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Mail size={18} style={{ color: 'var(--color-primary-600)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>Email Helpdesk:</strong>
                  <p style={{ color: 'var(--text-muted)', margin: '0.1rem 0 0 0' }}>support@shopzone-residency.io</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Building size={18} style={{ color: 'var(--color-primary-600)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>Residency Headquarters:</strong>
                  <p style={{ color: 'var(--text-muted)', margin: '0.1rem 0 0 0' }}>ShopZone Engineering Lab, Tech Park</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Clock size={18} style={{ color: 'var(--color-primary-600)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>Support SLA:</strong>
                  <p style={{ color: 'var(--text-muted)', margin: '0.1rem 0 0 0' }}>Under 4 hours turnaround during sprint weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
