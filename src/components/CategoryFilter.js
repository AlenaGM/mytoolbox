import CATEGORIES from "../data/categories";

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside className="category">
      <ul className="category__list">
        <li className="category__list_item">
          <button
            className="btn btn__category_all"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category__list_item">
            <button
              className="btn btn__category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
