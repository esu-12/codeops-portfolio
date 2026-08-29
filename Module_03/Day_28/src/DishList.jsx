import Dish from "./Dish";
import Card from "./Card";

function DishList({ dishes }) {
  return (
    <section className="dish-list">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            image={dish.image}
          />
        </Card>
      ))}
    </section>
  );
}

export default DishList;