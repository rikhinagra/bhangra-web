"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SuccessModal from "@/components/ui/SuccessModal";

const schema = z.object({
  firstName:     z.string().min(2, "First name required"),
  lastName:      z.string().min(2, "Last name required"),
  email:         z.string().email("Valid email required"),
  phone:         z.string().min(7, "Phone number required"),
  location:      z.string().min(1, "Location required"),
  classType:     z.string().min(1, "Please pick a class"),
  preferredDate: z.string().min(1, "Please pick a date"),
  experience:    z.string().min(1, "Please select experience"),
  notes:         z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const classOptions = [
  { value:"Little Sher",          label:"Little Sher",    sub:"Ages 5–9"    },
  { value:"Youth Crew",           label:"Youth Crew",     sub:"Ages 10–16"  },
  { value:"Adult Beginner",       label:"Beginner",       sub:"17+"         },
  { value:"Adult Advanced",       label:"Advanced",       sub:"17+"         },
  { value:"Wedding Choreography", label:"Wedding Choreo", sub:"All ages"    },
  { value:"Group Classes",        label:"Group Classes",  sub:"All ages"    },
];

const whatToBring = [
  "Loose, breathable clothing",
  "Athletic shoes (or barefoot)",
  "Water bottle",
  "An open heart and a loud voice",
];

export default function BookPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const { register, handleSubmit, watch, setValue, reset, formState:{ errors, isSubmitting } } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useForm<FormData>({ resolver: zodResolver(schema) as any });
  const selectedClass = watch("classType");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setSubmitError(false);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        reset();
        setModalOpen(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    }
  };

  return (
    <>
      <div style={{ background:"var(--color-navy-deep)", minHeight:"100vh" }}>

        {/* Page header */}
        <motion.header
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}
          style={{ textAlign:"center", padding:"var(--s-page-header)", maxWidth:"800px", margin:"0 auto" }}
        >
          <p style={{ fontFamily:"var(--font-display)", fontSize:"0.82rem", letterSpacing:"0.35em", color:"var(--color-saffron)", textTransform:"uppercase", marginBottom:"1.5rem" }}>
            Step into the circle
          </p>
          <h1 style={{ fontFamily:"var(--font-serif)", fontWeight:500, fontSize:"clamp(2.5rem,7vw,5.5rem)", lineHeight:1, letterSpacing:"-0.02em", color:"#fff", marginBottom:"1.25rem" }}>
            Book your <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>class.</em>
          </h1>
          <p style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", maxWidth:"520px", margin:"0 auto", lineHeight:1.65 }}>
            Fill out the form below and we&apos;ll reserve your spot.
            Trial classes are <strong style={{ color:"var(--color-gold)" }}>free</strong>, pay only if you stay.
          </p>
        </motion.header>

        {/* Body */}
        <section style={{ padding:"var(--s-inner)", maxWidth:"900px", margin:"0 auto" }}>
          <motion.form
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.15 }}
            onSubmit={handleSubmit(onSubmit)}
            style={{ background:"var(--color-navy)", border:"1px solid rgba(255,215,0,0.14)", padding:"var(--s-form)", borderRadius:"8px", boxShadow:"0 8px 40px rgba(0,0,0,0.3)" }}
          >
            {/* Step 01 — Who's dancing? */}
            <FormStep num="01" title="Who's dancing?">
              <div style={{ display:"grid", gridTemplateColumns:"var(--g-form-row)", gap:"1.25rem", marginBottom:"1.25rem" }}>
                <Field label="First Name" error={errors.firstName?.message}><input {...register("firstName")} placeholder="Manpreet" style={inp}/></Field>
                <Field label="Last Name"  error={errors.lastName?.message}> <input {...register("lastName")}  placeholder="Singh"    style={inp}/></Field>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"var(--g-form-row)", gap:"1.25rem", marginBottom:"1.25rem" }}>
                <Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" placeholder="you@email.com"   style={inp}/></Field>
                <Field label="Phone" error={errors.phone?.message}><input {...register("phone")} type="tel"   placeholder="(312) 555-0100" style={inp}/></Field>
              </div>
              <Field label="Your Location" error={errors.location?.message}>
                <input {...register("location")} type="text" placeholder="City, State" style={{ ...inp, maxWidth:"260px" }}/>
              </Field>
            </FormStep>

            {/* Step 02 — Pick a class */}
            <FormStep num="02" title="Pick a class">
              {errors.classType && <p style={{ color:"var(--color-saffron)", fontSize:"0.82rem", marginBottom:"0.75rem" }}>{errors.classType.message}</p>}
              <div style={{ display:"grid", gridTemplateColumns:"var(--g-class-opts)", gap:"0.75rem" }}>
                {classOptions.map(({ value, label, sub }) => (
                  <label key={value} style={{ cursor:"pointer" }}>
                    <input type="radio" value={value} {...register("classType")}
                      style={{ position:"absolute", opacity:0 }}
                      onChange={() => setValue("classType", value, { shouldValidate:true })}/>
                    <div style={{
                      border: selectedClass === value ? "2px solid var(--color-gold)" : "1.5px solid rgba(255,215,0,0.2)",
                      background: selectedClass === value ? "rgba(255,215,0,0.1)" : "rgba(255,255,255,0.03)",
                      padding:"1rem", borderRadius:"6px", transition:"all 0.3s",
                    }}>
                      <h4 style={{ fontFamily:"var(--font-serif)", fontWeight:600, fontSize:"1rem", color: selectedClass === value ? "var(--color-gold)" : "#fff", marginBottom:"0.25rem" }}>{label}</h4>
                      <p style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.55)" }}>{sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </FormStep>

            {/* Step 03 — When works? */}
            <FormStep num="03" title="When works?">
              <div style={{ display:"grid", gridTemplateColumns:"var(--g-form-row)", gap:"1.25rem", marginBottom:"1.25rem" }}>
                <Field label="Preferred start date" error={errors.preferredDate?.message}><input {...register("preferredDate")} type="date" style={inp}/></Field>
                <Field label="Bhangra experience"   error={errors.experience?.message}>
                  <select {...register("experience")} style={inpSelect}>
                    <option value="">Choose one</option>
                    <option value="None - total beginner">None - total beginner</option>
                    <option value="Some - danced at weddings">Some - danced at weddings</option>
                    <option value="Trained - performed before">Trained - performed before</option>
                    <option value="Competitive / professional">Competitive / professional</option>
                  </select>
                </Field>
              </div>
              <Field label="Anything we should know?">
                <textarea {...register("notes")} rows={3} placeholder="Injuries, accessibility needs, dance goals…" style={{ ...inp, resize:"vertical" }}/>
              </Field>
            </FormStep>

            {/* Step 04 — What to bring */}
            <FormStep num="04" title="What to bring" last>
              <ul style={{ listStyle:"none", padding:0 }}>
                {whatToBring.map(item => (
                  <li key={item} style={{ display:"flex", alignItems:"flex-start", gap:"0.75rem", padding:"0.65rem 0", borderBottom:"1px solid rgba(255,215,0,0.08)", fontSize:"0.95rem", color:"rgba(255,255,255,0.78)" }}>
                    <CheckCircle size={16} style={{ color:"var(--color-gold)", marginTop:"2px", flexShrink:0 }}/>
                    {item}
                  </li>
                ))}
              </ul>
            </FormStep>

            {submitError && (
              <p style={{ color:"var(--color-saffron)", textAlign:"center", marginBottom:"1rem", fontSize:"0.9rem" }}>
                Something went wrong. Please try again or email us at contact@ashkebhangra.com
              </p>
            )}
            <button type="submit" disabled={isSubmitting} style={{
              width:"100%", background: isSubmitting ? "rgba(255,215,0,0.5)" : "var(--color-gold)",
              color:"var(--color-navy-deep)", padding:"1.1rem", borderRadius:"4px",
              fontSize:"1rem", fontWeight:700, border:"none",
              cursor: isSubmitting ? "not-allowed" : "pointer", transition:"all 0.3s", letterSpacing:"0.03em",
            }}>
              {isSubmitting ? "Reserving your spot…" : "Reserve My Spot"}
            </button>
            <p style={{ textAlign:"center", fontSize:"0.82rem", color:"rgba(255,255,255,0.4)", marginTop:"1rem" }}>
              Your trial class is free. We&apos;ll email confirmation within 24 hours.
            </p>
          </motion.form>
        </section>
      </div>

      <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)}
        title="You're in!"
        message="We have got your booking. We will confirm your spot within 24 hours. Check your email for details."
      />
    </>
  );
}

/* ── Helpers ── */
function FormStep({ num, title, children, last=false }: { num:string; title:string; children:React.ReactNode; last?:boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : "2.5rem", paddingBottom:"2.5rem", borderBottom: last ? "none" : "1px solid rgba(255,215,0,0.1)" }}>
      <h2 style={{ fontFamily:"var(--font-serif)", fontWeight:500, fontSize:"1.35rem", color:"#fff", marginBottom:"1.5rem", display:"flex", alignItems:"baseline", gap:"0.75rem" }}>
        <span style={{ fontFamily:"var(--font-display)", fontSize:"0.9rem", color:"var(--color-saffron)", letterSpacing:"0.1em" }}>{num}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, error, children }: { label:string; error?:string; children:React.ReactNode }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", marginBottom:"0.25rem" }}>
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
  boxSizing:"border-box", WebkitAppearance:"none", appearance:"none",
};

const inpSelect: React.CSSProperties = {
  ...inp,
  paddingRight:"2.5rem",
  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,215,0,0.7)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat:"no-repeat",
  backgroundPosition:"right 1rem center",
};
