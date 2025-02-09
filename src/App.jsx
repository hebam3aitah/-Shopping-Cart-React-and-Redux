import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";


const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">React Redux Shopping Cart</h1>
      <ProductList />
      <Cart />
    </div>
  );
};

export default App;
