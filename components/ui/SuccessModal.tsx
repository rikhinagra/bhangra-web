"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Check } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function SuccessModal({ open, onClose, title, message }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(6,14,30,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--color-navy)",
              border: "1px solid rgba(255,215,0,0.25)",
              padding: "3.5rem 3rem",
              maxWidth: "480px",
              width: "100%",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,215,0,0.1)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.6)",
                transition: "all 0.2s",
              }}
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Logo */}
            <Image
              src="/logo.jpg"
              alt="Ashke Bhangra"
              width={80}
              height={80}
              style={{
                borderRadius: "10px",
                margin: "0 auto 1.5rem",
                border: "1.5px solid rgba(255,215,0,0.4)",
                objectFit: "cover",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            />

            {/* Gold tick */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255,215,0,0.12)",
                border: "2px solid var(--color-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <Check size={22} color="var(--color-gold)" strokeWidth={2.5} />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "2.25rem",
                color: "var(--color-gold)",
                marginBottom: "1rem",
              }}
            >
              {title}
            </h2>

            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "2rem" }}>
              {message}
            </p>

            <button
              onClick={onClose}
              style={{
                background: "var(--color-gold)",
                color: "var(--color-navy-deep)",
                padding: "0.9rem 2.5rem",
                borderRadius: "4px",
                fontSize: "0.95rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-gold-bright)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-gold)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
