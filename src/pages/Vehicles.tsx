import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Car, Calendar, CreditCard, Fuel } from 'lucide-react';
import { vehicleApi } from '../api/apiService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import VehicleModal from '../components/VehicleModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Vehicles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const response = await vehicleApi.getAll();
      return response.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => vehicleApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    }
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">My Vehicles</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Manage your fleet and track efficiency</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Vehicle
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : vehicles?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle: any) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="group hover:border-brand/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-brand/10 text-brand rounded-xl">
                    <Car size={24} />
                  </div>
                  <button 
                    onClick={() => handleDelete(vehicle.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Fuel size={14} className="text-brand" />
                    <span>{vehicle.fuel_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CreditCard size={14} className="text-brand" />
                    <span>{vehicle.license_plate || 'No plate'}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 card-premium">
          <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Car size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold">No vehicles registered</h3>
          <p className="text-slate-500">Start by adding your first vehicle to track its fuel usage.</p>
          <Button variant="ghost" className="mt-6" onClick={() => setIsModalOpen(true)}>Add your first vehicle</Button>
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <VehicleModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['vehicles'] });
              setIsModalOpen(false);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}