// 'use client'
import React from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  ChevronRight,
  Mail,
  Store,
  House,
  SquareUserRound,
  Settings,
  LogOut,
} from "lucide-react";

export const PcL = () => {
  const pathname = usePathname();
  const router = useRouter();

  const goToPath = (path: string) => {
    router.push(path);
  };
  const btnPage = [
    { name: "Home", icon: <House />, link: "/" },
    { name: "My Store", icon: <Store />, link: "/mystore" },
    { name: "Message", icon: <Mail />, link: "/message" },
    { name: "Private", icon: <SquareUserRound />, link: "/private" },
    // { name: "Setting", icon: <Settings />, link: "/setting" },
  ];
  return (
    <section className="k w-[20%] shrink-0 min-w-[10rem] hidden md:block md:h-screen md:overflow-y-auto bg-[#c6deff]">
      <div className="k pl-[1rem] border-b-1 border-[#b4c5ff] bg-[#c6deff] sticky top-0 flex justify-start items-center h-[3.82rem]">
        <div className="k w-[8rem]">
          <img src="/img/logo1.png" alt="" />
        </div>
      </div>
      <div className="flex justify-start w-full">
        <div className="k w-full">
          {btnPage.map((e, i) => {
            const isActive = pathname === e.link;

            return (
              <section
                key={i}
                onClick={() => goToPath(e.link)}
                className={`k pr-[0.5rem] pl-[1rem] border-b-1 border-[#b4c5ff] py-3 flex items-center justify-between
        hover:bg-[#b2caec] ${isActive ? "bg-[#b6cdee]" : "bg-[#c6deff]"}`}
              >
                <div className="font-bold text-[#0c0c0c] flex items-center gap-1.5">
                  <div className="k">{e.icon}</div>
                  <div className="k">{e.name}</div>
                </div>
                <div className="k">
                  <ChevronRight />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const PcR = () => {
  const router = useRouter();
  const goToPath = (path: string) => {
    router.push(path);
  };
  return (
    <section className="k w-[20%] shrink-0 min-w-[10rem] hidden md:block md:h-screen md:overflow-y-auto bg-[#c6deff]">
      <div className="k border-b-1 border-[#b4c5ff] pr-[1rem] bg-[#c6deff] sticky top-0 flex justify-end items-center h-[3.82rem] gap-2">
        <div className="!text-[1.2rem] font-bold">Lavina</div>
        <div className="w-[3.2rem] h-[3.2rem] bg-gray-700 rounded-[50%] overflow-hidden border-1 border-[#2d63f6] flex justify-center items-center cursor-pointer hover:bg-[#2d63f6] transition-all duration-200">
          <img src="/img/IMG_E0417.JPG" alt="" />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="k w-full">
          <section
            onClick={() => goToPath("/setting")}
            className="k hover:bg-[#b2caec] pr-[1rem] pl-[0.5rem] border-b-1 border-[#b4c5ff] py-3 bg-[#c6deff] flex items-center justify-between"
          >
            <div className="k"></div>
            <div className="font-bold text-[#0c0c0c] flex items-center gap-1.5">
              <div className="k">{"Setting"}</div>
              <div className="k">
                <Settings />
              </div>
            </div>
          </section>
          <section
            onClick={() => goToPath("/setting")}
            className="k hover:bg-[#b2caec] pr-[1rem] pl-[0.5rem] border-b-1 border-[#b4c5ff] py-3 bg-[#c6deff] flex items-center justify-between"
          >
            <div className="k"></div>
            <div className="font-bold text-[#de3131] flex items-center gap-1.5">
              <div className="k">{"Log Out"}</div>
              <div className="k">
                <LogOut />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
