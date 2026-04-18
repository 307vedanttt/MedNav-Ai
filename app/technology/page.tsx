"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";

export default function TechnologyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-32 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Technology
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Powered by advanced AI algorithms, MedAI brings you instant and accurate medical diagnoses.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="glass-panel p-8 rounded-2xl border border-outline-variant/30">
            <h2 className="text-2xl font-headline font-semibold text-on-surface mb-4">
              AI Diagnostics engine
            </h2>
            <p className="text-on-surface-variant">
              Developed using state-of-the-art machine learning models trained on millions of data points to ensure precise and instantaneous assessment.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-outline-variant/30">
            <h2 className="text-2xl font-headline font-semibold text-on-surface mb-4">
              Secure Data Processing
            </h2>
            <p className="text-on-surface-variant">
              End-to-end encryption ensures your personal health data remains strictly confidential and secure on our platform.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-outline-variant/30">
            <h2 className="text-2xl font-headline font-semibold text-on-surface mb-4">
              Seamless Telemedicine Integration
            </h2>
            <p className="text-on-surface-variant">
              Our WebRTC backbone provides crystal clear, sub-second latency video streaming tailored explicitly for remote clinical assessments.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-outline-variant/30">
            <h2 className="text-2xl font-headline font-semibold text-on-surface mb-4">
              Live Biometric Synchronization
            </h2>
            <p className="text-on-surface-variant">
              Automatically bridges and synchronizes wearable device telemetry directly to dispatch hubs during active emergency protocols.
            </p>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
