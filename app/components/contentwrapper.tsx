'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const getPageColors = (pathname: string) => {
  const isBurnPage = pathname === '/burn';
  return {
	lightColor: isBurnPage ? '#472d3c' : '#564064',
	darkColor: isBurnPage ? '#302c2e' : '#39314b'
  };
};

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
	setMounted(true);
  }, []);

  if (!mounted) {
	return (
	  <div className="max-w-[1440px] mx-auto relative overflow-hidden flex flex-col flex-1">
		{children}
	  </div>
	);
  }

  return (
	<div 
	  className="max-w-[1440px] mx-auto relative overflow-hidden flex flex-col flex-1"
	  style={{ backgroundColor: getPageColors(pathname).lightColor }}
	>
	  {children}
	</div>
  );
}