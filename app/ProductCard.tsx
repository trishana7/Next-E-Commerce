import { Product } from "./Navigation";
import Image from "next/image";
const handleAddToCart = (product: Product) => {
  console.log("hello", product);
};
const ProductCard: React.FC<{ product: Product; isMiddleSlide: boolean }> = ({
  product,
  isMiddleSlide,
}) => (
  <div className="relative" key={product.id}>
    <Image width={400} height={700} src={product.image} alt={product.name} />
    <div
      className={`${
        isMiddleSlide
          ? "absolute bg-white/20 -ml-10 p-4 rounded-full backdrop-blur-3xl duration-300 translate-y-10 justify-between w-80"
          : "justify-center"
      }  text-white flex items-center`}
    >
      <div>
        <p
          className={`${
            !isMiddleSlide ? "text-center text-sm" : "text-base"
          } font-medium`}
        >
          {product.name}
        </p>
        <p
          className={`${
            !isMiddleSlide ? "text-center  text-base" : "text-xl"
          } font-bold`}
        >
          ${product.price}
        </p>
      </div>
      {isMiddleSlide && (
        <button
          className="text-black text-sm bg-white p-2 rounded-full"
          onClick={() => handleAddToCart(product)}
        >
          + Add to Cart
        </button>
      )}
    </div>
  </div>
);
export default ProductCard;
