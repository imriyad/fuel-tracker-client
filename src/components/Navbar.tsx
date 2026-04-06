import { useState, useEffect } from 'react';
import Button from './ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 22L15 22" />
              <path d="M4 9L14 9" />
              <path d="M14 22L14 11" />
              <path d="M15 6L15 22" />
              <path d="M18 11L18 22" />
              <path d="M4 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Fuel<span className="text-brand">Tracker</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-400">
          <a href="#stations" className="hover:text-brand transition-colors">Near Me</a>
          <a href="#prices" className="hover:text-brand transition-colors">Prices</a>
          <a href="#about" className="hover:text-brand transition-colors">How it Works</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button variant="primary" size="sm" className="shadow-brand/25">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
