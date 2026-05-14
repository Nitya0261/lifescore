import React, { useState } from 'react';
import SEO from '../components/SEO';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'editorial', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const faqs = [
    { q: "How do I report a bug or calculation error in a tool?", a: "Select 'Technical Support' in the contact form subject dropdown. Please include the specific inputs you used so our QA team can replicate and resolve the issue quickly." },
    { q: "Can I republish LifeScore articles or charts?", a: "Yes, we encourage open educational sharing! We require clear attribution and a direct canonical backlink to the original source page on the LifeScore platform." },
    { q: "Do you offer personalized financial advice?", a: "No. LifeScore provides educational software and frameworks. For tailored investment advisory, please utilize our 'Find an Advisor' network portal to connect with verified fiduciaries." }
  ];

  return (
    <>
      <SEO 
        title="Contact LifeScore - Editorial, Press & Support" 
        description="Reach out to the LifeScore platform team for editorial inquiries, partnership opportunities, press briefings, or technical calculator assistance."
      />

      {/* Header */}
      <section className="py-5" style={{ background: "var(--cream)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container py-4 text-center">
          <h1 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>Get in Touch</h1>
          <p className="text-muted fs-5 max-w-xl mx-auto mb-0">Have a quantitative thesis to share, a press request, or a general question? Our decentralized desks are here to assist.</p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">
            
            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="card border-0 p-4 p-sm-5 shadow-sm" style={{ borderRadius: "var(--radius-lg)", background: "var(--card-bg)" }}>
                <h3 className="fw-bold mb-4" style={{ color: "var(--ink)" }}>Send a Message</h3>
                
                {submitted ? (
                  <div className="alert alert-success border-0 p-4 rounded-4 text-center my-4" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>
                    <i className="bi bi-check-circle-fill fs-1 d-block mb-3"></i>
                    <h5 className="fw-bold mb-2">Message Dispatched Successfully</h5>
                    <p className="mb-0 text-dark opacity-75 small">Thank you for contacting LifeScore. Our specific domain desk aims to respond to critical inquiries within 24 to 48 hours.</p>
                    <button className="btn btn-sm btn-link text-decoration-none mt-3 fw-bold" onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', subject:'editorial', message:'' }); }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold small text-muted">Your Name</label>
                        <input 
                          type="text" 
                          className="form-control px-3 py-2" 
                          placeholder="Jane Doe" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold small text-muted">Email Address</label>
                        <input 
                          type="email" 
                          className="form-control px-3 py-2" 
                          placeholder="jane@example.com" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold small text-muted">Department Desk</label>
                      <select 
                        className="form-select px-3 py-2" 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      >
                        <option value="editorial">Editorial Corrections & Submissions</option>
                        <option value="partnerships">Brand Partnerships & Advertising</option>
                        <option value="press">Press & Media Briefings</option>
                        <option value="technical">Technical Support & Tools Bug Report</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold small text-muted">Detailed Message</label>
                      <textarea 
                        className="form-control px-3 py-2" 
                        rows="5" 
                        placeholder="Elaborate on your inquiry or feedback..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-dark w-100 py-2.5 rounded-pill fw-bold">
                      Transmit Inquiry <i className="bi bi-arrow-right-short ms-1"></i>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Direct Desks & FAQs */}
            <div className="col-lg-5">
              <div className="mb-5">
                <h4 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>Direct Routing Desks</h4>
                
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="bg-light rounded-circle p-3 text-teal">
                    <i className="bi bi-envelope-paper fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Editorial Submissions</h6>
                    <p className="text-muted small mb-0">pitches@lifescore.platform</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="bg-light rounded-circle p-3 text-teal">
                    <i className="bi bi-briefcase fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Partnerships & Sponsorships</h6>
                    <p className="text-muted small mb-0">partners@lifescore.platform</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light rounded-circle p-3 text-teal">
                    <i className="bi bi-shield-lock fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Data Privacy Desk</h6>
                    <p className="text-muted small mb-0">privacy@lifescore.platform</p>
                  </div>
                </div>
              </div>

              {/* FAQs Accordion Replacement */}
              <div>
                <h4 className="fw-bold mb-3" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>Frequently Asked</h4>
                <div className="accordion accordion-flush" id="faqAccordion">
                  {faqs.map((f, i) => (
                    <div className="accordion-item border-bottom py-2 bg-transparent" key={i}>
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed bg-transparent px-0 fw-bold text-dark shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${i}`}>
                          {f.q}
                        </button>
                      </h2>
                      <div id={`faq-${i}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body px-0 text-muted small pt-1 pb-3">
                          {f.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
