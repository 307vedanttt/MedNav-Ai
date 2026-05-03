"use client";

import { motion } from "framer-motion";
export default function HospitalCard({
  hospital,
  isSelected,
  onSelect,
  onNavigate,
  onCallEMS,
  userLocation
}) {
  const isRecommended = hospital.recommended;
  const navigate = e => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate(hospital.id);
    } else if (userLocation) {
      window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation.lat}%2C${userLocation.lon}%3B${hospital.lat}%2C${hospital.lon}`, '_blank');
    } else {
      window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(hospital.name)}`, '_blank');
    }
  };
  const callEMS = e => {
    e.stopPropagation();
    if (onCallEMS) onCallEMS(hospital.id);
  };
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} whileHover={{
    scale: 1.02
  }} onClick={onSelect} className={`glass-panel p-4 rounded-xl cursor-pointer transition-all border ${isSelected ? 'border-tertiary bg-surface-container-highest shadow-lg shadow-tertiary/10' : isRecommended ? 'border-tertiary/50 hover:border-tertiary/80' : 'border-outline-variant/15 hover:border-outline-variant/50'}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          {isRecommended && <span className="inline-block font-label text-[10px] text-tertiary tracking-widest uppercase mb-1 font-bold">
              ★ AI Recommended
            </span>}
          <h4 className="font-headline font-bold text-lg text-on-surface leading-tight">
            {hospital.name}
          </h4>
          <p className="text-on-surface-variant text-xs mt-1 truncate max-w-xs block">
            {hospital.address}
          </p>
        </div>
        {hospital.rating && <div className="bg-surface-container-lowest px-2 py-1 rounded-md border border-outline-variant/5 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-secondary-container" data-icon="star">star</span>
            <span className="font-label text-xs font-bold">{hospital.rating}</span>
          </div>}
      </div>
      
      <div className="flex items-center gap-4 mt-3">
        <span className="font-label text-[10px] uppercase text-outline tracking-wider flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]" data-icon="medical_services">medical_services</span>
          {hospital.specialization}
        </span>
        
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button onClick={callEMS} className="px-3 py-1.5 rounded-lg text-[10px] font-label font-bold uppercase tracking-wider transition-all bg-error/10 text-error border border-error/30 hover:bg-error/20 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">emergency</span>
            SOS
          </button>
          <button onClick={navigate} className={`px-4 py-1.5 rounded-lg text-[10px] font-label font-bold uppercase tracking-wider transition-all shadow-md ${isSelected || isRecommended ? 'liquid-gradient text-on-primary shadow-primary/20' : 'bg-surface-bright text-on-surface border border-outline-variant/20 hover:bg-surface-variant'}`}>
            Navigate
          </button>
        </div>
      </div>
    </motion.div>;
}
