"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";

export default function VenueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <section ref={ref} style={{
      display: "grid",
      gridTemplateColumns: "var(--g-venue)",
      minHeight: "520px",
      background: "var(--color-navy-deep)",
    }}>

      {/* Left: info */}
      <motion.div
        initial={{ opacity:0, x:-40 }}
        animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration:0.9, ease:"easeOut" as const }}
        style={{
          padding: "var(--s-venue-left)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRight: "1px solid rgba(255,215,0,0.1)",
        }}
      >
        <p style={{ fontFamily:"var(--font-display)", fontSize:"0.82rem", letterSpacing:"0.32em", color:"var(--color-saffron)", textTransform:"uppercase", marginBottom:"1.5rem" }}>
          03 · Where We Dance
        </p>

        <h2 style={{ fontFamily:"var(--font-serif)", fontWeight:500, fontSize:"clamp(1.75rem,4vw,3.25rem)", lineHeight:1.1, letterSpacing:"-0.02em", color:"#fff", marginBottom:"1.25rem" }}>
          National India Hub,{" "}
          <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>Schaumburg</em>
        </h2>

        <p style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontSize:"clamp(1rem,1.5vw,1.2rem)", lineHeight:1.6, color:"rgba(255,255,255,0.8)", marginBottom:"2rem" }}>
          The largest Indian community center in North America — 107,000 square feet of culture,
          community, and now, your weekly Bhangra circle.
        </p>

        <address style={{ fontStyle:"normal", display:"flex", alignItems:"flex-start", gap:"0.75rem", marginBottom:"2rem" }}>
          <MapPin size={20} style={{ color:"var(--color-gold)", marginTop:"3px", flexShrink:0 }}/>
          <span style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(1.1rem,2vw,1.4rem)", color:"#fff", lineHeight:1.5 }}>
            930 National Parkway<br/>Schaumburg, IL 60173
          </span>
        </address>

        <a href="https://maps.google.com/?q=930+National+Parkway+Schaumburg+IL+60173"
          target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"transparent", color:"var(--color-gold)", padding:"0.85rem 1.75rem", borderRadius:"4px", fontSize:"0.9rem", fontWeight:600, border:"1.5px solid var(--color-gold)", width:"fit-content", transition:"all 0.3s ease" }}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-gold)";el.style.color="var(--color-navy-deep)";}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="transparent";el.style.color="var(--color-gold)";}}
        >
          Get Directions
        </a>
      </motion.div>

      {/* Right: map */}
      <motion.div
        initial={{ opacity:0, x:40 }}
        animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration:0.9, delay:0.15, ease:"easeOut" as const }}
        style={{ position:"relative", minHeight:"var(--venue-map-h)" }}
      >
        <iframe
          src="https://www.google.com/maps?q=930+National+Parkway+Schaumburg+IL+60173&output=embed"
          width="100%" height="100%"
          style={{ border:0, display:"block", minHeight:"380px", filter:"brightness(0.85) saturate(0.7) contrast(1.1)" }}
          allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="National India Hub location"
        />
      </motion.div>
    </section>
  );
}
