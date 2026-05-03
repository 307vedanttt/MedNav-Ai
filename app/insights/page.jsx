"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
const specialtyConfig = {
  Cardiology: {
    icon: "cardiology",
    color: "text-error",
    bg: "bg-error/10"
  },
  Gastroenterology: {
    icon: "gastroenterology",
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  Neurology: {
    icon: "neurology",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  Orthopedics: {
    icon: "skeleton",
    color: "text-tertiary-container",
    bg: "bg-tertiary-container/10"
  },
  General: {
    icon: "stethoscope",
    color: "text-on-surface-variant",
    bg: "bg-surface-container-highest"
  }
};
export default function HealthInsights() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/symptoms");
        const data = await res.json();
        if (res.ok && data.success) {
          setHistory(data.history || []);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const clearHistory = async () => {
    try {
      const res = await fetch("/api/symptoms", { method: "DELETE" });
      if (res.ok) {
        setHistory([]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const filteredHistory = filter === "All" ? history : history.filter(h => h.specialty === filter);
  const uniqueSpecialties = ["All", ...Array.from(new Set(history.map(h => h.specialty)))];

  // Compute dynamic stats
  const totalConsultations = history.length;
  const highSeverityCount = history.filter(h => h.severity === "High").length;
  const topSpecialty = history.length > 0 ? Object.entries(history.reduce((acc, h) => {
    acc[h.specialty] = (acc[h.specialty] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || "None" : "None";
  const formatTime = iso => {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const formatRelative = iso => {
    const now = Date.now();
    const then = new Date(iso).getTime();
    const diffMin = Math.floor((now - then) / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}d ago`;
  };

  const downloadReport = () => {
    if (history.length === 0) {
      alert("No history available to generate a report.");
      return;
    }

    const reportLines = [
      "==================================================",
      "             MEDI-NAV AI HEALTH REPORT            ",
      "==================================================",
      `Generated on: ${new Date().toLocaleString()}`,
      `Total Consultations: ${history.length}`,
      `High Severity Incidents: ${highSeverityCount}`,
      `Top Specialty: ${topSpecialty}`,
      "",
      "--- DETAILED SYMPTOM LOG ---",
      ""
    ];

    history.forEach((entry, index) => {
      reportLines.push(`[${index + 1}] Date: ${new Date(entry.timestamp).toLocaleString()}`);
      reportLines.push(`    Symptom: "${entry.symptom}"`);
      reportLines.push(`    Severity: ${entry.severity}`);
      reportLines.push(`    Specialty: ${entry.specialty}`);
      reportLines.push("");
    });

    reportLines.push("==================================================");
    reportLines.push("This report is auto-generated securely by MediNav AI.");

    const blob = new Blob([reportLines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `MediNav_Health_Report_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen pb-32">
      <Header />
      
      <main className="pt-24 px-4 md:px-6 max-w-7xl mx-auto space-y-8">
        {/* Hero: Dynamic Health Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 glass-panel rounded-xl p-8 border border-outline-variant/15 shadow-[0_0_50px_rgba(0,229,255,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-30 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-[scan_4s_linear_infinite]"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="space-y-2">
                <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                  Diagnostic Summary
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-primary">
                  YOUR HEALTH TIMELINE
                </h2>
                <p className="text-on-surface-variant max-w-md text-sm">
                  {totalConsultations > 0 ? `${totalConsultations} symptom${totalConsultations > 1 ? 's' : ''} analyzed. ${highSeverityCount > 0 ? `${highSeverityCount} flagged as high severity.` : 'No high severity flags detected.'}` : 'No symptoms recorded yet. Use the Vitals tab to start your first consultation.'}
                </p>
              </div>
              <div className="relative flex items-center justify-center">
                <svg className="w-40 h-40 md:w-48 md:h-48 -rotate-90">
                  <circle className="text-surface-container" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                  <circle cx="96" cy="96" fill="transparent" r="88" stroke="url(#gradient)" strokeDasharray="552.92" strokeDashoffset={Math.max(0, 552.92 - totalConsultations * 55.29)} strokeLinecap="round" strokeWidth="12"></circle>
                  <defs>
                    <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#00e5ff"></stop>
                      <stop offset="100%" stopColor="#00285b"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-headline text-4xl md:text-5xl font-bold text-white">
                    {totalConsultations}<span className="text-lg text-primary"></span>
                  </span>
                  <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                    Consultations
                  </span>
                </div>
              </div>
            </div>
            
            {/* Dynamic stat cards */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10">
                <span className="font-label text-[10px] text-on-surface-variant uppercase block mb-1">Total Scans</span>
                <span className="font-headline text-xl font-bold text-primary">{totalConsultations}</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10">
                <span className="font-label text-[10px] text-on-surface-variant uppercase block mb-1">High Severity</span>
                <span className="font-headline text-xl font-bold text-error">{highSeverityCount}</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10">
                <span className="font-label text-[10px] text-on-surface-variant uppercase block mb-1">Top Specialty</span>
                <span className="font-headline text-sm font-bold text-secondary truncate block">{topSpecialty}</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10">
                <span className="font-label text-[10px] text-on-surface-variant uppercase block mb-1">Last Scan</span>
                <span className="font-headline text-sm font-bold text-primary-container block truncate">
                  {history.length > 0 ? formatRelative(history[0].timestamp) : "N/A"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Side Panel: Specialty Breakdown */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 glass-panel rounded-xl p-6 border border-outline-variant/15">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary" data-icon="cognition">cognition</span>
                <h3 className="font-headline text-lg font-bold uppercase tracking-wide">AI Insights</h3>
              </div>
              <div className="space-y-4">
                {totalConsultations === 0 ? <div className="p-4 bg-surface-container-high border-l-2 border-outline-variant rounded-r-lg">
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Start logging symptoms to receive personalized AI health insights.
                    </p>
                  </div> : <>
                    {highSeverityCount > 0 && <div className="p-4 bg-error/5 border-l-2 border-error rounded-r-lg">
                        <p className="text-sm text-on-surface leading-relaxed">
                          ⚠️ {highSeverityCount} high-severity symptom{highSeverityCount > 1 ? 's' : ''} detected. Consider scheduling a follow-up consultation.
                        </p>
                      </div>}
                    <div className="p-4 bg-primary/5 border-l-2 border-primary rounded-r-lg">
                      <p className="text-sm text-on-surface leading-relaxed">
                        Most frequent concern: <span className="font-bold text-primary">{topSpecialty}</span>. Neural patterns suggest proactive monitoring.
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/5 border-l-2 border-secondary rounded-r-lg">
                      <p className="text-sm text-on-surface leading-relaxed">
                        {totalConsultations >= 5 ? "Regular health tracking detected. Your data profile is strengthening diagnostic accuracy." : "Continue logging symptoms to improve AI prediction confidence."}
                      </p>
                    </div>
                  </>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={downloadReport} className="flex-[2] py-4 rounded-xl font-headline font-bold uppercase tracking-widest text-white bg-primary hover:bg-primary/90 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all cursor-pointer">
                Generate Report
              </button>
              <button onClick={clearHistory} className="flex-1 py-4 rounded-xl font-headline font-bold uppercase tracking-widest text-on-surface-variant border border-outline-variant/30 hover:bg-error/10 hover:text-error hover:border-error/30 transition-all cursor-pointer">
                Clear History
              </button>
            </div>
          </div>
        </section>

        {/* Symptom History Timeline */}
        <section className="glass-panel rounded-xl p-6 border border-outline-variant/15">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="font-headline text-lg font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" data-icon="history">history</span>
              Symptom History Log
            </h3>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {uniqueSpecialties.map(spec => <button key={spec} onClick={() => setFilter(spec)} className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer border ${filter === spec ? 'bg-primary-container/20 text-primary border-primary/30' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/10 hover:border-primary/20'}`}>
                  {spec}
                </button>)}
            </div>
          </div>
          
          {filteredHistory.length === 0 ? <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant/50">
              <span className="material-symbols-outlined text-5xl mb-4" data-icon="folder_off">folder_off</span>
              <p className="font-headline text-sm uppercase tracking-widest mb-1">No Records Found</p>
              <p className="text-xs">
                {history.length === 0 ? 'Describe your symptoms on the Vitals page to begin tracking.' : 'No entries match the selected filter.'}
              </p>
            </div> : <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {filteredHistory.map((entry, index) => {
              const config = specialtyConfig[entry.specialty] || specialtyConfig["General"];
              return <motion.div key={entry.id} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: 20
              }} transition={{
                delay: index * 0.05
              }} className="flex items-start gap-4 p-4 bg-surface-container-lowest/50 rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all group">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <span className={`material-symbols-outlined ${config.color} text-sm`} data-icon={config.icon}>{config.icon}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-on-surface leading-snug line-clamp-2">
                            &ldquo;{entry.symptom}&rdquo;
                          </h4>
                          <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${entry.severity === "High" ? 'bg-error/10 text-error border border-error/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                            {entry.severity}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                            {formatTime(entry.timestamp)}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                          <span className={`text-[10px] uppercase tracking-wider font-bold ${config.color}`}>
                            {entry.specialty}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                          <span className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider">
                            {formatRelative(entry.timestamp)}
                          </span>
                        </div>
                      </div>
                    </motion.div>;
            })}
              </AnimatePresence>
            </div>}
        </section>
      </main>

      <BottomNav />
    </div>;
}
