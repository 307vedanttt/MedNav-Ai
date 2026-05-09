"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Home() {
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    }
  };
  const staggerContainer = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  return <div className="bg-background min-h-screen text-on-surface font-body overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Soft Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary-container/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <Header />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div className="flex-1 text-center lg:text-left z-10" initial="hidden" animate="visible" variants={staggerContainer}>

            
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

          <motion.div className="flex-1 relative hidden md:block" initial={{
          opacity: 0,
          x: 100,
          rotate: 2
        }} animate={{
          opacity: 1,
          x: 0,
          rotate: 0
        }} transition={{
          duration: 1.2,
          delay: 0.2,
          type: "spring",
          bounce: 0.4
        }}>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-outline-variant/30 bg-white">
              <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80" alt="Doctor utilizing an intelligent tablet interface" width={1200} height={500} className="w-full h-[500px] object-cover object-center opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/10"></div>
            </div>
            

          </motion.div>
        </section>

        {/* Value Propositions / Features Grid */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-2 block">Comprehensive Care</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface">Everything you need, in one platform.</h2>
          </div>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} variants={staggerContainer}>
            {[{
            icon: "psychology",
            title: "AI Diagnostics",
            desc: "Describe your symptoms naturally. Our neural engine rapidly analyzes your inputs against millions of clinical cases.",
            color: "text-primary",
            bg: "bg-primary-container/50",
            link: "/symptoms"
          }, {
            icon: "videocam",
            title: "Live Telemedicine",
            desc: "Instantly connect with top specialists via our encrypted, AI-augmented video consultation platform with live telemetry.",
            color: "text-secondary",
            bg: "bg-secondary-container/50",
            link: "/telemedicine"
          }, {
            icon: "account_balance_wallet",
            title: "Telemetry Financials",
            desc: "Predict your health insurance premium based on live biometric telemetry and underlying health profiles.",
            color: "text-primary",
            bg: "bg-primary-container/20",
            link: "https://insurance-prediction-3wcv4kg5vpz66fsg9on5y9.streamlit.app/"
          }].map((feat, idx) => <motion.div key={idx} variants={fadeUpVariants} className="bg-white p-8 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
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
              </motion.div>)}
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
    </div>;
}
