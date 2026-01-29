import { useState, useEffect } from "react";

const SearchBar = ({ onSearch, resultCount = 0, searchQuery = "" }) => {
  const [query, setQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query.trim());
    }, 400);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search articles by title, description, or content..."
            className="w-full px-4 py-3 pl-12 pr-24 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search articles"
          />

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {isFocused && !query && (
          <div className="absolute z-10 w-full mt-1 p-3 bg-gray-50 border rounded-md text-sm text-gray-600">
            <p className="font-medium mb-1">Search tips:</p>
            <ul className="list-disc list-inside">
              <li>Search by title, description, or content</li>
              <li>Live search while typing</li>
              <li>Press Esc to clear</li>
            </ul>
          </div>
        )}

        {searchQuery && (
          <div className="mt-2 text-sm">
            {resultCount > 0 ? (
              <div className="flex justify-between items-center text-gray-700">
                <span>
                  ✅ {resultCount} result{resultCount > 1 && "s"} found for{" "}
                  <strong>“{searchQuery}”</strong>
                </span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-blue-600 hover:underline"
                >
                  Clear
                </button>
              </div>
            ) : (
              <p className="text-red-600 font-medium">
                ❌ No results found for “{searchQuery}”
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
