'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import WalletIcon from '@mui/icons-material/Wallet';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAccount } from 'wagmi';
import { useContext } from 'react';
import { ModalContext } from './../../context/index';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  width: '100%',
  bgcolor: '#7a444a',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NavBar() {
  const { address } = useAccount();
  const modal = useContext(ModalContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Hover states for each button
  const [isMainHovered, setIsMainHovered] = useState(false);
  const [isClaimHovered, setIsClaimHovered] = useState(false);
  const [isBurnHovered, setIsBurnHovered] = useState(false);
  const [isBridgeHovered, setIsBridgeHovered] = useState(false);
  const [isWalletHovered, setIsWalletHovered] = useState(false);
  
  const [isResizing, setIsResizing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      setIsResizing(false);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(true);
        setWindowWidth(window.innerWidth);
        
        if (window.innerWidth >= 768) {
          document.body.style.overflow = 'unset';
          setIsMobileMenuOpen(false);
        }
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);
  
  const [loadedImages, setLoadedImages] = useState({
    main: false,
    claim: false,
    burn: false,
    bridge: false,
    wallet: false
  });
  
  const allImagesLoaded = Object.values(loadedImages).every(loaded => loaded);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  return (
    <>
      <nav className="w-full px-4 sm:px-8 md:px-12 lg:px-24 relative">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden fixed top-4 right-4 z-50 p-2 text-[#cfc6b8] bg-[#564064] transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <KeyboardArrowUpIcon className="text-4xl transform rotate-0 transition-transform duration-300" />
          ) : (
            <MenuIcon className="text-4xl transform rotate-0 transition-transform duration-300" />
          )}
        </button>

        <div className="flex justify-center items-center sm:mb-[-70px] mb-[-40px]">
          {/* Logo Section */}
          <div className="no-underline flex items-center">
            <div 
              className={`relative sm:-top-[70px] -top-[80px] flex-shrink-0 ${allImagesLoaded ? 'sign-animation' : 'sign-hidden'}`}
              style={{ animationDelay: '0s' }}
            >
              <Link href="/">
                <div 
                  className="transition-transform duration-300"
                  onMouseEnter={() => setIsMainHovered(true)}
                  onMouseLeave={() => setIsMainHovered(false)}
                >
                  <Image
                    src={isMainHovered ? "/navbar/mainpage_button_hover.png" : "/navbar/mainpage_button.png"}
                    height={91 * 2}
                    width={112 * 2}
                    alt="Frog Soup Cafe"
                    className="pixel-art transform md:scale-100 scale-[1.5] md:hover:scale-100 hover:scale-[1.5] transition-all"
                    priority
                    onLoadingComplete={() => setLoadedImages(prev => ({...prev, main: true}))}
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 ml-3">
            {/* Claim Button */}
            <div 
              className={`relative transform -top-[75px] flex-shrink-0 ${allImagesLoaded ? 'sign-animation' : 'sign-hidden'}`}
              style={{ 
                animationDelay: windowWidth >= 640 && !isResizing ? '0.2s' : '0s' 
              }}
              onMouseEnter={() => setIsClaimHovered(true)}
              onMouseLeave={() => setIsClaimHovered(false)}
            >
              <Link href="/claim">
                <Image
                  src={isClaimHovered ? "/navbar/claim_button_hover.png" : "/navbar/claim_button.png"}
                  height={73 * 2}
                  width={58 * 2}
                  alt="Claim"
                  className="pixel-art"
                  priority
                  onLoadingComplete={() => setLoadedImages(prev => ({...prev, claim: true}))}
                />
              </Link>
            </div>

            {/* Burn Button */}
            <div 
              className={`relative -top-[65px] flex-shrink-0 ${allImagesLoaded ? 'sign-animation' : 'sign-hidden'}`}
              style={{ 
                animationDelay: windowWidth >= 640 && !isResizing ? '0.4s' : '0.2s' 
              }}
              onMouseEnter={() => setIsBurnHovered(true)}
              onMouseLeave={() => setIsBurnHovered(false)}
            >
              <Link href="/burn">
                <Image
                  src={isBurnHovered ? "/navbar/burn_button_hover.png" : "/navbar/burn_button.png"}
                  height={78 * 2}
                  width={54 * 2}
                  alt="Burn"
                  className="pixel-art"
                  priority
                  onLoadingComplete={() => setLoadedImages(prev => ({...prev, burn: true}))}
                />
              </Link>
            </div>

            {/* Bridge Button */}
            <div 
              className={`relative -top-[75px] flex-shrink-0 ${allImagesLoaded ? 'sign-animation' : 'sign-hidden'}`}
              style={{ 
                animationDelay: windowWidth >= 640 && !isResizing ? '0.3s' : '0.1s' 
              }}
              onMouseEnter={() => setIsBridgeHovered(true)}
              onMouseLeave={() => setIsBridgeHovered(false)}
            >
              <Link href="https://shibarium.shib.io/bridge-nfts" target="_blank">
                <Image
                  src={isBridgeHovered ? "/navbar/bridge_button_hover.png" : "/navbar/bridge_button.png"}
                  height={74 * 2}
                  width={68 * 2}
                  alt="Bridge"
                  className="pixel-art"
                  priority
                  onLoadingComplete={() => setLoadedImages(prev => ({...prev, bridge: true}))}
                />
              </Link>
            </div>

            {/* Wallet Button */}
            <div 
              className={`relative -top-[75px] flex-shrink-0 ${allImagesLoaded ? 'sign-animation' : 'sign-hidden'}`}
              style={{ 
                animationDelay: windowWidth >= 640 && !isResizing ? '0.5s' : '0.3s' 
              }}
              onMouseEnter={() => setIsWalletHovered(true)}
              onMouseLeave={() => setIsWalletHovered(false)}
            >
              <button
                onClick={() => modal.open()}
                className="flex items-center"
              >
                <Image
                  src={address 
                    ? (isWalletHovered ? "/navbar/connected_button_hover.png" : "/navbar/connected_button.png")
                    : (isWalletHovered ? "/navbar/connect_button_hover.png" : "/navbar/connect_button.png")
                  }
                  height={83 * 2}
                  width={77 * 2}
                  alt={address ? "Wallet Connected" : "Connect Wallet"}
                  className="pixel-art"
                  priority
                  onLoadingComplete={() => setLoadedImages(prev => ({...prev, wallet: true}))}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 left-0 right-0 bg-[#7a444a] px-4 py-8 z-40 md:hidden transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full -mt-8'
        }`}
        style={{
          boxShadow: '0 2px #a05b53, 0 12px #472d3c, 0 14px #302c2e, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="mobile-menu flex flex-col space-y-0 text-[#cfc6b8] pixel-text">
          <Link 
            href="/"
            className="p-2 transition-colors transform transition-transform hover:pl-5"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            MINT
          </Link>
          <Link 
            href="/claim"
            className="p-2 transition-colors transform transition-transform hover:pl-5"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CLAIM
          </Link>
          <Link 
            href="/burn"
            className="p-2 transition-colors transform transition-transform hover:pl-5"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            BURN
          </Link>
          <Link 
            href="https://shibarium.shib.io/bridge-nfts"
            target="_blank"
            className="p-2 transition-colors transform transition-transform hover:pl-5"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            BRIDGE
          </Link>
          <button
            onClick={() => {
              modal.open();
              setIsMobileMenuOpen(false);
            }}
            className="mobile-connect flex items-center p-2 hover:bg-[#5e3643] transition-colors transform transition-transform hover:pl-5"
          >
            <WalletIcon className="mr-2" />
            {address
              ? `${address.slice(0, 6)}...${address.slice(-6)}`
              : "CONNECT WALLET"}
          </button>
        </div>
      </div>
    </>
  );
}