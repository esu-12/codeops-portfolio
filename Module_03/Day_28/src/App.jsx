import Menu from "./Menu.jsx";
import dishes from "./data.js";
import OrderForm from "./OrderForm.jsx";
import "./App.css";

function App() {
  const category = "All";

  return (
    <main>
      <header>
        <h1>Addis Eats</h1>
        <p>Authentic Ethiopian food</p>
      </header>

      <h2>Our Menu</h2>

      <Menu dishes={dishes}/>
      <OrderForm/>
    </main>
  );
}

export default App;