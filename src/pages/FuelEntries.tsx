import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Droplets, Calendar, Car, MapPin, DollarSign } from 'lucide-react';
import { fuelEntryApi } from '../api/apiService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import FuelEntryModal from '../components/FuelEntryModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function FuelEntries() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: entries, isLoading } = useQuery({
    queryKey: ['fuel-entries'],
    queryFn: async () => {
      const response = await fuelEntryApi.getAll();
      return response.data;
    }
  });

  return (
    <div className="space-y-8 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Fuel History</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Keep track of every drop and every dollar</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Entry
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : entries?.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry: any) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:border-brand/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                    <Droplets size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">${parseFloat(entry.total_cost).toFixed(2)}</span>
                      <span className="text-slate-400 text-sm">•</span>
                      <span className="text-slate-500 text-sm">{entry.liters} Liters</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(entry.entry_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 font-medium text-slate-500">
                        <Car size={12} />
                        {entry.make} {entry.model}
                      </div>
                      {entry.station_name && (
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {entry.station_name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {entry.odometer ? `${entry.odometer.toLocaleString()} km` : 'No odometer'}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Odometer Reading</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 card-premium">
          <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Droplets size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold">No fuel entries yet</h3>
          <p className="text-slate-500">Add your first fuel entry to start tracking your consumption.</p>
          <Button variant="ghost" className="mt-6" onClick={() => setIsModalOpen(true)}>Add fuel entry</Button>
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <FuelEntryModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['fuel-entries'] });
              setIsModalOpen(false);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}