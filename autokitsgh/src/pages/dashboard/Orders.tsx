import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { formatGHS } from '@/src/lib/utils';

const MOCK_ORDERS = [
  { id: 'ORD-2024-001', customer: 'Kwame Mensah', phone: '+233 54 123 4567', part: 'Performance Front Bumper', qty: 1, total: 4500, status: 'pending', date: '2024-03-15T10:30:00Z', channel: 'WhatsApp' },
  { id: 'ORD-2024-002', customer: 'Ama Serwaa', phone: '+233 24 987 6543', part: 'Carbon Mirror Caps', qty: 2, total: 1700, status: 'completed', date: '2024-03-14T14:15:00Z', channel: 'Website' },
  { id: 'ORD-2024-003', customer: 'Yaw Osei', phone: '+233 20 555 1234', part: 'G20 Rear Diffuser', qty: 1, total: 1200, status: 'processing', date: '2024-03-15T09:00:00Z', channel: 'WhatsApp' },
  { id: 'ORD-2024-004', customer: 'Kofi Annan', phone: '+233 50 111 2222', part: 'LED Headlights Upgrade', qty: 1, total: 3500, status: 'cancelled', date: '2024-03-13T16:45:00Z', channel: 'WhatsApp' },
];

export function Orders() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-2.5 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> Pending</span>;
      case 'processing': return <span className="px-2.5 py-1 bg-blue-500/20 text-blue-500 border border-blue-500/30 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><ShoppingCart className="w-3 h-3" /> Processing</span>;
      case 'completed': return <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'cancelled': return <span className="px-2.5 py-1 bg-red-500/20 text-red-500 border border-red-500/30 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold">Recent Orders</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface border border-black/10 rounded-full text-sm font-medium hover:bg-black/5 transition-colors">Export CSV</button>
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_ORDERS.map((order, i) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-3xl bg-surface-light border border-black/10 flex items-center justify-center shrink-0">
                {order.channel === 'WhatsApp' ? <MessageCircle className="w-6 h-6 text-[#25D366]" /> : <ShoppingCart className="w-6 h-6 text-primary" />}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg">{order.id}</h3>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-text-muted mb-2">{new Date(order.date).toLocaleString('en-GH', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium text-text-main">{order.customer}</span>
                  <span className="text-text-muted">{order.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2 border-t border-black/10 md:border-t-0 pt-4 md:pt-0">
              <div className="text-sm text-text-muted">
                <span className="font-medium text-text-main">{order.qty}x</span> {order.part}
              </div>
              <div className="text-xl font-bold text-primary">
                {formatGHS(order.total)}
              </div>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1.5 bg-surface-light border border-black/10 rounded-full text-xs font-bold hover:bg-black/5 transition-colors">View Details</button>
                {order.status === 'pending' && (
                  <button className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold hover:bg-primary/30 transition-colors">Mark Processing</button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
