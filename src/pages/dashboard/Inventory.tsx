import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, AlertCircle, CheckCircle2, X, Package, Loader2 } from 'lucide-react';
import { formatGHS } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';
import { GoogleGenAI } from '@google/genai';

// Mock data for initial render
const MOCK_INVENTORY = [
  { id: '1', name: 'Performance Front Bumper', oem: 'BM-5111-G20-P', brand: 'M-Performance', category: 'Body Kits', stock: 12, price: 4500, status: 'good' },
  { id: '2', name: 'Carbon Mirror Caps', oem: 'BM-5116-G20-C', brand: 'M-Performance', category: 'Body Kits', stock: 5, price: 850, status: 'low' },
  { id: '3', name: 'G20 Rear Diffuser', oem: 'BM-5112-G20-D', brand: 'M-Performance', category: 'Body Kits', stock: 2, price: 1200, status: 'critical' },
  { id: '4', name: 'LED Headlights Upgrade', oem: 'MB-W205-LED', brand: 'Mercedes OEM', category: 'Lighting', stock: 8, price: 3500, status: 'good' },
  { id: '5', name: 'Sport Suspension Kit', oem: 'KW-V3-G20', brand: 'KW Suspensions', category: 'Suspension', stock: 0, price: 8500, status: 'critical' },
];

export function Inventory() {
  const [parts, setParts] = useState(MOCK_INVENTORY);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // AI Generator State
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a premium, engaging product description for an auto spare part based on these details: ${aiPrompt}. 
        The tone should be luxurious, professional, and appealing to car enthusiasts. Keep it under 150 words.`,
      });
      
      setGeneratedDescription(response.text || '');
    } catch (error) {
      console.error('Error generating description:', error);
      setGeneratedDescription('Failed to generate description. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // In a real app, fetch from Supabase
  // useEffect(() => {
  //   const fetchParts = async () => {
  //     const { data, error } = await supabase.from('parts').select('*');
  //     if (data) setParts(data);
  //   };
  //   fetchParts();
  // }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
      case 'low': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'critical': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const filteredParts = parts.filter(part => 
    part.name.toLowerCase().includes(search.toLowerCase()) || 
    part.oem.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search parts by name or OEM..."
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
          Add New Part
        </button>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-black/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-light border-b border-black/10 text-xs uppercase tracking-wider text-text-muted">
                <th className="p-4 font-bold">Part Details</th>
                <th className="p-4 font-bold">OEM / Brand</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Stock</th>
                <th className="p-4 font-bold">Price</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredParts.map((part, index) => (
                  <motion.tr 
                    key={part.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-black/5 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-light border border-black/10 flex items-center justify-center overflow-hidden shrink-0">
                          <Package className="w-5 h-5 text-text-muted" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-text-main">{part.name}</p>
                          <p className="text-xs text-text-muted">ID: {part.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-accent">{part.oem}</p>
                      <p className="text-xs text-text-muted">{part.brand}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-surface-light border border-black/10 rounded-md text-xs font-medium text-text-muted">
                        {part.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 border rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(part.status)}`}>
                          {part.status === 'good' && <CheckCircle2 className="w-3 h-3" />}
                          {part.status === 'low' && <AlertCircle className="w-3 h-3" />}
                          {part.status === 'critical' && <AlertCircle className="w-3 h-3" />}
                          {part.stock} units
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-primary">{formatGHS(part.price)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-black/10 rounded-full text-text-muted hover:text-text-main transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-500/20 rounded-full text-text-muted hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredParts.length === 0 && (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold mb-1">No parts found</h3>
            <p className="text-text-muted text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Add New Part Modal */}
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
                <h2 className="text-xl font-display font-bold">Add New Part</h2>
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
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Part Name</label>
                      <input type="text" className="w-full bg-surface-light border border-black/10 rounded-full px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. M-Performance Bumper" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">OEM Number</label>
                      <input type="text" className="w-full bg-surface-light border border-black/10 rounded-full px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. BM-5111-G20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Category</label>
                      <select className="w-full bg-surface-light border border-black/10 rounded-full px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                        <option>Body Kits & Bumpers</option>
                        <option>Lighting</option>
                        <option>Performance</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Brand</label>
                      <input type="text" className="w-full bg-surface-light border border-black/10 rounded-full px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. BMW" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Price (GHS)</label>
                      <input type="number" className="w-full bg-surface-light border border-black/10 rounded-full px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Initial Stock</label>
                      <input type="number" className="w-full bg-surface-light border border-black/10 rounded-full px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="0" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-muted uppercase tracking-wider">AI Description Generator</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          className="w-full bg-surface-light border border-black/10 rounded-3xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[100px]" 
                          placeholder="Enter basic details (e.g., 'Carbon fiber mirror caps for BMW G20, easy install, aggressive look') and let AI generate a premium description..."
                        />
                        <button 
                          type="button" 
                          onClick={handleGenerateDescription}
                          disabled={isGenerating || !aiPrompt.trim()}
                          className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-4 flex flex-col items-center justify-center gap-2 transition-colors shrink-0 w-24"
                        >
                          {isGenerating ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <span className="text-2xl">✨</span>
                          )}
                          <span className="text-xs font-bold">{isGenerating ? 'Generating' : 'Generate'}</span>
                        </button>
                      </div>
                    </div>

                    {generatedDescription && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                          <span>✨</span> Generated Description
                        </label>
                        <textarea 
                          value={generatedDescription}
                          onChange={(e) => setGeneratedDescription(e.target.value)}
                          className="w-full bg-surface border border-primary/30 rounded-3xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[150px]" 
                        />
                      </motion.div>
                    )}
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
                  Save Part
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
