"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

export default function NearbyDoctors() {
  const [proximity, setProximity] = useState(15);
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen pb-32">
      <Header />
      
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Search & Filter HUD */}
        <section className="mb-8">
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/15 mb-6 relative overflow-hidden">
            <div className="scanline"></div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <label className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                  Specialization Focus
                </label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-fixed font-medium text-sm transition-transform active:scale-95 cursor-pointer">
                    Cardiology
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-surface-container-highest border border-outline-variant/15 text-on-surface-variant font-medium text-sm hover:text-primary transition-colors cursor-pointer">
                    Neurology
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-surface-container-highest border border-outline-variant/15 text-on-surface-variant font-medium text-sm hover:text-primary transition-colors cursor-pointer">
                    Oncology
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-surface-container-highest border border-outline-variant/15 text-on-surface-variant font-medium text-sm hover:text-primary transition-colors cursor-pointer">
                    Radiology
                  </button>
                </div>
              </div>
              <div className="w-full md:w-64 space-y-2">
                <label className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                  Proximity Range
                </label>
                <div className="flex items-center gap-4">
                  <input
                    className="w-full accent-primary-container bg-surface-container h-1.5 rounded-full appearance-none cursor-pointer"
                    type="range"
                    min="1" max="50"
                    value={proximity}
                    onChange={(e) => setProximity(Number(e.target.value))}
                  />
                  <span className="font-headline font-bold text-primary">{proximity}km</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map Preview Section (Asymmetric Left) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-xl border border-outline-variant/15 overflow-hidden h-[500px] relative">
              <div className="absolute inset-0 bg-surface-container-low opacity-50"></div>
              <img
                className="w-full h-full object-cover"
                alt="map"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpRnZEIL_hsYusXKMK_hbQa523QW0kVBGUI-EivW0SdAp5E6wMSO4EhgU9-SmaLW0cHlXjB2ZlPJkuLgF5HXYNIxK8_qonxIvthmPKXPr-TZcKF9ugXBkdrmI8-xCwgQaI0BbZcyCexzSjtjgonbZP1jjAeNcvWaq0FejiUSFhp9I3rhnVCKFdIZHnhCn7QY-ZNdE7PgST1KBeZgrIJQHS07L7oP0bR48RBOYZu7dRoFt-bH7m7iLmImlaBij9wr5VD-KFT9GeeFE"
              />
              {/* Floating Map Overlay */}
              <div className="absolute top-4 left-4 right-4 glass-panel p-4 rounded-lg border border-primary-container/20 flex items-center justify-between">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.1em] text-primary">
                    Active Search Area
                  </p>
                  <p className="font-body text-sm font-medium">Downtown Medical District</p>
                </div>
                <span className="material-symbols-outlined text-primary-container" data-icon="location_on">
                  location_on
                </span>
              </div>
              {/* Scan Animation HUD */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00e5ff]"></div>
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                  AI Triangulating nearest providers...
                </p>
              </div>
            </div>
          </div>

          {/* Doctor List Section (Asymmetric Right) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-headline text-2xl font-bold tracking-[-0.02em] text-primary mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined" data-icon="verified">
                verified
              </span>
              Recommended Specialists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Card 1 */}
              <div className="glass-panel p-5 rounded-xl border border-outline-variant/10 hover:border-primary-container/30 transition-all hover:scale-[1.02] group block">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-outline-variant/15">
                      <img
                        alt="Doctor Profile"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqEpPzs5hOrPRel9fgqwsOhfz0Th_DNRwwy_nBwztTaDZn9WJW06VFmHLLKBxWyWoGeySfz-8y7Cqsd7DssTtLDeS695d4LH3pK9R4M7wHHsIZ-3F_1mVtJ12TCw3Zzlcpbypq9P3oJWQ_u7ZECjbr1YFtFqQO1bqYSiGNJ6MXwoNzGdGyr1HblLMolEfiG5rWFtjZ1pDoSHLNnzkD0AczDMMlikm58sdx74PL8iYvIGXAfnSb0iRzombQpLH_MqSYB4K5eQTJe8Q"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-surface-container-highest px-2 py-0.5 rounded border border-outline-variant/20 flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-400 text-xs" data-icon="star">
                        star
                      </span>
                      <span className="text-[10px] font-bold text-on-surface">4.9</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      Dr. Elena Vance
                    </h3>
                    <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                      Senior Cardiologist
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex flex-col">
                        <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                          Distance
                        </span>
                        <span className="font-body text-xs font-medium">1.2 km</span>
                      </div>
                      <div className="w-px h-6 bg-outline-variant/20"></div>
                      <div className="flex flex-col">
                        <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                          Next Slot
                        </span>
                        <span className="font-body text-xs font-medium text-primary">14:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/book-call">
                  <button className="w-full mt-5 liquid-gradient py-2.5 rounded-lg font-label text-xs uppercase tracking-[0.15em] font-bold text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95 transition-transform cursor-pointer">
                    Initialize Booking
                  </button>
                </Link>
              </div>

              {/* Doctor Card 2 */}
              <div className="glass-panel p-5 rounded-xl border border-outline-variant/10 hover:border-primary-container/30 transition-all hover:scale-[1.02] group block">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-outline-variant/15">
                      <img
                        alt="Doctor Profile"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMXmCKLQEYDDM-K8a1-5AM9aL_hohNNd3T2gihX-fMZV2paLGuCmPDQo_Q48Y3QWpb6fciEeAuAT4WkKixMjhNdwM9EZW8sBXe4VbTXmy2_BGIjScYPisP0pxtnZ0ydXWeslwiwVditjHVYOG3ABtVHiiiU6Do-0vpEnXo7ULra3bN3HSvd-lLGlZGgozwtGGI5pY9O6Ku5AlmN2z0IrqfpDTbnJdshYQY8cNI_p8bCLY--qBUlYzV8UEdCxt9AHMnYTOAXH5ogTc"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-surface-container-highest px-2 py-0.5 rounded border border-outline-variant/20 flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-400 text-xs" data-icon="star">
                        star
                      </span>
                      <span className="text-[10px] font-bold text-on-surface">5.0</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      Dr. Marcus Thorne
                    </h3>
                    <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                      AI Neuro-Link Expert
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex flex-col">
                        <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                          Distance
                        </span>
                        <span className="font-body text-xs font-medium">3.8 km</span>
                      </div>
                      <div className="w-px h-6 bg-outline-variant/20"></div>
                      <div className="flex flex-col">
                        <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                          Next Slot
                        </span>
                        <span className="font-body text-xs font-medium text-primary">Tomorrow</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/book-call">
                  <button className="w-full mt-5 bg-surface-container-highest border border-outline-variant/20 py-2.5 rounded-lg font-label text-xs uppercase tracking-[0.15em] font-bold text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all active:scale-95 transition-transform cursor-pointer">
                    Request Data Port
                  </button>
                </Link>
              </div>

              {/* Doctor Card 3 */}
              <div className="glass-panel p-5 rounded-xl border border-outline-variant/10 hover:border-primary-container/30 transition-all hover:scale-[1.02] group md:col-span-2 block">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <div className="w-full md:w-32 h-40 rounded-xl overflow-hidden border border-outline-variant/15">
                      <img
                        alt="Doctor Profile"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWMpFyN4ReIP6K2UaM-ep4UtZoAF3WGxKiTIjRjPM1RUgAgtOtyPJ9NiVA3mZcPg3NU3lQXR5xDL7vLskQHZiWyDsFt9Qck-kgRkr_J0LZxIjgxR71G3FdWK3RWwV2mVaIiQF4sGlAB4OYaGnR-uNgbbJW8-qOBEWOeWg0qMH7waCYJq8AkiMWRiCtE5cEv0j9cZDlIbrBLVHuxT_87z-9eDV0c-A7WPtQiYNSo81rFxaS02xDlaYgSHIEfT4437D-AEttIL0f72M"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                            Dr. Sarah Chen
                          </h3>
                          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                            Lead Oncology Bio-Engineer
                          </p>
                        </div>
                        <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          <span className="font-label text-[10px] uppercase font-bold text-primary">
                            AI Matching 98%
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-on-surface-variant leading-relaxed max-w-lg">
                        Specializing in molecular-scale intervention and predictive AI diagnostics for early stage detection.
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
                      <div className="flex-1 flex gap-8">
                        <div className="flex flex-col">
                          <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                            Experience
                          </span>
                          <span className="font-body text-sm font-semibold">14 Years</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                            Wait Time
                          </span>
                          <span className="font-body text-sm font-semibold text-tertiary">2 Days</span>
                        </div>
                      </div>
                      <Link href="/book-call">
                        <button className="liquid-gradient px-8 py-3 rounded-lg font-label text-xs uppercase tracking-[0.15em] font-bold text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95 transition-transform cursor-pointer">
                          Consultation Request
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contextual FAB */}
      <button className="fixed bottom-24 right-6 w-14 h-14 liquid-gradient rounded-full shadow-[0_15px_30px_rgba(0,229,255,0.3)] flex items-center justify-center z-40 active:scale-90 transition-transform cursor-pointer">
        <span className="material-symbols-outlined text-on-primary scale-125" data-icon="add_circle">
          add_circle
        </span>
      </button>

      <BottomNav />
    </div>
  );
}
