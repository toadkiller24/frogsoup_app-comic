/* eslint-disable */
import React from "react";
import {
  useWriteContract,
  UseWriteContractReturnType,
  useReadContract,
  useAccount,
} from "wagmi";
import { useContext } from "react";
import { ModalContext } from "./../../context/index";
import { abi } from "../ABI/ABI";
import { useState, useEffect } from "react";
import { parseEther } from "viem";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#7a444a",
  border: "5px solid #f4b41b",
  boxShadow: 24,
  p: 4,
};

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const modal = useContext(ModalContext);

  const [minted, setMinted] = useState<any>();
  const { writeContract } = useWriteContract();
  const { address } = useAccount();
  const result = useReadContract({
    abi,
    address: "0x58172B314187e35892DeEc5DD0e2f847893e5405",
    functionName: "totalSupply",
  });

  const mint1 = async () => {
    if (address === undefined) {
      modal.open();

      return;
    }
    handleOpen();
    writeContract({
      address: "0x98125d299ceE6DF2AcCC21e91093fdf66BB9DbFF",
      abi,
      functionName: "mint1",

      //value: parseEther("0.03"),
    });
  };

  useEffect(() => {
    setMinted(result.data as string);
  }, [result.data]);
  return (
    <div className="lg:w-2/3  p-4 menu-sheet">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className=" flex flex-col items-center justify-center text-white text-xl">
              <img src="cooking.png" alt="" width={140} />
              <div className=" flex">
                <img src="fire.gif" alt="" width={20} />
                <img src="fire.gif" alt="" width={20} />
                <img src="fire.gif" alt="" width={20} />
              </div>
              <h2 className=" mt-2">"Frog Soup is cooking"</h2>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="menu-heading">MENU</div>
      <p className=" text-center">
        Welcome! Make yourself at home and order a delicious Frog Soup.
      </p>
      <p className=" text-center">
        A limited number of servings available, so get them while they&apos;re
        hot!
      </p>
      <div className="w-full sold-meter-outer overflow-hidden mt-2 mb-8">
        <div className="sold-meter-inner h-6" style={{ width: "0%" }}>
          <div className="meter-counter">
            {minted ? minted : "-"}/5029 Soups Served{" "}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-2 mb-10 mx-10 flex flex-col text-center md:text-start md:flex-row justify-between items-center">
          <div className=" flex flex-col items-center md:items-start pb-4 md:pb-0">
            <h3 className="text-3xl font-bold soup-title">SOUP FOR ONE</h3>
            <p>A single serving of Frog Soup.</p>
            <div className="soupicon-container flex">
              <img src="/1soup.gif" alt="" />
            </div>
          </div>
          <button className="px-4 py-2 mint-button" onClick={mint1}>
            <span className="mintfor">MINT FOR</span>
            <span className="price">0.03ETH</span>
          </button>
        </div>
        <hr className=" mb-5" />
        <div className="mb-10 mx-10 flex flex-col text-center md:text-start md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start pb-4 md:pb-0">
            <span className="discount-tag">
              10% <br />
              OFF!
            </span>
            <h3 className="text-3xl font-bold soup-title">THE TRIPLE TREAT</h3>
            <p>Three soups, for the hungry ones.</p>
            <div className="soupicon-container flex">
              <img src="/3soup.gif" alt="" />
            </div>
          </div>
          <button
            className="px-4 py-2 mint-button"
            onClick={() => {
              console.log(44);
              writeContract({
                abi,
                address: "0x6b175474e89094c44da98b954eedeac495271d0f",
                functionName: "mint3",
                value: parseEther("0.08"),
              });
            }}
          >
            <span className="mintfor">MINT FOR</span>
            <span className="price">0.08ETH</span>
          </button>
        </div>
        <hr className=" mb-5" />
        <div className="mb-10 mx-10 flex flex-col text-center md:text-start md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start pb-4 md:pb-0">
            <span className="discount-tag">
              20% <br />
              OFF!
            </span>
            <h3 className="text-3xl font-bold soup-title">THE SHIBA SPECIAL</h3>
            <p>Five soups, for all the pups.</p>
            <div className="soupicon-container flex">
              <img src="/5soup.gif" alt="" />
            </div>
          </div>
          <button
            className="px-4 py-2 mint-button"
            onClick={() => {
              console.log(44);
              writeContract({
                abi,
                address: "0x6b175474e89094c44da98b954eedeac495271d0f",
                functionName: "mint5",
                value: parseEther("0.12"),
              });
            }}
          >
            <span className="mintfor">MINT FOR</span>
            <span className="price">0.12ETH</span>
          </button>
        </div>
        <hr className=" mb-5" />
        <div className="mb-10 mx-10 flex flex-col text-center md:text-start md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start pb-4 md:pb-0">
            <span className="discount-tag">
              33% <br />
              OFF!
            </span>
            <h3 className="text-3xl font-bold soup-title">
              BANQUET DE GRENOUILLES
            </h3>
            <p>Ten soups, for when you just can&apos;t get enough.</p>
            <div className="soupicon-container flex">
              <img src="/10soup.gif" alt="" />
            </div>
          </div>
          <button
            className="px-4 py-2 mint-button"
            onClick={() => {
              console.log(44);
              writeContract({
                abi,
                address: "0x6b175474e89094c44da98b954eedeac495271d0f",
                functionName: "mint10",
                value: parseEther("0.20"),
              });
            }}
          >
            <span className="mintfor">MINT FOR</span>
            <span className="price">0.20ETH</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
