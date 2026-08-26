import Dish from "./Dish.jsx";
import Card from "./Card.jsx";

function Menu({ dishes, category }) {
  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  if (filteredDishes.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <section>
      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        </Card>
      ))}
    </section>
  );
}

export default Menu;