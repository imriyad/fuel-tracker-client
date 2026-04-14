import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';

  export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const { user, logout, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'
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
          <Link to="/" className="hover:text-brand transition-colors">Stations</Link>
          {isAuthenticated && (
            <>
              <Link to="/vehicles" className="hover:text-brand transition-colors">Vehicles</Link>
              <Link to="/fuel-entries" className="hover:text-brand transition-colors">Fuel History</Link>
              <Link to="/statistics" className="hover:text-brand transition-colors">Stats</Link>
              {isAdmin && (
                <Link to="/admin" className="px-3 py-1 bg-brand/10 text-brand rounded-lg hover:bg-brand hover:text-white transition-all text-xs">Admin</Link>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                <UserIcon size={14} className="text-brand" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{user?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="gap-2"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <>
              <Link 
                to="/login"
                className="hidden sm:inline-flex items-center justify-center font-semibold rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 px-6 py-2.5 text-sm transition-all duration-200"
              >
                Sign In
              </Link>
              <Link 
                to="/register"
                className="inline-flex items-center justify-center font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 px-6 py-2.5 text-sm transition-all duration-200 hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
