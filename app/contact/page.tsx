"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import SuccessModal from "@/components/ui/SuccessModal";

const schema = z.object({
  name:    z.string().min(2, "Name required"),
  email:   z.string().email("Valid email required"),
  subject: z.string().min(1, "Please choose a subject"),
  message: z.string().min(10, "Message too short"),
});
type FormData = z.infer<typeof schema>;

const contactInfo = [
  { label:"Email",  icon:<Mail size={16}/>,  value:"hello@ashkebhangra.com", href:"mailto:hello@ashkebhangra.com", meta:null },
  { label:"Phone",  icon:<Phone size={16}/>, value:"(847) 450-6789",          href:"tel:+18474506789",              meta:"Mon–Sat · 10 AM – 7 PM CST" },
  { label:"Studio", icon:<MapPin size={16}/>,value:"National India Hub",      href:null,                            meta:"930 National Parkway, Schaumburg IL 60173" },
];
const socials = [
  { label:"Instagram", href:"https://instagram.com" },
  { label:"YouTube",   href:"https://youtube.com"   },
  { label:"Facebook",  href:"https://facebook.com"  },
];

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 600));
    console.log("Contact submitted:", data);
    reset();
    setModalOpen(true);
  };

  return (
    <>
      <div style={{ background:"var(--color-navy-deep)", minHeight:"100vh" }}>

        {/* Header */}
        <motion.header
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}
          style={{ textAlign:"center", padding:"var(--s-page-header)", maxWidth:"800px", margin:"0 auto" }}
        >
          <p style={{ fontFamily:"var(--font-display)", fontSize:"0.82rem", letterSpacing:"0.35em", color:"var(--color-saffron)", textTransform:"uppercase", marginBottom:"1.5rem" }}>
            Sat Sri Akaal
          </p>
          <h1 style={{ fontFamily:"var(--font-serif)", fontWeight:500, fontSize:"clamp(2.5rem,7vw,5.5rem)", lineHeight:1, letterSpacing:"-0.02em", color:"#fff", marginBottom:"1.25rem" }}>
            Let&apos;s <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>talk</em>.
          </h1>
          <p style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", maxWidth:"500px", margin:"0 auto", lineHeight:1.65 }}>
            Questions about classes, weddings, performances, or just want to know what dhamaal feels like? Drop us a line.
          </p>
        </motion.header>

        <section style={{ padding:"var(--s-inner)", maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"var(--g-contact)", gap:"3rem", alignItems:"start", marginBottom:"4rem" }}>

            {/* Form */}
            <motion.form
              initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.15 }}
              onSubmit={handleSubmit(onSubmit)}
              style={{ background:"var(--color-navy)", border:"1px solid rgba(255,215,0,0.14)", padding:"var(--s-form)", borderRadius:"8px", boxShadow:"0 8px 40px rgba(0,0,0,0.3)" }}
            >
              <div style={{ display:"grid", gridTemplateColumns:"var(--g-form-row)", gap:"1.25rem", marginBottom:"1.25rem" }}>
                <Field label="Your Name" error={errors.name?.message}><input {...register("name")} placeholder="Harpreet Kaur" style={inp}/></Field>
                <Field label="Email"     error={errors.email?.message}><input {...register("email")} type="email" placeholder="you@email.com" style={inp}/></Field>
              </div>
              <div style={{ marginBottom:"1.25rem" }}>
                <Field label="Subject" error={errors.subject?.message}>
                  <select {...register("subject")} style={inp}>
                    <option value="">Choose one</option>
                    <option>General Question</option>
                    <option>Class Inquiry</option>
                    <option>Wedding Choreography</option>
                    <option>Performance / Booking</option>
                    <option>Press / Media</option>
                  </select>
                </Field>
              </div>
              <Field label="Message" error={errors.message?.message}>
                <textarea {...register("message")} rows={6} placeholder="Tell us what's on your mind…" style={{ ...inp, resize:"vertical" }}/>
              </Field>
              <button type="submit" disabled={isSubmitting} style={{
                marginTop:"1.5rem", width:"100%",
                background: isSubmitting ? "rgba(255,215,0,0.5)" : "var(--color-gold)",
                color:"var(--color-navy-deep)", padding:"1.1rem", borderRadius:"4px",
                fontSize:"1rem", fontWeight:700, border:"none",
                cursor: isSubmitting ? "not-allowed" : "pointer", transition:"all 0.3s", letterSpacing:"0.03em",
              }}>
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </motion.form>

            {/* Aside */}
            <motion.aside
              initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }}
              style={{ display:"flex", flexDirection:"column", gap:"1.25rem", position:"var(--aside-pos)" as React.CSSProperties["position"], top:"6rem" }}
            >
              {contactInfo.map(({ label, icon, value, href, meta }) => (
                <div key={label} style={{ background:"var(--color-navy)", border:"1px solid rgba(255,215,0,0.12)", padding:"1.4rem 1.6rem", borderRadius:"6px" }}>
                  <p style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontFamily:"var(--font-display)", fontSize:"0.72rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--color-saffron)", marginBottom:"0.5rem" }}>
                    <span style={{ color:"var(--color-gold)" }}>{icon}</span>{label}
                  </p>
                  {href
                    ? <a href={href} style={{ display:"block", fontFamily:"var(--font-serif)", fontSize:"1.2rem", fontWeight:500, color:"#fff", transition:"color 0.3s", marginBottom:"0.2rem" }}
                        onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--color-gold)")}
                        onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="#fff")}>{value}</a>
                    : <p style={{ fontFamily:"var(--font-serif)", fontSize:"1.2rem", fontWeight:500, color:"#fff", marginBottom:"0.2rem" }}>{value}</p>
                  }
                  {meta && <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", lineHeight:1.5 }}>{meta}</p>}
                </div>
              ))}

              <div style={{ background:"var(--color-navy)", border:"1px solid rgba(255,215,0,0.12)", padding:"1.4rem 1.6rem", borderRadius:"6px" }}>
                <p style={{ fontFamily:"var(--font-display)", fontSize:"0.72rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--color-saffron)", marginBottom:"1rem" }}>Follow Us</p>
                <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
                  {socials.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem", fontSize:"0.85rem", color:"rgba(255,255,255,0.65)", padding:"0.5rem 0.85rem", border:"1px solid rgba(255,215,0,0.15)", borderRadius:"4px", transition:"all 0.3s" }}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.color="var(--color-gold)";el.style.borderColor="var(--color-gold)";}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.color="rgba(255,255,255,0.65)";el.style.borderColor="rgba(255,215,0,0.15)";}}
                    >
                      <ExternalLink size={11}/>{label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.45 }}
            style={{ borderRadius:"8px", overflow:"hidden", border:"1px solid rgba(255,215,0,0.12)", height:"380px" }}
          >
            <iframe src="https://www.google.com/maps?q=930+National+Parkway+Schaumburg+IL+60173&output=embed"
              width="100%" height="100%"
              style={{ border:0, display:"block", filter:"brightness(0.85) saturate(0.7) contrast(1.1)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="National India Hub location"/>
          </motion.div>
        </section>
      </div>

      <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)}
        title="Message sent."
        message="We'll get back to you within 24 hours. In the meantime — practice your shoulder pop."
      />
    </>
  );
}

function Field({ label, error, children }: { label:string; error?:string; children:React.ReactNode }) {
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <label style={{ fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom:"0.5rem", fontWeight:500 }}>{label}</label>
      {children}
      {error && <p style={{ fontSize:"0.75rem", color:"var(--color-saffron)", marginTop:"0.3rem" }}>{error}</p>}
    </div>
  );
}
const inp: React.CSSProperties = {
  fontFamily:"var(--font-sans)", fontSize:"0.95rem", padding:"0.8rem 1rem",
  border:"1.5px solid rgba(255,215,0,0.2)", background:"rgba(255,255,255,0.04)",
  borderRadius:"4px", color:"#fff", width:"100%", outline:"none", transition:"border-color 0.3s",
};
