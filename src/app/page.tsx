"use client";
import ImageSlider from "@/components/ImageSlider";
import Navbar from "@/components/navbar";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Mail,
  Store,
  House,
  SquareUserRound,
  Settings,
} from "lucide-react";
import { PcL, PcR } from "@/components/pcLR";
import SearchBar from "@/components/search";
import Footer from "@/components/footer";
import RippleButton from "@/components/RippleButton";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  const goToPath = (path: string) => {
    router.push(path);
  };
  const handleSearch = (data: string) => {
    console.log("Search for:", data);
    // คุณสามารถ fetch หรือ filter รายการต่าง ๆ ที่นี่ได้
  };
  const btnPage = [
    { name: "Home", icon: <House />, link: "/" },
    { name: "My Store", icon: <Store />, link: "/mystore" },
    { name: "Message", icon: <Mail />, link: "/message" },
    { name: "Private", icon: <SquareUserRound />, link: "/private" },
    { name: "Setting", icon: <Settings />, link: "/setting" },
  ];
  return (
    <main className="">
      <div className="k md:flex justify-between">
        <PcL />
        <section className="w-[100%] md:w-[100%] mx-auto md:h-screen md:overflow-y-auto">
          <div className="k h-[3rem] md:h-[3.82rem] bg-[#569fff] text-[#fff] flex items-center justify-center">
            <div className="k md:!text-[1.2rem] font-bold">Home</div>
          </div>
          <ImageSlider />
          <section className="bg-[#569fff] sticky top-0 z-1000">
            <div className="container1 py-3">
              <SearchBar onSearch={handleSearch} />
            </div>
            <ul className="flex gap-x-4 py-2 overflow-auto !px-[3vw] border-b-1 border-[#4765c7]">
              <li className="shrink-0 text-white font-semibold">All Stores</li>
              <li className="shrink-0 text-white">Popular</li>
              <li className="shrink-0 text-white">New</li>
              <li className="shrink-0 text-white">Top Rated</li>
              <li className="shrink-0 text-white">Nearby</li>
              <li className="shrink-0 text-white">Open Now</li>
              <li className="shrink-0 text-white">Categories</li>
            </ul>
          </section>

          <section className="flex flex-col gap-y-2 py-2.5">
            {[1, 2, 3, 4, 5, 3, 3, 3, 3, 3, 3, 3, 3].map((e, i) => (
              <section className="container1" key={i}>
                <RippleButton className=" w-full bg-[#f2f2f2] rounded-[7px]">
                  <nav className="k flex justify-between p-3">
                    <div className="k flex justify-between">
                      <div className="k w-[5rem] h-[5rem] rounded-[4px] overflow-hidden">
                        <img src="/img/IMG_E0417.JPG" alt="" />
                      </div>
                      <div className="k flex flex-col justify-evenly ml-2.5">
                        <div className="k font-bold">kkkkk</div>
                        <div className="k">kkkkk</div>
                        <div className="k flex items-center gap-x-1">
                          <div className="k">
                            <Heart size={20} />
                          </div>
                          <div className="k">{e}</div>
                        </div>
                      </div>
                    </div>
                    <div className="k">
                      <Heart size={20} />
                    </div>
                  </nav>
                </RippleButton>
              </section>
            ))}
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
