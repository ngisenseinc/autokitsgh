import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { formatGHS, formatUSD } from '@/src/lib/utils';

interface PartCardProps {
  key?: React.Key;
  id: string;
  name: string;
  priceGHS: number;
  priceUSD: number;
  imageUrl: string;
  compatibility: string;
  condition: string;
}

export function PartCard({ id, name, priceGHS, priceUSD, imageUrl, compatibility, condition }: PartCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-white rounded-full">
            {condition}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold font-display leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <Link to={`/parts/${id}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {name}
          </Link>
        </h3>
        
        <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="truncate">Fits {compatibility}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-black/10 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-primary">{formatGHS(priceGHS)}</p>
            <p className="text-sm text-text-muted">{formatUSD(priceUSD)}</p>
          </div>
          
          <Link 
            to={`/parts/${id}`}
            className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors relative z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Quick Actions overlay on hover */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20">
        <WhatsAppButton partName={name} price={priceGHS} className="w-full py-3" />
      </div>
    </motion.div>
  );
}
