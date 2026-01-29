import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ onSearch, searchQuery = "", onLiveSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchTimeoutRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performLiveSearch = useCallback(
    (query) => {
      if (onLiveSearch) {
        onLiveSearch(query);
      }

      if (onSearch && query.trim()) {
        onSearch(query.trim());
      }
    },
    [onLiveSearch, onSearch],
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim().length > 0) {
      setIsLoading(true);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performLiveSearch(value);
      setIsLoading(false);

      if (value.trim().length > 0) {
        const mockResults = [
          { id: 1, title: "React Hooks Tutorial", category: "React" },
          { id: 2, title: "JavaScript Best Practices", category: "JavaScript" },
          { id: 3, title: "TypeScript for Beginners", category: "TypeScript" },
          { id: 4, title: "React Performance Optimization", category: "React" },
          {
            id: 5,
            title: "Modern JavaScript Features",
            category: "JavaScript",
          },
        ]
          .filter(
            (item) =>
              item.title.toLowerCase().includes(value.toLowerCase()) ||
              item.category.toLowerCase().includes(value.toLowerCase()),
          )
          .slice(0, 5);

        setSearchResults(mockResults);
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchQuery.trim());
      setIsSearchFocused(false);
      scrollToArticles();
    }
  };

  const scrollToArticles = () => {
    const articlesSection = document.getElementById("articles-section");
    if (articlesSection) {
      articlesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleArticlesClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToArticles();
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoriesClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const categoriesSection = document.querySelector(
      ".category-filter-section",
    );
    if (categoriesSection) {
      categoriesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      scrollToArticles();
    }
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    setSearchResults([]);
    if (onSearch) {
      onSearch("");
    }
    setIsSearchFocused(false);
  };

  const handleQuickSearch = (query) => {
    setLocalSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
    setIsSearchFocused(false);
    scrollToArticles();
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        if (localSearchQuery) {
          handleClearSearch();
        } else {
          setIsSearchFocused(false);
        }
        break;
      case "Enter":
        handleSearchSubmit(e);
        break;
      case "ArrowDown":
        if (searchResults.length > 0 && isSearchFocused) {
          e.preventDefault();
          const firstResult = document.querySelector(".search-result-item");
          if (firstResult) firstResult.focus();
        }
        break;
    }
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
      onClick: handleHomeClick,
      ariaLabel: "Go to homepage",
    },
    {
      name: "Articles",
      path: "#articles",
      onClick: handleArticlesClick,
      ariaLabel: "Scroll to articles section",
    },
    {
      name: "Categories",
      path: "#categories",
      onClick: handleCategoriesClick,
      ariaLabel: "Scroll to categories filter",
    },
  ];

  const popularSearches = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "CSS",
    "Tailwind",
    "Next.js",
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all ${
          isScrolled ? "bg-white/95 backdrop-blur shadow-lg" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            aria-label="TechInsights Blog Home"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                <span className="text-blue-400">Tech</span>Blog
              </h2>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={link.onClick}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition group relative"
                aria-label={link.ariaLabel}
              >
                {link.name}
                {link.name === "Articles" && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                )}
              </a>
            ))}
          </nav>

          <div className="hidden md:block relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={localSearchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search articles..."
                className="w-64 px-4 py-2.5 pl-11 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                aria-label="Search articles with live results"
                aria-describedby="live-search-hint"
              />

              <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {isLoading && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}

              {localSearchQuery && !isLoading && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </form>

            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
                {localSearchQuery ? (
                  <>
                    <div className="p-3 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Live Results
                        </h3>
                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                          {searchResults.length} found
                        </span>
                      </div>

                      {isLoading ? (
                        <div className="py-4 text-center">
                          <div className="inline-block w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                          <p className="text-xs text-gray-500 mt-2">
                            Searching...
                          </p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-1">
                          {searchResults.map((result) => (
                            <button
                              key={result.id}
                              onClick={() => handleQuickSearch(result.title)}
                              className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 search-result-item"
                              aria-label={`Search for ${result.title}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-800">
                                  {result.title}
                                </span>
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                  {result.category}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="py-3 text-center">
                          <p className="text-sm text-gray-600">
                            No results found
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Try different keywords
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
                      >
                        Search for "{localSearchQuery}"
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleQuickSearch(term)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`Search for ${term}`}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Quick Actions
                      </h3>
                      <div className="space-y-2">
                        <button
                          onClick={handleArticlesClick}
                          className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm text-gray-700 flex items-center"
                          aria-label="Scroll to articles section"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                          Browse All Articles
                        </button>

                        <button
                          onClick={handleCategoriesClick}
                          className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm text-gray-700 flex items-center"
                          aria-label="Scroll to categories filter"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                          Filter by Categories
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={link.onClick}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-blue-600 transition flex items-center"
                  aria-label={link.ariaLabel}
                >
                  {link.name === "Articles" && (
                    <svg
                      className="w-4 h-4 mr-3 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  )}
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="relative" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 pl-11 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  aria-label="Search articles"
                />

                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </form>

              {isSearchFocused &&
                localSearchQuery &&
                searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-10">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Results
                        </h3>
                        <span className="text-xs text-gray-500">
                          {searchResults.length} found
                        </span>
                      </div>
                      <div className="space-y-1">
                        {searchResults.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => {
                              handleQuickSearch(result.title);
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-800">
                                {result.title}
                              </span>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                {result.category}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleArticlesClick}
                className="w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg flex items-center justify-center"
                aria-label="Scroll to articles section"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                View All Articles
              </button>

              <button
                onClick={handleCategoriesClick}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg flex items-center justify-center"
                aria-label="Scroll to categories filter"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Browse Categories
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={handleHomeClick}
                className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Go to homepage"
              >
                Home
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">
                {location.hash ? location.hash.substring(1) : "Latest Articles"}
              </span>
            </div>

            {searchQuery && (
              <div className="flex items-center text-sm">
                <span className="text-gray-600 mr-2">Searching for:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                  "{searchQuery}"
                </span>
              </div>
            )}
          </nav>
        </div>
      </div>

      <div id="live-search-hint" className="sr-only">
        Type to search articles with live results. Results will update as you
        type.
      </div>
    </>
  );
};

export default Header;
