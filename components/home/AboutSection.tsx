"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="about" ref={ref} style={{
      padding: "var(--s-section)",
      maxWidth: "860px",
      margin: "0 auto",
    }}>
      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={inView ? { opacity:1, y:0 } : {}}
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
          Keeping our heritage{" "}
          <em style={{ color:"var(--color-gold)", fontStyle:"italic" }}>loud and alive.</em>
        </h2>

        <p style={{
          fontFamily:"var(--font-serif)",
          fontSize:"clamp(1.05rem,2vw,1.35rem)",
          lineHeight:1.6,
          color:"rgba(255,255,255,0.9)",
          marginBottom:"1.5rem",
          fontStyle:"italic",
        }}>
          Welcome to Ashke Bhangra Chicago. We are more than a dance class—we are a vibrant platform built to participate, celebrate, and rejuvenate the rich heritage of Punjab.
        </p>

        <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.72)", marginBottom:"1.25rem", lineHeight:1.8 }}>
          Our heart belongs entirely to the authentic forms of folk Bhangra, keeping our traditions alive and thriving on Midwest soil.
        </p>

        <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.72)", marginBottom:"1.25rem", lineHeight:1.8 }}>
          When you join our circle, you are learning from the best. Guided by a head coach who is nationally and internationally recognized for his performances, we teach Bhangra the exact way it was meant to be danced: shoulders high, chest open and feet pounding to the rhythm of the dhol.
        </p>

        <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.72)", lineHeight:1.8 }}>
          Come for the culture. Stay for the family.
        </p>
      </motion.div>
    </section>
  );
}
