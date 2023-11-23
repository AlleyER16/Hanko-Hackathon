import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";

import api_client from "../../api/client";

import { tRootState } from "../../store";
import { tOrders } from "../../store/types/app.types";

import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import VerticalBarLoader from "../../loaders/VerticalBarLoader/VerticalBarLoader";
import OrderItem from "../../components/OrderItem/OrderItem";

import foodBg2 from "../../assets/img/food-bg-2.avif";
import foodBg4 from "../../assets/img/food-bg-4.avif";

const Orders = () => {
  const accessToken = useSelector(
    (state: tRootState) => state.auth.accessToken
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchInterval = useRef<number | null>(null);

  const [reload, setReload] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [division] = useState<number>(5);

  // const [numRecords, setNumRecords] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [orders, setOrders] = useState<tOrders>([]);

  useEffect(() => {
    if (fetchInterval.current) window.clearInterval(fetchInterval.current);

    setLoading(true);
    setError(false);

    fetchInterval.current = window.setInterval(() => {
      api_client({
        url: `/orders?page=${page}&division=${division}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          // setNumRecords(res.data.meta_data.num_records);
          setPagination(res.data.meta_data.pagination);

          setOrders(res.data.data);
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
  }, [accessToken, page, division, reload]);

  return (
    <>
      <Navigation />
      <header className="header-2 header-2--full">
        <div className="header-2__content header-2__content--1">
          <div className="cart-block cart-block--order">
            <h3 className="cart-block__heading">Orders</h3>
            <div className="cart-block__products">
              <table className="cart-table cart-table--order">
                <tbody>
                  {loading ? (
                    <tr>
                      <td>
                        <VerticalBarLoader />
                      </td>
                    </tr>
                  ) : null}
                  {error ? (
                    <tr>
                      <td className="text-center mb-large">
                        Error fetching meals.{" "}
                        <span
                          className="link"
                          onClick={() => setReload((rl) => !rl)}
                        >
                          Reload
                        </span>
                      </td>
                    </tr>
                  ) : null}
                  {!loading && !error && page === 1 && !orders.length ? (
                    <tr>
                      <td className="text-center mb-large">
                        You have no orders at the moment
                      </td>
                    </tr>
                  ) : null}
                  {!loading && !error && orders.length
                    ? orders.map((order) => (
                        <OrderItem {...order} key={order._id} />
                      ))
                    : null}
                </tbody>
              </table>

              {page !== 1 || orders.length ? (
                <div className="pagination mt-medium">
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
                      <button onClick={() => setPage(pagination)}>
                        &#187;
                      </button>
                    </>
                  ) : null}
                </div>
              ) : null}

              <span className="cart-block__products-label">Bought</span>
              <p className="cart-block__products-info">Your Orders</p>
            </div>
          </div>
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
      <Footer />
    </>
  );
};

export default Orders;
