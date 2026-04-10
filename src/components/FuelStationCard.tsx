import { MapPin, Fuel, Navigation2, Edit3, Trash2 } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface StationProps {
  id: number;
  name: string;
  availability: 'In Stock' | 'Low' | 'Out';
  distance: string;
  price: number;
  address?: string;
  map_url?: string;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: () => void;
}

export default function FuelStationCard({ name, availability, distance, price, address, map_url, isAdmin, onEdit, onDelete, onViewDetails }: StationProps) {
  const statusConfig = {
    'In Stock': { color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20', label: 'In Stock' },
    'Low': { color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20', label: 'Low Stock' },
    'Out': { color: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20', label: 'Out of Stock' },
  };

  const { color, label } = statusConfig[availability as keyof typeof statusConfig] || statusConfig['In Stock'];

  return (
    <Card className="group overflow-hidden border-2 border-transparent hover:border-brand/30 hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-start mb-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">{name}</h3>
          <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-brand transition-colors">
            <MapPin size={14} className="group-hover:animate-bounce" />
            <span className="text-xs font-semibold tracking-wide uppercase">{distance || '0.5'} km away</span>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${color}`}>
          {label}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl flex-1 border border-slate-100 dark:border-slate-800 transition-colors group-hover:border-brand/20">
          <div className="flex items-center gap-2 mb-1">
             <Fuel size={16} className="text-brand" />
             <span className="text-xs font-medium text-slate-500">Petrol Price</span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            <span className="text-sm font-medium text-slate-400 align-top mr-1 font-sans">$</span>
            {Number(price).toFixed(2)}
            <span className="text-xs font-medium text-slate-400 ml-1">/L</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {address && (
          <div className="flex items-start gap-2 text-sm text-slate-500 leading-relaxed h-10 overflow-hidden line-clamp-2">
            <MapPin size={16} className="text-slate-300 flex-shrink-0 mt-0.5" />
            <span>{address}</span>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {isAdmin ? (
            <>
              <Button variant="ghost" size="sm" className="gap-2 border border-slate-100 dark:border-slate-800" onClick={onEdit}>
                <Edit3 size={14} />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-slate-100 dark:border-slate-800" onClick={onDelete}>
                <Trash2 size={14} />
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" size="sm" className="hidden sm:inline-flex gap-2" onClick={onViewDetails}>
                Details
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                className="gap-2 group/btn"
                onClick={() => {
                  if (map_url) {
                    window.open(map_url, '_blank');
                  } else {
                    // Fallback to searching the address on Google Maps
                    const query = encodeURIComponent(`${name} ${address || ''}`);
                    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                  }
                }}
              >
                Directions
                <Navigation2 size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
