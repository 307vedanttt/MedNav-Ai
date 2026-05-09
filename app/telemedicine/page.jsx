"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const generateDoctorResponse = (input) => {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes("dizzy") || lowercaseInput.includes("dizziness")) {
    return "I understand you are feeling dizzy. Please sit or lie down immediately to prevent falls. I recommend drinking plenty of water, and if the dizziness persists, you may take over-the-counter Meclizine (Antivert). Avoid sudden head movements.";
  }
  if (lowercaseInput.includes("fever") || lowercaseInput.includes("temperature") || lowercaseInput.includes("hot")) {
    return "A fever indicates your body is fighting an infection. Please take Acetaminophen (Tylenol) or Ibuprofen to reduce the fever. Stay hydrated, get plenty of rest, and monitor your temperature. If it exceeds 103°F (39.4°C), seek immediate care.";
  }
  if (lowercaseInput.includes("headache") || lowercaseInput.includes("head ache") || lowercaseInput.includes("migraine")) {
    return "For a headache, I recommend resting in a quiet, dark room. You can take over-the-counter Ibuprofen (Advil) or Acetaminophen (Tylenol). Applying a cold compress to your head or neck may also help relieve the pain.";
  }
  if (lowercaseInput.includes("stomach") || lowercaseInput.includes("nausea") || lowercaseInput.includes("vomit") || lowercaseInput.includes("belly")) {
    return "For stomach discomfort or nausea, stick to a bland diet like the BRAT diet (Bananas, Rice, Applesauce, Toast). Avoid dairy and spicy foods. You can take over-the-counter Bismuth subsalicylate (Pepto-Bismol). Stay hydrated with small sips of water.";
  }
  if (lowercaseInput.includes("chest") || lowercaseInput.includes("heart") || lowercaseInput.includes("breath")) {
    return "Chest pain or shortness of breath can be a critical symptom. Please sit down and try to remain calm. If the pain is severe, radiates to your arm or jaw, or you feel faint, please press the Disconnect button and call emergency services (911) immediately.";
  }
  if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi") || lowercaseInput.includes("hey")) {
    return "Hello there. I am Dr. Sarah. Please describe any symptoms you're experiencing today.";
  }
  if (lowercaseInput.includes("thank")) {
    return "You're very welcome. Please take care of yourself, and don't hesitate to reach out if your condition changes.";
  }
  
  return "I understand. Based on your symptoms, I recommend getting plenty of rest and monitoring your condition closely over the next 24 hours. Ensure you are well-hydrated. If symptoms worsen, please schedule an in-person consultation.";
};

export default function Telemedicine() {
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [aiState, setAiState] = useState("listening"); // listening, processing, speaking
  const [chatInput, setChatInput] = useState("");
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  
  const [transcripts, setTranscripts] = useState([
    { sender: "System", text: "Secure WebRTC Connection Established." },
    { sender: "Dr. Sarah", text: "Hello. I am Dr. Sarah. How can I help you today?" }
  ]);
  
  const transcriptEndRef = useRef(null);

  // Timer
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Auto-scroll transcription
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcripts]);

  // Pre-load voices and cleanup on unmount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      setTimeout(() => setAiState("listening"), Math.max(3000, text.length * 50));
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    
    // Priority list for Indian English (en-IN) voices
    const preferredVoice = voices.find(v => v.lang === 'en-IN') || 
                          voices.find(v => v.name.includes('India')) || 
                          voices.find(v => v.name.includes('Neerja')) || 
                          voices.find(v => v.name.includes('Heera')) ||
                          voices.find(v => v.name.includes('Rishi')) ||
                          voices.find(v => v.name.includes('Isha')) ||
                          voices.find(v => v.name.includes('Google US English')) || 
                          voices.find(v => v.name.includes('Samantha')) ||
                          voices.find(v => v.lang.includes('en')) || 
                          voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang; // Ensure lang matches the voice
    }
    
    // 0.95 rate is slightly slower and more "doctor-like" / professional
    utterance.rate = 0.95; 
    utterance.pitch = 1.0; 
    
    utterance.onend = () => {
      setAiState("listening");
    };
    utterance.onerror = () => {
      setAiState("listening");
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textOverride) => {
    const text = typeof textOverride === 'string' ? textOverride : chatInput;
    if (!text.trim()) return;

    // Add Patient Message
    setTranscripts(prev => [...prev, { sender: "You", text }]);
    setChatInput("");
    
    // Switch AI to Processing
    setAiState("processing");

    // Simulate Network/Processing Delay
    setTimeout(() => {
      const responseText = generateDoctorResponse(text);
      
      // Switch AI to Speaking
      setAiState("speaking");
      setTranscripts(prev => [...prev, { sender: "Dr. Sarah", text: responseText }]);

      // Speak the response aloud (which will auto-switch state to listening when done)
      speakText(responseText);

    }, 1500 + Math.random() * 1000); // 1.5s to 2.5s delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please type your message.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListeningVoice(true);
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      handleSend(speechResult);
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech' && event.error !== 'network') {
        console.error("Speech recognition error", event.error);
      }
      setIsListeningVoice(false);
    };

    recognition.onend = () => {
      setIsListeningVoice(false);
    };

    recognition.start();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black font-body text-white min-h-screen h-screen overflow-hidden flex flex-col relative selection:bg-primary/30">
      
      {/* FULL SCREEN VIDEO FEED (Simulated with Image + Animation) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
        <motion.img 
          src="/real_doctor_webcam.png" 
          alt="Live Doctor Feed"
          className="w-full h-full object-cover object-center"
          animate={{
            scale: aiState === "speaking" ? [1.02, 1.05, 1.02] : [1.02, 1.03, 1.02],
          }}
          transition={{
            duration: aiState === "speaking" ? 3 : 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Subtle Vignette for realistic webcam look */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
      </div>

      {/* Glassmorphic Header */}
      <header className="relative z-20 flex items-center justify-between p-4 px-6 mt-4 mx-4 md:mx-8 rounded-3xl border border-white/20 bg-black/30 backdrop-blur-xl shadow-2xl shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">close</span>
          </Link>
          <div>
            <h1 className="font-headline font-bold text-lg tracking-tight text-white shadow-sm">Dr. Sarah (AI)</h1>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor] ${aiState === "processing" ? "bg-purple-400" : "bg-green-400"}`}></span>
              <span className="text-xs text-white/80 font-bold tracking-widest uppercase">{formatTime(callTime)} • Live Call</span>
            </div>
          </div>
        </div>
        
        {/* PiP Patient Webcam Mockup */}
        <div className="hidden md:block w-24 h-32 bg-gray-800 rounded-xl overflow-hidden border border-white/20 shadow-xl relative">
           <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" alt="You" className="w-full h-full object-cover grayscale opacity-80"  width={400} height={400} />
           <div className="absolute bottom-1 left-1 text-[8px] bg-black/50 px-1.5 py-0.5 rounded text-white/80 font-bold tracking-widest uppercase">You</div>
        </div>
      </header>

      {/* Main Content Area - mostly transparent to show video, just holding UI elements */}
      <main className="flex-1 relative z-10 flex flex-col justify-end p-4 md:p-8 overflow-hidden pointer-events-none">
        
        {/* Container for Chat UI and Input */}
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 pointer-events-auto">
          
          {/* Floating Transcription Box */}
          <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 shadow-2xl flex flex-col overflow-hidden relative max-h-[35vh]">
            {/* Status indicator line */}
            <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${
              aiState === "speaking" ? "bg-primary" : 
              aiState === "processing" ? "bg-purple-500 animate-pulse" : "bg-transparent"
            }`}></div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scrollbar flex flex-col">
              <AnimatePresence initial={false}>
                {transcripts.map((t, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${t.sender === 'You' ? 'items-end' : 'items-start'}`}
                  >
                    <span className={`text-[10px] mb-1 font-bold tracking-wider uppercase ${
                      t.sender === 'Dr. Sarah' ? 'text-primary drop-shadow' :
                      t.sender === 'System' ? 'text-white/50' : 'text-white/80'
                    }`}>
                      {t.sender}
                    </span>
                    <div className={`px-4 py-3 rounded-2xl max-w-[90%] text-sm leading-relaxed backdrop-blur-md border ${
                      t.sender === 'You' ? 'bg-white/10 border-white/10 text-white rounded-br-sm' :
                      t.sender === 'Dr. Sarah' ? 'bg-black/60 border-primary/30 text-white rounded-bl-sm shadow-[0_4px_20px_rgba(0,229,255,0.15)]' :
                      'bg-transparent border-transparent text-white/40 text-center mx-auto text-xs'
                    }`}>
                      {t.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={transcriptEndRef} />
            </div>

            {/* Speaking/Processing Visualizer Overlay at bottom of chat */}
            <AnimatePresence>
              {aiState !== "listening" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3"
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${aiState === "processing" ? "text-purple-400" : "text-primary"}`}>
                    {aiState === "processing" ? "Analyzing..." : "Speaking..."}
                  </span>
                  {aiState === "speaking" && (
                    <div className="h-4 flex items-center justify-center gap-[2px] ml-auto">
                      {[...Array(12)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className="w-1 bg-primary rounded-full"
                          animate={{ height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] }}
                          transition={{ duration: Math.random() * 0.4 + 0.2, repeat: Infinity, repeatType: "mirror" }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Call Controls & Chat Input */}
          <div className="w-full flex items-center gap-3 bg-black/40 backdrop-blur-2xl border border-white/20 rounded-full p-2 shadow-2xl relative z-20">
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors border ${
                isMuted ? 'bg-error/80 border-error text-white shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="material-symbols-outlined">{isMuted ? 'mic_off' : 'mic'}</span>
            </button>
            
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms..."
              disabled={aiState === "processing" || isListeningVoice}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/50 text-sm disabled:opacity-50 font-medium px-2"
            />
            
            <button 
              onClick={startVoiceRecognition} 
              disabled={aiState === "processing" || isListeningVoice}
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 disabled:opacity-50 border ${
                isListeningVoice ? 'bg-error border-error text-white animate-pulse shadow-[0_0_20px_rgba(255,0,0,0.6)]' : 'bg-primary/20 border-primary/30 text-primary hover:bg-primary hover:text-black'
              }`}
            >
              <span className="material-symbols-outlined">{isListeningVoice ? 'hearing' : 'graphic_eq'}</span>
            </button>
            
            <button 
              onClick={() => handleSend()} 
              disabled={!chatInput.trim() || aiState === "processing"}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>

            {/* End Call Button inside controls */}
            <Link href="/dashboard" className="w-12 h-12 rounded-full bg-error text-white flex items-center justify-center shrink-0 hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(255,0,0,0.4)] ml-1">
              <span className="material-symbols-outlined text-[20px]">call_end</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
