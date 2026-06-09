"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { num:"300+", label:"Dancers Trained" },
  { num:"5",    label:"Levels Offered"  },
  { num:"107K", label:"Sq Ft Venue"     },
  { num:"∞",   label:"Energy"          },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="about" ref={ref} style={{
      padding: "var(--s-section)",
      maxWidth: "1280px",
      margin: "0 auto",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "var(--g-about)",
        gap: "var(--g-about-gap)",
        alignItems: "start",
      }}>

        {/* Text column */}
        <motion.div
          initial={{ opacity:0, x:-40 }}
          animate={inView ? { opacity:1, x:0 } : {}}
          transition={{ duration:0.9, ease:"easeOut" as const }}
        >
          <p style={{
            fontFamily:"var(--font-display)",
            fontSize:"0.82rem",
            letterSpacing:"0.32em",
            color:"var(--color-saffron)",
            textTransform:"uppercase",
            marginBottom:"1.5rem",
          }}>
            01 · About Ashke
          </p>

          <h2 style={{
            fontFamily:"var(--font-serif)",
            fontWeight:500,
            fontSize:"clamp(2rem,4.5vw,3.75rem)",
            lineHeight:1.05,
            letterSpacing:"-0.02em",
            color:"#fff",
            marginBottom:"1.75rem",
          }}>
            Where the{" "}
            <em style={{ color:"var(--color-gold)", fontStyle:"italic" }}>pind</em>{" "}
            meets the prairie.
          </h2>

          <p style={{
            fontFamily:"var(--font-serif)",
            fontSize:"clamp(1.05rem,2vw,1.35rem)",
            lineHeight:1.55,
            color:"rgba(255,255,255,0.9)",
            marginBottom:"1.5rem",
            fontStyle:"italic",
          }}>
            Ashke Bhangra Chicago is a community of dancers, drummers, and dreamers
            keeping the folk traditions of Punjab alive on Midwest soil.
          </p>

          <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.72)", marginBottom:"1.25rem", lineHeight:1.75 }}>
            We teach <strong style={{ color:"#fff" }}>traditional Bhangra</strong> the way it was meant to be danced:
            shoulders high, chest open, feet pounding with the dhol. Whether you&apos;re a first-generation kid
            reconnecting with your roots, a curious dancer drawn to the energy, or a parent who wants their
            child to grow up moving to a beat older than memory, there&apos;s a circle here for you.
          </p>

          <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.72)", lineHeight:1.75 }}>
            Classes happen weekly at the{" "}
            <strong style={{ color:"var(--color-gold)" }}>National India Hub</strong>, the largest Indian
            community center in North America. Come for one class. Stay for the family.
          </p>
        </motion.div>

        {/* Stats column */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "var(--g-stats)",
          gap: "2rem",
          paddingTop: "1rem",
        }}>
          {stats.map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity:0, y:30 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.7, delay:0.2 + i * 0.1, ease:"easeOut" as const }}
              style={{ borderTop:"2px solid var(--color-gold)", paddingTop:"1.25rem" }}
            >
              <span style={{
                display:"block",
                fontFamily:"var(--font-display)",
                fontSize:"clamp(2.5rem,5vw,3.25rem)",
                color:"var(--color-gold)",
                lineHeight:1,
                marginBottom:"0.5rem",
              }}>
                {num}
              </span>
              <span style={{
                fontSize:"0.78rem",
                letterSpacing:"0.18em",
                textTransform:"uppercase",
                color:"var(--color-saffron)",
              }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
