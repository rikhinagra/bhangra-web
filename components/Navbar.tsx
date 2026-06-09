"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/",        label: "Home" },
  { href: "/book",    label: "Book a Class" },
  { href: "/contact", label: "Contact" },
];

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
        padding: "0 var(--nav-pad-h)", height: "68px",
        background: scrolled ? "rgba(6,14,30,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,215,0,0.12)" : "1px solid transparent",
        transition: "background 0.4s, border-color 0.4s",
        boxSizing: "border-box", overflow: "hidden",
      }}>

        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:"0.65rem", flexShrink:0, minWidth:0 }}>
          <Image src="/logo.jpg" alt="Ashke Bhangra" width={42} height={42}
            style={{ borderRadius:"7px", border:"1.5px solid rgba(255,215,0,0.5)", objectFit:"cover", width:"42px", height:"42px", flexShrink:0 }}/>
          <span style={{ fontFamily:"var(--font-serif)", display:"flex", flexDirection:"column", lineHeight:1.1, minWidth:0 }}>
            <span style={{ fontSize:"1.1rem", fontWeight:500, color:"#fff", whiteSpace:"nowrap" }}>
              Ashke<em style={{ color:"var(--color-gold)", fontStyle:"italic" }}> Bhangra</em>
            </span>
            <span style={{ fontFamily:"var(--font-display)", fontSize:"0.55rem", letterSpacing:"0.28em", color:"var(--color-gold-muted)", textTransform:"uppercase" }}>
              Club Chicago
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul style={{
          display: "var(--nav-links-d)" as React.CSSProperties["display"],
          listStyle:"none", gap:"2.5rem", fontSize:"0.9rem", fontWeight:500,
        }}>
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link href={href} style={{
                  position:"relative", paddingBottom:"4px",
                  color: active ? "var(--color-gold)" : "rgba(255,255,255,0.85)",
                  transition:"color 0.3s", whiteSpace:"nowrap",
                }}>
                  {label}
                  {active && (
                    <motion.span layoutId="nav-underline" style={{
                      position:"absolute", bottom:0, left:0, right:0,
                      height:"2px", background:"var(--color-gold)", borderRadius:"1px",
                    }}/>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link href="/book" style={{
          display: "var(--nav-cta-d)" as React.CSSProperties["display"],
          alignItems:"center",
          background:"var(--color-gold)", color:"var(--color-navy-deep)",
          padding:"0.6rem 1.4rem", borderRadius:"4px",
          fontSize:"0.88rem", fontWeight:700, letterSpacing:"0.03em",
          whiteSpace:"nowrap", transition:"all 0.3s", flexShrink:0,
        }}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-gold-bright)";el.style.transform="translateY(-2px)";el.style.boxShadow="0 8px 24px rgba(255,215,0,0.35)";}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-gold)";el.style.transform="translateY(0)";el.style.boxShadow="none";}}
        >
          Join the Circle
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            display: "var(--nav-burger-d)" as React.CSSProperties["display"],
            alignItems:"center", justifyContent:"center",
            width:"44px", height:"44px", minWidth:"44px",
            background:"transparent", border:"none",
            cursor:"pointer", flexShrink:0, flexGrow:0, padding:"10px",
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
              position:"fixed", top:"68px", left:0, right:0, zIndex:99,
              background:"rgba(6,14,30,0.98)", backdropFilter:"blur(20px)",
              padding:"1.5rem 1.75rem 2rem",
              borderBottom:"1px solid rgba(255,215,0,0.12)",
            }}
          >
            {links.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                style={{
                  display:"block", padding:"1rem 0",
                  fontSize:"1.15rem", fontFamily:"var(--font-serif)",
                  color: pathname === href ? "var(--color-gold)" : "#fff",
                  borderBottom:"1px solid rgba(255,215,0,0.08)",
                }}
              >
                {label}
              </Link>
            ))}
            <Link href="/book" onClick={() => setOpen(false)}
              style={{
                display:"block", marginTop:"1.5rem",
                background:"var(--color-gold)", color:"var(--color-navy-deep)",
                padding:"1rem", borderRadius:"4px",
                textAlign:"center", fontWeight:700, fontSize:"1rem",
              }}
            >
              Book Your Class
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
