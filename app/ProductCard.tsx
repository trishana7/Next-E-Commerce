import { Product } from "./Navigation";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div key={product.id}>
    <h2>{product.name}</h2>
    <p>{product.price}</p>
  </div>
);
export default ProductCard;
