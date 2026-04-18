import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-outline-variant/30">
      <nav className="flex justify-between items-center px-6 py-4 w-full">
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-container text-2xl" data-icon="clinical_notes">clinical_notes</span>
          <span className="text-xl font-bold tracking-[0.1em] text-primary uppercase font-headline">MEDINAV-AI</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link className="text-primary-container font-label text-xs tracking-widest uppercase hover:bg-primary/10 px-3 py-1 transition-colors" href="/">Home</Link>
          <Link className="text-on-surface-variant font-label text-xs tracking-widest uppercase hover:bg-primary/10 px-3 py-1 transition-colors" href="/technology">Technology</Link>
          <Link className="text-on-surface-variant font-label text-xs tracking-widest uppercase hover:bg-primary/10 px-3 py-1 transition-colors" href="/doctors">Network</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-outline-variant/30 overflow-hidden scale-95 active:scale-90 transition-transform cursor-pointer">
            <img alt="User Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh71rjFa803vh-qnSJzwmgOEW155j9riSsSHKOyIc0W-VHp_dlQxkwBiJJfWwq64gQxVhbkSP1aFrS-pvcu-aYLi-vI8_-fCCtUT3scfzwDNt2lHu69w__LRy8z6en6GgF2oi4_bfFuAQ2nAzmaLaqSlM1fjaq0AXf72NyeclHfD1haeIzjdiUh3vc3NrHKI-vdQ-o7bSR5Ml4cnVvpgnnhnIKtEy3wuwDXMqMOxd7-gZlK6Ku-c4cfGeP0x5Gl0lzvFNBM3OmHK8" />
          </div>
        </div>
      </nav>
    </header>
  );
}
