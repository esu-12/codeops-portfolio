
interface EventFiltersProps {
  category: string;
  location: string;
  isPublished: string;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPublishedChange: (value: string) => void;
  categories: string[];
  locations: string[];
}

export default function EventFilters({
  category,
  location,
  isPublished,
  onCategoryChange,
  onLocationChange,
  onPublishedChange,
  categories,
  locations,
}: EventFiltersProps) {
  return (
    <div className="event-filters">
      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location-filter">Location</label>
        <select
          id="location-filter"
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
        >
          <option value="">All locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="published-filter">Publication status</label>
        <select
          id="published-filter"
          value={isPublished}
          onChange={(event) => onPublishedChange(event.target.value)}
        >
          <option value="">All events</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
      </div>
    </div>
  );
}
