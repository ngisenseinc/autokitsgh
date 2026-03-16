import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function FacebookPixel() {
  const location = useLocation();

  useEffect(() => {
    const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
    if (!pixelId) return;

    // Initialize Facebook Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    // @ts-ignore
    fbq('init', pixelId);
    // @ts-ignore
    fbq('track', 'PageView');
  }, []);

  useEffect(() => {
    const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
    if (pixelId && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}
