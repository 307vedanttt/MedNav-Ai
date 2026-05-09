"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
export default function BookCall() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const dates = [{
    label: "Today",
    date: "16"
  }, {
    label: "Tomorrow",
    date: "17"
  }, {
    label: "Wed",
    date: "18"
  }, {
    label: "Thu",
    date: "19"
  }];
  const slots = ["14:00", "14:30", "15:00", "15:15", "16:00", "16:30", "18:00", "19:45"];
  const handleConfirm = () => {
    if (!selectedSlot) return;
    setIsConfirming(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 4000);
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 15
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
  return <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen pb-32 relative">
      <Header />
      
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="mb-10">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-2 block">
            AI Triage Selection
          </span>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
            Telehealth Booking
          </h2>
          <p className="text-on-surface-variant max-w-md mt-2 text-sm leading-relaxed">
            Based on your vitals, MediNav-AI recommends an immediate consultation with an available Cardiologist.
          </p>
        </div>

        {/* Doctor Identity */}
        <div className="glass-panel p-6 rounded-2xl border border-outline-variant/15 mb-8 flex flex-col md:flex-row gap-6 items-center">
          <Image alt="Doctor" className="w-24 h-24 rounded-full border border-primary/30 shadow-[0_0_20px_rgba(0,229,255,0.2)] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqEpPzs5hOrPRel9fgqwsOhfz0Th_DNRwwy_nBwztTaDZn9WJW06VFmHLLKBxWyWoGeySfz-8y7Cqsd7DssTtLDeS695d4LH3pK9R4M7wHHsIZ-3F_1mVtJ12TCw3Zzlcpbypq9P3oJWQ_u7ZECjbr1YFtFqQO1bqYSiGNJ6MXwoNzGdGyr1HblLMolEfiG5rWFtjZ1pDoSHLNnzkD0AczDMMlikm58sdx74PL8iYvIGXAfnSb0iRzombQpLH_MqSYB4K5eQTJe8Q"  width={400} height={400} />
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-headline text-2xl font-bold text-on-surface">Dr. Elena Vance</h3>
            <p className="font-label text-xs uppercase tracking-[0.1em] text-on-surface-variant mb-2">Senior Cardiologist</p>
            <div className="inline-block bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold text-primary tracking-widest uppercase">
              98% Match Guarantee
            </div>
          </div>
        </div>

        {/* Calendar Picker */}
        <div className="mb-8">
          <h4 className="font-headline font-semibold mb-4 tracking-wide">Select Date</h4>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {dates.map((d, i) => <button key={i} onClick={() => {
            setSelectedDate(i);
            setSelectedSlot(null);
          }} className={`flex-shrink-0 w-20 h-24 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer ${selectedDate === i ? 'bg-primary-container border-primary text-on-primary-container shadow-[0_5px_15px_rgba(0,229,255,0.2)]' : 'bg-surface-container-low border-outline-variant/15 text-on-surface-variant hover:border-outline-variant/50'}`}>
                <span className="font-label text-[10px] uppercase tracking-widest mb-1">{d.label}</span>
                <span className="font-headline text-2xl font-bold">{d.date}</span>
              </button>)}
          </div>
        </div>

        {/* Time Slots */}
        <h4 className="font-headline font-semibold mb-4 tracking-wide">Available Slots</h4>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {slots.map((s, idx) => <motion.div variants={itemVariants} key={idx}>
              <button onClick={() => setSelectedSlot(s)} className={`w-full py-4 rounded-xl border font-headline text-lg font-bold transition-all cursor-pointer ${selectedSlot === s ? 'bg-primary border-primary text-background shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105' : 'bg-surface-container-low border-outline-variant/15 text-on-surface hover:bg-surface-container-highest'}`}>
                {s}
              </button>
            </motion.div>)}
        </motion.div>

        {/* CTA */}
        <button onClick={handleConfirm} disabled={!selectedSlot} className={`w-full liquid-gradient py-4 rounded-xl font-label text-xs uppercase tracking-[0.2em] font-bold text-on-primary shadow-lg transition-all ${!selectedSlot ? 'opacity-50 cursor-not-allowed filter grayscale' : 'cursor-pointer hover:shadow-[0_10px_30px_rgba(0,229,255,0.3)] active:scale-95'}`}>
          Confirm Telehealth Booking
        </button>
      </main>
      
      <BottomNav />

      {/* Connection Animation Overlay */}
      <AnimatePresence>
        {isConfirming && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-3xl flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <motion.div animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} className="absolute w-40 h-40 border-2 border-primary rounded-full" />
              <motion.div animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0, 0.2]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5
          }} className="absolute w-40 h-40 border border-primary/50 rounded-full" />
              <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.5)] z-10">
                <span className="material-symbols-outlined text-on-primary-container text-4xl tracking-widest" data-icon="videocam">videocam</span>
              </div>
            </div>
            
            <motion.h3 initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.5
        }} className="font-headline text-2xl font-bold mt-12 tracking-wide text-on-surface">
              Establishing Secure Uplink
            </motion.h3>
            
            <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1
        }} className="text-primary font-label text-[10px] uppercase tracking-[0.3em] font-bold mt-4">
              Transferring encrypted vitals...
            </motion.p>
          </motion.div>}
      </AnimatePresence>
    </div>;
}
