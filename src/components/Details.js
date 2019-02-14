import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {val => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = val.detailProduct;
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center my-5 text-slanted text-blue">
                  <h1>{title}</h1>
                </div>
              </div>

              <div className="row">
                <div className="col-10 col-md-6 mx-auto my-3 text-capitalize">
                  <img src={img} alt="product" className="img-fluid" />
                </div>
                <div className="col-10 col-md-6 mx-auto my-3 text-capitalize">
                  <h2>model: {title}</h2>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by: <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price: <span>$</span> {price}
                    </strong>
                  </h4>
                  <p className="font-weight-bold mt-3 mb-0 text-capitalize">
                    some info about the product:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/*Buttons*/}
                  <Link to="/">
                    <ButtonContainer>back to Products</ButtonContainer>
                  </Link>
                  <ButtonContainer
                    yellow
                    disabled={inCart ? true : false}
                    onClick={() => val.addToCart(id)}
                  >
                    {inCart ? "in cart" : "add to cart"}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
