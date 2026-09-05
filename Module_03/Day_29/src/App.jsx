import Menu from "./Menu.jsx";
import OrderForm from "./OrderForm.jsx";
import "./App.css";

function App() {
  return (
    <main>
      <header>
        <h1>Addis Eats</h1>
        <p>Authentic Ethiopian food</p>
      </header>

      <h2>Our Menu</h2>

      <Menu />

      <OrderForm />
    </main>
  );
}

export default App;