"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

/* ── Social brand SVGs ── */
function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const socials = [
  { href:"https://instagram.com", label:"Instagram", Icon:IconInstagram, color:"#E1306C", bg:"rgba(225,48,108,0.12)" },
  { href:"https://youtube.com",   label:"YouTube",   Icon:IconYouTube,   color:"#FF0000", bg:"rgba(255,0,0,0.12)"   },
  { href:"https://facebook.com",  label:"Facebook",  Icon:IconFacebook,  color:"#1877F2", bg:"rgba(24,119,242,0.12)"},
];

export default function Footer() {
  return (
    <footer style={{
      background:"var(--color-navy-deep)",
      borderTop:"1px solid rgba(255,215,0,0.1)",
      padding:"var(--s-footer)",
    }}>
      <div style={{
        maxWidth:"1280px", margin:"0 auto 3rem",
        display:"grid", gridTemplateColumns:"var(--g-footer)", gap:"3rem",
      }}>

        {/* Brand */}
        <div>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <Image src="/logo.jpg" alt="Ashke Bhangra" width={48} height={48}
              style={{ borderRadius:"8px", border:"1.5px solid rgba(255,215,0,0.4)", objectFit:"cover", width:"48px", height:"48px" }}/>
            <span style={{ fontFamily:"var(--font-serif)", display:"flex", flexDirection:"column", lineHeight:1.1 }}>
              <span style={{ fontSize:"1.15rem", fontWeight:500, color:"#fff" }}>
                Ashke <em style={{ color:"var(--color-saffron)", fontStyle:"italic" }}>Bhangra</em>
              </span>
              <span style={{ fontFamily:"var(--font-display)", fontSize:"0.58rem", letterSpacing:"0.28em", color:"var(--color-gold-muted)", textTransform:"uppercase" }}>
                Club Chicago
              </span>
            </span>
          </Link>
          <p style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", color:"rgba(255,255,255,0.55)", fontSize:"1rem", maxWidth:"300px", lineHeight:1.6, marginBottom:"1.25rem" }}>
            Chicago&apos;s home for authentic Punjabi Bhangra.
          </p>

          {/* Social icons */}
          <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
            {socials.map(({ href, label, Icon, color, bg }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  width:"38px", height:"38px",
                  borderRadius:"10px",
                  border:`1px solid ${color}44`,
                  color: color,
                  background: bg,
                  transition:"all 0.3s",
                }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="translateY(-2px)";el.style.boxShadow=`0 6px 20px ${color}44`;el.style.borderColor=color;}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="translateY(0)";el.style.boxShadow="none";el.style.borderColor=`${color}44`;}}
              >
                <Icon/>
              </a>
            ))}
          </div>
        </div>

        {/* Visit */}
        <div>
          <h4 style={{ fontFamily:"var(--font-display)", fontSize:"0.82rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--color-gold)", marginBottom:"1rem" }}>
            Visit
          </h4>
          <p style={{ fontSize:"0.95rem", lineHeight:1.8, color:"rgba(255,255,255,0.7)" }}>
            <span style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
              <MapPin size={14} style={{ marginTop:"4px", color:"var(--color-gold)", flexShrink:0 }}/>
              <span>National India Hub<br/>930 National Parkway<br/>Schaumburg, IL 60173</span>
            </span>
          </p>
        </div>

        {/* Connect */}
        <div>
          <h4 style={{ fontFamily:"var(--font-display)", fontSize:"0.82rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--color-gold)", marginBottom:"1rem" }}>
            Connect
          </h4>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
            {[{ href:"/contact", label:"Contact Us" },{ href:"/book", label:"Book a Class" }].map(({ href, label }) => (
              <Link key={href} href={href}
                style={{ fontSize:"0.95rem", color:"rgba(255,255,255,0.7)", transition:"color 0.3s" }}
                onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--color-gold)")}
                onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.7)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth:"1280px", margin:"0 auto",
        borderTop:"1px solid rgba(255,255,255,0.08)",
        paddingTop:"2rem", textAlign:"center",
        fontSize:"0.82rem", color:"rgba(255,255,255,0.35)", letterSpacing:"0.05em",
      }}>
        © 2026 Ashke Bhangra Chicago · Made with ਖੁਸ਼ੀ
      </div>
    </footer>
  );
}
