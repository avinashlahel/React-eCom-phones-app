import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import Cart from "./components/cart/Cart";
import Default from "./components/Default";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProductProvider } from "./context";
import Modal from "./components/Modal";

import "./styles.css";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ProductProvider>
    <Router>
      <App />
    </Router>
  </ProductProvider>,
  rootElement
);
