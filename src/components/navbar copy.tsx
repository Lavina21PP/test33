"use client";
import React from "react";
import { useEffect, useState } from "react";
function navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // ถ้าอยู่บนสุดหรือใกล้ 0 ไม่ต้องซ่อน NashowNavbar
          if (currentScrollY < 50) {
            setShowNavbar(true);
          } else if (currentScrollY > lastScrollY) {
            // เลื่อนลง
            setShowNavbar(false);
          } else if (currentScrollY < lastScrollY) {
            // เลื่อนขึ้น
            setShowNavbar(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <header className="pt-[4.5rem] md:pt-[5.2rem]">
      <div
        className={`w-full fixed top-0 bg-[#101010] z-1000 left-0 !py-2 transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center container1">
          <div className="w-[9rem] md:w-[11.5rem]">
            <img src="/img/logo1.png" alt="" />
          </div>
          <div className="w-[3.5rem] h-[3.5rem] md:w-[4.2rem] md:h-[4.2rem] bg-gray-700 rounded-[50%] overflow-hidden border-2 border-[#2d63f6] flex justify-center items-center cursor-pointer hover:bg-[#2d63f6] transition-all duration-200">
            <img src="/img/IMG_E0417.JPG" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default navbar;
