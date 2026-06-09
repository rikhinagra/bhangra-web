"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: "easeOut" as const },
});

const marqueeWords = [
  "BALLE BALLE","•","CHAK DE PHATTE","•",
  "OYE HOYE","•","BHANGRA PA LAI","•",
  "BALLE BALLE","•","CHAK DE PHATTE","•",
  "OYE HOYE","•","BHANGRA PA LAI","•",
];

export default function HeroSection() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "var(--hero-justify)" as React.CSSProperties["justifyContent"],
      alignItems: "center",
      overflow: "hidden",
      padding: "var(--s-hero)",
      color: "#fff",
    }}>

      {/* Video */}
      <video autoPlay muted loop playsInline poster="/banner.jpeg"
        style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0 }}>
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4"  type="video/mp4"  />
      </video>

      {/* Overlay — light enough to show video, dark enough for text readability */}
      <div style={{
        position:"absolute",inset:0,zIndex:1,
        background:`radial-gradient(ellipse at 30% 50%,rgba(13,27,62,0.35) 0%,rgba(6,14,30,0.62) 65%),
                    linear-gradient(180deg,rgba(6,14,30,0.15) 0%,rgba(6,14,30,0.55) 100%)`,
      }}/>

      {/* Dark vignette centred on the text — keeps video visible at the edges */}
      <div style={{
        position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
        background:"radial-gradient(ellipse 70% 65% at 50% 50%, rgba(4,10,24,0.72) 0%, transparent 100%)",
      }}/>

      {/* Gold edge lines */}
      <div style={{
        position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
        background:"linear-gradient(180deg,rgba(255,215,0,0.08) 0%,transparent 8%,transparent 92%,rgba(255,215,0,0.08) 100%)",
      }}/>

      {/* Content */}
      <div style={{ position:"relative",zIndex:3,maxWidth:"1100px",textAlign:"center",width:"100%" }}>

        {/* Crest */}
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

        {/* Eyebrow */}
        <motion.p {...fadeUp(0.2)} style={{
          fontFamily:"var(--font-display)",
          fontSize:"clamp(0.72rem,2vw,0.95rem)",
          letterSpacing:"0.3em",
          color:"var(--color-gold)",
          marginBottom:"1.5rem",
          textTransform:"uppercase",
        }}>
          — ਚੱਕ ਦੇ ਫੱਟੇ —
        </motion.p>

        {/* Title */}
        <h1 style={{
          fontFamily:"var(--font-serif)",
          fontWeight:500,
          fontSize:"clamp(2.75rem,9vw,7.5rem)",
          lineHeight:0.95,
          letterSpacing:"-0.02em",
          marginBottom:"1.75rem",
          textShadow:"0 2px 20px rgba(0,0,0,0.7), 0 4px 40px rgba(0,0,0,0.5)",
        }}>
          {[
            { text:"Feel the",  accent:false, delay:0.35 },
            { text:"Dhol.",     accent:true,  delay:0.5  },
            { text:"Move like", accent:false, delay:0.65 },
            { text:"Punjab.",   accent:true,  delay:0.8  },
          ].map(({ text, accent, delay }) => (
            <motion.span key={text} {...fadeUp(delay)} style={{ display:"block" }}>
              {accent
                ? <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>{text}</em>
                : text}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(1.0)} style={{
          fontSize:"clamp(0.95rem,1.5vw,1.2rem)",
          fontWeight:300,
          maxWidth:"600px",
          margin:"0 auto 2.25rem",
          lineHeight:1.75,
          color:"rgba(255,255,255,0.92)",
          textShadow:"0 1px 12px rgba(0,0,0,0.8)",
        }}>
          Authentic Bhangra classes in the heart of Chicagoland. Weekly sessions at the
          National India Hub, Schaumburg. Bring your beat, we&apos;ll teach you the rest.
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
        position:"absolute",bottom:0,left:0,right:0,zIndex:4,
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
          {marqueeWords.map((w,i) => <span key={i} style={{ flexShrink:0 }}>{w}</span>)}
        </div>
      </div>
    </section>
  );
}
