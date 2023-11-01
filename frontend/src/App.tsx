import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./hoc/ScrollToTop/ScrollToTop";

import Home from "./pages/Home/Home";
import TopDishes from "./pages/TopDishes/TopDishes";
import Catalog from "./pages/Catalog/Catalog";
import Meal from "./pages/Meal/Meal";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-dishes" element={<TopDishes />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/meal/:id" element={<Meal />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
