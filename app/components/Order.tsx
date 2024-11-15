"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SocialLink {
  key: string;
  href: string;
  target: string;
  size: number;
  alt: string;
  isHovered: boolean;
  setHovered: (value: boolean) => void;
}

export default function Order() {
  const [isOpenseaHovered, setIsOpenseaHovered] = useState(false);
  const [isEtherscanHovered, setIsEtherscanHovered] = useState(false);
  const [isTelegramHovered, setIsTelegramHovered] = useState(false);

  const socialLinks: SocialLink[] = [
    {
      key: "telegram",
      href: "https://t.me/thetoadkiller",
      target: "_blank",
      size: 15,
      alt: "Telegram",
      isHovered: isTelegramHovered,
      setHovered: setIsTelegramHovered,
    },
    {
      key: "opensea",
      href: "https://opensea.io/collection/frog-soup-remastered",
      target: "_blank",
      size: 16,
      alt: "OpenSea",
      isHovered: isOpenseaHovered,
      setHovered: setIsOpenseaHovered,
    },
    {
      key: "etherscan",
      href: "https://etherscan.io/token/0xbaf794efdc94531e24b658475ad46ab20abd9cb8",
      target: "_blank",
      size: 16,
      alt: "Etherscan",
      isHovered: isEtherscanHovered,
      setHovered: setIsEtherscanHovered,
    },
  ];

  const TearEdge = ({ isTop = false }: { isTop?: boolean }) => (
    <div
      className={`absolute ${
        isTop ? "-top-[7px] rotate-180" : "lg:-bottom-[7px] bottom-[9px]"
      } left-0 right-0`}
    >
      <Image
        src="/page_tear_edge.png"
        width={97}
        height={4}
        alt=""
        className="image-rendering-pixelated w-full h-[8px]"
        style={{ objectFit: "fill", maxHeight: "8px" }}
        unoptimized
        priority
      />
    </div>
  );

  return (
    <div className="lg:w-2/5 relative info-panel lg:mt-1 mt-2">
      <div className="bg-[#e0f6f4] p-6 lg:mb-0 mb-4 text-lg overflow-hidden relative">
        <div className="absolute top-0 -right-6" style={{ zIndex: 0 }}>
          <Image
            src="/watermark_finger_large.png"
            width={64 * 2}
            height={64 * 2}
            alt=""
            className="image-rendering-pixelated"
            unoptimized
            priority
          />
        </div>

        <div className="flex flex-col relative z-[1]">
          <div className="mb-4 flex justify-between items-center pixel-text">
            <div>
              <h1 className="text-3xl font-bold mb-3">Welcome!</h1>
              <p className="mb-2">
                Frog Soup is the first project in the{" "}
                <strong>TOAD KILLER</strong> ecosystem.
              </p>
              <p className="mb-2">
                It is a collection of <span data-numbers>5029</span> delicious
                meals, prepared lovingly by The Chefs.
              </p>
              <p>Minting proceeds are split as follows:</p>

              <hr className="border-t border-black/20 my-4" />

              <span className="text-center">
                <p className="text-3xl mt-1 font-bold">
                  <span data-numbers>33</span>%{" "}
                  <span className="relative inline-block fire-text">
                    <a href="/burn" className="no-underline text-[#302c2e]">
                      BURNS
                      <span className="hidden">
                        {[...Array(8)].map((_, i) => (
                          <span key={i} className="ember" />
                        ))}
                      </span>
                    </a>
                  </span>{" "}
                  $TOAD
                </p>
              </span>

              <p className="text-2xl mb-2 mt-1 font-bold flex justify-center gap-6 w-full text-[#a0938e]">
                <span>
                  <span data-numbers>33</span>% DEV
                </span>
                <span>|</span>
                <span>
                  <span data-numbers>33</span>% ART
                </span>
              </p>

              <hr className="border-t border-black/20 my-4" />

              <p className="mb-4">
                <strong>Hungry yet?</strong> You can place your order by
                selecting an option from the menu{" "}
                <span className="lg:inline hidden">to the left</span>
                <span className="lg:hidden inline">above</span>!
              </p>

              <div className="flex justify-center gap-8 mt-8 w-full">
                {socialLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    onMouseEnter={() => link.setHovered(true)}
                    onMouseLeave={() => link.setHovered(false)}
                  >
                    <Image
                      src={
                        link.isHovered
                          ? `icon_${link.key}_hover.png`
                          : `icon_${link.key}.png`
                      }
                      width={link.size * 3}
                      height={link.size * 3}
                      alt={link.alt}
                      className="image-rendering-pixelated"
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TearEdge isTop />
      <TearEdge />
    </div>
  );
}
