import "./product-card.scss";
import Button from "../button/Button.component";
import { CartContext } from "../../contexts/Cart.context";
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const { id, name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);
  const addToCart = () => {
    addItemToCart({ ...product, quantity: 1 });
  };
  return (
    <div id={`product-${id}`} className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
