function CategoryBar({ category, onSelect }) {
  const categories = [
    "All",
    "Traditional Stews & Wat",
    "Tibs & Grills",
    "Raw & Cured Delicacies / Kitfo",
    "Fasting & Vegan / Tsom",
    "Beverages & Tej",
  ];

  return (
    <nav>
      {categories.map((categoryName) => (
        <button
          key={categoryName}
          className={category === categoryName ? "selected" : ""}
          onClick={() => onSelect(categoryName)}
        >
          {categoryName}
        </button>
      ))}
    </nav>
  );
}

export default CategoryBar;