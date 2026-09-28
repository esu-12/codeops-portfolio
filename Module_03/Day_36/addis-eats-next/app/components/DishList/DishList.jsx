import Link from "next/link";
import "./DishList.css";

const dishes = [
  {
    id: "menu-1",
    name: "Classic Doro Wat",
    category: "Traditional Stews & Wat",
    price: 650,
  },
  {
    id: "menu-6",
    name: "Crisp Siga Derek Tibs",
    category: "Tibs & Grills",
    price: 700,
  },
];

export default function DishList() {
  return (
    <ul className="dish-list">
      {dishes.map((dish) => (
        <li className="dish-card" key={dish.id}>
          <h3>
            <Link href={`/menu/${dish.id}`}>
              {dish.name}
            </Link>
          </h3>

          <p className="dish-category">{dish.category}</p>

          <p className="dish-price">{dish.price} ETB</p>
        </li>
      ))}
    </ul>
  );
}

export { dishes };