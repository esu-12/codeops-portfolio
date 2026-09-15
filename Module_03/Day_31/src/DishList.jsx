import Dish from "./Dish";
import Card from "./Card";

function DishList({ dishes, dispatch }) {
  return (
    <section className="dish-list">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            id={dish.id}
            name={dish.nameEn}
            price={dish.priceETB}
            spicy={dish.spiceLevel !== "Mild"}
            dispatch={dispatch}
          />
        </Card>
      ))}
    </section>
  );
}

export default DishList;