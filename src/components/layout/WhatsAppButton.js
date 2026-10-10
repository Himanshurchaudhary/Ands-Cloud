"use client";

const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const message = encodeURIComponent("Hello ANDS Cloud, I would like to discuss a project with you.");
export default function WhatsAppButton() {
  return (
    <a
      className="wa"
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp par baat karein"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#ffffff" aria-hidden="true">
        <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.8 6.4L3 29l6.8-1.8c1.8 1 3.9 1.5 6.2 1.5 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.7C5.1 10.5 10.2 5.4 16 5.4S26.9 10.5 26.9 16.4 21.8 26.6 16 26.6zm5.9-7.7c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.7 5.8 5.1 3.4 1.4 3.4.9 4 .9.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4z" />
      </svg>

      <style jsx>{`
        .wa {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 200;
          transition: transform 0.2s ease;
        }
        .wa:hover {
          transform: scale(1.08);
        }
      `}</style>
    </a>
  );
}