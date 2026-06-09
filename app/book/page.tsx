"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Package, DollarSign, CheckCircle } from "lucide-react";
import SuccessModal from "@/components/ui/SuccessModal";

const schema = z.object({
  firstName:     z.string().min(2, "First name required"),
  lastName:      z.string().min(2, "Last name required"),
  email:         z.string().email("Valid email required"),
  phone:         z.string().min(7, "Phone number required"),
  age:           z.string().min(1, "Age required"),
  classType:     z.string().min(1, "Please pick a class"),
  preferredDate: z.string().min(1, "Please pick a date"),
  experience:    z.string().min(1, "Please select experience"),
  notes:         z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const classOptions = [
  { value:"Little Sher",          label:"Little Sher",    sub:"Ages 5–9 · Sundays 10:00 AM"       },
  { value:"Youth Crew",           label:"Youth Crew",     sub:"Ages 10–16 · Saturdays 11:00 AM"   },
  { value:"Adult Beginner",       label:"Adult Beginner", sub:"17+ · Fridays 7:00 PM"             },
  { value:"Adult Advanced",       label:"Adult Advanced", sub:"17+ · Saturdays 6:00 PM"           },
  { value:"Wedding Choreography", label:"Wedding Choreo", sub:"Private group · By appointment"    },
];

const whatToBring = ["Loose, breathable clothing","Athletic shoes (or barefoot)","Water bottle","An open heart and a loud voice"];

export default function BookPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, watch, setValue, reset, formState:{ errors, isSubmitting } } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useForm<FormData>({ resolver: zodResolver(schema) as any });
  const selectedClass = watch("classType");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    await new Promise(r => setTimeout(r, 600));
    console.log("Booking submitted:", data);
    reset();
    setModalOpen(true);
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
            Book your <em style={{ fontStyle:"italic", color:"var(--color-gold)" }}>first</em> class.
          </h1>
          <p style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", maxWidth:"520px", margin:"0 auto", lineHeight:1.65 }}>
            Fill out the form below and we&apos;ll reserve your spot.
            Trial classes are <strong style={{ color:"var(--color-gold)" }}>free</strong>, pay only if you stay.
          </p>
        </motion.header>

        {/* Body */}
        <section style={{ padding:"var(--s-inner)", maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"var(--g-book)", gap:"3rem", alignItems:"start" }}>

            {/* Form */}
            <motion.form
              initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.15 }}
              onSubmit={handleSubmit(onSubmit)}
              style={{ background:"var(--color-navy)", border:"1px solid rgba(255,215,0,0.14)", padding:"var(--s-form)", borderRadius:"8px", boxShadow:"0 8px 40px rgba(0,0,0,0.3)" }}
            >
              {/* Step 1 */}
              <FormStep num="01" title="Who's dancing?">
                <div style={{ display:"grid", gridTemplateColumns:"var(--g-form-row)", gap:"1.25rem", marginBottom:"1.25rem" }}>
                  <Field label="First Name" error={errors.firstName?.message}><input {...register("firstName")} placeholder="Manpreet" style={inp}/></Field>
                  <Field label="Last Name"  error={errors.lastName?.message}> <input {...register("lastName")}  placeholder="Singh"    style={inp}/></Field>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"var(--g-form-row)", gap:"1.25rem", marginBottom:"1.25rem" }}>
                  <Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" placeholder="you@email.com"   style={inp}/></Field>
                  <Field label="Phone" error={errors.phone?.message}><input {...register("phone")} type="tel"   placeholder="(312) 555-0100" style={inp}/></Field>
                </div>
                <Field label="Dancer's Age" error={errors.age?.message}>
                  <input {...register("age")} type="number" min="3" max="99" placeholder="Age" style={{ ...inp, maxWidth:"160px" }}/>
                </Field>
              </FormStep>

              {/* Step 2 */}
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

              {/* Step 3 */}
              <FormStep num="03" title="When works?" last>
                <div style={{ display:"grid", gridTemplateColumns:"var(--g-form-row)", gap:"1.25rem", marginBottom:"1.25rem" }}>
                  <Field label="Preferred start date" error={errors.preferredDate?.message}><input {...register("preferredDate")} type="date" style={inp}/></Field>
                  <Field label="Bhangra experience"   error={errors.experience?.message}>
                    <select {...register("experience")} style={inp}>
                      <option value="">Choose one</option>
                      <option value="None">None — total beginner</option>
                      <option value="Some">Some — danced at weddings</option>
                      <option value="Trained">Trained — performed before</option>
                      <option value="Pro">Competitive / professional</option>
                    </select>
                  </Field>
                </div>
                <Field label="Anything we should know?">
                  <textarea {...register("notes")} rows={3} placeholder="Injuries, accessibility needs, dance goals…" style={{ ...inp, resize:"vertical" }}/>
                </Field>
              </FormStep>

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

            {/* Aside */}
            <motion.aside
              initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }}
              style={{ display:"flex", flexDirection:"column", gap:"1.25rem", position:"var(--aside-pos)" as React.CSSProperties["position"], top:"6rem" }}
            >
              <AsideCard title="What to bring" icon={<Package size={16}/>}>
                <ul style={{ listStyle:"none", padding:0 }}>
                  {whatToBring.map(item => (
                    <li key={item} style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem", padding:"0.55rem 0", borderBottom:"1px solid rgba(255,215,0,0.08)", fontSize:"0.9rem", color:"rgba(255,255,255,0.78)" }}>
                      <CheckCircle size={14} style={{ color:"var(--color-gold)", marginTop:"3px", flexShrink:0 }}/>{item}
                    </li>
                  ))}
                </ul>
              </AsideCard>
              <AsideCard title="Where to come" icon={<MapPin size={16}/>} dark>
                <p style={{ fontSize:"0.93rem", lineHeight:1.7, color:"rgba(255,255,255,0.82)", marginBottom:"0.5rem" }}>
                  <strong>National India Hub</strong><br/>930 National Parkway<br/>Schaumburg, IL 60173
                </p>
                <p style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.5)", marginBottom:"1rem" }}>Free parking · Lots A, B, F, G</p>
                <a href="https://maps.google.com/?q=930+National+Parkway+Schaumburg+IL+60173" target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-block", color:"var(--color-gold)", border:"1.5px solid var(--color-gold)", padding:"0.55rem 1.1rem", borderRadius:"4px", fontSize:"0.82rem", fontWeight:600, transition:"all 0.3s" }}>
                  Open Maps
                </a>
              </AsideCard>
              <AsideCard title="Pricing" icon={<DollarSign size={16}/>}>
                <div style={{ display:"flex", alignItems:"baseline", gap:"0.5rem", marginBottom:"0.4rem" }}>
                  <span style={{ fontFamily:"var(--font-display)", fontSize:"2rem", color:"var(--color-gold)" }}>$0</span>
                  <span style={{ fontSize:"0.9rem", color:"rgba(255,255,255,0.5)" }}>trial class</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:"0.5rem", marginBottom:"0.75rem" }}>
                  <span style={{ fontFamily:"var(--font-display)", fontSize:"2rem", color:"var(--color-gold)" }}>$120</span>
                  <span style={{ fontSize:"0.9rem", color:"rgba(255,255,255,0.5)" }}>/ month</span>
                </div>
                <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.45)" }}>Family discounts available. Wedding choreo priced separately.</p>
              </AsideCard>
            </motion.aside>
          </div>
        </section>
      </div>

      <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)}
        title="You're in!"
        message="We've got your booking. Check your email for confirmation — and start stretching those shoulders."
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
function AsideCard({ title, icon, dark=false, children }: { title:string; icon:React.ReactNode; dark?:boolean; children:React.ReactNode }) {
  return (
    <div style={{ background: dark ? "var(--color-navy-light)" : "var(--color-navy)", border:`1px solid ${dark ? "rgba(255,215,0,0.2)" : "rgba(255,215,0,0.1)"}`, padding:"1.5rem", borderRadius:"6px" }}>
      <h3 style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontFamily:"var(--font-serif)", fontWeight:600, fontSize:"1.05rem", color: dark ? "var(--color-gold)" : "#fff", marginBottom:"1rem" }}>
        <span style={{ color:"var(--color-gold)" }}>{icon}</span>{title}
      </h3>
      {children}
    </div>
  );
}
const inp: React.CSSProperties = {
  fontFamily:"var(--font-sans)", fontSize:"0.95rem", padding:"0.8rem 1rem",
  border:"1.5px solid rgba(255,215,0,0.2)", background:"rgba(255,255,255,0.04)",
  borderRadius:"4px", color:"#fff", width:"100%", outline:"none", transition:"border-color 0.3s",
};
