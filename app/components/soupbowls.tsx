'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SoupBowlsProps {
  count: number;
  spacing?: number;
  isHovered?: boolean;
  hasLoaded?: boolean;
}

export default function SoupBowls({
  count,
  spacing = 20,
  isHovered = false,
  hasLoaded = false
}: SoupBowlsProps) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
	const handleResize = () => setWindowWidth(window.innerWidth);
	setWindowWidth(window.innerWidth);
	window.addEventListener('resize', handleResize);
	return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLgOrAbove = windowWidth >= 1024;
  const currentSpacing = !hasLoaded ? -10
	: isHovered ? (isLgOrAbove && count === 10 ? spacing + 5 : spacing + 20)
	: spacing;

  const renderSoupRow = (count: number, rowIndex = 0) => (
	<div 
	  className="relative flex"
	  style={{
		transitionDelay: (!isLgOrAbove && rowIndex === 1) ? '50ms' : '0ms',
		transition: 'all 200ms ease-in-out'
	  }}
	>
	  {Array.from({ length: count }).map((_, index) => (
		<div 
		  key={index}
		  className="relative transition-all duration-200 ease-in-out"
		  style={{
			marginLeft: index === 0 ? 0 : `-${40 - currentSpacing}px`,
			zIndex: rowIndex === 0 ? 20 - index : 10 - index,
		  }}
		>
		  <Image
			src="/1soup_small.gif"
			width={52}
			height={32}
			alt=""
			className="image-rendering-pixelated relative"
			unoptimized
		  />
		</div>
	  ))}
	</div>
  );

  if (isLgOrAbove || count <= 5) {
	return renderSoupRow(count);
  }

  return (
	<div className="flex flex-col gap-2">
	  <div className="flex justify-center">{renderSoupRow(5, 0)}</div>
	  <div className="flex justify-center">{renderSoupRow(5, 1)}</div>
	</div>
  );
}