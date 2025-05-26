"use client";
import ImageSlider from "@/components/ImageSlider";
import Navbar from "@/components/navbar";
import { Mail, Store, House, SquareUserRound } from "lucide-react";
import { PcL, PcR } from "@/components/pcLR";
import SearchBar from "@/components/search";
import Footer from "@/components/footer";
import RippleButton from "@/components/RippleButton";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
export default function HomePage() {
  const router = useRouter();
  const goToPath = (path: string) => {
    router.push(path);
  };
  const handleSearch = (data: string) => {
    console.log("Search for:", data);
    // คุณสามารถ fetch หรือ filter รายการต่าง ๆ ที่นี่ได้
  };
  const refS = useRef(null);

  const [page, setPage] = useState("Categories");

  const handlePageChange = (newPage: string) => {
    setPage(newPage);
    if (refS.current) {
      // @ts-ignore
      refS.current.scrollTo({
      top: 400,
    });
    }
    window.scrollTo({
      top: 310,
    });
  };
  const pageAll = [
    { name: "Categories", onClick: () => handlePageChange("Categories") },
    { name: "Product", onClick: () => handlePageChange("Product") },
  ];

  return (
    <main className="">
      <div className="k md:flex justify-between">
        <PcL />

        <section className="w-[100%] md:w-[100%] mx-auto md:h-screen md:overflow-y-auto" ref={refS}>
          <div className="k h-[3rem] md:h-[3.82rem] bg-[#569fff] text-[#fff] flex items-center justify-center">
            <div className="k md:!text-[1.2rem] font-bold">Mystore</div>
          </div>
          <ImageSlider />
          <section className="bg-[#569fff] sticky top-0 z-1000">
            <div className="container1 py-3">
              <SearchBar onSearch={handleSearch} />
            </div>
            <ul className="flex gap-x-4 py-2 overflow-auto !px-[2vw] border-b-1 border-[#4765c7]">
              {/* <li className="shrink-0 text-white font-semibold">Categories</li>
              <li className="shrink-0 text-white">Product</li> */}

              {pageAll.map((item, index) => (
                <li
                  key={index}
                  className={`shrink-0 text-white cursor-pointer ${
                    page === item.name
                      ? "text-[#fff] font-semibold"
                      : "text-[#fff]"
                  }`}
                  onClick={item.onClick}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-4">
            {page === "Categories" ? (
              <section>
                {Array.from({ length: 28 }, (_, index) => (
                  <section className="!mt-2" key={index}>
                    <div className="k container1 font-bold !text-[1.1rem]">
                      ເຄື່ອງໃຊ້ໄຟຟ້າ {index + 1}
                    </div>
                    <section className="flex overflow-auto px-[2vw] gap-3 w-full pb-4 pt-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((shop) => (
                        <RippleButton
                          className=" shrink-0 bg-[#efefef] overflow-hidden rounded-[8px] text-center shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                          key={shop}
                        >
                          <div className="k p-3">
                            <div className="k w-26 h-26 mx-auto bg-[#2d2d2d] rounded-[5px] overflow-hidden">
                              <img src="/img/logo.png" alt="" />
                            </div>
                            <div className="k mt-2">ພັດລົມ</div>
                          </div>
                        </RippleButton>
                      ))}
                    </section>
                  </section>
                ))}
              </section>
            ) : (
              <section>
                {Array.from({ length: 23 }, (_, index) => (
                  <section className="!mt-2" key={index}>
                    <div className="k container1 font-bold !text-[1.1rem]">
                      ພັດລົມ
                    </div>
                    <section className="flex overflow-auto px-[2vw] gap-3 w-full pb-4 pt-3">
                      {[1, 2, 3, 4, 5, 6, 7].map((shop) => (
                        <div
                          className=" shrink-0 bg-[#efefef] overflow-hidden rounded-[8px] text-center shadow-md"
                          key={shop}
                        >
                          <div className="k p-4 pb-2">
                            <div className="k w-36 h-36 mx-auto bg-[#2d2d2d] rounded-[5px] overflow-hidden">
                              <img src="/img/logo.png" alt="" />
                            </div>
                            <div className="k w-36 overflow-hidden">
                              <div className="k mt-1">Fan11</div>
                              <div className="k">
                                slkdflksdfjwejfsldkfjlkjlkjksdf
                              </div>
                            </div>
                          </div>
                          <div className="k ">
                            <RippleButton className="w-full">
                              <div className="k flex items-center justify-center gap-x-2 bg-[#f0733e] text-[#fff] w-full h-[2.5rem]">
                                <Store size={20} />
                                <div className="k">ສັ່ງຊື້</div>
                              </div>
                            </RippleButton>
                          </div>
                        </div>
                      ))}
                    </section>
                  </section>
                ))}
              </section>
            )}
          </section>
        </section>
        <PcR />
      </div>
      <section className="md:hidden">
        <Footer />
      </section>
    </main>
  );
}
