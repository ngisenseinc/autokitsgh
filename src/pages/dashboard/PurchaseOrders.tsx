import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, FileText, CheckCircle2, Clock, X, Package } from 'lucide-react';
import { formatGHS } from '@/src/lib/utils';

// Mock data for initial render
const MOCK_POS = [
  { id: 'PO-2024-001', supplier: 'BMW Munich Parts', date: '2024-03-15', status: 'pending', total: 45000, items: 12 },
  { id: 'PO-2024-002', supplier: 'KW Suspensions DE', date: '2024-03-10', status: 'received', total: 28500, items: 5 },
  { id: 'PO-2024-003', supplier: 'Mercedes OEM Parts', date: '2024-03-05', status: 'processing', total: 15200, items: 8 },
];

export function PurchaseOrders() {
  const [pos, setPos] = useState(MOCK_POS);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const filteredPOs = pos.filter(po => 
    po.id.toLowerCase().includes(search.toLowerCase()) || 
    po.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search POs by ID or supplier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-black/10 rounded-3xl pl-10 pr-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <button className="p-2.5 bg-surface border border-black/10 rounded-full hover:bg-black/5 transition-colors">
            <Filter className="w-5 h-5 text-text-muted" />
          </button>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-semibold rounded-3xl px-4 py-2.5 flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)]"
        >
          <Plus className="w-5 h-5" />
          Create PO
        </button>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border border-black/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-light border-b border-black/10 text-xs uppercase tracking-wider text-text-muted">
                <th className="p-4 font-bold">PO Details</th>
                <th className="p-4 font-bold">Supplier</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Total Amount</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredPOs.map((po, index) => (
                  <motion.tr 
                    key={po.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-black/5 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-light border border-black/10 flex items-center justify-center overflow-hidden shrink-0">
                          <FileText className="w-5 h-5 text-text-muted" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-text-main">{po.id}</p>
                          <p className="text-xs text-text-muted">{po.items} items</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-text-main">{po.supplier}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-text-muted">{po.date}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 border rounded-full text-xs font-bold flex items-center gap-1 w-fit ${getStatusColor(po.status)}`}>
                        {po.status === 'received' && <CheckCircle2 className="w-3 h-3" />}
                        {po.status === 'processing' && <Clock className="w-3 h-3" />}
                        {po.status === 'pending' && <Clock className="w-3 h-3" />}
                        {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-primary">{formatGHS(po.total)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-black/10 rounded-full text-text-muted hover:text-text-main transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredPOs.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold mb-1">No purchase orders found</h3>
            <p className="text-text-muted text-sm">Try adjusting your search or create a new PO.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface border border-black/10 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-black/10 flex items-center justify-between bg-surface-light">
                <h2 className="text-xl font-display font-bold">Create Purchase Order</h2>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto no-scrollbar flex-1">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Supplier</label>
                      <select className="w-full bg-surface-light border border-black/10 rounded-full px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                        <option>BMW Munich Parts</option>
                        <option>KW Suspensions DE</option>
                        <option>Mercedes OEM Parts</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Expected Date</label>
                      <input type="date" className="w-full bg-surface-light border border-black/10 rounded-full px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Order Items</label>
                      <button type="button" className="text-xs font-bold text-primary hover:text-primary-hover transition-colors flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add Item
                      </button>
                    </div>
                    <div className="bg-surface-light border border-black/10 rounded-3xl p-4 flex items-center gap-4">
                      <Package className="w-8 h-8 text-text-muted shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-text-main">Select parts to order...</p>
                        <p className="text-xs text-text-muted">Click "Add Item" to begin adding parts to this PO.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Notes</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-surface-light border border-black/10 rounded-3xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" 
                      placeholder="Add any special instructions or notes for the supplier..."
                    />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-black/10 bg-surface-light flex justify-end gap-4">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2.5 rounded-3xl font-bold text-text-muted hover:text-text-main hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2.5 rounded-full font-bold bg-primary hover:bg-primary-hover text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-colors">
                  Create PO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
