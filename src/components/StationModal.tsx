import React, { useState, useEffect } from 'react';
import { X, MapPin, Fuel, DollarSign } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import { stationApi } from '../api/apiService';

interface StationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  station?: any; // If present, we are editing
}

export default function StationModal({ isOpen, onClose, onSuccess, station }: StationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    fuel_type: 'Petrol',
    price: '',
    availability: 'In Stock'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (station) {
      setFormData({
        name: station.name,
        location: station.location,
        fuel_type: station.fuel_type,
        price: station.price.toString(),
        availability: station.availability
      });
    } else {
      setFormData({
        name: '',
        location: '',
        fuel_type: 'Petrol',
        price: '',
        availability: 'In Stock'
      });
    }
  }, [station, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (station) {
        await stationApi.update(station.id, formData);
      } else {
        await stationApi.create(formData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save station');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="card-premium w-full max-w-lg shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
             <Fuel className="text-brand" size={24} />
             {station ? 'Edit Fuel Station' : 'Add New Station'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
          
          <Input
            label="Station Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Shell Express"
            required
          />

          <Input
            label="Full Address"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="123 Street Ave, City, ST"
            icon={<MapPin size={16} />}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fuel Type</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
                value={formData.fuel_type}
                onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Biofuel</option>
              </select>
            </div>
            <Input
              label="Price per Litre"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              icon={<DollarSign size={16} />}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability Status</label>
            <div className="flex gap-4">
              {['In Stock', 'Low', 'Out'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, availability: status as any })}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                    formData.availability === status
                      ? 'bg-brand text-white border-brand'
                      : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:border-brand/40'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
             <Button variant="ghost" className="flex-1" onClick={onClose} type="button">Cancel</Button>
             <Button className="flex-1" isLoading={loading}>{station ? 'Update Station' : 'Create Station'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
