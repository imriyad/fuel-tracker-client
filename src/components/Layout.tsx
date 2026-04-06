import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content with top offset for fixed navbar */}
      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand rounded-md flex items-center justify-center text-white font-bold text-[10px]">F</div>
              <span className="font-bold text-slate-600 dark:text-slate-300">FuelTracker</span>
              <span className="ml-4 font-medium">&copy; 2026 Smart Fuel Tracker. All rights reserved.</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
