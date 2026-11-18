
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="event-search">Search events</label>

      <input
        id="event-search"
        type="search"
        placeholder="Search by event title..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
