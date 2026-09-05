import { useContext } from "react";
import Menu from "./Menu.jsx";
import OrderForm from "./OrderForm.jsx";
import "./App.css";
import { CartContext } from "./cart/CartProvider.jsx";

function App() {
  const { items } = useContext(CartContext);




  return (
    <main>
      <header>
        <h1>Addis Eats</h1>
        <p>Authentic Ethiopian food</p>

          <div>
            🛒 Cart: {items.length}
          </div>
      </header>

      <h2>Our Menu</h2>

      <Menu />

      <OrderForm />
    </main>
  );
}

export default App;