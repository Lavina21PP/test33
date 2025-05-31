// app/product/[id]/page.tsx
"use client";
import Image from "next/image";
import Footer from "@/components/footer";
import { PcL } from "@/components/pcLR";
import { PcR } from "@/components/pcLR";
import ImageSlider from "@/components/ImageSlider";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const mockProduct: Product = {
  id: "1",
  name: "Super Cool Product",
  description: "This is a great product with awesome featuresThis is a great product with awesome featuresThis is a great product with awesome featuresThis is a great product with awesome featuresThis is a great product with awesome featuresThis is a great product with awesome features.",
  price: 1299,
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7ma8M0MI7yL5V7i8PzSwNmqCSUDzSy1QEA&s", // ใส่ path จริงใน public/
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = mockProduct; // ตรงนี้จะไป fetch จริงในโปรเจกต์จริงๆ

  return (
    <>
      <div className="k md:flex justify-between">
        <PcL />
        <section className="w-[100%] md:w-[100%] mx-auto md:h-screen md:overflow-y-auto">
          <div className="k h-[3rem] md:h-[3.82rem] bg-[#569fff] text-[#fff] flex items-center justify-center sticky top-0 z-1000">
            <div className="k md:!text-[1.2rem] font-bold">Product</div>
          </div>
          <section>
            <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-6 items-start">
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-2xl font-semibold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>

                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
          <section className="m-4">
            <div className="k border-1 border-[#252525] rounded-lg overflow-hidden p-4 bg-[#343434]">
                <div className="k text-[#fff] font-bold text-[1.2rem] mb-3">
                    ຕົວຢ່າງສິນຄ້າ
                </div>
              <ImageSlider />
            </div>
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
