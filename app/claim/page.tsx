"use client";

import React, { useState, useRef } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { abi } from "../ABI/ABI";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { ModalContext } from "./../../context/index";

interface TokenData {
  id: number;
  rotation: number;
}

export default function Claim() {
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const modal = useContext(ModalContext);
  const inputRef = useRef<HTMLInputElement>(null);

  /* eslint-disable */
  const result: any = useReadContract({
    abi,
    address: "0x58172B314187e35892DeEc5DD0e2f847893e5405",
    functionName: "walletOfOwner",
    args: [address],
  });

  const newResult: any = useReadContract({
    abi,
    address: "0xB09F884d48543ee12Ebbeb0E565FdECc8077EC32",
    functionName: "walletOfOwner",
    args: [address],
  });

  const [tokenIds, setTokenIds] = useState<TokenData[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getRandomRotation = () => (Math.random() - 0.5) * 2;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClaim = async () => {
    if (!address) {
      modal.open();
      return;
    }

    try {
      const mintStatus = await writeContractAsync({
        address: "0xB09F884d48543ee12Ebbeb0E565FdECc8077EC32",
        abi,
        functionName: "mintFree",
        args: [tokenIds.map((token) => token.id)],
      });
      if (mintStatus) {
        // Handle successful mint
      }
    } catch (e) {
      alert("Token already minted");
      console.log(e);
    }
  };

  const handleAddToken = (event: React.FormEvent) => {
    event.preventDefault();
    const num = Number(inputValue.trim());
    if (!isNaN(num) && !tokenIds.some((token) => token.id === num)) {
      setTokenIds((prev) =>
        [
          ...prev,
          {
            id: num,
            rotation: getRandomRotation(),
          },
        ].sort((a, b) => a.id - b.id)
      );
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleRemoveToken = (idToRemove: number) => {
    setTokenIds((prev) => prev.filter(({ id }) => id !== idToRemove));
  };

  const detectEligibleTokens = async () => {
    try {
      if (result.data) {
        const alreadyOwnedTokens = new Set(
          (newResult.data as bigint[]).map((id) => Number(id))
        );

        const formattedTokens: TokenData[] = (result.data as bigint[])
          .map((id) => Number(id))
          .filter((id) => !alreadyOwnedTokens.has(id))
          .map((id) => ({
            id,
            rotation: getRandomRotation(),
          }));

        setTokenIds(formattedTokens);
      }
    } catch (error) {
      console.error("Error detecting eligible tokens:", error);
    }
  };

  const renderContent = () => {
    if (!address) {
      return (
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl mb-6 text-[#302c2e]">
            Connect your wallet to check eligibility
          </h2>
          <button
            onClick={() => modal.open()}
            className="px-6 py-3 bg-[#39314b] hover:bg-[#564064] transition-colors text-white"
          >
            Connect Wallet
          </button>
        </div>
      );
    }

    if (result.data?.length === 0) {
      return (
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl mb-4">
            You don&apos;t have any eligible soups to claim
          </h2>
        </div>
      );
    }

    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
          <h2 className="text-lg sm:text-xl text-[#302c2e]">Input Token IDs</h2>
          <button
            onClick={detectEligibleTokens}
            className="w-full sm:w-auto px-4 py-2 bg-[#564064] hover:bg-[#39314b] transition-colors text-sm"
          >
            Auto-fill eligible tokens
          </button>
        </div>

        <form onSubmit={handleAddToken} className="flex gap-2">
          <input
            ref={inputRef}
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 bg-[#5a5353] placeholder-[#cfc6b8] pixel-text text-[#dff6f5]"
            placeholder="Enter token ID"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#39314b] hover:bg-[#564064] transition-colors"
          >
            Add
          </button>
        </form>

        {tokenIds.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {tokenIds.map(({ id, rotation }) => (
                <div
                  key={id}
                  className="flex items-center gap-2 bg-[#39314b] px-3 py-1"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <span data-numbers className="tracking-wider">
                    {id}
                  </span>
                  <button
                    onClick={() => handleRemoveToken(id)}
                    className="text-[#827094] hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              className="w-full px-6 py-2 bg-[#39314b] hover:bg-[#564064] transition-colors mt-4"
              onClick={handleClaim}
            >
              CLAIM <span data-numbers>{tokenIds.length}</span> SOUP
              {tokenIds.length !== 1 ? "S" : ""}
            </button>
          </div>
        )}

        <p className="text-sm text-[#5a5353] text-center sm:text-left">
          Multiple soups can be claimed by adding multiple IDs.
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8 text-white mt-8 lg:mt-14 claim-sheet pixel-text md:overflow-visible overflow-auto mb-14">
      <div className="max-w-3xl w-full relative lg:-rotate-0 -rotate-0 transform transition-transform duration-300">
        <div
          className="absolute inset-[0px] image-rendering-pixelated"
          style={{
            borderImage: "url(/claim-bg.png) 30 30 30 30 stretch",
            borderWidth: "60px",
            background: "#cfc6b8",
          }}
        />

        <div className="relative z-10 p-4 sm:p-8 text-[#302c2e] font-handy">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center">
              <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 mx-auto md:mx-0">
                <Image
                  src="/golden_soup_demo.png"
                  alt="Golden Soup Demo"
                  width={192}
                  height={192}
                  className="w-full image-rendering-pixelated"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-center md:text-left">
                  Holder of an OG Soup?
                </h1>
                <p className="mb-3 sm:mb-4 text-center md:text-left">
                  OG Soups can be claimed here.
                </p>
                <p className="mb-4 sm:mb-6 text-center md:text-left">
                  The V1 Soup will be checked, and the matching V2 Soup will be
                  delivered with the addition of a Golden Soup badge to signify
                  early support.
                </p>
              </div>
            </div>

            <div className="w-full p-3 sm:p-4 bg-[#a0938e] text-white">
              {renderContent()}
            </div>

            <h2 className="text-xl sm:text-2xl text-center -mb-5">
              Don&apos;t have any Frog Soups yet?
            </h2>
            <Link href="/" className="block text-center mb-3">
              Go mint some here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
