import React, { useState, useEffect } from 'react';
import { X, Droplets, Calendar, Car, MapPin, DollarSign } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import { fuelEntryApi, vehicleApi, stationApi } from '../api/apiService';
import { useQuery } from '@tanstack/react-query';

interface FuelEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FuelEntryModal({ isOpen, onClose, onSuccess }: FuelEntryModalProps) {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    station_id: '',
    entry_date: new Date().toISOString().split('T')[0],
    liters: '',
    price_per_liter: '',
    odometer: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const resp = await vehicleApi.getAll();
      return resp.data;
    },
    enabled: isOpen
  });

  const { data: stations } = useQuery({
    queryKey: ['stations'],
    queryFn: async () => {
      const resp = await stationApi.getAll();
      return resp.data;
    },
    enabled: isOpen
  });

  useEffect(() => {
    if (vehicles?.length > 0 && !formData.vehicle_id) {
      setFormData(prev => ({ ...prev, vehicle_id: vehicles[0].id.toString() }));
    }
  }, [vehicles]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fuelEntryApi.create({
        ...formData,
        vehicle_id: parseInt(formData.vehicle_id),
        station_id: formData.station_id ? parseInt(formData.station_id) : null,
        liters: parseFloat(formData.liters),
        price_per_liter: parseFloat(formData.price_per_liter),
        odometer: formData.odometer ? parseInt(formData.odometer) : null
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save fuel entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="card-premium w-full max-w-lg shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
             <Droplets className="text-brand" size={24} />
             Add Fuel Entry
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Vehicle</label>
            <select
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
              value={formData.vehicle_id}
              onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
              required
            >
              <option value="">Select a vehicle</option>
              {vehicles?.map((v: any) => (
                <option key={v.id} value={v.id}>{v.year} {v.make} {v.model}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Station (Optional)</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
                value={formData.station_id}
                onChange={(e) => setFormData({ ...formData, station_id: e.target.value })}
              >
                <option value="">Select station</option>
                {stations?.map((s: any) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <Input
              label="Date"
              type="date"
              value={formData.entry_date}
              onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
              icon={<Calendar size={16} />}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Liters"
              type="number"
              step="0.01"
              value={formData.liters}
              onChange={(e) => setFormData({ ...formData, liters: e.target.value })}
              placeholder="e.g. 45.5"
              required
            />
            <Input
              label="Price per Liter"
              type="number"
              step="0.01"
              value={formData.price_per_liter}
              onChange={(e) => setFormData({ ...formData, price_per_liter: e.target.value })}
              icon={<DollarSign size={16} />}
              required
            />
          </div>

          <Input
            label="Odometer Reading (km)"
            type="number"
            value={formData.odometer}
            onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
            placeholder="e.g. 125400"
          />

          <div className="flex gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
             <Button variant="ghost" className="flex-1" onClick={onClose} type="button">Cancel</Button>
             <Button className="flex-1" isLoading={loading}>Save Entry</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
