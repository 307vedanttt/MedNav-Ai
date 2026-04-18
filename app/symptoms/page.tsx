"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SymptomsAnalysis() {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hello. I am MediNav-AI. Please describe what you're feeling. Be as specific as possible about the location and intensity of the discomfort."
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showRecommendations]);

  const processSymptom = (text: string) => {
    // Categorize symptom for map filtering
    const lowercaseInput = text.toLowerCase();
    let specialty = "General";
    if (lowercaseInput.includes("heart") || lowercaseInput.includes("chest") || lowercaseInput.includes("breath") || lowercaseInput.includes("palpitation")) specialty = "Cardiology";
    else if (lowercaseInput.includes("stomach") || lowercaseInput.includes("belly") || lowercaseInput.includes("digest")) specialty = "Gastroenterology";
    else if (lowercaseInput.includes("head") || lowercaseInput.includes("dizzy") || lowercaseInput.includes("migraine") || lowercaseInput.includes("faint")) specialty = "Neurology";
    else if (lowercaseInput.includes("bone") || lowercaseInput.includes("joint") || lowercaseInput.includes("fracture") || lowercaseInput.includes("break") || lowercaseInput.includes("arm") || lowercaseInput.includes("leg")) specialty = "Orthopedics";
    
    localStorage.setItem("userSymptoms", text);
    localStorage.setItem("requiredSpecialty", specialty);

    // Persist to symptom history log for the History page
    const historyEntry = {
      id: Date.now(),
      symptom: text,
      specialty,
      severity: specialty !== "General" ? "High" : "Moderate",
      timestamp: new Date().toISOString(),
    };
    const existingHistory = JSON.parse(localStorage.getItem("symptomHistory") || "[]");
    existingHistory.unshift(historyEntry); // newest first
    localStorage.setItem("symptomHistory", JSON.stringify(existingHistory.slice(0, 50))); // cap at 50 entries

    const newMsg = { id: Date.now(), role: "user", text: text };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      // Auto-route on critical condition match!
      if (specialty !== "General") {
        router.push("/emergency");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            text: "Analysis complete. I've cross-referenced your symptoms and geospatial location. Displaying Priority Medical Centers and leading Specialists available right now for immediate consultation."
          }
        ]);
        setShowRecommendations(true);
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    processSymptom(inputValue);
  };

  const startListening = () => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Your modern browser does not support Neural Voice Protocol.");
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript); // Visual echo
        processSymptom(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Voice Protocol Error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen pb-40">
      <Header />

      <main className="pt-24 px-4 max-w-4xl mx-auto">
        {/* AI Diagnostic HUD Section */}
        <section className="mb-8">
          <div className="scanline glass-panel rounded-xl p-6 border border-outline-variant/10 shadow-lg relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
              <span className="text-primary font-headline text-xs tracking-widest uppercase">
                System Status: Active Analysis
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1 w-full">
                <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight mb-2">
                  Neural Symptom Engine
                </h2>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Describe your symptoms in natural language. Our AI cross-references clinical databases in real-time to provide high-fidelity triage guidance.
                </p>

                {/* AI Conversation Area */}
                <div className="space-y-4 mb-4">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex gap-4 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${msg.role === 'user' ? 'bg-primary-container' : 'bg-surface-container-highest border border-outline-variant/20'}`}>
                          <span className={`material-symbols-outlined text-sm ${msg.role === 'user' ? 'text-on-primary' : 'text-primary'}`} data-icon={msg.role === 'user' ? 'person' : 'smart_toy'}>
                            {msg.role === 'user' ? 'person' : 'smart_toy'}
                          </span>
                        </div>
                        <div className={`p-4 max-w-[85%] ${msg.role === 'user' ? 'bg-primary-container/10 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl border border-primary-container/20 text-primary text-sm' : 'bg-surface-container-low rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-outline-variant/5 text-on-surface text-sm'}`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 items-start">
                      <div className="w-8 h-8 shrink-0 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
                        <span className="material-symbols-outlined text-sm text-primary" data-icon="smart_toy">
                          smart_toy
                        </span>
                      </div>
                      <div className="bg-surface-container-low rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-4 border border-outline-variant/5 flex gap-1 items-center h-10 w-16">
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </motion.div>
                  )}

                  {/* Immediate Dynamic Results Rendered Inline via State */}
                  {showRecommendations && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.3 }}
                      className="mt-6 pt-4 border-t border-outline-variant/20 flex flex-col gap-6"
                    >
                      <h4 className="font-headline font-bold text-primary tracking-wide flex items-center gap-2">
                        <span className="material-symbols-outlined" data-icon="travel_explore">travel_explore</span>
                        Found 3 Verified Matches Near You
                      </h4>
                      
                      {/* Priority Hospital */}
                      <Link href="/emergency" className="glass-panel p-4 rounded-xl border border-error-container/40 hover:bg-error-container/10 transition-colors block cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-error" data-icon="local_hospital">local_hospital</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-headline font-bold text-on-surface">St. Jude Medical Center</h3>
                              <span className="text-[10px] font-bold text-error uppercase tracking-widest bg-error/10 px-2 py-0.5 rounded border border-error/20">Priority</span>
                            </div>
                            <p className="text-xs text-on-surface-variant mb-1">ER Wait Time: ~4 Mins</p>
                            <p className="text-[10px] text-primary font-bold tracking-wider uppercase">1.2 KM Away</p>
                          </div>
                        </div>
                      </Link>

                      {/* Top Doctor Focus */}
                      <Link href="/doctors" className="glass-panel p-5 rounded-xl border border-primary/20 hover:border-primary/50 transition-all block cursor-pointer">
                        <div className="flex gap-4 items-center">
                          <img
                            alt="Doctor Profile"
                            className="w-16 h-16 rounded-xl object-cover border border-outline-variant/30"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqEpPzs5hOrPRel9fgqwsOhfz0Th_DNRwwy_nBwztTaDZn9WJW06VFmHLLKBxWyWoGeySfz-8y7Cqsd7DssTtLDeS695d4LH3pK9R4M7wHHsIZ-3F_1mVtJ12TCw3Zzlcpbypq9P3oJWQ_u7ZECjbr1YFtFqQO1bqYSiGNJ6MXwoNzGdGyr1HblLMolEfiG5rWFtjZ1pDoSHLNnzkD0AczDMMlikm58sdx74PL8iYvIGXAfnSb0iRzombQpLH_MqSYB4K5eQTJe8Q"
                          />
                          <div className="flex-1">
                            <h3 className="font-headline font-bold text-lg text-on-surface">Dr. Elena Vance</h3>
                            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">Senior Cardiologist</p>
                            <div className="mt-2 text-xs font-semibold text-primary">Next Slot: 14:30 PM</div>
                          </div>
                          <button className="liquid-gradient px-4 py-2 rounded font-label text-[10px] uppercase tracking-widest font-bold text-on-primary">
                            Book
                          </button>
                        </div>
                      </Link>

                    </motion.div>
                  )}
                  
                  {/* Invisible anchor to scroll down to */}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Asymmetric Side Data */}
              <div className="w-full md:w-64 shrink-0 space-y-4">
                <div className="bg-surface-container-highest/30 rounded-xl p-4 border border-outline-variant/10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">
                    Likely Match
                  </span>
                  <div className="text-2xl font-headline font-bold text-primary">84%</div>
                  <div className="text-xs text-on-surface-variant">Cholecystitis (Likely)</div>
                  <div className="mt-4 h-1 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container w-[84%] shadow-[0_0_8px_rgba(0,229,255,0.5)]"></div>
                  </div>
                </div>

                <div className="bg-error-container/10 rounded-xl p-4 border border-error-container/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-error text-sm" data-icon="warning">
                      warning
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-error font-bold">
                      Priority Triage
                    </span>
                  </div>
                  <p className="text-xs text-on-surface leading-tight">
                    If pain increases or you develop a fever (&gt;101°F), seek emergency care immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suggested Actions Grid (Hides when Recommendations Show) */}
        {!showRecommendations && (
          <section className="mb-12">
            <h3 className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-6 font-bold ml-1">
              Suggested Clinical Pathways
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group cursor-pointer bg-surface-container-high rounded-xl p-5 border border-outline-variant/5 hover:border-primary-container/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary-container/10 transition-colors">
                  <span className="material-symbols-outlined text-primary" data-icon="medication">
                    medication
                  </span>
                </div>
                <h4 className="font-headline font-semibold text-on-surface mb-1">Gastroenterologist</h4>
                <p className="text-xs text-on-surface-variant mb-4">
                  Expert consultation for digestive and abdominal conditions.
                </p>
                <div className="flex items-center text-primary text-[10px] font-bold uppercase tracking-widest">
                  Book Now
                  <span className="material-symbols-outlined text-sm ml-1" data-icon="chevron_right">
                    chevron_right
                  </span>
                </div>
              </div>

              <div className="group cursor-pointer bg-surface-container-high rounded-xl p-5 border border-outline-variant/5 hover:border-primary-container/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary-container/10 transition-colors">
                  <span className="material-symbols-outlined text-primary" data-icon="videocam">
                    videocam
                  </span>
                </div>
                <h4 className="font-headline font-semibold text-on-surface mb-1">Instant Telehealth</h4>
                <p className="text-xs text-on-surface-variant mb-4">
                  Speak with a primary care physician in under 10 minutes.
                </p>
                <div className="flex items-center text-primary text-[10px] font-bold uppercase tracking-widest">
                  Connect
                  <span className="material-symbols-outlined text-sm ml-1" data-icon="chevron_right">
                    chevron_right
                  </span>
                </div>
              </div>

              <div className="group cursor-pointer bg-surface-container-high rounded-xl p-5 border border-outline-variant/5 hover:border-primary-container/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary-container/10 transition-colors">
                  <span className="material-symbols-outlined text-primary" data-icon="lab_research">
                    lab_research
                  </span>
                </div>
                <h4 className="font-headline font-semibold text-on-surface mb-1">Diagnostic Labs</h4>
                <p className="text-xs text-on-surface-variant mb-4">
                  Request blood panels or imaging based on AI suggestions.
                </p>
                <div className="flex items-center text-primary text-[10px] font-bold uppercase tracking-widest">
                  Schedule
                  <span className="material-symbols-outlined text-sm ml-1" data-icon="chevron_right">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Input Interface */}
        <div className="fixed bottom-24 left-0 w-full px-4 z-40 pointer-events-none">
          <div className="max-w-4xl mx-auto w-full pointer-events-auto">
            <form onSubmit={handleSubmit} className="glass-panel p-2 rounded-2xl border border-outline-variant/20 shadow-2xl neon-glow">
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={startListening}
                  className={`relative p-3 shrink-0 rounded-full transition-all cursor-pointer ${isListening ? 'bg-error/20 text-error shadow-[0_0_20px_rgba(255,0,0,0.4)]' : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'}`}
                >
                  <span className={`material-symbols-outlined ${isListening ? 'animate-pulse' : ''}`} data-icon="mic">
                    mic
                  </span>
                  {isListening && (
                    <span className="absolute inset-0 rounded-full border border-error animate-ping"></span>
                  )}
                </button>
                <input
                  className="flex-1 min-w-0 bg-surface-container-highest/50 border-none rounded-xl text-sm py-3 px-4 focus:ring-1 focus:ring-primary-container placeholder:text-on-surface-variant/50 outline-none text-on-surface transition-all"
                  placeholder="Type more details about your pain..."
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                />
                <button type="submit" disabled={isTyping || !inputValue.trim()} className="bg-gradient-to-br from-[#00e5ff] to-[#00285b] text-on-primary p-3 shrink-0 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="material-symbols-outlined flex items-center justify-center" data-icon="send">
                    send
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Decorative Glow Element */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container/5 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-container/5 blur-[120px] pointer-events-none rounded-full"></div>
    </div>
  );
}
