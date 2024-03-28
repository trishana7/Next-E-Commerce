"use client";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./globals.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Navigation: React.FC = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [productSelected, setProductSelected] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isModalOpen, setModal] = useState<boolean>(false);
  const handleAddToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity++;
      setCart(updatedCart);
    } else {
      // Product does not exist in the cart, add it with initial quantity
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // remove product from the cart
  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  // Calculate total price of all items in the cart
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  // Calculate total quantity of all items in the cart
  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  const toggleModal = () => {
    setModal(!isModalOpen);
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
            <div className="flex gap-3">
              <div className="w-32 h-10 bg-green-200 rounded-full"></div>
              <div
                onClick={() => toggleModal()}
                className="w-10 h-10 bg-green-200 cursor-pointer rounded-full"
              >
                {
                  <div className="w-6 h-6 ml-6 bg-green-700 flex items-center justify-center text-white text-sm font-normal rounded-full">
                    {totalQuantity}
                  </div>
                }
              </div>
            </div>
          </div>
        )}
        <div className="max-w-80 lg:max-w-2xl">
          <Swiper
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
            onTransitionEnd={(swiper) => handleSlideChange(swiper)}
          >
            {Array.isArray(products) &&
              products.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    key={product.id}
                    product={product}
                    isMiddleSlide={index === activeIndex}
                    handleAddToCart={handleAddToCart}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
          <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center h-72">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.66016 29C7.66016 29.5527 8.10791 30 8.66016 30H25.0498C26.9521 30 28.5 28.4521 28.5 26.5498V9.97998C28.5 9.42773 28.0522 8.97998 27.5 8.97998C26.9478 8.97998 26.5 9.42773 26.5 9.97998V26.5498C26.5 27.3496 25.8496 28 25.0498 28H8.66016C8.10791 28 7.66016 28.4473 7.66016 29Z"
                      fill="#ABABAB"
                    />
                    <path
                      d="M12.9302 15H10.7598C10.2075 15 9.75977 15.4478 9.75977 16C9.75977 16.5522 10.2075 17 10.7598 17H12.9302C13.4824 17 13.9302 16.5522 13.9302 16C13.9302 15.4478 13.4824 15 12.9302 15Z"
                      fill="#ABABAB"
                    />
                    <path
                      d="M21.2402 22.2402C21.7925 22.2402 22.2402 21.793 22.2402 21.2402C22.2402 20.6875 21.7925 20.2402 21.2402 20.2402H16.4199C15.8677 20.2402 15.4199 20.6875 15.4199 21.2402C15.4199 21.793 15.8677 22.2402 16.4199 22.2402H21.2402Z"
                      fill="#ABABAB"
                    />
                    <path
                      d="M16 9.75732H10.7573C10.2051 9.75732 9.75732 10.2051 9.75732 10.7573C9.75732 11.3096 10.2051 11.7573 10.7573 11.7573H16C16.5522 11.7573 17 11.3096 17 10.7573C17 10.2051 16.5522 9.75732 16 9.75732Z"
                      fill="#ABABAB"
                    />
                    <path
                      d="M28.293 2.29297L24.6084 5.97754L20.5337 2.26123C20.3493 2.08581 20.1019 2.02777 19.8599 2H6.9502C5.04785 2 3.5 3.54785 3.5 5.4502C3.5 5.4502 3.51801 26.8792 3.54242 27.0435L2.29297 28.293C1.90234 28.6836 1.90234 29.3164 2.29297 29.707C2.48828 29.9023 2.74414 30 3 30C3.25586 30 3.51172 29.9023 3.70703 29.707L29.707 3.70703C30.0977 3.31641 30.0977 2.68359 29.707 2.29297C29.3164 1.90234 28.6836 1.90234 28.293 2.29297ZM21.735 8.85089C21.2197 8.62592 20.8599 8.12744 20.8599 7.54004V5.26562L23.1927 7.39319L21.735 8.85089ZM5.5 5.4502C5.5 4.65039 6.15039 4 6.9502 4H18.8599V7.54004C18.8599 8.67267 19.414 9.68213 20.2733 10.3127L5.5 25.0859V5.4502Z"
                      fill="#ABABAB"
                    />
                  </svg>
                  <p className="text-gray-400"> No Item added to the cart</p>
                </div>
              )}

              {Array.isArray(cart) &&
                cart.map((product, index) => {
                  return (
                    <div key={index}>
                      <div className="grid grid-cols-4 w-full  pl-2 pr-5 py-3">
                        <div className="flex col-span-2 gap-3 items-center">
                          <Image
                            width={60}
                            height={70}
                            src={product.image}
                            alt={product.name}
                          />
                          <div>
                            <p className="font-bold">{product.name}</p>
                            <p>${product.price}</p>
                          </div>
                        </div>
                        <div className="col-span-1 text-right pt-2">
                          {product.quantity}
                        </div>
                        <div className="flex gap-4 justify-end pt-2 col-span-1">
                          ${product.price * product.quantity}
                          <div
                            className="col-span-1 pt-0.5 cursor-pointer"
                            onClick={() => handleRemoveFromCart(product.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="17"
                            >
                              <path
                                fill="red"
                                fill-rule="evenodd"
                                d="M.577 5.823a2.375 2.375 0 0 1 2.35-2.718h6.516a2.375 2.375 0 0 1 2.35 2.718l-1.242 8.519a2.375 2.375 0 0 1-2.35 2.032H4.17c-1.18 0-2.18-.865-2.35-2.032L.576 5.823Zm2.35-1.3a.958.958 0 0 0-.948 1.096l1.242 8.518c.069.471.473.82.949.82H8.2c.477 0 .88-.349.949-.82l1.242-8.518a.958.958 0 0 0-.948-1.097H2.927ZM3.995 1.5c0-.392.317-.709.709-.709h2.963a.708.708 0 0 1 0 1.417H4.704a.708.708 0 0 1-.709-.709Z"
                                clip-rule="evenodd"
                              />
                              <path
                                fill="red"
                                fill-rule="evenodd"
                                d="M3.892 7.764a.5.5 0 0 1 .566.424l.74 5.185a.5.5 0 1 1-.99.142l-.74-5.185a.5.5 0 0 1 .424-.566Zm3.704 6.174a.5.5 0 0 1-.424-.566l.74-5.185a.5.5 0 0 1 .99.141l-.74 5.186a.5.5 0 0 1-.566.424Zm-1.411.005a.5.5 0 0 1-.5-.5V8.258a.5.5 0 0 1 1 0v5.185a.5.5 0 0 1-.5.5Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {cart.length !== 0 && (
                <div className="flex justify-between items-center px-7 py-3 bg-gray-200">
                  <button
                    className="py-1 px-3 text-sm cursor-pointer bg-gray-500 text-white rounded-md font-medium hover:bg-gray-700 transition duration-500"
                    onClick={() => handleEmptyCart()}
                  >
                    Empty Cart
                  </button>
                  <div>Total: ${total}</div>
                </div>
              )}

              <div className="text-right py-3 px-4">
                <button
                  type="button"
                  onClick={() => toggleModal()}
                  className="py-2 px-4 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-700 transition duration-500"
                >
                  Close
                </button>
                {cart.length !== 0 && (
                  <button
                    type="button"
                    className="py-2 px-4 bg-green-500 text-white rounded-md font-medium hover:bg-green-700 ml-2 transition duration-500"
                  >
                    Check Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
