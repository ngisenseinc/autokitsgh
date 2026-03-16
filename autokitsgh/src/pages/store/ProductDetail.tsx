import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle2, ArrowLeft, Share2, Heart, ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppButton } from '@/src/components/store/WhatsAppButton';
import { formatGHS, formatUSD } from '@/src/lib/utils';
import { PartCard } from '@/src/components/store/PartCard';

// Mock data for the demo
const PART = {
  id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  name: 'Performance Front Bumper',
  priceGHS: 4500,
  priceUSD: 380,
  imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800',
  compatibility: 'BMW 3 Series G20',
  condition: 'New (Unused)',
  oemNumber: 'BM-5111-G20-P',
  warranty: '12 Months Ltd',
  brand: 'M-Performance',
  description: "Elevate your BMW G20's aesthetics with our high-grade M-Performance style front bumper. Manufactured from premium ABS plastic for durability and precise fitment. Features integrated air ducts and carbon-fiber finish accents.",
};

const RELATED_PARTS = [
  {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0852',
    name: 'Carbon Mirror Caps',
    priceGHS: 850,
    priceUSD: 72,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
    compatibility: 'BMW 3 Series G20',
    condition: 'New'
  },
  {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0853',
    name: 'G20 Rear Diffuser',
    priceGHS: 1200,
    priceUSD: 100,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
    compatibility: 'BMW 3 Series G20',
    condition: 'New'
  }
];

export function ProductDetail() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </Link>
          <div className="flex gap-3">
            <button className="p-2 glass-card rounded-full hover:text-primary transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 glass-card rounded-full transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
            >
              <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel border-black/10 p-2">
              <div className="absolute top-6 left-6 z-10 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Premium Grade
              </div>
              <img 
                src={PART.imageUrl} 
                alt={PART.name}
                className="w-full h-full object-cover rounded-3xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <button key={i} className="aspect-square rounded-full overflow-hidden glass-card border-black/10 opacity-60 hover:opacity-100 transition-opacity">
                  <img src={PART.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-md text-xs font-bold uppercase tracking-wider">
                  Genuine {PART.brand}
                </span>
                <span className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> In Stock
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
                {PART.name}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">{formatGHS(PART.priceGHS)}</span>
                <span className="text-xl text-text-muted">{formatUSD(PART.priceUSD)}</span>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 mb-8 space-y-6">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-text-muted uppercase font-bold tracking-wider mb-1">Condition</p>
                  <p className="font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" /> {PART.condition}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase font-bold tracking-wider mb-1">OEM Number</p>
                  <p className="font-semibold text-accent">{PART.oemNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase font-bold tracking-wider mb-1">Compatibility</p>
                  <p className="font-semibold">{PART.compatibility}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase font-bold tracking-wider mb-1">Warranty</p>
                  <p className="font-semibold">{PART.warranty}</p>
                </div>
              </div>

              <div className="border-t border-black/10 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Product Description</h3>
                <p className="text-text-muted leading-relaxed">
                  {PART.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              <button className="w-full flex items-center justify-center gap-2 bg-surface-light hover:bg-black/10 border border-black/10 text-text-main font-bold py-4 rounded-full transition-all">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <WhatsAppButton partName={PART.name} price={PART.priceGHS} className="py-4 text-lg" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Nationwide Delivery</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Secure Payment</span>
            </div>
          </motion.div>
        </div>

        {/* Related Parts */}
        <section className="border-t border-black/10 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold">Related Performance Parts</h2>
            <Link to="/category/performance" className="text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_PARTS.map((part) => (
              <PartCard 
                key={part.id} 
                id={part.id}
                name={part.name}
                priceGHS={part.priceGHS}
                priceUSD={part.priceUSD}
                imageUrl={part.imageUrl}
                compatibility={part.compatibility}
                condition={part.condition}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
