'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function BurnBackground() {
  const pathname = usePathname();
  const isBurnPage = pathname === '/burn';

  if (!isBurnPage) return null;

  return (
	<div className="absolute inset-0 z-10">
	  <video
		autoPlay
		loop
		muted
		playsInline
		className="w-full h-[calc(100%-233px)] object-cover opacity-20"
	  >
		<source src="/fire_bg_clean_large.mp4" type="video/mp4" />
	  </video>
	</div>
  );
}