"use client";

import { useState } from 'react';
import BottomNav from "@/components/BottomNav";
import Link from 'next/link';
import { motion } from 'framer-motion';
const containerVariants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
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
export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return <div className="bg-background selection:bg-primary-container selection:text-on-primary-container min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <Link href="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl" data-icon="clinical_notes">
              clinical_notes
            </span>
            <h1 className="text-xl font-bold tracking-[0.1em] text-primary uppercase font-headline">MEDINAV-AI</h1>
          </Link>
          <div className="flex items-center gap-4">

            {/* Notifications Map */}
            <div className="relative">
              <button onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }} className="p-2 rounded-full hover:bg-surface-variant transition-colors cursor-pointer text-on-surface-variant relative">
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                <span className="absolute top-1 right-2 w-2 h-2 bg-error rounded-full animate-pulse"></span>
              </button>

              {showNotifications && <div className="absolute right-0 mt-2 w-72 bg-white border border-outline-variant/30 rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-outline-variant/20 mb-2 font-bold text-on-surface font-headline">
                    Notifications
                  </div>
                  <div className="px-4 py-3 hover:bg-surface-variant/50 cursor-pointer border-b border-outline-variant/10">
                    <p className="text-sm font-bold text-on-surface font-headline">Diagnostics Review Ready</p>
                    <p className="text-xs text-on-surface-variant mt-1">Dr. Smith has reviewed your chest X-ray.</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-surface-variant/50 cursor-pointer">
                    <p className="text-sm font-bold text-on-surface font-headline">Medication Refill</p>
                    <p className="text-xs text-on-surface-variant mt-1">Lisinopril is out for delivery. ETA: 14 mins.</p>
                  </div>
                </div>}
            </div>

            {/* Profile Image & Menu */}
            <div className="relative">
              <div onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }} className="w-10 h-10 rounded-full border border-outline-variant/30 overflow-hidden scale-95 active:scale-90 transition-transform cursor-pointer">
                <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHELnBHwVwDB236CQTcJVmcK_b8j9-uzq3mwvb9nAhHEhPvdEzsUJY4CMDsFWQK6ZEciSL-ZtiQn--OgE3ncecvw5kBuwS7ijfwLPy6eElrVlNMz4jliVGV8itfCOXbTLw83YiN-OYPDS0091zhiaj9I4t2sysfl8kYcj1XGq_1wF8X2dhPfFmH72lrgKnrC78selo051gy8WVNqLVw9WYNSx-7F-RqpvaKH2S9JIXsdC4n_PyDwCLRGh7bsxHPMMFSihF_hnxY7I" />
              </div>

              {showProfileMenu && <div className="absolute right-0 mt-2 w-48 bg-white border border-outline-variant/30 rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-outline-variant/20 mb-2">
                    <p className="text-sm font-bold text-on-surface font-headline">CodeWarriors</p>
                    <p className="text-xs text-on-surface-variant">codewarriors@medinav.ai</p>
                  </div>
                  <button onClick={() => {
                localStorage.removeItem('medai_session_expiry');
                localStorage.removeItem('medai_user_id');
                window.location.href = '/login';
              }} className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors font-bold cursor-pointer">
                    Sign Out
                  </button>
                </div>}
            </div>
          </div>
        </div>
      </header>

      <main className="pt-28 px-6 max-w-7xl mx-auto">
        {/* Welcome Message & Status Overview */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border-b-4 border-b-primary">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full font-label text-xs uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                System Online
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight">
                Welcome, Code Warriors.
              </h2>
              <p className="text-on-surface-variant max-w-md text-lg font-light">
                Your health metrics are stable. <strong className="text-primary font-bold">4 diagnostics</strong> pending review.
              </p>
            </div>

            {/* Clean Patient Data Card */}
            <div className="flex gap-6 items-center shrink-0">
              <div className="text-right">
                <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant font-bold">Confidence</p>
                <p className="text-3xl font-headline font-bold text-on-surface">98.4%</p>
              </div>
              <div className="h-12 w-px bg-outline-variant/30"></div>
              <div className="text-left">
                <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant font-bold">Last Sync</p>
                <p className="text-lg font-headline font-bold text-on-surface">2 Min Ago</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid (12-column Grid) */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Start Symptom Analysis (Takes 8 columns on tablet+) */}
          <motion.div variants={itemVariants} className="md:col-span-8 h-full">
            <Link href="/symptoms" className="h-full bg-white rounded-3xl p-8 border border-outline-variant/30 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <span className="material-symbols-outlined text-[200px] text-primary" data-icon="health_and_safety">health_and_safety</span>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary transition-all">
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:text-white transition-colors" data-icon="psychology">psychology</span>
                </div>
                <div>
                  <h3 className="text-3xl font-headline font-bold text-on-surface mb-3">Symptom Analysis</h3>
                  <p className="text-on-surface-variant text-lg font-light leading-relaxed mb-8 max-w-lg">
                    Begin an AI-powered triage to receive immediate clinical assessment and prioritized care recommendations.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                    <span>Begin Evaluation</span>
                    <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Emergency Card (Takes 4 columns on tablet+) */}
          <motion.div variants={itemVariants} className="md:col-span-4 h-full">
            <Link href="/emergency" className="h-full bg-white rounded-3xl p-8 border border-error/20 hover:border-error/50 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-error"></div>
              <div className="absolute -right-4 -bottom-4 opacity-5">
                <span className="material-symbols-outlined text-[150px] text-error" data-icon="emergency">emergency</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-error text-4xl" data-icon="emergency_home">emergency_home</span>
                  <h3 className="text-2xl font-headline font-bold text-on-surface">Emergency</h3>
                </div>
                <p className="text-on-surface-variant font-light leading-relaxed mb-6">
                  Immediate 24/7 critical response dispatch with live medical coordinator.
                </p>
              </div>
              <button className="w-full py-4 bg-error text-white font-headline font-bold rounded-xl uppercase tracking-widest text-sm shadow-[0_4px_15px_rgba(255,0,0,0.2)] hover:bg-error/90 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,0,0,0.3)] transition-all z-10 cursor-pointer">
                Activate SOS
              </button>
            </Link>
          </motion.div>

          {/* Bottom 3 items: Doctors, Telehealth, Vault (4 columns each) */}
          <motion.div variants={itemVariants} className="col-span-1 sm:col-span-4 md:col-span-4 h-full">
            <Link href="/doctors" className="h-full bg-white rounded-2xl p-6 border border-outline-variant/30 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all group flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl" data-icon="location_on">location_on</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-on-surface mb-2">Find Doctors</h4>
              <p className="text-sm font-light text-on-surface-variant">Locate top specialists near you.</p>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1 sm:col-span-4 md:col-span-4 h-full">
            <Link href="/book-call" className="h-full bg-white rounded-2xl p-6 border border-outline-variant/30 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all group flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl" data-icon="video_call">video_call</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-on-surface mb-2">Telehealth</h4>
              <p className="text-sm font-light text-on-surface-variant">Schedule a virtual consultation.</p>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1 sm:col-span-4 md:col-span-4 h-full">
            <Link href="/insights" className="h-full bg-white rounded-2xl p-6 border border-outline-variant/30 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all group flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-error-container/40 text-error flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl" data-icon="encrypted">encrypted</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-on-surface mb-2">Health Vault</h4>
              <p className="text-sm font-light text-on-surface-variant">Secure access to your records.</p>
            </Link>
          </motion.div>

        </motion.div>

        {/* Cost Estimator Row */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-6 mb-12">
          <motion.div variants={itemVariants} className="w-full">
            <a href="https://insurance-prediction-3wcv4kg5vpz66fsg9on5y9.streamlit.app/" target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute -right-4 -bottom-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity rotate-12">
                <span className="material-symbols-outlined text-[150px] text-emerald-800" data-icon="account_balance">account_balance</span>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left w-full">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 transition-all">
                  <span className="material-symbols-outlined text-emerald-600 text-3xl group-hover:text-white transition-colors" data-icon="account_balance_wallet">account_balance_wallet</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-headline font-bold text-slate-800 mb-2">Health Insurance Cost Predictor</h3>
                  <p className="text-slate-600 text-lg font-light leading-relaxed max-w-2xl">
                    Use our advanced ML model to instantly estimate your annual insurance premium based on your personalized health metrics.
                  </p>
                </div>
                <div className="shrink-0 mt-4 sm:mt-0 flex items-center h-full">
                  <div className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] group-hover:bg-emerald-600 transition-all group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(16,185,129,0.4)]">
                    <span>Calculate Now</span>
                    <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </main>

      <BottomNav />
    </div>;
}
