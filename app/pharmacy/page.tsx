"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default function Pharmacy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const prescriptions = [
    { name: "Atorvastatin Calcium", dose: "20 mg", status: "Out for Delivery", time: "ETA: 14 Mins", icon: "medication", color: "text-primary" },
    { name: "Lisinopril", dose: "10 mg", status: "Processing", time: "Will notify", icon: "vaccines", color: "text-secondary-fixed" },
    { name: "Metformin ER", dose: "500 mg", status: "Refill Available", time: "Requires Auth", icon: "prescriptions", color: "text-on-surface-variant" },
  ];

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen pb-32">
      <Header />

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <div className="mb-10">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-2 block">
            Fulfillment Center
          </span>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
            Digital Pharmacy
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Prescriptions List */}
          <div className="lg:col-span-7">
            <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" data-icon="list_alt">list_alt</span>
              Active Therapeutics
            </h3>
            
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
              {prescriptions.map((rx, idx) => (
                <motion.div variants={itemVariants} key={idx} className="glass-panel p-5 rounded-2xl border border-outline-variant/15 flex items-center gap-5 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-surface-container ${rx.status === 'Out for Delivery' ? 'shadow-[0_0_20px_rgba(0,229,255,0.2)]' : ''}`}>
                    <span className={`material-symbols-outlined text-2xl ${rx.color}`} data-icon={rx.icon}>{rx.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{rx.name}</h4>
                      <span className="text-xs font-bold bg-surface-container-highest px-2 py-1 rounded border border-outline-variant/20">{rx.dose}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`font-label text-[10px] uppercase tracking-widest font-bold ${rx.status === 'Out for Delivery' ? 'text-primary animate-pulse' : 'text-on-surface-variant'}`}>
                        {rx.status}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant/40"></span>
                      <span className="text-xs text-on-surface-variant">{rx.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Delivery Drone Tracker Map */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl border border-outline-variant/15 overflow-hidden sticky top-32">
              <div className="p-5 border-b border-outline-variant/15 flex items-center justify-between">
                <div>
                  <h4 className="font-headline font-bold">Drone Route Tracking</h4>
                  <p className="text-[10px] uppercase tracking-widest text-primary font-bold mt-1">Live Telemetry</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
              </div>
              <div className="h-64 relative bg-surface-container-low">
                <img className="w-full h-full object-cover opacity-40 mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpRnZEIL_hsYusXKMK_hbQa523QW0kVBGUI-EivW0SdAp5E6wMSO4EhgU9-SmaLW0cHlXjB2ZlPJkuLgF5HXYNIxK8_qonxIvthmPKXPr-TZcKF9ugXBkdrmI8-xCwgQaI0BbZcyCexzSjtjgonbZP1jjAeNcvWaq0FejiUSFhp9I3rhnVCKFdIZHnhCn7QY-ZNdE7PgST1KBeZgrIJQHS07L7oP0bR48RBOYZu7dRoFt-bH7m7iLmImlaBij9wr5VD-KFT9GeeFE" alt="map" />
                
                {/* Mock animated drone */}
                <motion.div 
                  initial={{ x: 20, y: 150 }}
                  animate={{ x: 200, y: 80 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 blur-xl absolute -inset-4"></div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center relative shadow-[0_0_20px_#00e5ff]">
                    <span className="material-symbols-outlined text-[14px] text-on-primary" data-icon="flight_takeoff">flight_takeoff</span>
                  </div>
                </motion.div>
                
                {/* User location pin */}
                <div className="absolute right-6 top-10">
                  <span className="material-symbols-outlined text-secondary text-2xl drop-shadow-[0_0_10px_rgba(0,255,163,0.8)]" data-icon="location_on">location_on</span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-highest/20">
                <button className="w-full py-3 rounded-lg border border-outline-variant/30 text-xs font-label uppercase tracking-widest hover:bg-surface-variant transition-colors cursor-pointer">
                  Contact Courier
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
