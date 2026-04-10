import { X, MapPin, Fuel, DollarSign, Navigation2, Clock, Info, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';

interface StationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: any;
}

export default function StationDetailsModal({ isOpen, onClose, station }: StationDetailsModalProps) {
  if (!isOpen || !station) return null;

  const statusConfig = {
    'In Stock': { color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100', label: 'Fully Stocked' },
    'Low': { color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-100', label: 'Low Inventory' },
    'Out': { color: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-100', label: 'Out of Stock' },
  };

  const { color, label } = statusConfig[station.availability as keyof typeof statusConfig] || statusConfig['In Stock'];

  const handleDirections = () => {
    if (station.map_url) {
      window.open(station.map_url, '_blank');
    } else {
      const query = encodeURIComponent(`${station.name} ${station.location || ''}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="card-premium w-full max-w-2xl shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900 animate-scale-up">
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand via-indigo-500 to-brand"></div>
        
        <div className="flex justify-between items-start p-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${color}`}>
                {label}
              </span>
              {station.price < 1.4 && (
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-wider">
                  Best Price
                </span>
              )}
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{station.name}</h2>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
               <MapPin size={18} className="text-brand" />
               <span className="text-sm font-medium">{station.location}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
            <X size={24} />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-8">
          {/* Main Info Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3 text-brand">
                   <Fuel size={18} />
                   <span className="text-xs font-bold uppercase tracking-wider">Fuel Type</span>
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white capitalize">{station.fuel_type}</div>
             </div>
             
             <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3 text-brand">
                   <DollarSign size={18} />
                   <span className="text-xs font-bold uppercase tracking-wider">Price/Litre</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">${Number(station.price).toFixed(2)}</div>
             </div>

             <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3 text-brand">
                   <Clock size={18} />
                   <span className="text-xs font-bold uppercase tracking-wider">Last Updated</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {new Date(station.updated_at || station.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Today
                </div>
             </div>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Info size={16} />
                Station Information
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Verified Station</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-200">System verified provider</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brand/5 border border-brand/10 p-4 rounded-2xl">
                   <p className="text-xs text-brand/80 leading-relaxed font-medium">
                     Fuel availability is reported in real-time. Prices may fluctuate slightly based on market conditions at the time of arrival.
                   </p>
                </div>
             </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
             <Button variant="primary" className="flex-1 h-14 text-lg gap-2" onClick={handleDirections}>
                <Navigation2 size={20} />
                Get Real-time Directions
             </Button>
             <Button variant="ghost" className="sm:w-32 h-14" onClick={onClose}>
                Close
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
