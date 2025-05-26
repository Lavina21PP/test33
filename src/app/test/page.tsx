// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Heart, Search } from "lucide-react"; // ใช้ icon สวยจาก lucide
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function Home() {
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

  const [liked, setLiked] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({
    1: 12,
    2: 9,
    3: 22,
    4: 7,
  });

  const toggleLike = (shop: number) => {
    const isLiked = liked.includes(shop);
    setLiked((prev) =>
      isLiked ? prev.filter((id) => id !== shop) : [...prev, shop]
    );
    setLikeCounts((prev) => ({
      ...prev,
      [shop]: isLiked ? prev[shop] - 1 : prev[shop] + 1,
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* <Navbar /> */}
      <Navbar />
      {/* ส่วนหัว */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-800">
          ร้านแนะนำ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4].map((shop) => (
            <div
              key={shop}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 rounded-xl overflow-hidden mb-4">
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2qcKAz_hqMRda9TnCrnA1uZEmbAc6vLVQA&s`}
                  alt={`ร้าน ${shop}`}
                  className="w-full h-full object-cover hover:scale-105 hover:saturate-150 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ร้านตัวอย่าง {shop}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                ขายสินค้าทุกชนิด บริการดี จัดส่งไว รับประกันคุณภาพ!
              </p>

              <div className="flex justify-between items-center mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition">
                  ดูร้าน
                </button>

                <button
                  onClick={() => toggleLike(shop)}
                  className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition"
                >
                  <Heart
                    size={22}
                    fill={liked.includes(shop) ? "red" : "none"}
                    strokeWidth={2}
                  />
                  <span className="text-sm">{likeCounts[shop] ?? 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* จุดเด่น */}
      <section className="bg-blue-50 !py-16 !px-4">
        <h2 className="text-2xl font-semibold text-center !mb-8">
          ทำไมต้อง Foraling?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl !mx-auto">
          <Feature text="เปิดร้านฟรี ไม่มีค่าธรรมเนียม" />
          <Feature text="จัดการร้านง่ายผ่านมือถือ" />
          <Feature text="ลูกค้าเข้าถึงง่าย ไม่ต้องเขียนเว็บเอง" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center !py-20">
        <h2 className="text-3xl font-bold !mb-4">
          พร้อมเปิดร้านของคุณแล้วหรือยัง?
        </h2>
        <button className="bg-green-600 text-white !px-8 !py-3 rounded-full hover:bg-green-700 transition">
          เริ่มต้นเลย!
        </button>
      </section>
        {/* Footer */}
        <Footer />
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="bg-white !p-6 rounded-xl shadow text-center">
      <p className="text-gray-800">{text}</p>
    </div>
  );
}
