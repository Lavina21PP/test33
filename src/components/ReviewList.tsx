// app/product/[id]/page.tsx
"use client";
import Image from "next/image";
import Footer from "@/components/footer";
import { PcL } from "@/components/pcLR";
import { PcR } from "@/components/pcLR";
import ImageSlider from "@/components/ImageSlider";
import RippleButton from "./RippleButton";
import Start from "@/components/star";
import React from "react";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Review {
  review_id: number;
  comment: string;
  star: number;
  createAt: string;
}
function renderStars(star: number) {
  const maxStar = 5;
  const fullStars = "★".repeat(star);
  const emptyStars = "☆".repeat(maxStar - star);
  return (
    <>
      <span className="text-yellow-500">{fullStars}</span>
      <span className="text-gray-400">{emptyStars}</span>
    </>
  );
}
function calculateAverageStar(reviews: { star: number }[]) {
  if (reviews.length === 0) return 0; // ไม่มีรีวิว = 0 ดาวเลย

  const totalStars = reviews.reduce((sum, r) => sum + r.star, 0);
  return totalStars / reviews.length;
}

const mockProduct: Product = {
  id: "1",
  name: "Super Cool Product",
  description:
    "This is a great product with awesome featuresThis is a great product with awesome featuresThis is a great product with awesome featuresThis is a great product with awesome featuresThis is a great product with awesome featuresThis is a great product with awesome features.",
  price: 200000,
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7ma8M0MI7yL5V7i8PzSwNmqCSUDzSy1QEA&s", // ใส่ path จริงใน public/
};

export default function ProductPage({ reviews }: { reviews: Review[] }) {
  const product = mockProduct; // ตรงนี้จะไป fetch จริงในโปรเจกต์จริงๆ
  const [valueStar, setValueStar] = React.useState<number | null>(0);
  const avgStar = calculateAverageStar(reviews);
  const roundedAvg = Math.round(avgStar * 10) / 10;



  return (
    <>
      <div className="k md:flex justify-between">
        <PcL />
        <section className="w-[100%] md:w-[100%] mx-auto md:h-screen md:overflow-y-auto">
          <div className="k h-[3rem] md:h-[3.82rem] bg-[#181818] text-[#fff] flex items-center justify-center sticky top-0 z-1000">
            <div className="k md:!text-[1.2rem] font-bold">Product</div>
          </div>
          <section>
            <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-6 items-start">
              <div className="relative w-full h-96 bg-gray-100 border-1 border-[#282828] rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-[#fff]">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="">{product.description}</p>
                <p className="text-2xl font-semibold ">
                  {product.price.toLocaleString()} ກີບ
                </p>

                <RippleButton className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                  ເພີ່ມລົງລາຍການສັ່ງຊື້
                </RippleButton>
              </div>
            </div>
          </section>
          <section className="mx-4">
            <div className="k border-1 border-[#000000] rounded-lg overflow-hidden p-4 bg-[#0f0f0f]">
              <div className="k text-[#fff] font-bold text-[1.2rem] mb-3">
                ຕົວຢ່າງສິນຄ້າ
              </div>
              <ImageSlider />
            </div>
          </section>
          {/* <div className="">
            <p className="text-white">{roundedAvg} <span className="text-yellow-500">★</span></p>
          </div> */}
          <section className="mx-4 flex items-center justify-center mt-4 mb-2 gap-x-2">
            <span className="text-white">ໃຫ້ຄະແນນ</span>
            <Start valueStar={valueStar} setValueStar={setValueStar} />
          </section>
          <section className={`mx-4 mb-4 ${valueStar ? "" : "hidden"}`}>
            <section className="flex flex-col gap-y-4 ">
              <input
                type="text"
                className="border rounded-lg p-2 w-full bg-white"
                placeholder="ສະແດງຄວາມຄິດເຫັນ..."
              />
              <RippleButton onClick={() => {console.log(5)}} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                ສົ່ງ
              </RippleButton>
            </section>
          </section>
          <section className="mx-4">
            <h2 className="text-xl text-white font-semibold mb-4">
              ຄວາມຄິດເຫັນຈາກລູກຄ້າ
            </h2>

            <ul className="space-y-2">
              {reviews.map((e, i) => (
                <li
                  className="border rounded-lg p-4 bg-[#0f0f0f] text-white"
                  key={i}
                >
                  <div className="flex items-center gap-2 justify-between">
                    <span>
                      <span>{renderStars(e.star)}</span> {e.review_id}
                    </span>
                    <span className="text-sm text-white">
                      {new Date(e.createAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-white">{e.comment}</p>
                </li>
              ))}
            </ul>
            {/* <ul className="space-y-2">
              {Array.from({ length: 5 }, (_, i) => (
              <li className="border rounded-lg p-4 bg-[#0f0f0f] text-white" key={i}>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-sm text-white">
                    by คุณเอ็ม - 25 พ.ค. 2025
                  </span>
                </div>
                <p className="mt-2 text-white">
                  ของดี ส่งไว ใช้แล้วชีวิตดีขึ้น 200%
                </p>
              </li>
              ))}
            </ul> */}
          </section>
        </section>

        <PcR />
      </div>
      <section className="md:hidden">
        <Footer />
      </section>
    </>
  );
}
