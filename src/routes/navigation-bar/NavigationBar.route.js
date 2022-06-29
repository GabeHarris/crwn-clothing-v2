import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/User.context";
import { signOutUser } from "../../utils/firebase.utils";
import "./navigation.scss";

const NavigationBar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Fragment>
      <header>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <CrwnLogo className="logo" />
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
              Shop
            </Link>
            {currentUser ? (
              <span
                className="nav-link"
                onClick={async () => await signOutUser()}
              >
                Sign Out
              </span>
            ) : (
              <Link className="nav-link" to="/auth">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default NavigationBar;
