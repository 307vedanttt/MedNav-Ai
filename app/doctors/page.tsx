"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

const allDoctors = [
  // CARDIOLOGY
  {
    id: 1,
    name: "Dr. Anjali Sharma",
    role: "Senior Cardiologist",
    specialty: "Cardiology",
    rating: "4.9",
    distance: "1.2 km",
    nextSlot: "14:30 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 101,
    name: "Dr. Rohan Mehta",
    role: "Interventional Cardiologist",
    specialty: "Cardiology",
    rating: "4.8",
    distance: "2.5 km",
    nextSlot: "Tomorrow",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 102,
    name: "Dr. Priya Desai",
    role: "Cardiothoracic Surgeon",
    specialty: "Cardiology",
    rating: "5.0",
    distance: "4.1 km",
    nextSlot: "16:00 PM",
    image: "https://images.unsplash.com/photo-1594824436998-ba81dd55b931?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 103,
    name: "Dr. Sanjay Gupta",
    role: "Heart Failure Specialist",
    specialty: "Cardiology",
    rating: "4.7",
    distance: "5.5 km",
    nextSlot: "18:30 PM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },

  // NEUROLOGY
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    role: "AI Neuro-Link Expert",
    specialty: "Neurology",
    rating: "5.0",
    distance: "3.8 km",
    nextSlot: "Tomorrow",
    image: "https://images.unsplash.com/photo-1537368910025-7028a411313c?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 201,
    name: "Dr. Kavita Iyer",
    role: "Cognitive Neurologist",
    specialty: "Neurology",
    rating: "4.9",
    distance: "1.5 km",
    nextSlot: "11:00 AM",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 202,
    name: "Dr. Aakash Verma",
    role: "AI Stroke Specialist",
    specialty: "Neurology",
    rating: "4.8",
    distance: "6.2 km",
    nextSlot: "Thursday",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 203,
    name: "Dr. Neha Reddy",
    role: "Clinical Neurophysiologist",
    specialty: "Neurology",
    rating: "4.7",
    distance: "8.0 km",
    nextSlot: "Today 19:00",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },

  // ONCOLOGY
  {
    id: 301,
    name: "Dr. Amit Khanna",
    role: "Radiation Oncologist",
    specialty: "Oncology",
    rating: "4.9",
    distance: "3.1 km",
    nextSlot: "Friday",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 302,
    name: "Dr. Sneha Joshi",
    role: "Surgical Oncology",
    specialty: "Oncology",
    rating: "5.0",
    distance: "4.5 km",
    nextSlot: "Tomorrow",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 303,
    name: "Dr. Tarun Bal",
    role: "Pediatric Oncologist",
    specialty: "Oncology",
    rating: "4.8",
    distance: "10.2 km",
    nextSlot: "Next Week",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 3,
    name: "Dr. Vikram Singh",
    role: "Lead Oncology Bio-Engineer",
    specialty: "Oncology",
    rating: "4.8",
    aiMatch: "98%",
    desc: "Specializing in molecular-scale intervention and predictive AI diagnostics for early stage detection.",
    distance: "14 Years", // Overloading this field for the primary card's "Experience"
    nextSlot: "2 Days", // Overloading this field for "Wait Time"
    image: "https://images.unsplash.com/photo-1582750433449-648ed127c09e?auto=format&fit=crop&w=500&q=80",
    isPrimary: true,
  },

  // RADIOLOGY
  {
    id: 4,
    name: "Dr. Meera Patel",
    role: "Chief AI Radiologist",
    specialty: "Radiology",
    rating: "4.9",
    distance: "5.2 km",
    nextSlot: "16:00 PM",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=500&q=80", 
    isPrimary: false,
  },
  {
    id: 401,
    name: "Dr. Divya Kapoor",
    role: "Diagnostic Radiologist",
    specialty: "Radiology",
    rating: "4.7",
    distance: "2.8 km",
    nextSlot: "10:30 AM",
    image: "https://images.unsplash.com/photo-1594824436998-ba81dd55b931?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 402,
    name: "Dr. Prakash Nair",
    role: "Interventional Radiologist",
    specialty: "Radiology",
    rating: "4.8",
    distance: "1.1 km",
    nextSlot: "Now",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  },
  {
    id: 403,
    name: "Dr. Arvind Rao",
    role: "Neuroradiologist",
    specialty: "Radiology",
    rating: "5.0",
    distance: "5.0 km",
    nextSlot: "Tomorrow",
    image: "https://images.unsplash.com/photo-1537368910025-7028a411313c?auto=format&fit=crop&w=500&q=80",
    isPrimary: false,
  }
];

const specialtiesList = ["All", "Cardiology", "Neurology", "Oncology", "Radiology"];

export default function NearbyDoctors() {
  const [proximity, setProximity] = useState(15);
  const [activeSpecialty, setActiveSpecialty] = useState("All");

  const filteredDoctors = allDoctors.filter(doc => 
    activeSpecialty === "All" || doc.specialty === activeSpecialty
  );

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen pb-32">
      <Header />
      
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Search & Filter HUD */}
        <section className="mb-8">
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/15 mb-6 relative overflow-hidden">
            <div className="scanline"></div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-2 relative z-10">
                <label className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                  Specialization Focus
                </label>
                <div className="flex flex-wrap gap-2">
                  {specialtiesList.map(spec => {
                    const isActive = activeSpecialty === spec;
                    return (
                      <button 
                        key={spec}
                        onClick={() => setActiveSpecialty(spec)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-transform cursor-pointer ${
                          isActive 
                            ? 'bg-primary-container text-on-primary-fixed active:scale-95' 
                            : 'bg-surface-container-highest border border-outline-variant/15 text-on-surface-variant hover:text-primary transition-colors'
                        }`}
                      >
                        {spec}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="w-full md:w-64 space-y-2 relative z-10">
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
                  AI Triangulating {activeSpecialty === "All" ? "specialists" : activeSpecialty} near you...
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
            
            {filteredDoctors.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-outline-variant/30">
                <p className="text-on-surface-variant">No specialists found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.map((doc) => {
                  if (doc.isPrimary) {
                    return (
                      <div key={doc.id} className="glass-panel p-5 rounded-xl border border-outline-variant/10 hover:border-primary-container/30 transition-all hover:scale-[1.02] group md:col-span-2 block bg-white">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="relative">
                            <div className="w-full md:w-32 h-40 rounded-xl overflow-hidden border border-outline-variant/15">
                              <img alt="Doctor Profile" className="w-full h-full object-cover" src={doc.image} />
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                                    {doc.name}
                                  </h3>
                                  <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                                    {doc.role}
                                  </p>
                                </div>
                                <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                  <span className="font-label text-[10px] uppercase font-bold text-primary">
                                    AI Matching {doc.aiMatch}
                                  </span>
                                </div>
                              </div>
                              <p className="mt-4 text-sm text-on-surface-variant leading-relaxed max-w-lg">
                                {doc.desc}
                              </p>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
                              <div className="flex-1 flex gap-8">
                                <div className="flex flex-col">
                                  <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                                    Experience
                                  </span>
                                  <span className="font-body text-sm font-semibold">{doc.distance}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                                    Wait Time
                                  </span>
                                  <span className="font-body text-sm font-semibold text-tertiary">{doc.nextSlot}</span>
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
                    );
                  }

                  return (
                    <div key={doc.id} className="glass-panel p-5 rounded-xl border border-outline-variant/10 hover:border-primary-container/30 transition-all hover:scale-[1.02] group block bg-white">
                      <div className="flex gap-4">
                        <div className="relative shrink-0">
                          <div className="w-20 h-20 rounded-xl overflow-hidden border border-outline-variant/15">
                            <img alt="Doctor Profile" className="w-full h-full object-cover" src={doc.image} />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-surface-container-highest px-2 py-0.5 rounded border border-outline-variant/20 flex items-center gap-1">
                            <span className="material-symbols-outlined text-yellow-400 text-xs" data-icon="star">star</span>
                            <span className="text-[10px] font-bold text-on-surface">{doc.rating}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                            {doc.name}
                          </h3>
                          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                            {doc.role}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex flex-col">
                              <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">Distance</span>
                              <span className="font-body text-xs font-medium">{doc.distance}</span>
                            </div>
                            <div className="w-px h-6 bg-outline-variant/20"></div>
                            <div className="flex flex-col">
                              <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">Next Slot</span>
                              <span className="font-body text-xs font-medium text-primary">{doc.nextSlot}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link href="/book-call">
                        <button className="w-full mt-5 bg-primary hover:bg-primary/90 py-2.5 rounded-lg font-label text-xs uppercase tracking-[0.15em] font-bold text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95 transition-transform cursor-pointer">
                          Initialize Booking
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Contextual FAB */}
      <button className="fixed bottom-24 right-6 w-14 h-14 liquid-gradient rounded-full shadow-[0_15px_30px_rgba(0,229,255,0.3)] flex items-center justify-center z-40 active:scale-95 transition-transform cursor-pointer">
        <span className="material-symbols-outlined text-on-primary scale-125" data-icon="add_circle">
          add_circle
        </span>
      </button>

      <BottomNav />
    </div>
  );
}
