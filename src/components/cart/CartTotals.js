import React from "react";
import { Link } from "react-router-dom";
import PayPalButton from "./PayPalButton";

export default function CartTotals({ value, history }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 col-lg-12 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-danger text-uppercase mb-3"
                onClick={() => clearCart()}
              >
                Clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span> $ {cartSubTotal}
            </h5>
            <h5>
              <span className="text-title">tax :</span> $ {cartTax}
            </h5>
            <h5>
              <span className="text-title">total :</span> $ {cartTotal}
            </h5>
            <PayPalButton
              total={cartTotal}
              clearCart={clearCart}
              history={history}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
