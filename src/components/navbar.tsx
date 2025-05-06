"use client";
import React from "react";

function navbar() {
  return (
    <div>
      <div className="w-full bg-[#101010] fixed top-0 left-0 !py-2">
        <div className="flex justify-between items-center container1">
          <div className="w-[9rem] md:w-[11.5rem]">
            <img src="/img/logo1.png" alt="" />
          </div>
          <div className="w-[3.5rem] h-[3.5rem] md:w-[4.2rem] md:h-[4.2rem] bg-gray-700 rounded-[50%] overflow-hidden border-2 border-[#2d63f6] flex justify-center items-center cursor-pointer hover:bg-[#2d63f6] transition-all duration-200">
            <img src="/img/IMG_E0417.JPG" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default navbar;
