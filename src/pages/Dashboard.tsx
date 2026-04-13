import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Search, SlidersHorizontal, Map as MapIcon, Zap, Droplets, Info, Plus } from 'lucide-react';
import FuelStationCard from '../components/FuelStationCard';
import StationModal from '../components/StationModal';
import StationDetailsModal from '../components/StationDetailsModal';
import Button from '../components/ui/Button';
import { stationApi } from '../api/apiService';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const { isAdmin, isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  // Queries
  const { data: stations, isLoading, error } = useQuery({
    queryKey: ['stations', searchTerm],
    queryFn: async () => {
      const response = await stationApi.getAll({ search: searchTerm });
      return response.data;
    }
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: (id: number) => stationApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    }
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this station?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (station: any) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  const handleViewDetails = (station: any) => {
    setSelectedStation(station);
    setIsDetailsOpen(true);
  };

  const handleAdd = () => {
    setSelectedStation(null);
    setIsModalOpen(true);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-16"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="text-center space-y-8 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider animate-pulse">
           <Zap size={14} />
           Live Availability Tracker
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1]">
          Find Fuel & Power<br />
          <span className="text-brand">Without the Guesswork</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Monitor real-time fuel levels, compare prices at nearby stations, and optimize your journey.
        </p>

        {isAuthenticated ? (
          <div className="max-w-3xl mx-auto mt-6 rounded-3xl border border-slate-200/80 bg-slate-50 p-5 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <p className="text-sm font-semibold">Welcome back, {user?.name}! Your account is active.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">You can now access saved features and receive customer-only updates.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto mt-6 rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <p className="text-sm font-semibold">You are currently browsing as a guest.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to save favorites, track your fuel history, and unlock premium features.</p>
          </div>
        )}

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass p-2 rounded-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-grow flex items-center px-4 gap-3 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <Search className="text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search city, zipcode, or station..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 text-sm font-medium bg-transparent border-none focus:outline-none text-slate-700 dark:text-slate-200"
              />
            </div>
            <div className="flex items-center gap-2">
               <button className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <SlidersHorizontal size={20} />
               </button>
               <Button 
                className="px-8 h-full rounded-xl"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['stations'] })}
               >
                 Refresh
               </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Grid */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 space-y-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Featured Stations</h2>
              <p className="text-slate-400 text-sm">Showing live status from the database</p>
            </div>
            {isAdmin && (
              <Button size="sm" className="gap-2" onClick={handleAdd}>
                <Plus size={18} />
                Add Station
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : error ? (
            <div className="p-12 text-center card-premium border-rose-100">
              <p className="text-rose-500 font-bold">Failed to load stations. Make sure the backend is running.</p>
              <Button variant="ghost" onClick={() => queryClient.invalidateQueries({ queryKey: ['stations'] })} className="mt-4">Retry</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {stations?.length > 0 ? (
                stations.map((station: any) => (
                  <FuelStationCard 
                    key={station.id} 
                    {...station} 
                    isAdmin={isAdmin}
                    address={station.location}
                    onEdit={() => handleEdit(station)}
                    onDelete={() => handleDelete(station.id)}
                    onViewDetails={() => handleViewDetails(station)}
                  />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 p-12 text-center card-premium">
                  <p className="text-slate-400">No stations found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-12 space-y-6">
           <div className="card-premium h-80 p-6 flex flex-col justify-between border-2">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] bg-emerald-50 text-emerald-600">
                    Premium
                  </div>
                  <MapIcon size={26} className="text-slate-400" />
                </div>

                <h3 className="text-xl font-semibold mb-2">Live Map Integration</h3>
                <p className="text-sm text-slate-500 mb-5">Real-time GPS tracking is coming soon for premium members.</p>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span>Track your route live on a map.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span>Discover nearby stations and ETAs.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span>Get live fuel availability updates.</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Coming soon</span>
                <Button size="sm" variant="ghost" className="text-slate-700 dark:text-slate-200">
                  Notify me
                </Button>
              </div>
           </div>

           <div className="card-premium p-6">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-emerald-500">
                 <Droplets size={18} />
                 Market Insights
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Network Status</span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-black uppercase">Active</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Total Stations</span>
                    <span className="font-bold">{stations?.length || 0}</span>
                 </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mt-6 flex gap-3 items-start">
                 <Info size={16} className="text-brand shrink-0 mt-0.5" />
                 <p className="text-[10px] text-slate-400 leading-relaxed">
                   Station availability is crowd-sourced and updated every 15 minutes.
                 </p>
              </div>
           </div>
        </div>
      </motion.section>

      {/* Modal Integration */}
      <AnimatePresence>
        {isModalOpen && (
          <StationModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={() => queryClient.invalidateQueries({ queryKey: ['stations'] })}
            station={selectedStation}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDetailsOpen && (
          <StationDetailsModal 
            isOpen={isDetailsOpen} 
            onClose={() => setIsDetailsOpen(false)} 
            station={selectedStation}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
