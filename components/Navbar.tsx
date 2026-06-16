"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        width: "100%", maxWidth: "100vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px var(--nav-pad-h)",
        background: scrolled ? "rgba(6,14,30,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,215,0,0.12)" : "1px solid transparent",
        transition: "background 0.4s, border-color 0.4s",
        boxSizing: "border-box", overflow: "hidden",
      }}>

        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:"0.75rem", flexShrink:0, minWidth:0 }}>
          <Image src="/logo.jpg" alt="Ashke Bhangra" width={56} height={56}
            style={{ borderRadius:"9px", border:"1.5px solid rgba(255,215,0,0.5)", objectFit:"cover", width:"56px", height:"56px", flexShrink:0, filter:"drop-shadow(0 2px 10px rgba(0,0,0,0.8))" }}/>
          <span style={{ fontFamily:"var(--font-serif)", display:"flex", flexDirection:"column", lineHeight:1.1, minWidth:0 }}>
            <span style={{ fontSize:"1.15rem", fontWeight:500, color:"#fff", whiteSpace:"nowrap", textShadow:"0 1px 8px rgba(0,0,0,0.9), 0 2px 16px rgba(0,0,0,0.7)" }}>
              Ashke<em style={{ color:"var(--color-gold)", fontStyle:"italic" }}> Bhangra</em>
            </span>
            <span style={{ fontFamily:"var(--font-display)", fontSize:"0.55rem", letterSpacing:"0.28em", color:"var(--color-gold-muted)", textTransform:"uppercase", textShadow:"0 1px 6px rgba(0,0,0,0.9)" }}>
              Club Chicago
            </span>
          </span>
        </Link>

        {/* Desktop CTA */}
        <Link href="/book" style={{
          display: "var(--nav-cta-d)" as React.CSSProperties["display"],
          alignItems:"center",
          background:"var(--color-gold)", color:"var(--color-navy-deep)",
          padding:"0.55rem 1.1rem", borderRadius:"4px",
          fontSize:"0.92rem", fontWeight:700, letterSpacing:"0.03em",
          whiteSpace:"nowrap", transition:"all 0.3s", flexShrink:0,
          boxShadow:"0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)",
        }}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-gold-bright)";el.style.transform="translateY(-2px)";el.style.boxShadow="0 8px 24px rgba(255,215,0,0.35)";}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-gold)";el.style.transform="translateY(0)";el.style.boxShadow="0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)";}}
        >
          BOOK A CLASS
        </Link>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            display: "var(--nav-burger-d)" as React.CSSProperties["display"],
            alignItems:"center", justifyContent:"center",
            width:"44px", height:"44px", minWidth:"44px",
            background:"transparent", border:"none",
            cursor:"pointer", flexShrink:0, padding:"10px",
          }}
        >
          <HamburgerIcon open={open}/>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
            transition={{ duration:0.22 }}
            style={{
              position:"fixed", top:"82px", left:0, right:0, zIndex:99,
              background:"rgba(6,14,30,0.98)", backdropFilter:"blur(20px)",
              padding:"1.5rem 1.75rem 2rem",
              borderBottom:"1px solid rgba(255,215,0,0.12)",
            }}
          >
            <Link href="/book" onClick={() => setOpen(false)}
              style={{
                display:"block", marginTop:"1.5rem",
                background:"var(--color-gold)", color:"var(--color-navy-deep)",
                padding:"1rem", borderRadius:"4px",
                textAlign:"center", fontWeight:700, fontSize:"1rem",
              }}
            >
              BOOK A CLASS
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const line: React.CSSProperties = {
    display:"block", width:"22px", height:"2px", borderRadius:"2px",
    background:"var(--color-gold)", transformOrigin:"center",
    transition:"transform 0.35s cubic-bezier(0.2,0.8,0.2,1), opacity 0.25s ease, width 0.3s ease",
  };
  return (
    <span style={{ display:"flex", flexDirection:"column", gap:"5px", alignItems:"center", justifyContent:"center" }}>
      <span style={{ ...line, transform: open ? "translateY(7px) rotate(45deg)" : "none" }}/>
      <span style={{ ...line, width: open ? "0px" : "16px", opacity: open ? 0 : 1 }}/>
      <span style={{ ...line, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}/>
    </span>
  );
}
