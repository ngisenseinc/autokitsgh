import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, ShoppingCart, DollarSign, AlertTriangle } from 'lucide-react';
import { formatGHS } from '@/src/lib/utils';

const REVENUE_DATA = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const CATEGORY_DATA = [
  { name: 'Body Kits', value: 400 },
  { name: 'Performance', value: 300 },
  { name: 'Lighting', value: 300 },
  { name: 'Interior', value: 200 },
];

const COLORS = ['#FF4D00', '#FFD700', '#10B981', '#3B82F6'];

function CountUp({ end, prefix = '', suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeProgress));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function Overview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: 124500, prefix: '₵', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { title: 'Parts Sold', value: 842, icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
          { title: 'Active Orders', value: 56, icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { title: 'Low Stock Alerts', value: 12, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-3xl ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className="flex items-center gap-1 text-emerald-500 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded-md">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <h3 className="text-text-muted font-medium mb-1">{kpi.title}</h3>
            <p className="text-3xl font-display font-bold">
              <CountUp end={kpi.value} prefix={kpi.prefix} />
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-3xl lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-lg">Revenue Overview</h3>
            <select className="bg-surface-light border border-black/10 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:border-primary">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tickFormatter={(val) => `₵${val/1000}k`} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#FF4D00' }}
                />
                <Bar dataKey="revenue" fill="#FF4D00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 rounded-3xl"
        >
          <h3 className="font-display font-bold text-lg mb-6">Sales by Category</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#ffffff10', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="text-2xl font-bold font-display">1.2k</span>
              <span className="text-xs text-text-muted">Total Sales</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {CATEGORY_DATA.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-text-muted">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
