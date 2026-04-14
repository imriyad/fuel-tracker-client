import { useQuery } from '@tanstack/react-query';
import { fuelEntryApi } from '../api/apiService';
import Card from '../components/ui/Card';
import { TrendingUp, Droplets, DollarSign, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Statistics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fuelEntryApi.getStats();
      return response.data;
    }
  });

  const statCards = [
    { title: 'Total Spent', value: `$${stats?.totalSpent?.toFixed(2) || '0.00'}`, icon: <DollarSign className="text-emerald-500" />, color: 'bg-emerald-50' },
    { title: 'Total Fuel', value: `${stats?.totalLiters?.toFixed(1) || '0.0'} L`, icon: <Droplets className="text-blue-500" />, color: 'bg-blue-50' },
    { title: 'Entries', value: stats?.entryCount || '0', icon: <Activity className="text-brand" />, color: 'bg-brand/10' },
    { title: 'Avg Price', value: `$${stats?.averagePrice?.toFixed(2) || '0.00'}/L`, icon: <TrendingUp className="text-amber-500" />, color: 'bg-amber-50' },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 font-sans">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Statistics</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Your fueling habits at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="flex items-center gap-4 p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="card-premium p-8 text-center bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-none shadow-xl">
        <h3 className="text-xl font-bold mb-2">Efficiency Analysis Coming Soon</h3>
        <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
          We are building advanced charts to help you visualize fuel efficiency and cost trends over time.
        </p>
      </div>
    </div>
  );
}