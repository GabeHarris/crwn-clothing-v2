import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import "./cart-icon.scss";
import { ReactComponent as ShoppingBag } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const { toggleIsCartOpen, cartCount } = useContext(CartContext);
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
