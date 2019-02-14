import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
const ProductConsumer = ProductContext.Consumer;

class ProductProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: { ...detailProduct },
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0
    };
  }

  incrementProduct = id => {
    let modifiedCart = this.state.cart.map(item => {
      let tempItem = { ...item };
      if (tempItem.id === id) {
        tempItem.count += 1;
        tempItem.total = tempItem.count * tempItem.price;
      }
      return tempItem;
    });
    this.setState({ cart: modifiedCart }, () => this.addTotals());
  };

  decrementProduct = id => {
    let markedForDelete = false;
    var modifiedCart = this.state.cart.map(item => {
      let tempItem = { ...item };
      if (tempItem.id === id) {
        tempItem.count -= 1;
        tempItem.total = tempItem.count * tempItem.price;
        if (tempItem.count === 0) markedForDelete = true;
      }
      return tempItem;
    });
    this.setState({ cart: modifiedCart }, () => {
      if (markedForDelete) this.removeProduct(id);
      this.addTotals();
    });
  };

  removeProduct = id => {
    let filteredCart = this.state.cart.filter(item => item.id !== id);
    let refreshedProducts = [];
    this.state.products.forEach(item => {
      let tempItem = { ...item };
      if (id === tempItem.id) {
        tempItem.inCart = false;
        tempItem.total = 0;
        tempItem.count = 0;
      }
      refreshedProducts = [...refreshedProducts, tempItem];
    });
    this.setState({ products: refreshedProducts, cart: filteredCart }, () =>
      this.addTotals()
    );
  };

  clearCart = () => {
    this.setState({ cart: [] }, () => {
      this.setProducts();
      this.addTotals();
    });
  };

  handleDetail = id => {
    let product = this.getItem(id);
    this.setState({ detailProduct: product });
  };

  addToCart = id => {
    let arrayWithMod = [];
    let cartWithMod = [];
    this.state.products.forEach(item => {
      let tempItem = { ...item };
      if (tempItem.id === id) {
        tempItem.inCart = true;
        tempItem.count = 1;
        tempItem.total = tempItem.price;
        cartWithMod = [...this.state.cart, tempItem];
      }
      arrayWithMod = [...arrayWithMod, tempItem];
    });
    this.setState({ products: arrayWithMod, cart: cartWithMod }, () =>
      this.addTotals()
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.forEach(item => {
      subTotal += item.total;
    });
    let tax = parseFloat((subTotal * 0.1).toFixed(2));
    let finalTotal = subTotal + tax;
    this.setState({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: finalTotal
    });
  };

  getItem = id => this.state.products.find(item => item.id === id);

  openModal = id => {
    let product = this.getItem(id);
    this.setState({ modalOpen: true, modalProduct: product });
  };

  closeModal = () => this.setState({ modalOpen: false });

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let products = [];
    storeProducts.forEach(item => {
      let tempItem = { ...item };
      products = [...products, tempItem];
    });
    this.setState({ products });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          incrementProduct: this.incrementProduct,
          decrementProduct: this.decrementProduct,
          removeProduct: this.removeProduct,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export { ProductProvider, ProductConsumer };
