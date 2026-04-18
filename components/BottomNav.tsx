"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: "home_health" },
    { name: "Vitals", href: "/symptoms", icon: "ecg_heart" },
    { name: "History", href: "/insights", icon: "database_search" },
    { name: "Support", href: "/emergency", icon: "contact_support" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 backdrop-blur-2xl rounded-t-2xl border-t border-outline-variant/30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all duration-300 ease-out px-4 py-1 rounded-xl ${
              isActive 
                ? 'text-primary bg-gradient-to-br from-primary-container/80 to-secondary-container/80 scale-105' 
                : 'text-on-surface-variant opacity-70 hover:text-primary hover:opacity-100'
            }`}
          >
            <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
            <span className={`font-label text-[10px] uppercase tracking-[0.1em] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
