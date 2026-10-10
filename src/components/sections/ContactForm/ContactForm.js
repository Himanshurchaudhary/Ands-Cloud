"use client";

// Contact section: header, contact details and a form that posts to /api/contact
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const serviceOptions = [
  "Web Development",
  "Mobile App Development",
  "Cloud & Hosting",
  "Custom Software & SaaS",
  "AI Integration & Automation",
  "Maintenance & Support",
  "Not sure yet",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "", // honeypot field: hidden from users, bots tend to fill it
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  // Update a single field as the user types
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // Basic client-side validation. The server validates again.
  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (form.phone && !/^[0-9+\s-]{7,15}$/.test(form.phone)) next.phone = "Please enter a valid phone number.";
    if (form.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        text: "Thank you! Your message has been sent. We will contact you soon.",
      });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        type: "error",
        text: err.message || "Message could not be sent. Please try again or use WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Page header */}
      <section className="ct-header">
        <div className="ct-inner">
          <span className="ct-eyebrow">Contact Us</span>
          <h1>
            Let us talk about <span>your project</span>
          </h1>
          <p>
            Share a few details about what you need. We will reply with a clear plan,
            timeline and estimate.
          </p>
        </div>
      </section>

      <section className="ct-body">
        <div className="ct-inner ct-layout">
          {/* Contact details */}
          <aside className="ct-info">
            <h2>Get in touch</h2>
            <ul>
              <li>
                <Mail size={20} aria-hidden="true" />
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@yourdomain.com">info@yourdomain.com</a>
                </div>
              </li>
              <li>
                <Phone size={20} aria-hidden="true" />
                <div>
                  <strong>Phone</strong>
                  <a href="tel:+919999999999">+91 99999 99999</a>
                </div>
              </li>
              <li>
                <MapPin size={20} aria-hidden="true" />
                <div>
                  <strong>Office</strong>
                  <span>Noida, Uttar Pradesh, India</span>
                </div>
              </li>
              {WHATSAPP_NUMBER ? (
                <li>
                  <MessageCircle size={20} aria-hidden="true" />
                  <div>
                    <strong>WhatsApp</strong>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with us
                    </a>
                  </div>
                </li>
              ) : null}
            </ul>
          </aside>

          {/* Contact form */}
          <form className="ct-form" onSubmit={handleSubmit} noValidate>
            <div className="ct-row">
              <div className="ct-field">
                <label htmlFor="name">Full name *</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} />
                {errors.name && <small className="ct-error">{errors.name}</small>}
              </div>
              <div className="ct-field">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
                {errors.email && <small className="ct-error">{errors.email}</small>}
              </div>
            </div>

            <div className="ct-row">
              <div className="ct-field">
                <label htmlFor="phone">Phone (optional)</label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
                {errors.phone && <small className="ct-error">{errors.phone}</small>}
              </div>
              <div className="ct-field">
                <label htmlFor="service">Service you need</label>
                <select id="service" name="service" value={form.service} onChange={handleChange}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ct-field">
              <label htmlFor="message">Project details *</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project, goals and timeline."
              />
              {errors.message && <small className="ct-error">{errors.message}</small>}
            </div>

            {/* Honeypot: hidden from real users, so only bots fill it */}
            <div className="ct-hp" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            {status.text && (
              <p className={status.type === "success" ? "ct-alert ct-success" : "ct-alert ct-fail"}>
                {status.text}
              </p>
            )}

            <button type="submit" className="ct-submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Component-scoped CSS (styled-jsx). These styles apply only to this component */}
      <style >{`
        .ct-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .ct-eyebrow {
          color: var(--brand-orange);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .ct-header {
          background: linear-gradient(135deg, #ffffff 0%, #fff4ec 100%);
          padding: 120px 0 60px;
          text-align: center;
        }

        .ct-header .ct-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 760px;
        }

        h1 {
          font-size: clamp(32px, 5vw, 50px);
          font-weight: 800;
          line-height: 1.2;
          color: var(--brand-black);
        }

        h1 span {
          color: var(--brand-orange);
        }

        .ct-header p {
          font-size: 18px;
          color: #555555;
        }

        .ct-body {
          background: #ffffff;
          padding: 70px 0 100px;
        }

        .ct-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 48px;
          align-items: start;
        }

        /* Contact details card */
        .ct-info {
          background: #fafafa;
          border: 1px solid #eeeeee;
          border-radius: 14px;
          padding: 36px 30px;
        }

        .ct-info h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--brand-black);
          margin-bottom: 24px;
        }

        .ct-info ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .ct-info li {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .ct-info li > svg {
          color: var(--brand-orange);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .ct-info strong {
          display: block;
          font-size: 14px;
          color: #777777;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .ct-info a,
        .ct-info span {
          color: var(--brand-black);
          font-size: 16px;
          font-weight: 600;
        }

        .ct-info a:hover {
          color: var(--brand-orange);
        }

        /* Form */
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ct-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ct-field label {
          font-size: 14px;
          font-weight: 600;
          color: var(--brand-black);
        }

        .ct-field input,
        .ct-field select,
        .ct-field textarea {
          font: inherit;
          font-size: 15px;
          padding: 12px 14px;
          border: 1px solid #dddddd;
          border-radius: 8px;
          background: #ffffff;
          color: var(--brand-black);
        }

        .ct-field input:focus,
        .ct-field select:focus,
        .ct-field textarea:focus {
          outline: none;
          border-color: var(--brand-orange);
          box-shadow: 0 0 0 3px rgba(255, 106, 0, 0.15);
        }

        .ct-field textarea {
          resize: vertical;
        }

        .ct-error {
          color: #d32f2f;
          font-size: 13px;
        }

        /* Hidden honeypot field */
        .ct-hp {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        .ct-alert {
          padding: 14px 16px;
          border-radius: 8px;
          font-size: 15px;
        }

        .ct-success {
          background: #e8f7ee;
          color: #1e7a43;
        }

        .ct-fail {
          background: #fdecec;
          color: #b42318;
        }

        .ct-submit {
          align-self: flex-start;
          background: var(--brand-orange);
          color: #ffffff;
          border: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .ct-submit:hover {
          background: var(--brand-orange-light);
        }

        .ct-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}