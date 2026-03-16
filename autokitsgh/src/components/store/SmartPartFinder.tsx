import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Car, Sparkles, Loader2 } from 'lucide-react';
// Removed direct GoogleGenAI usage; use server proxy for Gemini queries

const BRANDS = ['Toyota', 'Honda', 'Hyundai', 'Kia', 'Mercedes', 'BMW', 'Nissan', 'Mitsubishi', 'VW'];
const MODELS: Record<string, string[]> = {
  'Toyota': ['Corolla', 'Camry', 'Hilux', 'Land Cruiser'],
  'BMW': ['3 Series', '5 Series', 'X5', 'M4'],
  'Mercedes': ['C-Class', 'E-Class', 'G-Class', 'GLE'],
};
const YEARS = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);

export function SmartPartFinder() {
  const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('manual');
  
  // Manual State
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [engine, setEngine] = useState('');

  // AI State
  const [aiQuery, setAiQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResult, setAiResult] = useState('');

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Call server proxy
      const res = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: aiQuery,
          model: 'gemini-3-flash-preview',
        }),
      });
      const data = await res.json();
      setAiResult(data?.text || 'No matches found. Please try a different query.');
    } catch (error) {
      console.error('Error with AI search:', error);
      setAiResult('Failed to process your request. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto -mt-10 relative z-20 px-4"
    >
      <div className="glass-panel rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-black/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold">Smart Part Finder</h2>
          </div>
          
          <div className="flex bg-surface-light p-1 rounded-3xl border border-black/5">
            <button 
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === 'manual' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'
              }`}
            >
              Manual Search
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'ai' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI Matcher
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'manual' ? (
            <motion.div 
              key="manual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
            >
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-surface-light border border-black/10 rounded-full px-4 py-3.5 text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  value={brand}
                  onChange={(e) => { setBrand(e.target.value); setModel(''); }}
                >
                  <option value="">Select Brand</option>
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
              </div>

              <div className="relative">
                <select 
                  className="w-full appearance-none bg-surface-light border border-black/10 rounded-full px-4 py-3.5 text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!brand}
                >
                  <option value="">Select Model</option>
                  {brand && MODELS[brand]?.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
              </div>

              <div className="relative">
                <select 
                  className="w-full appearance-none bg-surface-light border border-black/10 rounded-full px-4 py-3.5 text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  disabled={!model}
                >
                  <option value="">Select Year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
              </div>

              <div className="relative">
                <select 
                  className="w-full appearance-none bg-surface-light border border-black/10 rounded-full px-4 py-3.5 text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  disabled={!year}
                >
                  <option value="">Select Engine</option>
                  <option value="all">All Engines</option>
                  <option value="v4">V4</option>
                  <option value="v6">V6</option>
                  <option value="v8">V8</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
              </div>

              <button className="w-full bg-primary hover:bg-primary-hover text-white font-semibold rounded-full px-4 py-3.5 flex items-center justify-center gap-2 transition-colors">
                <Search className="w-5 h-5" />
                Find Parts
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input 
                    type="text" 
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                    placeholder="Describe what you need (e.g., 'I need a front bumper for a 2018 BMW 3 Series')"
                    className="w-full bg-surface-light border border-black/10 rounded-3xl pl-12 pr-4 py-3.5 text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <button 
                  onClick={handleAiSearch}
                  disabled={isSearching || !aiQuery.trim()}
                  className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white font-semibold rounded-full px-8 py-3.5 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  {isSearching ? 'Matching...' : 'Match Part'}
                </button>
              </div>

              {aiResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-surface border border-primary/20 rounded-3xl p-4 mt-4"
                >
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> AI Recommendations
                  </h3>
                  <div className="text-sm text-text-main whitespace-pre-wrap leading-relaxed">
                    {aiResult}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
