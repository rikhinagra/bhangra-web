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
          Where the{" "}
          <em style={{ color:"var(--color-gold)", fontStyle:"italic" }}>pind</em>{" "}
          meets the prairie.
        </h2>

        <p style={{
          fontFamily:"var(--font-serif)",
          fontSize:"clamp(1.05rem,2vw,1.35rem)",
          lineHeight:1.6,
          color:"rgba(255,255,255,0.9)",
          marginBottom:"1.5rem",
          fontStyle:"italic",
        }}>
          Ashke Bhangra Chicago is a community of dancers, drummers, and dreamers
          keeping the folk traditions of Punjab alive on Midwest soil.
        </p>

        <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.72)", marginBottom:"1.25rem", lineHeight:1.8 }}>
          We teach <strong style={{ color:"#fff" }}>traditional Bhangra</strong> the way it was meant to be danced:
          shoulders high, chest open, feet pounding with the dhol. Whether you&apos;re a first-generation kid
          reconnecting with your roots, a curious dancer drawn to the energy, or a parent who wants their
          child to grow up moving to a beat older than memory, there&apos;s a circle here for you.
        </p>

        <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.72)", lineHeight:1.8 }}>
          Classes happen weekly at the{" "}
          <strong style={{ color:"var(--color-gold)" }}>National India Hub</strong>, the largest Indian
          community center in North America. Come for one class. Stay for the family.
        </p>
      </motion.div>
    </section>
  );
}
