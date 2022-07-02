import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/Cart.context";
import Button from "../button/Button.component";
import CartItem from "../cart-item/CartItem.component";
import "./cart-dropdown.scss";

const CartDropdown = () => {
  const { cartItems, toggleIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    toggleIsCartOpen();
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>
          <Button className="button-container" onClick={goToCheckoutHandler}>
            Go To Checkout
          </Button>
        </Fragment>
      ) : (
        <div className="empty-message">Your cart is empty</div>
      )}
    </div>
  );
};

export default CartDropdown;
