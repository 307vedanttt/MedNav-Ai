"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expiryDate = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiration
    localStorage.setItem("medai_session_expiry", expiryDate.toString());
    router.push("/dashboard");
  };

  return (
    <div className="bg-surface-dim font-body text-on-surface overflow-hidden min-h-screen flex items-center justify-center relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.08),transparent_70%)]"></div>
        {/* scanning-bar equivalent */}
        <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 bg-gradient-to-r from-transparent via-primary to-transparent animate-[scanning_4s_linear_infinite]"></div>
      </div>
      
      <main className="relative z-10 w-full max-w-md px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-3 rounded-xl bg-surface-container-high neon-glow">
              <span className="material-symbols-outlined text-primary-container text-4xl" data-icon="clinical_notes">
                clinical_notes
              </span>
            </div>
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-[-0.02em] text-primary mb-2 uppercase">
            MEDINAV-AI
          </h1>
          <p className="font-label text-on-surface-variant text-xs uppercase tracking-[0.2em]">
            Neural Diagnostic Protocol v4.0
          </p>
        </div>
        
        <div className="glass-panel rounded-xl p-8 border border-outline-variant/15 neon-glow">
          <div className="flex bg-surface-container-lowest rounded-lg p-1 mb-8">
            <button className="flex-1 py-2 text-sm font-medium rounded-lg bg-surface-container-highest text-primary transition-all duration-300 cursor-pointer">
              Login
            </button>
            <button className="flex-1 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all duration-300 cursor-pointer">
              Sign Up
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant mb-2 ml-1">
                Authentication ID
              </label>
              <div className="relative group">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg transition-colors group-focus-within:text-primary-container"
                  data-icon="person"
                >
                  person
                </span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary-container/40 transition-all outline-none"
                  placeholder="MD-7729-X"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant mb-2 ml-1">
                Secure Passkey
              </label>
              <div className="relative group">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg transition-colors group-focus-within:text-primary-container"
                  data-icon="lock"
                >
                  lock
                </span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-12 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary-container/40 transition-all outline-none"
                  placeholder="••••••••••••"
                  type="password"
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg" data-icon="visibility">
                    visibility
                  </span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  className="w-4 h-4 rounded bg-surface-container-highest border-outline-variant text-primary-container focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  type="checkbox"
                />
                <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors cursor-pointer">
                  Remember Protocol
                </span>
              </label>
              <a className="text-xs text-primary-container hover:underline tracking-tight" href="#">
                Recovery Access?
              </a>
            </div>
            
            <button
              className="w-full liquid-gradient py-4 rounded-xl font-headline font-bold text-on-secondary text-sm uppercase tracking-[0.1em] shadow-[0_4px_20px_rgba(0,229,255,0.2)] active:scale-95 transition-all duration-200 cursor-pointer"
              type="submit"
            >
              Initialize Session
            </button>
          </form>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
            <span className="font-label text-[10px] uppercase tracking-[0.1em] text-outline/60 whitespace-nowrap">
              Biometric Link
            </span>
            <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-surface-container-high py-3 rounded-lg border border-outline-variant/10 hover:bg-surface-container-highest transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-lg text-primary" data-icon="fingerprint">
                fingerprint
              </span>
              <span className="text-xs font-medium">TouchID</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-surface-container-high py-3 rounded-lg border border-outline-variant/10 hover:bg-surface-container-highest transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-lg text-primary" data-icon="face">
                face
              </span>
              <span className="text-xs font-medium">FaceID</span>
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-on-surface-variant/60">
          System monitored by HIPAA-compliant encryption.<br />
          Level 4 diagnostic clearance required.
        </p>
      </main>
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs text-center pointer-events-none opacity-20 z-0">
        <div className="h-16 w-16 mx-auto mb-4 border border-primary/20 rounded-full flex items-center justify-center">
          <div className="h-8 w-8 border border-primary/40 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
