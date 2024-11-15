'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getPageColors } from './ContentWrapper';

const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function PixelatedCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const pathname = usePathname();
  const { lightColor, darkColor } = getPageColors(pathname);
  
  useEffect(() => {
	progressRef.current = 0;
	
	const canvas = canvasRef.current;
	if (!canvas) return;
	const ctx = canvas.getContext('2d', { 
	  antialias: false,
	  alpha: false
	}) as CanvasRenderingContext2D;
	if (!ctx) return;
	ctx.imageSmoothingEnabled = false;
	canvas.width = 16 * 15;
	canvas.height = 8 * 15;
	
	const animate = () => {
	  ctx.fillStyle = lightColor;
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	  ctx.fillStyle = darkColor;
	  for(let x = 0; x < canvas.width; x++) {
		const curveY = Math.floor(canvas.height * (1 - Math.sin((x / canvas.width) * Math.PI) * 0.5));
		const easedProgress = easeInOutCubic(progressRef.current);
		const currentY = canvas.height - ((canvas.height - curveY) * easedProgress);
		ctx.fillRect(x, 0, 1, currentY);
	  }
	  if (progressRef.current < 1) {
		progressRef.current += 0.01;
		requestAnimationFrame(animate);
	  }
	};
	requestAnimationFrame(animate);
  }, [lightColor, darkColor]);
  
  return (
	<div className="curve-bg-in w-full bg-[#302c2e]">
	  <div className="absolute left-1/2 -translate-x-1/2 w-[1440px]">
		<div 
		  className="absolute top-0 left-0 w-full"
		  style={{ 
			height: '350px',
			backgroundColor: darkColor
		  }}
		/>
		<canvas
		  ref={canvasRef}
		  className="curve-anim-in absolute top-0 left-0 w-full image-rendering-pixelated"
		  style={{
			top: '50px',
			height: '300px',
			imageRendering: 'pixelated',
			imageRendering: '-moz-crisp-edges',
			imageRendering: 'crisp-edges',
		  }}
		/>
	  </div>
	</div>
  );
}