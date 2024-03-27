"use client";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Navigation: React.FC = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length === 0) {
      fetch("https://mocki.io/v1/7f936757-c373-48a3-b727-0a0365f4726d")
        .then((res) => res.json())
        .then((data: Product[]) => {
          console.log(data);
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [products]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-green-100/30 h-3/4 w-3/4 rounded-xl backdrop-blur-xl">
        {Array.isArray(products) &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Navigation;
