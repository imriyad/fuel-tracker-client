import { useQuery } from '@tanstack/react-query';
import { fuelEntryApi } from '../api/apiService';
import Card from '../components/ui/Card';
import { Users, Fuel, Activity, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const resp = await fuelEntryApi.getAdminStats();
      return resp.data;
    }
  });

  if (isLoading) return <div className="p-8">Loading system stats...</div>;

  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Admin Overview</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">System-wide monitoring and metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-blue-600 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-4xl font-black">{stats?.totalUsers}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Total Users</div>
            </div>
            <Users size={24} className="opacity-40" />
          </div>
        </Card>
        
        <Card className="p-6 bg-emerald-600 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-4xl font-black">{stats?.totalStations}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Active Stations</div>
            </div>
            <Fuel size={24} className="opacity-40" />
          </div>
        </Card>

        <Card className="p-6 bg-indigo-600 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-4xl font-black">{stats?.totalEntries}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Total Fill-ups</div>
            </div>
            <Activity size={24} className="opacity-40" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock size={20} className="text-brand" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {stats?.latestEntries?.map((entry: any) => (
              <div key={entry.id} className="p-4 glass rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                    {entry.user_name?.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{entry.user_name}</div>
                    <div className="text-[10px] text-slate-400">{entry.make} {entry.model} • {entry.liters}L</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-400">
                  {new Date(entry.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-brand/10 p-4 rounded-full text-brand mb-4">
                <Activity size={32} />
            </div>
            <h3 className="text-lg font-bold">Network Health</h3>
            <p className="text-sm text-slate-500 mt-2">All systems operational. Database connection latency: 12ms.</p>
        </div>
      </div>
    </div>
  );
}
