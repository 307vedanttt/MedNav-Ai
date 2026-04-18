"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Technology", href: "/technology" },
    { name: "Network", href: "/doctors" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md border-b border-gray-200 transition-all duration-300">
      <nav className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-green-600 text-2xl transition-transform group-hover:rotate-6">
            clinical_notes
          </span>
          <span className="text-lg font-bold tracking-wider text-gray-900 uppercase">
            MEDINAV-AI
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-xs tracking-widest uppercase font-medium px-2 py-1 transition-all duration-300
                  ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
              >
                {link.name}

                {/* Animated underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-green-600 transition-all duration-300
                  ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Avatar */}
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 hover:scale-105 active:scale-95 transition-transform cursor-pointer">
            <img
              alt="User Profile Avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh71rjFa803vh-qnSJzwmgOEW155j9riSsSHKOyIc0W-VHp_dlQxkwBiJJfWwq64gQxVhbkSP1aFrS-pvcu-aYLi-vI8_-fCCtUT3scfzwDNt2lHu69w__LRy8z6en6GgF2oi4_bfFuAQ2nAzmaLaqSlM1fjaq0AXf72NyeclHfD1haeIzjdiUh3vc3NrHKI-vdQ-o7bSR5Ml4cnVvpgnnhnIKtEy3wuwDXMqMOxd7-gZlK6Ku-c4cfGeP0x5Gl0lzvFNBM3OmHK8"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </nav>
    </header>
  );
}
