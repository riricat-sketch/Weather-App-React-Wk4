export default function SearchForm({ city, setCity, onSearch }) {
  return (
    <form onSubmit={onSearch}>
      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Enter city"
        aria-label="City name"
      />
      <button type="submit">Search</button>
    </form>
  );
}
