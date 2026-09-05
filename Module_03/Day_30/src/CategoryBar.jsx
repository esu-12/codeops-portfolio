

function CategoryBar({category, onSelect}) {
    const categories = ["All", "Wat", "Meat"];

    return (
        <nav>
            {categories.map((categoryName) => (
                <button key={categoryName}
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