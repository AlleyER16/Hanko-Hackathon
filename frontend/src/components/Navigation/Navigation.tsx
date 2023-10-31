import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  // fastFoodOutline,
  pizzaOutline,
  cartOutline,
  personOutline,
} from "ionicons/icons";

import { tRootState } from "../../store";

const Navigation = () => {
  const loggedIn = useSelector((state: tRootState) => state.auth.loggedIn);
  const cart = useSelector((state: tRootState) => state.cart.cart);

  return (
    <div className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              <IonIcon icon={homeOutline} /> Home
            </Link>
          </li>
          {/* <li className="navigation__item">
            <Link to="/top-dishes" className="navigation__link">
              <IonIcon icon={fastFoodOutline} /> Top Dishes
            </Link>
          </li> */}
          <li className="navigation__item">
            <Link to="/catalog" className="navigation__link">
              <IonIcon icon={pizzaOutline} /> Catalog
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/cart" className="navigation__link">
              <IonIcon icon={cartOutline} /> Cart{" "}
              {cart.length ? <span>{cart.length}</span> : null}
            </Link>
          </li>
          {loggedIn ? (
            <>
              <li className="navigation__item">
                <Link to="/cart" className="navigation__link">
                  <IonIcon icon={cartOutline} /> Orders
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/profile" className="navigation__link">
                  <IonIcon icon={personOutline} /> Profile
                </Link>
              </li>
            </>
          ) : (
            <li className="navigation__item">
              <Link to="/sign-in" className="navigation__link">
                <IonIcon icon={personOutline} /> Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
