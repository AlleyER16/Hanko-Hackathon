import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";

import { tRootState } from "../../store";

import useData from "../../hooks/useData/useData";

import Navigation from "../../components/Navigation/Navigation";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import VerticalBarLoader from "../../loaders/VerticalBarLoader/VerticalBarLoader";
import TopDish from "../../components/TopDish/TopDish";

import foodBg2 from "../../assets/img/food-bg-2.avif";
import foodBg4 from "../../assets/img/food-bg-4.avif";

const TopDishes = () => {
  const topDishes = useSelector((state: tRootState) => state.cache.topDishes);

  const { fetchTopDishes } = useData();

  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTopDishes().catch(() => {
      setError(true);
    });
  }, [fetchTopDishes]);

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
          {!error && !topDishes ? <VerticalBarLoader /> : null}
          {error ? (
            <div className="text-center">Error fetching data. Reload Page</div>
          ) : null}
          <div className="top-dishes">
            {topDishes?.map((meal, i) => (
              <TopDish {...meal} right={i % 2 !== 0} key={i} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
};

export default TopDishes;
