import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  partName: string;
  price: number;
  className?: string;
  variant?: 'solid' | 'outline';
}

export function WhatsAppButton({ partName, price, className = '', variant = 'solid' }: WhatsAppButtonProps) {
  // Move phone number to environment variable for easier configuration
  // Expect VITE_WHATSAPP_NUMBER to be provided in the client build environment
  const phoneNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '2335400000'; // Fallback example Ghana number
  const message = `Hi Auto Kits GH! I'm interested in:\n\n*${partName}* | GHS ${price}\n\nMy car: [Brand] [Model] [Year]\n\nPlease confirm availability. 🙏`;
  const encodedMessage = encodeURIComponent(message);
  const waLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const baseClasses = "flex items-center justify-center gap-2 font-bold rounded-3xl transition-all duration-300";
  const variants = {
    solid: "bg-[#25D366] hover:bg-[#1EBE5D] text-text-main shadow-lg shadow-[#25D366]/20 hover:-translate-y-1",
    outline: "border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
  };

  return (
    <a 
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Order via WhatsApp
    </a>
  );
}
