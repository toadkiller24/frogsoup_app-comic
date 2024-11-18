"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface FooterLink {
  key: string;
  href: string;
  target: string;
  label: string;
  iconSize: number;
  isHovered: boolean;
  setHovered: (value: boolean) => void;
}

export default function Footer() {
  const pathname = usePathname();
  const isDark = pathname === "/burn";

  const [isPixelsByComicHovered, setIsPixelsByComicHovered] = useState(false);
  const [isOpenseaHovered, setIsOpenseaHovered] = useState(false);
  const [isEtherscanHovered, setIsEtherscanHovered] = useState(false);
  const [isTelegramHovered, setIsTelegramHovered] = useState(false);

  const links: FooterLink[] = [
    {
      key: "opensea",
      href: "https://opensea.io/collection/frog-soup-reheated",
      target: "_blank",
      label: "Opensea",
      iconSize: 16,
      isHovered: isOpenseaHovered,
      setHovered: setIsOpenseaHovered,
    },
    {
      key: "etherscan",
      href: "https://etherscan.io/token/0xB09F884d48543ee12Ebbeb0E565FdECc8077EC32",
      target: "_blank",
      label: "Etherscan",
      iconSize: 16,
      isHovered: isEtherscanHovered,
      setHovered: setIsEtherscanHovered,
    },
    {
      key: "telegram",
      href: "https://t.me/thetoadkiller",
      target: "_blank",
      label: "Telegram",
      iconSize: 15,
      isHovered: isTelegramHovered,
      setHovered: setIsTelegramHovered,
    },
  ];

  return (
    <div className="relative mt-8">
      <div className="absolute bottom-full w-full flex justify-center image-rendering-pixelated">
        <div
          className="w-full max-w-[1440px] mx-auto"
          style={{
            backgroundImage: `url(${
              isDark ? "/wood_table_dark.png" : "/wood_table.png"
            })`,
            backgroundSize: "100% 100%",
            height: "180px",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
      <div
        className="text-white pt-1 relative"
        style={{ background: isDark ? "#7a444a" : "#eea160" }}
      >
        <div
          className="text-white py-3 pixel-text"
          style={{ background: isDark ? "#472d3c" : "#5e3643" }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:flex-1 flex items-center justify-center gap-4">
                {links.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target="blank"
                    className="flex items-center gap-1 no-underline"
                    onMouseEnter={() => link.setHovered(true)}
                    onMouseLeave={() => link.setHovered(false)}
                  >
                    <Image
                      src={
                        link.isHovered
                          ? `/icon_${link.key}_hover.png`
                          : `/icon_${link.key}_footer.png`
                      }
                      width={link.iconSize}
                      height={link.iconSize}
                      alt={link.label}
                      className="image-rendering-pixelated"
                      unoptimized
                    />
                    <span
                      className={`footer-link ${
                        link.isHovered ? "text-[#bf7958]" : "text-[#a05b53]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>

              <div className="w-full md:w-auto flex justify-center md:justify-end mt-2 md:mt-0 md:absolute md:right-4">
                <a
                  href="https://x.com/comicnyans"
                  target="_blank"
                  className="no-underline"
                  onMouseEnter={() => setIsPixelsByComicHovered(true)}
                  onMouseLeave={() => setIsPixelsByComicHovered(false)}
                >
                  <Image
                    src={
                      isPixelsByComicHovered
                        ? "/pixelsbycomic_hover.png"
                        : "/pixelsbycomic.png"
                    }
                    width={43 * 2}
                    height={14 * 2}
                    alt=""
                    className="image-rendering-pixelated"
                    unoptimized
                    priority
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
