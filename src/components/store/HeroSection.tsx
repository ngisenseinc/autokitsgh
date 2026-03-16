import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Premium Auto Parts in Ghana
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
            Find the <br />
            <span className="text-gradient-primary">Perfect Part</span> <br />
            For Your Ride
          </h1>
          
          <p className="text-lg text-text-muted max-w-xl leading-relaxed">
            Upgrade your vehicle with our premium selection of spec bumpers, grilles, body kits, and performance parts. Delivered across Accra, Kumasi, and Takoradi.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group relative px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full transition-all duration-300 overflow-hidden flex items-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-2">
                Find My Parts <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
            <button className="px-8 py-4 glass-card text-text-main font-semibold rounded-full flex items-center gap-2 group">
              Explore Catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
          <motion.img
            src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200"
            alt="Premium Car"
            className="w-full h-full object-cover rounded-3xl shadow-2xl border border-black/10 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            referrerPolicy="no-referrer"
          />
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute top-10 -left-10 glass-panel p-4 rounded-3xl flex items-center gap-4"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <p className="text-sm font-bold">12 Months</p>
              <p className="text-xs text-text-muted">Warranty</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-32 -right-10 glass-panel p-4 rounded-3xl flex items-center gap-4"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <p className="text-sm font-bold">Fast Delivery</p>
              <p className="text-xs text-text-muted">Nationwide</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
