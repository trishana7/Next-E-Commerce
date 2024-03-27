"use client";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./globals.css";
import { EffectCoverflow, Pagination } from "swiper/modules";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Navigation: React.FC = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  useEffect(() => {
    if (products.length === 0) {
      fetch("https://mocki.io/v1/471450c6-9e39-49e0-8898-9b55ab8a6b63")
        .then((res) => res.json())
        .then((data: Product[]) => {
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [products]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-1/3 h-10 bg-green-200/30 backdrop-blur-lg mb-5 rounded-full"></div>

      <div className="flex flex-col justify-center items-center bg-green-200/30 h-2/3 w-3/4 rounded-xl backdrop-blur-2xl">
        {products.length !== 0 && (
          <div className="flex justify-between items-center px-8 w-full">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-green-200 rounded-full"></div>
              <div className="w-10 h-10 bg-green-200 rounded-full"></div>
              <div className="w-10 h-10 bg-green-200 rounded-full"></div>
            </div>
            <div className="w-32 h-10 bg-green-200 rounded-full"></div>
          </div>
        )}
        <div className=" max-w-lg">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={true}
            loop={true}
            className="mySwiper"
            onTransitionEnd={(swiper) => handleSlideChange(swiper)}
          >
            {Array.isArray(products) &&
              products.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    key={product.id}
                    product={product}
                    isMiddleSlide={index === activeIndex}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
