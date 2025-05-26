"use client";
import React from "react";
import { useEffect, useState } from "react";
function navbar() {


  return (
    <header className="">
      <div
        className={`w-full bg-[#101010] relative z-1000 py-2 transition-transform duration-500"
        }`}
      >
        <div className="flex justify-between items-center container1">
          <div className="w-[8.5rem] md:w-[9.5rem]">
            <img src="/img/logo1.png" alt="" />
          </div>
          <div className="w-[3.5rem] h-[3.5rem] md:w-[4rem] md:h-[4rem] bg-gray-700 rounded-[50%] overflow-hidden border-2 border-[#2d63f6] flex justify-center items-center cursor-pointer hover:bg-[#2d63f6] transition-all duration-200">
            <img src="/img/IMG_E0417.JPG" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default navbar;
