import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ArticleGrid from "./components/ArticleGrid";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import LoadingSpinner from "./components/LoadingSpinner";

import useFetchBlogs from "./hooks/useFetchBlogs";

function App() {
  const { blogs, loading, error } = useFetchBlogs();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  /* 🔍 SEARCH + CATEGORY FILTER */
  useEffect(() => {
    if (!blogs.length) {
      setFilteredBlogs([]);
      return;
    }

    const filtered = blogs.filter((blog) => {
      const matchesSearch =
        !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content_text.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredBlogs(filtered);
  }, [blogs, searchQuery, selectedCategory]);

  const categories = ["all", ...new Set(blogs.map((b) => b.category))];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <SEO />
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          {/* HERO SECTION */}
          <Hero />

          {/* ARTICLES SECTION */}
          <section id="articles-section" className="scroll-mt-20">
            {/* SEARCH + CATEGORY */}
            <div className="mb-8 space-y-4">
              <SearchBar
                onSearch={setSearchQuery}
                searchQuery={searchQuery}
                resultCount={filteredBlogs.length}
              />

              <CategoryFilter
                categories={["all", "love", "math", "gaming", "programming"]}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* SECTION TITLE */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {searchQuery || selectedCategory !== "all"
                  ? "Search Results"
                  : "Latest Articles"}
              </h2>

              {searchQuery && (
                <p className="text-gray-600 mt-2">
                  Found {filteredBlogs.length} article
                  {filteredBlogs.length !== 1 ? "s" : ""} for “{searchQuery}”
                </p>
              )}
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {/* ARTICLES GRID */}
                <ArticleGrid
                  blogs={filteredBlogs}
                  onArticleClick={setSelectedArticle}
                  selectedArticle={selectedArticle}
                  onCloseModal={() => setSelectedArticle(null)}
                  searchQuery={searchQuery}
                />

                {/* NO RESULTS */}
                {filteredBlogs.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {searchQuery
                        ? "No articles found"
                        : "No articles available"}
                    </h3>
                    <p className="text-gray-600">
                      {searchQuery
                        ? "Try a different search or category"
                        : "Check back later for new articles"}
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
