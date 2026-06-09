"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const classes = [
  { num:"01", title:"Little Sher",         ages:"Ages 5–9",   desc:"Tiny dancers learn the basics — claps, jumps, and shoulder shakes — through games and stories from Punjab.",                     schedule:"Sundays · 10:00 AM"   },
  { num:"02", title:"Youth Crew",           ages:"Ages 10–16", desc:"Performance-ready choreography, traditional steps, and prop work (sapp, khunda). Compete-ready training.",                       schedule:"Saturdays · 11:00 AM" },
  { num:"03", title:"Adult Beginner",       ages:"17+",        desc:"No experience? No problem. Foundational footwork, dhamaal, and Punjabi music theory in a low-pressure room.",                    schedule:"Fridays · 7:00 PM"    },
  { num:"04", title:"Adult Advanced",       ages:"17+",        desc:"For dancers ready to perform. Stamina-building, formation work, traditional Gidda/Bhangra fusion.",                             schedule:"Saturdays · 6:00 PM"  },
  { num:"05", title:"Wedding Choreography", ages:"All ages",   desc:"Private and group sessions for sangeet, baraat, and reception performances. Custom-built routines.",                             schedule:"By appointment"       },
];

export default function ClassesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <section ref={ref} style={{
      background: "var(--color-navy)",
      padding: "var(--s-section)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative glows */}
      <div style={{ position:"absolute", top:"-30%", right:"-8%", width:"600px", height:"600px", background:"radial-gradient(circle,rgba(255,215,0,0.06) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-20%", left:"-5%", width:"500px", height:"500px", background:"radial-gradient(circle,rgba(255,107,53,0.05) 0%,transparent 70%)", pointerEvents:"none" }}/>

      <div style={{ position:"relative", zIndex:1, maxWidth:"1280px", margin:"0 auto" }}>

        <motion.p
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}
          style={{ fontFamily:"var(--font-display)", fontSize:"0.82rem", letterSpacing:"0.32em", color:"var(--color-saffron)", textTransform:"uppercase", textAlign:"center", marginBottom:"1.25rem" }}
        >
          02 · What We Teach
        </motion.p>

        <motion.h2
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7, delay:0.1 }}
          style={{ fontFamily:"var(--font-serif)", fontWeight:500, fontSize:"clamp(2rem,5vw,4rem)", lineHeight:1.05, letterSpacing:"-0.02em", color:"#fff", textAlign:"center", marginBottom:"4rem" }}
        >
          Five circles. One <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>rhythm</em>.
        </motion.h2>

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.25rem" }}>
          {classes.map(({ num, title, ages, desc, schedule }, i) => (
            <motion.article
              key={num}
              initial={{ opacity:0, y:40 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.7, delay:0.15 + i * 0.08, ease:"easeOut" as const }}
              style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,215,0,0.14)", padding:"2.25rem 1.75rem", borderRadius:"6px", position:"relative", overflow:"hidden" }}
              whileHover={{ y:-6, borderColor:"rgba(255,215,0,0.55)", background:"rgba(255,215,0,0.05)" }}
            >
              <div style={{ fontFamily:"var(--font-display)", fontSize:"2.25rem", color:"var(--color-gold)", marginBottom:"0.75rem", lineHeight:1 }}>{num}</div>
              <h3 style={{ fontFamily:"var(--font-serif)", fontWeight:600, fontSize:"1.4rem", color:"#fff", marginBottom:"0.3rem" }}>{title}</h3>
              <p style={{ fontSize:"0.75rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--color-saffron)", marginBottom:"1rem", fontFamily:"var(--font-display)" }}>{ages}</p>
              <p style={{ fontSize:"0.93rem", lineHeight:1.65, color:"rgba(255,255,255,0.68)", marginBottom:"1.5rem" }}>{desc}</p>
              <div style={{ borderTop:"1px solid rgba(255,215,0,0.18)", paddingTop:"1rem", fontFamily:"var(--font-display)", color:"var(--color-gold)", fontSize:"0.82rem", letterSpacing:"0.12em" }}>{schedule}</div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7, delay:0.7 }}
          style={{ textAlign:"center", marginTop:"3.5rem" }}
        >
          <Link href="/book" style={{
            display:"inline-block", background:"transparent",
            color:"var(--color-gold)", padding:"1rem 2.25rem", borderRadius:"4px",
            fontSize:"0.95rem", fontWeight:600, border:"1.5px solid var(--color-gold)",
            letterSpacing:"0.04em", transition:"all 0.3s ease",
          }}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-gold)";el.style.color="var(--color-navy-deep)";el.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="transparent";el.style.color="var(--color-gold)";el.style.transform="translateY(0)";}}
          >
            Find Your Class
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
