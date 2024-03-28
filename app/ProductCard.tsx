import { Product } from "./Navigation";
import Image from "next/image";
interface ProductCartProp {
  product: Product;
  isMiddleSlide: boolean;
  handleAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCartProp> = ({
  product,
  isMiddleSlide,
  handleAddToCart,
}) => (
  <div className="relative" key={product.id}>
    <div className="flex items-center justify-center">
      <Image
        className={`duration-500 ease-in-out ${
          isMiddleSlide ? "h-56 w-56" : "h-32 w-32 mt-20"
        }`}
        width={240}
        height={300}
        src={product.image}
        alt={product.name}
      />
    </div>
    <div
      className={`${
        isMiddleSlide
          ? "absolute bg-white/20 -ml-9 p-4 rounded-full backdrop-blur-3xl duration-300 translate-y-10 justify-between w-80"
          : "justify-center"
      }  text-white flex items-center`}
    >
      <div className="pl-4">
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
