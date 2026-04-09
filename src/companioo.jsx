import { useState, useEffect, useRef } from "react"

import LOGO_THECLA from "./assets/LOGO_THECLA.png";
import COMPANIOO_LOGO from "./assets/companioo_logo.png";
import DAILY_CARE from "./assets/DAILY_CARE.jpg";
import HOME_CARE from "./assets/HOME_CARE.jpg";

const slides = [
  {
    img: DAILY_CARE,
    tag: "Companionship at Home",
    heading: "Where Care Meets Companionship",
    sub: "Friendly faces, warm hearts — bringing joy and support directly into the homes of your loved ones.",
    cta: "Join the Waitlist",
  },
  {
    img: HOME_CARE,
    tag: "For Distant Families",
    heading: "Distance Shouldn't Mean Loneliness",
    sub: "When family can't always be there, CompanionPro bridges the gap with trusted, compassionate companions.",
    cta: "Join the Waitlist",
  },
  {
    img: DAILY_CARE,
    tag: "Become a Companion Pro",
    heading: "A Rewarding Career in Caring",
    sub: "Passionate about caring for the elderly? This is your calling. Make a difference in someone's daily life.",
    cta: "Apply as Companion Pro",
  },
];

/* Smooth-scroll helper — offsets for fixed navbar */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = window.innerWidth < 768 ? 60 : 68;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

function WaitlistModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("family");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(5,12,40,0.82)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(8px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: "1.75rem", padding: "clamp(1.5rem, 5vw, 2.75rem)", maxWidth: "500px", width: "100%", position: "relative", boxShadow: "0 30px 80px rgba(0,0,0,0.35)", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1.1rem", right: "1.4rem", background: "none", border: "none", fontSize: "2rem", cursor: "pointer", color: "#aaa", lineHeight: 1 }}>×</button>
        {!submitted ? (
          <>
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontSize: "2.8rem", marginBottom: "0.6rem" }}>🎉</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem, 4vw, 1.9rem)", color: "#0f1e5a", marginBottom: "0.5rem", fontWeight: 800 }}>Join the Waitlist</h2>
              <p style={{ color: "#7b8ab0", fontSize: "0.95rem", lineHeight: 1.6 }}>Be among the first to experience CompanionPro when we launch. No spam, just early access.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
                style={{ padding: "0.9rem 1.1rem", borderRadius: "0.875rem", border: "2px solid #e5eaf5", outline: "none", fontSize: "1rem", fontFamily: "'DM Sans',sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")} onBlur={(e) => (e.target.style.borderColor = "#e5eaf5")} />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email"
                style={{ padding: "0.9rem 1.1rem", borderRadius: "0.875rem", border: "2px solid #e5eaf5", outline: "none", fontSize: "1rem", fontFamily: "'DM Sans',sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")} onBlur={(e) => (e.target.style.borderColor = "#e5eaf5")} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" }}>
                {[["family", "👨‍👩‍👧 Family"], ["companion", "🤝 Companion Pro"], ["both", "💙 Both"]].map(([v, l]) => (
                  <button key={v} onClick={() => setRole(v)}
                    style={{ padding: "0.75rem 0.4rem", borderRadius: "0.75rem", border: `2px solid ${role === v ? "#2563eb" : "#e5eaf5"}`, background: role === v ? "#eff6ff" : "white", color: role === v ? "#2563eb" : "#888", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>
                    {l}
                  </button>
                ))}
              </div>
              <button onClick={() => { if (email && name) setSubmitted(true); }}
                style={{ padding: "1rem", borderRadius: "0.875rem", background: "linear-gradient(135deg,#0f1e5a,#2563eb)", color: "white", border: "none", fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.02em", marginTop: "0.25rem" }}>
                Reserve My Spot →
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem, 4vw, 1.9rem)", color: "#0f1e5a", marginBottom: "0.75rem", fontWeight: 800 }}>You're on the list!</h2>
            <p style={{ color: "#7b8ab0", lineHeight: 1.7, fontSize: "1rem" }}>Thanks <strong style={{ color: "#0f1e5a" }}>{name}</strong>! We'll be in touch as soon as CompanionPro launches. Watch your inbox.</p>
            <button onClick={onClose} style={{ marginTop: "2rem", padding: "0.9rem 2.25rem", borderRadius: "0.875rem", background: "linear-gradient(135deg,#0f1e5a,#2563eb)", color: "white", border: "none", fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(false);
  const [stats, setStats] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const statsRef = useRef(null);
  const targets = [500, 98, 24, 100];

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStats(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!stats) return;
    targets.forEach((target, i) => {
      let start = 0;
      const step = target / 120;
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setCounts((c) => { const n = [...c]; n[i] = target; return n; }); clearInterval(t); }
        else { setCounts((c) => { const n = [...c]; n[i] = Math.floor(start); return n; }); }
      }, 16);
    });
  }, [stats]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = () => setMobileMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [mobileMenuOpen]);

  const services = [
    { icon: "💬", title: "Friendly Conversation", desc: "Warm, engaging daily conversation that lifts moods and creates genuine bonds." },
    { icon: "🏥", title: "Attending Appointments", desc: "Reliable companionship and transport support to medical, social and personal appointments." },
    { icon: "🏠", title: "Daily Activities & Chores", desc: "Light household tasks, errands, and routines — maintaining independence and dignity at home." },
    { icon: "❤️", title: "Peace of Mind", desc: "Families near or far can breathe easy knowing their loved ones are cared for and connected." },
    { icon: "📚", title: "Hobbies & Activities", desc: "Reading, games, crafts, walks — activities matched to each elder's personality and passions." },
    { icon: "🌟", title: "Personalised Matching", desc: "Smart matching by personality, interests, language, and care needs for a perfect fit." },
  ];

  const steps = [
    { n: 1, icon: "📋", t: "Tell us about your loved one", d: "Share their personality, schedule, interests, and care needs through the CompanionPro app." },
    { n: 2, icon: "🤝", t: "We match the perfect Companion", d: "Our intelligent matching considers personality, location, language, and care requirements." },
    { n: 3, icon: "💙", t: "Companionship begins", d: "Regular visits build a genuine, trusting friendship — not just a service, a relationship." },
    { n: 4, icon: "📱", t: "Stay connected as a family", d: "Real-time updates and check-ins give families peace of mind from anywhere in the world." },
  ];

  const navItems = [
    { label: "About",         id: "about" },
    { label: "Services",      id: "services" },
    { label: "For Families",  id: "how-it-works" },
    { label: "Companion Pro", id: "companion-pro" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        html, body { margin: 0 !important; padding: 0 !important; width: 100% !important; overflow-x: hidden !important; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        #root { width: 100% !important; margin: 0 !important; padding: 0 !important; }

        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 3px; }

        .slide-img { position: absolute; inset: 0; object-fit: cover; width: 100%; height: 100%; transition: opacity 1.1s ease; }

        .btn-primary { background: linear-gradient(135deg,#0f1e5a,#2563eb); color: white; border: none; padding: 0.95rem 2.25rem; border-radius: 3rem; font-weight: 700; font-size: 0.98rem; cursor: pointer; letter-spacing: 0.02em; transition: all 0.3s; box-shadow: 0 6px 24px rgba(37,99,235,0.32); font-family: 'DM Sans',sans-serif; white-space: nowrap; display: inline-block; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(37,99,235,0.5); }

        .btn-teal { background: linear-gradient(135deg,#0d9488,#14b8a6); color: white; border: none; padding: 0.95rem 2.25rem; border-radius: 3rem; font-weight: 700; font-size: 0.98rem; cursor: pointer; letter-spacing: 0.02em; transition: all 0.3s; box-shadow: 0 6px 24px rgba(20,184,166,0.32); font-family: 'DM Sans',sans-serif; white-space: nowrap; display: inline-block; }
        .btn-teal:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(20,184,166,0.5); }

        .btn-white { background: white; color: #0f1e5a; border: none; padding: 0.95rem 2.25rem; border-radius: 3rem; font-weight: 700; font-size: 0.98rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 6px 24px rgba(0,0,0,0.18); font-family: 'DM Sans',sans-serif; white-space: nowrap; display: inline-block; }
        .btn-white:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.28); }

        .btn-ghost { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.55); padding: 0.95rem 2.25rem; border-radius: 3rem; font-weight: 600; font-size: 0.98rem; cursor: pointer; transition: all 0.3s; font-family: 'DM Sans',sans-serif; white-space: nowrap; display: inline-block; }
        .btn-ghost:hover { background: rgba(255,255,255,0.15); border-color: white; }

        .nav-link { background: none; border: none; outline: none; color: rgba(255,255,255,0.8); font-family: 'DM Sans',sans-serif; font-weight: 500; font-size: 0.9rem; cursor: pointer; letter-spacing: 0.01em; padding: 0 0 3px 0; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; }
        .nav-link:hover { color: white; border-bottom-color: rgba(255,255,255,0.55); }

        .tag { display: inline-block; background: rgba(20,184,166,0.2); color: #5eead4; border: 1px solid rgba(20,184,166,0.3); padding: 0.35rem 1rem; border-radius: 2rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'DM Sans',sans-serif; margin-bottom: 1.1rem; }

        .badge-pill { display: inline-flex; align-items: center; gap: 0.4rem; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; padding: 0.38rem 1rem; border-radius: 2rem; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; font-family: 'DM Sans',sans-serif; }

        .floating-card { background: white; border-radius: 1.25rem; padding: 1.4rem 1.75rem; box-shadow: 0 12px 40px rgba(15,30,90,0.14); border: 1px solid rgba(255,255,255,0.8); }

        .card-hover { transition: all 0.35s; cursor: default; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(37,99,235,0.15) !important; }

        .dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s; flex-shrink: 0; }
        .dot.on { background: white; width: 26px; border-radius: 5px; }

        @keyframes pulse2 { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.05); } }
        .pulse { animation: pulse2 2.2s ease-in-out infinite; }

        @keyframes fadeSlide { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeSlide 0.9s ease forwards; }

        .number-big { font-family: 'Playfair Display',serif; font-size: 3.2rem; font-weight: 900; color: white; line-height: 1; }

        .step-arrow { position: absolute; right: -13px; top: 42px; width: 26px; height: 26px; background: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; z-index: 2; box-shadow: 0 3px 10px rgba(37,99,235,0.45); }

        .benefit-row { display: flex; align-items: flex-start; gap: 1rem; padding: 1.1rem 1.25rem; background: white; border-radius: 0.875rem; box-shadow: 0 2px 12px rgba(15,30,90,0.06); }

        .footer-link { display: block; background: none; border: none; outline: none; text-align: left; font-family: 'DM Sans',sans-serif; color: rgba(255,255,255,0.5); font-size: 0.88rem; margin-bottom: 0.75rem; cursor: pointer; transition: color 0.2s; padding: 0; }
        .footer-link:hover { color: rgba(255,255,255,0.9); }

        /* ── Mobile menu ── */
        .mobile-menu { display: none; position: fixed; top: 60px; left: 0; right: 0; background: rgba(8,15,50,0.98); backdrop-filter: blur(20px); z-index: 199; padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); flex-direction: column; gap: 0; }
        .mobile-menu.open { display: flex; }
        .mobile-menu-item { background: none; border: none; color: rgba(255,255,255,0.85); font-family: 'DM Sans',sans-serif; font-weight: 500; font-size: 1rem; cursor: pointer; padding: 0.875rem 0; border-bottom: 1px solid rgba(255,255,255,0.07); text-align: left; letter-spacing: 0.01em; }
        .mobile-menu-item:last-child { border-bottom: none; }

        /* ── Responsive breakpoints ── */

        /* Tablet and below: 768px */
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .nav-cta { display: none !important; }

          /* Hero */
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right-cards { display: none !important; }
          .hero-left { padding: 0 1.5rem 0 1.5rem !important; }
          .hero-ticker { padding: 0.7rem 1.5rem !important; gap: 1.5rem !important; overflow-x: auto !important; }
          .hero-ticker::-webkit-scrollbar { display: none; }
          .hero-dots { left: 1.5rem !important; }

          /* About */
          .about-grid { grid-template-columns: 1fr !important; }
          .about-img-col { min-height: 300px !important; }
          .about-text-col { padding: 3rem 1.5rem !important; }
          .about-feature-grid { grid-template-columns: 1fr !important; }

          /* How it works */
          .how-header { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; padding: 0 1.5rem !important; }
          .how-header p { text-align: left !important; max-width: 100% !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .step-arrow { display: none !important; }
          .how-cta { padding-left: 1.5rem !important; }

          /* Services */
          .services-grid { grid-template-columns: 1fr !important; }
          .services-left { padding: 3rem 1.5rem !important; }
          .services-cards { grid-template-columns: 1fr 1fr !important; }

          /* Stats */
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-cell { padding: 2.5rem 2rem !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; }
          .stats-cell:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.1) !important; }
          .stats-cell:nth-child(3), .stats-cell:nth-child(4) { border-bottom: none !important; }

          /* Companion Pro */
          .companion-grid { grid-template-columns: 1fr !important; }
          .companion-text { padding: 3rem 1.5rem !important; }
          .companion-img { min-height: 300px !important; }

          /* CTA banner */
          .cta-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 0 1.5rem !important; }

          /* Footer */
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .footer-brand { grid-column: 1 / -1 !important; }
          .footer-bottom { padding-left: 1.5rem !important; padding-right: 1.5rem !important; flex-direction: column !important; gap: 0.5rem !important; }

          .nav-wrapper { padding: 0 1.5rem !important; }
        }

        /* Mobile only: 480px */
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .services-cards { grid-template-columns: 1fr !important; }
          .hero-section { min-height: 600px !important; }
          .number-big { font-size: 2.4rem !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .cta-inner-box { padding: 2rem 1.5rem !important; }
        }

        /* Ensure desktop nav shows */
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
          .desktop-nav-links { display: flex !important; }
          .nav-cta { display: inline-block !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f5f8ff", color: "#0f1e5a", minHeight: "100vh", width: "100%", overflowX: "hidden", margin: 0, padding: 0 }}>

        {/* ══════════════════════════════════════
            NAVBAR
        ══════════════════════════════════════ */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "rgba(8,15,50,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", width: "100%" }}>
          <div className="nav-wrapper" style={{ width: "100%", padding: "0 3rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* LEFT — logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.85rem", padding: 0 }}>
              <div style={{ width: "280px", height: "280px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                <img src={COMPANIOO_LOGO} alt="CompanionPro" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.15)" }} />
              <div>
                <div style={{ color: "white", fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.01em" }}>CompanionPro</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "3px" }}>Caring Connections</div>
              </div>
            </button>

            {/* RIGHT — desktop nav + CTA */}
            <div className="desktop-nav-links" style={{ alignItems: "center", gap: "2.5rem" }}>
              {navItems.map(({ label, id }) => (
                <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</button>
              ))}
              <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.15)" }} />
              <button className="btn-primary nav-cta" style={{ padding: "0.55rem 1.4rem", fontSize: "0.82rem" }} onClick={() => setModal(true)}>
                🚀 Join Waitlist
              </button>
            </div>

            {/* Hamburger */}
            <button
              className="hamburger"
              onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(o => !o); }}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px", alignItems: "center", justifyContent: "center" }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ display: "block", width: "22px", height: "2px", background: "white", borderRadius: "2px", transition: "all 0.3s",
                  transform: mobileMenuOpen ? (i===0 ? "rotate(45deg) translate(5px,5px)" : i===2 ? "rotate(-45deg) translate(5px,-5px)" : "opacity(0)") : "none",
                  opacity: mobileMenuOpen && i===1 ? 0 : 1
                }} />
              ))}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu${mobileMenuOpen ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
          {navItems.map(({ label, id }) => (
            <button key={id} className="mobile-menu-item" onClick={() => { scrollTo(id); setMobileMenuOpen(false); }}>{label}</button>
          ))}
          <button className="btn-primary" style={{ marginTop: "1rem", width: "100%", textAlign: "center" }} onClick={() => { setModal(true); setMobileMenuOpen(false); }}>
            🚀 Join Waitlist
          </button>
        </div>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="hero-section" style={{ position: "relative", height: "100vh", minHeight: "740px", overflow: "hidden", width: "100%" }}>
          {slides.map((s, i) => (
            <img key={i} src={s.img} alt="" className="slide-img" style={{ opacity: slide === i ? 1 : 0, zIndex: slide === i ? 1 : 0 }} />
          ))}

          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15, 26, 74, 0.88) 0%, rgba(37, 99, 235, 0.5) 100%)", zIndex: 2 }} />

          <div className="hero-grid" style={{ position: "absolute", inset: 0, zIndex: 3, display: "grid", gridTemplateColumns: "55% 45%", alignItems: "center", paddingTop: "68px" }}>

            {/* LEFT */}
            <div className="hero-left" style={{ padding: "0 3rem 0 4rem" }}>
              <div className="fade-in" key={slide}>
                <span className="tag">{slides[slide].tag}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                   
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", letterSpacing: "0.12em" }}>presents</span>
                  <span className="pulse" style={{ background: "linear-gradient(135deg,#f97316,#ef4444)", color: "white", padding: "0.3rem 0.9rem", borderRadius: "2rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", fontFamily: "'DM Sans',sans-serif" }}>COMING SOON</span>
                </div>
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.5vw,4.2rem)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: "1.5rem", textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}>
                  {slides[slide].heading}
                </h1>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.82)", fontSize: "clamp(0.95rem,2vw,1.12rem)", lineHeight: 1.8, marginBottom: "2.25rem", maxWidth: "480px" }}>
                  {slides[slide].sub}
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button className="btn-white" onClick={() => setModal(true)}>{slides[slide].cta} →</button>
                  <button className="btn-ghost" onClick={() => scrollTo("about")}>Learn More</button>
                </div>
              </div>
            </div>

            {/* RIGHT — floating cards (hidden on mobile) */}
            <div className="hero-right-cards" style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "0 3rem 0 2rem", alignSelf: "center" }}>
              <div className="floating-card">
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#7b8ab0", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Support for seniors</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#0f1e5a" }}>At home &amp; beyond</div>
                <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["Conversation", "Appointments", "Daily Care"].map((t) => (
                    <span key={t} style={{ background: "#eff6ff", color: "#2563eb", padding: "0.25rem 0.65rem", borderRadius: "1rem", fontSize: "0.72rem", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="floating-card" style={{ background: "linear-gradient(135deg,#0f1e5a,#2563eb)", border: "none" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Because</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "white", lineHeight: 1.4 }}>Everyone deserves company and care</div>
              </div>
              <div className="floating-card" style={{ background: "rgba(255,255,255,0.92)" }}>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  {[["🏴󠁧󠁢󠁥󠁮󠁧󠁿", "UK-Based"], ["🔒", "DBS Checked"], ["📱", "App Soon"]].map(([ic, lb]) => (
                    <div key={lb} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "1.4rem" }}>{ic}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#5a6a9a", fontWeight: 600, marginTop: "0.25rem" }}>{lb}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slide dots */}
          <div className="hero-dots" style={{ position: "absolute", bottom: "4.5rem", left: "4rem", zIndex: 3, display: "flex", gap: "0.6rem", alignItems: "center" }}>
            {slides.map((_, i) => (<div key={i} className={`dot${slide === i ? " on" : ""}`} onClick={() => setSlide(i)} />))}
            <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginLeft: "0.5rem" }}>{slide + 1} / {slides.length}</span>
          </div>

          {/* Ticker */}
          <div className="hero-ticker" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, background: "rgba(15,30,90,0.72)", backdropFilter: "blur(10px)", padding: "0.85rem 4rem", display: "flex", alignItems: "center", gap: "3rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {["🏴󠁧󠁢󠁥󠁮󠁧󠁿 UK-Based Service", "🔒 DBS-Checked Companions", "💙 Support for Elderly & Their Families", "📱 App Launching Soon"].map((t) => (
              <span key={t} style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{t}</span>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            ABOUT
        ══════════════════════════════════════ */}
        <section id="about" style={{ background: "white", overflow: "hidden", width: "100%" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "640px" }}>
            <div className="about-img-col" style={{ position: "relative", overflow: "hidden", minHeight: "400px" }}>
              <img src={DAILY_CARE} alt="Daily Care" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 40%,rgba(8,15,50,0.7) 100%)" }} />
              <div style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem" }}>
                <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.5rem 2rem", display: "inline-block", boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.8rem", fontWeight: 900, color: "#0f1e5a" }}>1 in 4</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#7b8ab0", marginTop: "0.25rem" }}>seniors in the UK report chronic loneliness</div>
                </div>
              </div>
            </div>
            <div className="about-text-col" style={{ padding: "6rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="badge-pill" style={{ marginBottom: "1.25rem", alignSelf: "flex-start" }}>✨ About CompanionPro</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,2.8vw,2.8rem)", fontWeight: 900, color: "#0f1e5a", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                Bridging the gap between families and their elders
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#5a6a9a", lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.25rem" }}>
                When careers, opportunities, and life take children and grandchildren across cities and countries, the elderly are left at home — sometimes isolated, sometimes lonely. CompanionPro was built to solve this.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#5a6a9a", lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "2.25rem" }}>
                Our Companion Pros are warm, compassionate individuals who visit your loved ones at home — building real friendships, not just delivering a service.
              </p>
              <div className="about-feature-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.25rem" }}>
                {[["Friendly & vetted companions", "Every Companion Pro is DBS-checked"], ["Personalised matching", "Based on personality & interests"], ["Flexible visit schedules", "Morning, afternoon, or evenings"], ["Family updates & peace of mind", "Real-time connection for families"]].map(([t, d]) => (
                  <div key={t} style={{ padding: "1.1rem 1.25rem", background: "#f5f8ff", borderRadius: "0.875rem", borderLeft: "3px solid #2563eb" }}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#0f1e5a", marginBottom: "0.25rem" }}>{t}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#7b8ab0", lineHeight: 1.5 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div><button className="btn-primary" onClick={() => setModal(true)}>Join the Waitlist →</button></div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════ */}
        <section id="how-it-works" style={{ background: "#f0f5ff", width: "100%" }}>
          <div style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
            <div className="how-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 3rem" }}>
              <div>
                <span className="badge-pill" style={{ marginBottom: "1rem", display: "block" }}>How It Works</span>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 900, color: "#0f1e5a", lineHeight: 1.15 }}>Simple, caring,<br />and personal</h2>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#5a6a9a", maxWidth: "380px", lineHeight: 1.8, fontSize: "1rem", textAlign: "right" }}>
                Four steps to give your loved one the companionship they deserve — from anywhere in the world.
              </p>
            </div>
          </div>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", width: "100%" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ padding: "3rem 2.75rem", background: i % 2 === 0 ? "white" : "#e8eeff", borderRight: i < 3 ? "1px solid #d8e3ff" : "none", position: "relative" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg,#0f1e5a,#2563eb)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.3rem", marginBottom: "1.5rem", boxShadow: "0 6px 20px rgba(37,99,235,0.3)" }}>{s.n}</div>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0f1e5a", marginBottom: "0.75rem", lineHeight: 1.3 }}>{s.t}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#5a6a9a", lineHeight: 1.75, fontSize: "0.9rem" }}>{s.d}</p>
                {i < 3 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>

          <div className="how-cta" style={{ paddingTop: "3rem", paddingBottom: "5rem", paddingLeft: "3rem" }}>
            <button className="btn-primary" style={{ fontSize: "1rem" }} onClick={() => setModal(true)}>Get Started — Join the Waitlist →</button>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES
        ══════════════════════════════════════ */}
        <section id="services" style={{ background: "white", overflow: "hidden", width: "100%" }}>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
            <div className="services-left" style={{ background: "linear-gradient(180deg,#0f1e5a 0%,#2563eb 100%)", padding: "6rem 3rem", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "180px", height: "180px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span style={{ display: "block", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Our Services</span>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,2.2vw,2.2rem)", fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: "1.5rem" }}>Our companions can help with</h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.7)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2.5rem" }}>Tailored support that fits around your loved one's life, preferences, and daily routine.</p>
                <button className="btn-white" onClick={() => setModal(true)}>Join Waitlist →</button>
              </div>
              <div style={{ position: "relative", zIndex: 1, marginTop: "3rem" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "4rem", fontWeight: 900, color: "rgba(255,255,255,0.1)", lineHeight: 1 }}>6</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>core companion services</div>
              </div>
            </div>
            <div className="services-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderLeft: "1px solid #e8eeff" }}>
              {services.map((s, i) => (
                <div key={i} className="card-hover" style={{ padding: "2.75rem 2.25rem", borderRight: i % 3 < 2 ? "1px solid #e8eeff" : "none", borderBottom: i < 3 ? "1px solid #e8eeff" : "none", background: "white" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0f1e5a", marginBottom: "0.65rem", lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#7b8ab0", lineHeight: 1.75, fontSize: "0.88rem" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS
        ══════════════════════════════════════ */}
        <section ref={statsRef} style={{ background: "linear-gradient(110deg,#080f32 0%,#0f1e5a 40%,#1d4ed8 100%)", width: "100%", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(37,99,235,0.25) 0%,transparent 60%),radial-gradient(circle at 80% 50%, rgba(20,184,166,0.15) 0%,transparent 60%)" }} />
          <div className="stats-grid" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", width: "100%" }}>
            {[[counts[0] + "+", "Seniors on the waitlist", "💙"], [counts[1] + "%", "Family satisfaction rate", "⭐"], ["24/7", "Support availability", "🕐"], ["100%", "DBS-verified companions", "🔒"]].map(([n, l, icon], i) => (
              <div className="stats-cell" key={i} style={{ padding: "4rem 3.5rem", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{icon}</div>
                <div className="number-big" style={{ marginBottom: "0.5rem" }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.5 }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            COMPANION PRO
        ══════════════════════════════════════ */}
        <section id="companion-pro" style={{ background: "#f5f8ff", overflow: "hidden", width: "100%" }}>
          <div className="companion-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "640px" }}>
            <div className="companion-text" style={{ padding: "6rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="badge-pill" style={{ marginBottom: "1.25rem", alignSelf: "flex-start", background: "#ecfdf5", color: "#059669", borderColor: "#a7f3d0" }}>💙 For Compassionate Carers</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,2.8vw,2.8rem)", fontWeight: 900, color: "#0f1e5a", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                Are you a natural carer?<br />This role is for you.
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#5a6a9a", lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "2rem" }}>
                Our Pros are the heart of everything we do. They're warm, patient, people-loving individuals who genuinely want to make a difference in an elder's life.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "2.25rem" }}>
                {[["⏰", "Flexible Hours", "Morning, afternoon, or evening visits — you set the schedule"], ["💷", "Competitive Pay", "Fair, transparent pay for meaningful, rewarding work"], ["🎓", "Full Onboarding", "DBS check, training, and ongoing support provided"], ["🌍", "Real Impact", "Give an elderly person a friend they look forward to seeing"]].map(([icon, t, d]) => (
                  <div key={t} className="benefit-row">
                    <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#0f1e5a" }}>{t}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#7b8ab0", marginTop: "0.15rem", lineHeight: 1.5 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-teal" onClick={() => setModal(true)}>Apply as Companion Pro →</button>
                <button className="btn-primary" onClick={() => scrollTo("how-it-works")}>Learn More</button>
              </div>
            </div>
            <div className="companion-img" style={{ position: "relative", overflow: "hidden", minHeight: "400px" }}>
              <img src={HOME_CARE} alt="Companion Pro" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(270deg,transparent 40%,rgba(245,248,255,0.2) 100%)" }} />
              <div style={{ position: "absolute", top: "2.5rem", right: "2.5rem" }}>
                <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.25rem 1.5rem", boxShadow: "0 12px 40px rgba(15,30,90,0.15)", minWidth: "180px" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#7b8ab0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>Become a</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#0f1e5a" }}>Companion Pro</div>
                  <div style={{ display: "flex", gap: "3px", marginTop: "0.5rem" }}>{[1,2,3,4,5].map((i) => <span key={i} style={{ color: "#f59e0b", fontSize: "0.9rem" }}>★</span>)}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#7b8ab0", marginTop: "0.25rem" }}>Trusted by families</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section style={{ background: "linear-gradient(105deg,#0a1230 0%,#0f1e5a 60%,#1d4ed8 100%)", width: "100%", position: "relative", overflow: "hidden", paddingTop: "7rem", paddingBottom: "7rem" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(37,99,235,0.2) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div className="cta-grid" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", padding: "0 4rem" }}>
            <div>
              <div style={{ width: "60px", height: "60px", borderRadius: "10px", overflow: "hidden", marginBottom: "1.75rem" }}>
                <img src={COMPANIOO_LOGO} alt="CompanionPro" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: "1.25rem" }}>The app is<br />launching soon.</h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "1.08rem", lineHeight: 1.8 }}>
                We're putting the finishing touches on something truly special. Whether you're a family member seeking companionship for a loved one, or a compassionate carer — your place is waiting.
              </p>
            </div>
            <div className="cta-inner-box" style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", borderRadius: "1.75rem", padding: "3rem", border: "1px solid rgba(255,255,255,0.12)" }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 700, color: "white", marginBottom: "0.75rem" }}>Secure your spot today</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>No commitment, no spam — just early access to the UK's most heartfelt senior companion app.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <button className="btn-white" style={{ fontSize: "1.05rem", padding: "1.1rem" }} onClick={() => setModal(true)}>Join the Waitlist — It's Free →</button>
                <button className="btn-teal" style={{ fontSize: "1rem" }} onClick={() => setModal(true)}>Apply as Companion Pro →</button>
              </div>
              <div style={{ marginTop: "1.5rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {["📱 App", "🔒 Secure", "🤝 Trusted"].map((t) => (<span key={t} style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>{t}</span>))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer style={{ background: "#060c28", width: "100%", paddingTop: "5rem", paddingBottom: "2.5rem", color: "white" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1.5fr", gap: "3rem", marginBottom: "4rem", paddingBottom: "3rem", paddingLeft: "4rem", paddingRight: "4rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

            <div className="footer-brand">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ width: "150px", height: "150px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={COMPANIOO_LOGO} alt="CompanionPro" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "white" }}>Companio</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>Caring Connections</div>
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)", lineHeight: 1.85, fontSize: "0.88rem", marginBottom: "1.5rem", maxWidth: "300px" }}>
                Connecting the elderly with warm, trusted companions for at-home support, friendship, and peace of mind for families everywhere.
              </p>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "0.875rem", padding: "1rem 1.25rem", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.6rem" }}>A product of</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <img src={LOGO_THECLA} alt="Thecla Technologies" style={{ height: "30px", width: "30px", objectFit: "contain", opacity: 0.55 }} />
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Thecla Technologies & Services Ltd</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", marginTop: "1px" }}>50 Castile Court, Waltham Cross, EN8 7SG</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>CompanionPro</h4>
              {[{ label: "About Us", id: "about" }, { label: "How It Works", id: "how-it-works" }, { label: "For Families", id: "how-it-works" }, { label: "Become a Companion", id: "companion-pro" }, { label: "Services", id: "services" }].map(({ label, id }) => (
                <button key={label} className="footer-link" onClick={() => scrollTo(id)}>{label}</button>
              ))}
            </div>

            <div>
              <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>Legal</h4>
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Safeguarding", "Complaints"].map((l) => (
                <span key={l} className="footer-link">{l}</span>
              ))}
            </div>

            <div>
              <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>Get Early Access</h4>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>Be the first to know when CompanionPro launches in the UK.</p>
              <button className="btn-primary" style={{ width: "100%", fontSize: "0.88rem", padding: "0.85rem" }} onClick={() => setModal(true)}>Join the Waitlist →</button>
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Contact us</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>✉ hello@companionpro.com</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>🌐 www.companionpro.com</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", paddingLeft: "4rem", paddingRight: "4rem" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.25)", fontSize: "0.78rem" }}>© 2026 Companionpro · with the trading name -Thecla Technologies & Services Limited · Registered in England & Wales</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.25)", fontSize: "0.78rem" }}>Made with 💙 in the UK</p>
          </div>
        </footer>

        {modal && <WaitlistModal onClose={() => setModal(false)} />}
      </div>
    </>
  )
}
