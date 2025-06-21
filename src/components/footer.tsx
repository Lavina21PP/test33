"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Mail, Store, House, SquareUserRound, Settings } from "lucide-react"; // ใช้ icon สวยจาก lucide
import { useEffect, useState } from "react";
import Button from "@/components/buttonbtn";
import RippleButton from "@/components/RippleButton";
const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const goToPath = (path: string) => {
    router.push(path);
  };
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

  const btnPage = [
    { name: "Home", icon: <House />, link: "/" },
    { name: "My Store", icon: <Store />, link: "/mystore" },
    { name: "Message", icon: <Mail />, link: "/message" },
    { name: "Private", icon: <SquareUserRound />, link: "/private" },
    { name: "Setting", icon: <Settings />, link: "/setting" },
  ];
  return (
    <section>
      <div
        className={`fixed z-1000 bottom-0 w-full transition-transform duration-500 ${
          showFooter ? "translate-y-2" : "translate-y-[10rem]"
        }`}
      >
        <footer className="bg-[#181818] text-white flex justify-evenly items-center text-center">
          {btnPage.map((e, i) => {
            const isActive = pathname === e.link;
            return (
              <RippleButton
                key={i}
                onClick={() =>
                  setTimeout(() => {
                    goToPath(e.link);
                  }, 100)
                }
                className={`w-[100%] py-[0.8rem] ${isActive ? "bg-[#202020]" : "bg-[#181818]"}`}
              >
                <div className="flex justify-center">{e.icon}</div>
                {e.name}
              </RippleButton>
            );
          })}
        </footer>
      </div>
    </section>
  );
};

export default Footer;
