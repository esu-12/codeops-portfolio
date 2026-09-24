function SearchBar({ value, onChange }) {
  return (
    <div className="search-row">
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          placeholder="Search dishes by name (e.g. Kitfo, Shiro, Tibs, Doro Wat)..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>

      <div className="quick-tags" aria-label="Menu highlights">
        <span>🌾 100% Pure Teff Injera</span>
        <span>🌱 Fasting / Tsom Friendly</span>
        <span>🌶 Berbere Spiced</span>
      </div>
    </div>
  );
}

export default SearchBar;
