import Dish from "./Dish";
import Card from "./Card";

function DishList({ dishes, dispatch }) {
  const images = {
    "Classic Doro Wat": "/images/doro-wat.jpg",
    "Prime Siga Wat (Beef Stew)": "/images/Prime Siga Wat (Beef Stew).jpg",
    "Beg Alicha Wat (Mild Lamb Stew)": "/images/Beg Alicha Wat (Mild Lamb Stew).jpg",
    "Spicy Quanta Firfir": "/images/Spicy Quanta Firfir.jpg",
    "Highland Red Misir Wat": "/images/Highland Red Misir Wat.jpg",

    "Crisp Siga Derek Tibs": "/images/Crisp Siga Derek Tibs.jpg",
    "Awaze Lamb Tibs": "/images/Awaze Lamb Tibs.jpg",
    "Lake Tana Crispy Fish Tibs": "/images/Lake Tana Crispy Fish Tibs.jpg",
    "Addis Style Dulet": "/images/Addis Style Dulet.jpg",

    "Prime Beef Kitfo": "/images/Prime Beef Kitfo.jpg",
    "Highland Gored Gored": "/images/Highland Gored Gored.jpg",
    "Fresh Timatim Fitfit": "/images/Fresh Timatim Fitfit.jpg",

    "Golden Kik Alicha": "/images/Golden Kik Alicha.jpg",
    "Braised Ye'abesha Gomen": "/images/Braised Ye'abesha Gomen.jpg",
    "Clay-Pot Shiro Tegamino": "/images/Clay-Pot Shiro Tegamino.jpg",
    "Shiro Bozena (Beef Enriched Shiro)": "/images/Shiro Bozena (Beef Enriched Shiro).jpg",

    "House Fermented Tej (500ml Carafe)": "/images/House Fermented Tej (500ml Carafe).jpg",
    "Highland Spiced Shai": "/images/Highland Spiced Shai.jpg",
    "Traditional Jebena Coffee": "/images/Traditional Jebena Coffee.jpg",
  };

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
            image={images[dish.nameEn] || "/images/shiro.jpg"}
          />
        </Card>
      ))}
    </section>
  );
}

export default DishList;