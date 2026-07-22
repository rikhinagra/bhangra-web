"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(eased * target));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count}{suffix}</>;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: "easeOut" as const },
});

const marqueeWords = [
  "Bhangra","•","Jhoomer","•","Sammi","•","Gidha","•","Luddi","•",
];

export default function HeroSection() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      overflow: "hidden",
      padding: "0",
      color: "#fff",
    }}>

      {/* Video */}
      <video autoPlay muted loop playsInline poster="/banner.jpeg"
        style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0 }}>
        <source src="https://res.cloudinary.com/dnr6utnzf/video/upload/q_auto/f_auto/v1781667768/hero_kqlaw8.webm" type="video/webm" />
        <source src="https://res.cloudinary.com/dnr6utnzf/video/upload/q_auto/f_auto/v1781667164/hero_bhr9n5.mp4"  type="video/mp4"  />
      </video>

      {/* Top navbar vignette — dark at very top so logo/links are always readable */}
      <div style={{
        position:"absolute",inset:0,zIndex:3,pointerEvents:"none",
        background:"linear-gradient(180deg, rgba(6,14,30,0.85) 0%, rgba(6,14,30,0.40) 15%, transparent 32%)",
      }}/>

      {/* Gold shimmer at top edge */}
      <div style={{
        position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
        background:"linear-gradient(180deg, rgba(255,215,0,0.08) 0%, transparent 10%)",
      }}/>

      {/* Main overlay — clear in middle, dark behind text at bottom */}
      <div style={{
        position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
        background:"linear-gradient(180deg, transparent 25%, rgba(6,14,30,0.08) 50%, rgba(6,14,30,0.82) 80%, rgba(6,14,30,0.65) 95%, rgba(6,14,30,0.40) 100%)",
      }}/>

      {/* Content */}
      <div style={{ position:"relative",zIndex:3,maxWidth:"1100px",textAlign:"center",width:"100%",padding:"0 2rem 2rem" }}>

        {/* Crest — commented out
        <motion.div
          initial={{ opacity:0, scale:0.6, rotate:-10 }}
          animate={{ opacity:1, scale:1,   rotate:0   }}
          transition={{ duration:1.2, delay:0.1, ease:"easeOut" as const }}
        >
          <Image
            src="/logo.jpg" alt="Ashke Bhangra Club Chicago"
            width={140} height={140}
            style={{
              width: "var(--hero-crest)",
              height: "var(--hero-crest)",
              borderRadius: "14px",
              margin: "0 auto 2rem",
              display: "block",
              objectFit: "cover",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6),0 0 0 1.5px rgba(255,215,0,0.5),0 0 50px rgba(255,215,0,0.12)",
            }}
          />
        </motion.div>
        */}

        {/* 300+ Dancers Trained */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.1 }}
          style={{ textAlign:"center", marginBottom:"2rem" }}
        >
          <div style={{
            fontFamily:"var(--font-display)",
            fontSize:"clamp(2rem,4vw,3rem)",
            color:"var(--color-gold)",
            lineHeight:1,
            marginBottom:"0.3rem",
            textShadow:"0 2px 16px rgba(0,0,0,0.8)",
          }}>
            <CountUp target={3000} suffix="+"/>
          </div>
          <div style={{
            fontSize:"clamp(0.65rem,1vw,0.78rem)",
            letterSpacing:"0.22em",
            textTransform:"uppercase",
            color:"rgba(255,255,255,1)",
            textShadow:"0 2px 6px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,1)",
          }}>
            Dancers Trained
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p {...fadeUp(0.2)} style={{
          fontFamily:"var(--font-display)",
          fontSize:"clamp(0.72rem,2vw,0.95rem)",
          letterSpacing:"0.05em",
          color:"var(--color-gold)",
          marginBottom:"1.5rem",
        }}>
          ~ ਪੰਜਾਬੀ ਦੀ ਸ਼ਾਨ ਤੇ ਜਿੰਦ ਜਾਨ ਭੰਗੜਾ ~
        </motion.p>

        {/* Title */}
        <motion.h1
          {...fadeUp(0.35)}
          style={{
            fontFamily:"var(--font-serif)",
            fontWeight:500,
            fontSize:"clamp(1.75rem,4vw,3.25rem)",
            lineHeight:1.2,
            letterSpacing:"-0.02em",
            marginBottom:"1.75rem",
            textShadow:"0 2px 20px rgba(0,0,0,0.7), 0 4px 40px rgba(0,0,0,0.5)",
            whiteSpace:"nowrap",
          }}
        >
          Feel the{" "}
          <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>Dhol.</em>
          {" "}Move like{" "}
          <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>Punjab.</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.5)} style={{
          fontFamily:"var(--font-serif)",
          fontSize:"clamp(0.95rem,1.8vw,1.15rem)",
          fontWeight:300,
          fontStyle:"italic",
          maxWidth:"560px",
          margin:"0 auto 2.25rem",
          lineHeight:1.75,
          color:"rgba(255,255,255,1)",
          textShadow:"0 2px 6px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,1)",
          textAlign:"center",
        }}>
          The rich Punjabi culture teaches everyone to remain happy and healthy, and instills good manners.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(1.2)} style={{
          display: "flex",
          flexDirection: "var(--hero-cta-dir)" as React.CSSProperties["flexDirection"],
          gap: "0.75rem",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
        }}>
          <Link href="/book" style={{
            display:"block",
            background:"var(--color-gold)",
            color:"var(--color-navy-deep)",
            padding:"0.9rem 2rem",
            borderRadius:"4px",
            fontSize:"0.95rem",
            fontWeight:700,
            letterSpacing:"0.02em",
            transition:"all 0.3s ease",
            boxShadow:"0 4px 24px rgba(255,215,0,0.3)",
            textAlign:"center",
            width:"100%",
          }}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-gold-bright)";el.style.transform="translateY(-3px)";el.style.boxShadow="0 12px 32px rgba(255,215,0,0.45)";}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--color-gold)";el.style.transform="translateY(0)";el.style.boxShadow="0 4px 24px rgba(255,215,0,0.3)";}}
          >
            Book Your First Class
          </Link>
          <a href="#about" style={{
            display:"block",
            background:"transparent",
            color:"#fff",
            padding:"0.9rem 2rem",
            borderRadius:"4px",
            fontSize:"0.95rem",
            fontWeight:500,
            border:"1.5px solid rgba(255,255,255,0.45)",
            transition:"all 0.3s ease",
            textAlign:"center",
            width:"100%",
          }}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="var(--color-gold)";el.style.color="var(--color-gold)";}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.45)";el.style.color="#fff";}}
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{
        position:"relative",width:"100%",zIndex:4,
        background:"linear-gradient(90deg,var(--color-gold) 0%,var(--color-gold-bright) 50%,var(--color-gold) 100%)",
        color:"var(--color-navy-deep)",
        padding:"0.85rem 0",
        overflow:"hidden",
        borderTop:"2px solid rgba(6,14,30,0.4)",
      }}>
        <div className="animate-marquee" style={{
          display:"flex",
          gap:"3rem",
          whiteSpace:"nowrap",
          fontFamily:"var(--font-display)",
          fontSize:"clamp(0.78rem,1.2vw,1rem)",
          letterSpacing:"0.22em",
          fontWeight:700,
        }}>
          {[...marqueeWords,...marqueeWords,...marqueeWords,...marqueeWords].map((w,i) => <span key={i} style={{ flexShrink:0 }}>{w}</span>)}
        </div>
      </div>
    </section>
  );
}
