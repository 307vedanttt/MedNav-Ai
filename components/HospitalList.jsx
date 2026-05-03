"use client";

import HospitalCard from "./HospitalCard";
import { motion, AnimatePresence } from "framer-motion";
export default function HospitalList({
  hospitals,
  isLoading,
  selectedHospitalId,
  onSelect,
  onNavigate,
  onCallEMS,
  userLocation
}) {
  return <div className="flex flex-col h-full max-h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-headline text-xl font-bold">Nearby Facilities</h3>
        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-md">
          {hospitals.length} Found
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar relative">
        <AnimatePresence>
          {isLoading && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface/50 backdrop-blur-sm rounded-xl">
               <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
               <span className="font-label text-xs uppercase tracking-widest text-primary animate-pulse">Scanning area...</span>
            </motion.div>}
        </AnimatePresence>

        {hospitals.map((hospital, i) => <motion.div key={hospital.id} initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: i * 0.05
      }}>
            <HospitalCard hospital={hospital} isSelected={selectedHospitalId === hospital.id} onSelect={() => onSelect(hospital.id)} onNavigate={onNavigate} onCallEMS={onCallEMS} userLocation={userLocation} />
          </motion.div>)}

        {!isLoading && hospitals.length === 0 && <div className="glass-panel p-8 text-center rounded-xl border border-outline-variant/15 border-dashed">
            <span className="material-symbols-outlined text-outline text-4xl mb-2" data-icon="explore_off">
              explore_off
            </span>
            <p className="font-headline text-on-surface-variant">No facilities found within 5km.</p>
          </div>}
      </div>
    </div>;
}
