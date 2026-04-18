"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface font-body overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Soft Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary-container/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <Header />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div 
            className="flex-1 text-center lg:text-left z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/20 rounded-full">
              <span className="material-symbols-outlined text-primary text-sm" data-icon="verified">verified</span>
              <span className="text-xs font-bold tracking-widest text-primary uppercase">HIPAA Compliant & Certified</span>
            </motion.div>
            
            <motion.h1 variants={fadeUpVariants} className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6 leading-[1.1]">
              Intelligent Care.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Instant Clarity.</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariants} className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              Experience the future of healthcare. MediNav-AI uses advanced algorithms to provide accurate triage, connect you with top specialists, and manage your health journey securely.
            </motion.p>
            
            <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-headline font-bold text-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Start Diagnostics
                <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
              </Link>
              <Link href="/technology" className="w-full sm:w-auto px-8 py-4 bg-white text-on-surface-variant border border-outline-variant/30 rounded-xl font-headline font-bold text-lg hover:bg-surface-variant hover:text-on-surface transition-all flex items-center justify-center">
                Learn How it Works
              </Link>
            </motion.div>
            
            <motion.div variants={fadeUpVariants} className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-outline-variant/20 pt-8 opacity-80">
              <div className="flex flex-col items-center lg:items-start text-on-surface">
                <span className="font-headline text-3xl font-bold text-primary">500k+</span>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mt-1">Consultations</span>
              </div>
              <div className="w-px h-10 bg-outline-variant/30"></div>
              <div className="flex flex-col items-center lg:items-start text-on-surface">
                <span className="font-headline text-3xl font-bold text-secondary">99.8%</span>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mt-1">Diagnostic Accuracy</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 relative hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-outline-variant/30 bg-white">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee4?q=80&w=2069&auto=format&fit=crop" 
                alt="Modern Medical Facility" 
                className="w-full h-auto object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
            </div>
            
            {/* Floating Trust Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-outline-variant/20 z-20 flex items-center gap-4 hidden lg:flex"
            >
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl" data-icon="shield">shield</span>
              </div>
              <div>
                <p className="font-bold text-on-surface">Bank-Grade Security</p>
                <p className="text-xs text-on-surface-variant mt-1">End-to-End Encryption</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Value Propositions / Features Grid */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-2 block">Comprehensive Care</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface">Everything you need, in one platform.</h2>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: "psychology",
                title: "AI Diagnostics",
                desc: "Describe your symptoms naturally. Our neural engine rapidly analyzes your inputs against millions of clinical cases.",
                color: "text-primary",
                bg: "bg-primary-container/50",
                link: "/symptoms"
              },
              {
                icon: "diversity_1",
                title: "Top Specialists",
                desc: "Get instantly matched with board-certified professionals based on proximity, expertise, and availability.",
                color: "text-secondary",
                bg: "bg-secondary-container/50",
                link: "/doctors"
              },
              {
                icon: "add_task",
                title: "Digital Pharmacy",
                desc: "Manage prescriptions automatically. Get medications delivered to your doorstep with live tracking.",
                color: "text-primary",
                bg: "bg-primary-container/20",
                link: "/pharmacy"
              }
            ].map((feat, idx) => (
              <motion.div key={idx} variants={fadeUpVariants} className="bg-white p-8 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className={`w-14 h-14 rounded-xl ${feat.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <span className={`material-symbols-outlined text-3xl ${feat.color}`} data-icon={feat.icon}>{feat.icon}</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">{feat.title}</h3>
                <p className="text-on-surface-variant font-light leading-relaxed mb-6">
                  {feat.desc}
                </p>
                <Link href={feat.link} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary group-hover:text-secondary transition-colors">
                  Explore Feature <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </main>

      <BottomNav />
      
      {/* Simple Clean Footer */}
      <footer className="border-t border-outline-variant/20 bg-surface text-center py-8 pb-32 md:pb-8">
        <p className="text-sm text-on-surface-variant font-light">
          © 2026 MediNav-AI. Providing intelligent healthcare solutions globally. <br className="md:hidden" />
          <Link href="/technology" className="text-primary hover:underline ml-1">Privacy Policy</Link> • 
          <Link href="/technology" className="text-primary hover:underline ml-1">Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
