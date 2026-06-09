"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <section ref={ref} style={{
      textAlign: "center",
      padding: "var(--s-cta)",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg,var(--color-gold) 0%,var(--color-saffron) 100%)",
      color: "var(--color-navy-deep)",
    }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 20% 50%,rgba(6,14,30,0.08) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(6,14,30,0.08) 0%,transparent 50%)`, pointerEvents:"none" }}/>

      <div style={{ position:"relative", zIndex:1 }}>
        <motion.p
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}
          style={{ fontFamily:"var(--font-display)", fontSize:"0.82rem", letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:"1.5rem", opacity:0.7 }}
        >
          One Soul. One Beat. Ashke.
        </motion.p>

        <motion.h2
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.9, delay:0.1, ease:"easeOut" as const }}
          style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:500, fontSize:"clamp(2.25rem,6vw,4.75rem)", marginBottom:"1rem", letterSpacing:"-0.02em", lineHeight:1.05 }}
        >
          Your first class is on us.
        </motion.h2>

        <motion.p
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7, delay:0.25 }}
          style={{ fontSize:"clamp(1rem,2vw,1.2rem)", marginBottom:"3rem", opacity:0.8 }}
        >
          Walk in. Try a class. Decide after.
        </motion.p>

        <motion.div initial={{ opacity:0, scale:0.9 }} animate={inView ? { opacity:1, scale:1 } : {}} transition={{ duration:0.7, delay:0.4 }}>
          <Link href="/book" style={{
            display:"inline-block",
            background:"var(--color-navy-deep)",
            color:"var(--color-gold)",
            padding:"1.1rem 2.75rem",
            borderRadius:"4px",
            fontSize:"1.05rem",
            fontWeight:700,
            letterSpacing:"0.03em",
            transition:"all 0.3s ease",
            boxShadow:"0 8px 32px rgba(6,14,30,0.35)",
          }}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-navy)";el.style.transform="translateY(-3px)";el.style.boxShadow="0 16px 40px rgba(6,14,30,0.5)";}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-navy-deep)";el.style.transform="translateY(0)";el.style.boxShadow="0 8px 32px rgba(6,14,30,0.35)";}}
          >
            Book Your Trial
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
