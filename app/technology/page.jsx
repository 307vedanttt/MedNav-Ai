"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};
export default function TechnologyPage() {
  return <>
      <Header />
      <main className="min-h-screen pt-32 pb-32 px-6 max-w-5xl mx-auto overflow-hidden">
        <motion.div initial={{
        opacity: 0,
        y: -30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: "easeOut"
      }} className="text-center mb-16 relative">
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

          <span className="font-label text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">
            Inside the Engine
          </span>
          <h1 className="font-headline text-5xl md:text-6xl font-black text-on-surface mb-6 tracking-tight">
            Our Technology
          </h1>
          <p className="text-on-surface-variant max-w-3xl mx-auto text-lg leading-relaxed font-light">
            MediNav-AI isn't just an interface—it's a high-performance clinical engine. We leverage distributed neural architecture, deeply integrated WebRTC protocols, and zero-trust security pipelines to bring instantaneous algorithmic diagnostics directly to your fingertips. 
          </p>
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl border border-outline-variant/30 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden bg-white/50 backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-primary text-4xl" data-icon="psychology">psychology</span>
            </div>
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
              AI Diagnostics Engine
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Our triage system is built on state-of-the-art transformer models trained on millions of cross-referenced, anonymized clinical data points. It utilizes Natural Language Processing (NLP) to parse your symptom inputs immediately, routing them through probabilistic risk trees to flag critical emergencies with 99.8% accuracy.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl border border-outline-variant/30 hover:border-secondary/50 hover:shadow-2xl hover:shadow-secondary/10 transition-all group relative overflow-hidden bg-white/50 backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-secondary text-4xl" data-icon="enhanced_encryption">enhanced_encryption</span>
            </div>
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
              Zero-Trust Security
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              We process health telemetry via end-to-end AES-256 encryption. MediNav-AI strictly conforms to advanced zero-trust architecture, meaning node authorizations expire aggressively (via our custom 1-hour session handling) and personally identifiable information (PII) is securely abstracted prior to entering the diagnostic neural network.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl border border-outline-variant/30 hover:border-tertiary/50 hover:shadow-2xl hover:shadow-tertiary/10 transition-all group relative overflow-hidden bg-white/50 backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-tertiary text-4xl" data-icon="cast_connected">cast_connected</span>
            </div>
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
              Telemedicine WebRTC
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Crystal-clear virtual consultations are powered by an aggressive, low-latency WebRTC backbone. Our media pipelines automatically adapt framerates and bandwidth based on network degradation algorithms, guaranteeing robust video streaming even in regions suffering from 3G-equivalent connectivity delays.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl border border-outline-variant/30 hover:border-error/50 hover:shadow-2xl hover:shadow-error/10 transition-all group relative overflow-hidden bg-white/50 backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-error text-4xl" data-icon="vital_signs">vital_signs</span>
            </div>
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
              Live Biometric Bridging
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              During a localized emergency, MediNav-AI's SOS module forms an ad-hoc handshake with local smartwatches and wearable trackers. We continuously serialize and map Heart Rate (BPM) and SpO2 telemetry across secure WebSockets, directly feeding parametric triage vitals to incoming first responders in real-time.
            </p>
          </motion.div>
        </motion.div>
      </main>
      <BottomNav />
    </>;
}
