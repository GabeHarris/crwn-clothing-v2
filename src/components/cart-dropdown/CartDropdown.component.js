import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/Cart.context";
import CartItem from "../cart-item/CartItem.component";
import "./cart-dropdown.scss";

const CartDropdown = () => {
  const { cartItems, toggleIsCartOpen } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>
          <Link
            to="/checkout"
            className="button-container"
            onClick={toggleIsCartOpen}
          >
            Go To Checkout
          </Link>
        </Fragment>
      ) : (
        <div className="empty-message">Your cart is empty</div>
      )}
    </div>
  );
};

export default CartDropdown;
