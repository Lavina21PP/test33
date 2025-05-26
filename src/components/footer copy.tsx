"use client";
import React from "react";
import { Mail, Store, House, SquareUserRound, Settings } from "lucide-react"; // ใช้ icon สวยจาก lucide
import { useEffect, useState } from "react";
import Button from "@/components/buttonbtn";
import RippleButton from "@/components/RippleButton";
const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // ถ้าอยู่บนสุดหรือใกล้ 0 ไม่ต้องซ่อน footer
          if (currentScrollY < 50) {
            setShowFooter(true);
          } else if (currentScrollY > lastScrollY) {
            // เลื่อนลง
            setShowFooter(false);
          } else if (currentScrollY < lastScrollY) {
            // เลื่อนขึ้น
            setShowFooter(true);
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
    <section>
      <div
        className={`fixed bottom-0 w-full transition-transform duration-500 ${
          showFooter ? "translate-y-0" : "translate-y-[10rem]"
        }`}
      >
        <footer className="bg-[#569fff] text-white flex justify-evenly items-center text-center">
          <RippleButton className="w-[100%] py-[0.6rem]">
            <div className="flex justify-center">
              <House />
            </div>
            Home
          </RippleButton>
          <RippleButton className="w-[100%] py-[0.6rem]">
            <div className="flex justify-center">
              <Store />
            </div>
            Mystore
          </RippleButton>
          <RippleButton className="w-[100%] py-[0.6rem]">
            <div className="flex justify-center">
              <Mail />
            </div>
            Message
          </RippleButton>
          <RippleButton className="w-[100%] py-[0.6rem]">
            <div className="flex justify-center">
              <SquareUserRound />
            </div>
            Private
          </RippleButton>
          <RippleButton className="w-[100%] py-[0.6rem]">
            <div className="flex justify-center">
              <Settings />
            </div>
            Setting
          </RippleButton>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
