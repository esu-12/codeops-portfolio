import Dish from "./Dish.jsx";

function Header() {
  return (
    <header>
      <h1>Addis Eats</h1>
      <p>Authentic Ethiopian food</p>
    </header>
  );
}

function App() {
  const dishes = [
    {
      id: 1,
      name: "Doro Wat",
      price: 250
    },
    {
      id: 2,
      name: "Shiro",
      price: 120
    },
    {
      id: 3,
      name: "Kitfo",
      price: 350
    },
    {
      id: 4,
      name: "Tibs",
      price: 300
    }
  ];

  return (
    <>
      <Header />

      <main>
        <h2>Our Menu</h2>

        {dishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
          />
        ))}
      </main>
    </>
  );
}

export default App;