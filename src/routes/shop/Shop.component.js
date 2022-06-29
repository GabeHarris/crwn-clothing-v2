import { useContext } from "react";
import { ProductsContext } from "../../contexts/Products.context";
import ProductCard from "../../components/product-card/ProductCard.component";
import "./shop.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  // console.log(products);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Shop;
