import { motion } from 'framer-motion';
import { HeroSection } from '@/src/components/store/HeroSection';
import { SmartPartFinder } from '@/src/components/store/SmartPartFinder';
import { PartCard } from '@/src/components/store/PartCard';
import { Settings, Zap, Armchair, Wrench, CarFront, Lightbulb } from 'lucide-react';

const CATEGORIES = [
  { name: 'Body Kits & Bumpers', icon: CarFront, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Electrical', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'Interior', icon: Armchair, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Engine Parts', icon: Wrench, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Suspension', icon: Settings, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Lighting', icon: Lightbulb, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

const FEATURED_PARTS = [
  {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    name: 'Performance Front Bumper',
    priceGHS: 4500,
    priceUSD: 380,
    imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800',
    compatibility: 'BMW 3 Series G20',
    condition: 'New'
  },
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
  },
  {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0854',
    name: 'LED Headlights Upgrade',
    priceGHS: 3500,
    priceUSD: 295,
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800',
    compatibility: 'Mercedes C-Class W205',
    condition: 'New'
  }
];

export function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SmartPartFinder />

      {/* Categories Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Shop by Category</h2>
          <p className="text-text-muted max-w-2xl mx-auto">Browse our extensive collection of premium auto parts organized by category for your convenience.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.a
              key={category.name}
              href={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-4 group"
            >
              <div className={`w-16 h-16 rounded-full ${category.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className={`w-8 h-8 ${category.color}`} />
              </div>
              <h3 className="font-bold text-sm md:text-base">{category.name}</h3>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-surface/50 border-y border-black/5 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Parts</h2>
              <p className="text-text-muted max-w-2xl">Discover our most popular premium upgrades and accessories.</p>
            </div>
            <button className="px-6 py-3 border border-black/10 rounded-full hover:bg-black/5 transition-colors font-medium self-start md:self-auto">
              View All Parts
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PARTS.map((part) => (
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
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 container mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                Why Choose <br />
                <span className="text-gradient-primary">Auto Kits GH?</span>
              </h2>
              <p className="text-text-muted text-lg">
                We are Ghana's leading supplier of premium automotive aesthetics and performance parts. Quality guaranteed.
              </p>
              <ul className="space-y-4">
                {[
                  'Genuine & Premium Aftermarket Parts',
                  'Expert Fitment Advice',
                  'Nationwide Delivery (Accra, Kumasi, Takoradi)',
                  'Secure WhatsApp Ordering'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-black/10">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury Car" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="glass-panel p-4 rounded-3xl backdrop-blur-md">
                  <p className="text-2xl font-bold text-primary">10k+</p>
                  <p className="text-sm font-medium">Parts Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
