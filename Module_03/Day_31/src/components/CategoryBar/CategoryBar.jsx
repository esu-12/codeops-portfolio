function CategoryBar({ category, onSelect }) {
  const categories = [
    "All",
    "Traditional Stews & Wat",
    "Tibs & Grills",
    "Fasting & Vegan / Tsom",
    "Raw & Cured Delicacies / Kitfo",
    "Beverages & Tej",
  ];

  return (
    <nav
      className="category-bar"
      aria-label="Menu categories"
    >
      {categories.map((categoryName) => (
        <button
          key={categoryName}
          type="button"
          className={
            category === categoryName
              ? "selected"
              : ""
          }
          onClick={() => onSelect(categoryName)}
        >
          {categoryName}
        </button>
      ))}
    </nav>
  );
}

export default CategoryBar;