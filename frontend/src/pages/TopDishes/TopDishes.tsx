import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";

import Navigation from "../../components/Navigation/Navigation";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";

import foodBg2 from "../../assets/img/food-bg-2.avif";
import foodBg4 from "../../assets/img/food-bg-4.avif";

const TopDishes = () => {
  return (
    <>
      <Navigation />
      <header className="header-2">
        <div className="header-2__content">
          <h1 className="header__heading">Top Dishes</h1>
        </div>
        <div className="header-2__main">
          <div className="header-block header-block--1">
            <img src={foodBg2} alt="" className="header-block__img" />
          </div>
          <div className="header-block header-block--2">
            <img src={foodBg4} alt="" className="header-block__img" />
            <div className="header-2__menu">
              <div className="header-menu header-menu--shadow">
                <div className="header-menu__icon-block">
                  <IonIcon icon={callOutline} />
                </div>
                (+234) 907 319 3054
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="section">
        <div className="container section__container">
          <div className="top-dishes"></div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
};

export default TopDishes;
