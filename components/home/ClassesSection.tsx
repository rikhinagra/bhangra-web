"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const classes = [
  { num:"01", title:"Little Sher",         ages:"Ages 5–9",   desc:"Tiny dancers learn the basics — claps, jumps, and shoulder shakes — through games and stories from Punjab." },
  { num:"02", title:"Youth Crew",           ages:"Ages 10–16", desc:"Performance-ready choreography, traditional steps, and prop work (sapp, khunda). Compete-ready training." },
  { num:"03", title:"Beginner",             ages:"17+",        desc:"No experience? No problem. Foundational footwork, dhamaal, and Punjabi music theory in a low-pressure room." },
  { num:"04", title:"Advanced",             ages:"17+",        desc:"For dancers ready to perform. Stamina-building, formation work, traditional Gidda/Bhangra fusion." },
  { num:"05", title:"Wedding Choreography", ages:"All ages",   desc:"Private and group sessions for sangeet, baraat, and reception performances. Custom-built routines." },
];

const N = classes.length;

function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}

function getOffset(i: number, active: number) {
  const half = Math.floor(N / 2);
  return mod(i - active + half, N) - half;
}

export default function ClassesSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(p => mod(p + 1, N));
    }, 4500);
  };

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    startAutoPlay();
  };

  // Swipe support
  const pointerStartX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { pointerStartX.current = e.clientX; };
  const onPointerUp   = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const diff = pointerStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      goTo(mod(active + (diff > 0 ? 1 : -1), N));
    }
    pointerStartX.current = null;
  };

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
          style={{ fontFamily:"var(--font-serif)", fontWeight:500, fontSize:"clamp(2rem,5vw,4rem)", lineHeight:1.05, letterSpacing:"-0.02em", color:"#fff", textAlign:"center", marginBottom:"3.5rem" }}
        >
          Five circles. One <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>rhythm</em>.
        </motion.h2>

        {/* Carousel */}
        <motion.div
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.8, delay:0.2 }}
        >
          {/* Track */}
          <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            style={{
              position: "relative",
              height: "clamp(260px, 72vw, 340px)",
              perspective: "1400px",
              userSelect: "none",
              cursor: "grab",
            }}
          >
            {classes.map((cls, i) => {
              const off = getOffset(i, active);
              const abs = Math.abs(off);
              const scale   = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.68;
              const xPct    = off * 58;
              const rotateY = off * -12;
              const opacity = abs === 0 ? 1 : abs === 1 ? 1 : abs === 2 ? 0.85 : 0;
              const zIndex  = 10 - abs;

              return (
                <motion.div
                  key={cls.num}
                  animate={{ x: `${xPct}%`, scale, rotateY, opacity }}
                  transition={{ type:"spring", stiffness:260, damping:30 }}
                  onClick={() => goTo(i)}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    width: "clamp(260px, 72vw, 320px)",
                    height: "clamp(260px, 72vw, 320px)",
                    marginLeft: "clamp(-160px, -36vw, -120px)",
                    zIndex,
                    cursor: abs === 0 ? "default" : "pointer",
                    transformStyle: "preserve-3d",
                    background: abs === 0 ? "var(--color-navy-light)" : "var(--color-navy)",
                    border: abs === 0
                      ? "2px solid var(--color-gold)"
                      : "1px solid rgba(255,215,0,0.18)",
                    borderRadius: "12px",
                    padding: "1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    overflow: "hidden",
                    boxShadow: abs === 0
                      ? "0 24px 60px rgba(0,0,0,0.7)"
                      : "0 8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"1.75rem", color: abs === 0 ? "var(--color-gold)" : "rgba(255,215,0,0.3)", marginBottom:"0.6rem", lineHeight:1 }}>
                    {cls.num}
                  </div>
                  <h3 style={{ fontFamily:"var(--font-serif)", fontWeight:600, fontSize:"1.25rem", color: abs === 0 ? "#fff" : "rgba(255,255,255,0.3)", marginBottom:"0.3rem" }}>
                    {cls.title}
                  </h3>
                  <p style={{ fontSize:"0.7rem", letterSpacing:"0.14em", textTransform:"uppercase", color: abs === 0 ? "var(--color-saffron)" : "rgba(255,107,53,0.4)", marginBottom:"0.85rem", fontFamily:"var(--font-display)" }}>
                    {cls.ages}
                  </p>
                  <p style={{ fontSize:"0.85rem", lineHeight:1.65, color: abs === 0 ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.25)" }}>
                    {cls.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div style={{ display:"flex", justifyContent:"center", gap:"0.5rem", marginTop:"2.5rem" }}>
            {classes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === active ? "22px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  background: i === active ? "var(--color-gold)" : "rgba(255,255,255,0.25)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
