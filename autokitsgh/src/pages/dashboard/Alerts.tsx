import { motion } from 'framer-motion';
import { AlertTriangle, Package, ArrowRight } from 'lucide-react';

const ALERTS = [
  { id: 1, type: 'critical', message: 'Sport Suspension Kit is out of stock.', part: 'KW-V3-G20', time: '2 hours ago' },
  { id: 2, type: 'low', message: 'G20 Rear Diffuser is running low (2 units left).', part: 'BM-5112-G20-D', time: '5 hours ago' },
  { id: 3, type: 'low', message: 'Carbon Mirror Caps is running low (5 units left).', part: 'BM-5116-G20-C', time: '1 day ago' },
];

export function Alerts() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Inventory Alerts
        </h2>
        <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-bold border border-red-500/30">
          {ALERTS.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {ALERTS.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel p-6 rounded-3xl border-l-4 flex items-start gap-4 ${
              alert.type === 'critical' ? 'border-l-red-500 bg-red-500/5' : 'border-l-yellow-500 bg-yellow-500/5'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              alert.type === 'critical' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
            }`}>
              <Package className="w-5 h-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-lg">{alert.message}</h3>
                <span className="text-xs text-text-muted">{alert.time}</span>
              </div>
              <p className="text-sm text-text-muted mb-4">OEM: {alert.part}</p>
              
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-surface-light border border-black/10 rounded-full text-sm font-bold hover:bg-black/5 transition-colors flex items-center gap-2">
                  View in Inventory <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-bold hover:bg-primary/30 transition-colors">
                  Create Purchase Order
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
