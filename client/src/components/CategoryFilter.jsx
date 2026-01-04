function CategoryFilter({ selectedCategory, onCategoryChange, categories, t }) {
  return (
    <div className="bg-white p-6 rounded shadow-sm mb-10 border border-cream-dark">
      <h3 className="font-serif font-light text-xl mb-4 text-brown-dark">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-5 py-2 rounded font-light transition ${
            selectedCategory === null
              ? 'bg-gold text-white'
              : 'border border-cream-dark text-brown hover:border-gold'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-5 py-2 rounded font-light transition ${
              selectedCategory === cat
                ? 'bg-gold text-white'
                : 'border border-cream-dark text-brown hover:border-gold'
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
