import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import { DataProvider } from "../../context/GlobalState";
import { Toaster } from "react-hot-toast";
import Cart from "../cart/Cart";

const Layout = () => {
  return (
    <DataProvider>
      <Fragment>
        <Header />
        <div>
          <Routers />
          <Cart />
        </div>
        <Footer />
      </Fragment>
      <Toaster position="top-center" reverseOrder={false} />
    </DataProvider>
  );
};

export default Layout;
