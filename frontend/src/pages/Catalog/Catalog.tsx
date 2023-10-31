import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import cls from "classnames";

import { IonIcon } from "@ionic/react";
import { closeOutline, filterOutline, callOutline } from "ionicons/icons";

import api_client from "../../api/client";

import { tRootState } from "../../store";
import { tMeals } from "../../store/types/app.types";

import useData from "../../hooks/useData/useData";

import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import Newsletter from "../../components/Newsletter/Newsletter";
import Product from "../../components/Product/Product";
import VerticalBarLoader from "../../loaders/VerticalBarLoader/VerticalBarLoader";

import { isNumber } from "../../utils/func";

import foodBg2 from "../../assets/img/food-bg-2.avif";
import foodBg4 from "../../assets/img/food-bg-4.avif";

const Catalog = () => {
  const mealTypes = useSelector((state: tRootState) => state.cache.mealTypes);

  const { fetchMealTypes } = useData();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchInterval = useRef<number | null>(null);

  const [reload, setReload] = useState(false);

  const [search, setSearch] = useState("");

  const [showFilterModal, setShowFilterModal] = useState(false);

  const [mealType, setMealType] = useState("");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");

  const [filter, setFilter] = useState<{
    mealType: string;
    minPrice: number | string;
    maxPrice: number | string;
  } | null>(null);

  const [page, setPage] = useState<number>(1);
  const [division] = useState<number>(12);

  // const [numRecords, setNumRecords] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [meals, setMeals] = useState<tMeals>([]);

  const handleFilter = () => {
    setShowFilterModal(false);

    setFilter({
      mealType,
      minPrice,
      maxPrice,
    });
  };

  useEffect(() => {
    if (fetchInterval.current) window.clearInterval(fetchInterval.current);

    setLoading(true);
    setError(false);

    let url = `/meals?page=${page}&division=${division}&search=${search}`;

    if (filter) {
      url += `${filter.mealType ? `&mealType=${filter.mealType}` : ""}${
        filter.minPrice ? `&minPrice=${filter.minPrice}` : ""
      }${filter.maxPrice ? `&maxPrice=${filter.maxPrice}` : ""}`;
    }

    fetchInterval.current = window.setInterval(() => {
      api_client({
        url,
        method: "GET",
      })
        .then((res) => {
          // setNumRecords(res.data.meta_data.num_records);
          setPagination(res.data.meta_data.pagination);

          setMeals(res.data.data);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
          if (fetchInterval.current)
            window.clearInterval(fetchInterval.current);
        });
    }, 3000);
  }, [filter, search, page, division, reload]);

  useEffect(() => {
    fetchMealTypes();
  }, [fetchMealTypes]);

  return (
    <>
      <Navigation />

      <>
        <div className={cls("modal", showFilterModal && "modal--open")}>
          <div className="modal__header">
            <h3 className="modal__heading">Filter Meals</h3>
            <div className="modal__actions">
              <span
                className="modal__action"
                onClick={() => setShowFilterModal(false)}
              >
                <IonIcon icon={closeOutline} />
              </span>
            </div>
          </div>
          <div className="modal__body">
            <div className="modal__form">
              <div className="form-group">
                <label>Meal Type</label>
                <select
                  className="form-select"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                >
                  <option value="">All</option>
                  {mealTypes.map((mealType) => (
                    <option key={mealType._id} value={mealType._id}>
                      {mealType.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="mb-small">Price Range</label>
                <div className="form-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Min. Price"
                      value={minPrice}
                      onChange={(e) =>
                        e.target.value
                          ? isNumber(e.target.value)
                            ? setMinPrice(e.target.value)
                            : null
                          : setMinPrice("")
                      }
                    />
                    <div className="form-label">Min. Price</div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Max. Price"
                      value={maxPrice}
                      onChange={(e) =>
                        e.target.value
                          ? isNumber(e.target.value)
                            ? setMaxPrice(e.target.value)
                            : null
                          : setMaxPrice("")
                      }
                    />
                    <div className="form-label">Max. Price</div>
                  </div>
                </div>
              </div>
              <button className="button button--filter" onClick={handleFilter}>
                <IonIcon icon={filterOutline} /> Filter Meals
              </button>
            </div>
          </div>
        </div>
        {showFilterModal ? (
          <div
            className="overlay"
            onClick={() => setShowFilterModal(false)}
          ></div>
        ) : null}
      </>

      <header className="header-2">
        <div className="header-2__content">
          <h1 className="header__heading">Catalog</h1>
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
          <div className="section__header section__header--1">
            <h3 className="section__heading">Meals</h3>
            <div className="section__actions">
              <div className="form-group section__action-search">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label className="form-label">Search</label>
              </div>
              <button
                className="button button--filter"
                onClick={() => setShowFilterModal(true)}
              >
                <IonIcon icon={filterOutline} /> Filter
              </button>
            </div>
          </div>
          {loading ? (
            <div className="mb-large">
              <VerticalBarLoader />
            </div>
          ) : null}
          {error ? (
            <div className="text-center mb-large">
              Error fetching meals.{" "}
              <span className="link" onClick={() => setReload((rl) => !rl)}>
                Reload
              </span>
            </div>
          ) : null}
          {!loading && !error && page === 1 && !meals.length ? (
            <div className="text-center mb-large">
              There are no meals at the moment
            </div>
          ) : null}
          {!loading && !error && meals.length ? (
            <div className="products-grid mb-large">
              {meals.map((meal) => (
                <Product {...meal} key={meal._id} />
              ))}
            </div>
          ) : null}
          {page !== 1 || meals.length ? (
            <div className="pagination">
              {page !== 1 ? (
                <>
                  <button onClick={() => setPage(1)}>&#171;</button>
                  <button onClick={() => setPage((page) => page - 1)}>
                    &#8249;
                  </button>
                </>
              ) : null}
              {page === pagination && page !== 1 ? (
                <button onClick={() => setPage((page) => page - 1)}>
                  {page - 1}
                </button>
              ) : null}
              <button className="active">{page}</button>
              {page < pagination ? (
                <button onClick={() => setPage((page) => page + 1)}>
                  {page + 1}
                </button>
              ) : null}
              {page !== pagination ? (
                <>
                  <button onClick={() => setPage((page) => page + 1)}>
                    &#8250;
                  </button>
                  <button onClick={() => setPage(pagination)}>&#187;</button>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Catalog;
