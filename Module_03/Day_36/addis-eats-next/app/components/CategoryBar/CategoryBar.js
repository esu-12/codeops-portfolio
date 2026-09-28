import "./CategoryBar.css";

export default function CategoryBar() {
  const categories = [
    "All",
    "Traditional Stews & Wat",
    "Tibs & Grills",
    "Raw & Cured Delicacies / Kitfo",
    "Fasting & Vegan / Tsom",
    "Beverages & Tej",
  ];

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button key={category} type="button">
          {category}
        </button>
      ))}
    </div>
  );
}