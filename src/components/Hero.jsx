import { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stats, setStats] = useState({
    articles: 0,
    authors: 0,
    readers: 0,
    categories: 0,
  });
  const NewsletterButtonWithModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");

    /* Close on ESC */
    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      if (isOpen) document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email) return alert("Please enter your email");
      alert(`Subscribed with: ${email}`);
      setEmail("");
      setIsOpen(false);
    };
  };

  const featuredArticles = [
    {
      id: 1,
      title: "The Future of React: What's Coming in 2024",
      category: "React",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h-600&fit=crop",
      excerpt:
        "Explore the latest features and improvements coming to React, including server components, compiler optimizations, and new hooks.",
    },
    {
      id: 2,
      title: "Mastering TypeScript: Advanced Patterns",
      category: "TypeScript",
      readTime: "12 min read",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop",
      excerpt:
        "Learn advanced TypeScript patterns and techniques that will take your development skills to the next level.",
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js",
      category: "Node.js",
      readTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
      excerpt:
        "Discover best practices for building high-performance, scalable APIs using modern Node.js frameworks.",
    },
  ];

  useEffect(() => {
    const targetStats = {
      articles: 1247,
      authors: 89,
      readers: 52489,
      categories: 24,
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setStats({
        articles: Math.floor(targetStats.articles * progress),
        authors: Math.floor(targetStats.authors * progress),
        readers: Math.floor(targetStats.readers * progress),
        categories: Math.floor(targetStats.categories * progress),
      });

      if (step >= steps) {
        clearInterval(timer);

        setStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);

    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide(
      (prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length,
    );

    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    setTimeout(() => setIsAnimating(false), 500);
  };

  const trendingTopics = [
    "React Hooks",
    "TypeScript",
    "Next.js 14",
    "Tailwind CSS",
    "GraphQL",
    "Web3",
    "AI/ML",
    "DevOps",
    "Cybersecurity",
    "Cloud Computing",
  ];
  const BrowseArticlesButton = () => {
    const navigate = useNavigate();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-12 md:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium text-sm mb-4">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                Trending in Development
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Stay Ahead with
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tech Insights
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Discover the latest trends, tutorials, and best practices in web
                development, programming, and technology. Join our community of{" "}
                {stats.readers.toLocaleString()}+ developers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/articles")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 flex items-center justify-center"
                aria-label="Browse all articles"
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
                Browse All Articles
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("newsletter-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 flex items-center justify-center"
                aria-label="Subscribe to newsletter"
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Get Weekly Updates
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
              {[
                { label: "Articles", value: stats.articles, icon: "📚" },
                { label: "Expert Authors", value: stats.authors, icon: "👨‍💻" },
                {
                  label: "Monthly Readers",
                  value: `${(stats.readers / 1000).toFixed(1)}k`,
                  icon: "👁️",
                },
                { label: "Categories", value: stats.categories, icon: "🏷️" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center justify-center">
                    <span className="mr-2" aria-hidden="true">
                      {stat.icon}
                    </span>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow">
                  FEATURED
                </span>
              </div>

              <div className="relative h-[400px] overflow-hidden">
                {featuredArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 translate-x-0"
                        : index < currentSlide
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                    }`}
                  >
                    <div className="relative h-full">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${article.image})` }}
                        role="img"
                        aria-label={`Featured article: ${article.title}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            {article.category}
                          </span>
                          <span className="text-white/80 text-sm">
                            {article.readTime}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-white/90 mb-6 line-clamp-2">
                          {article.excerpt}
                        </p>

                        <button
                          onClick={() =>
                            console.log("Read article:", article.id)
                          }
                          className="inline-flex items-center text-white font-medium hover:text-blue-200 transition"
                          aria-label={`Read article: ${article.title}`}
                        >
                          Read Full Article
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredArticles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Trending Topics
                </h3>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  aria-label="View all trending topics"
                >
                  View All →
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Browse articles about ${topic}`}
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm mb-6">
            Trusted by developers from top companies
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              "Google",
              "Microsoft",
              "GitHub",
              "Stack Overflow",
              "DigitalOcean",
              "Vercel",
            ].map((company) => (
              <div
                key={company}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={company}
              >
                <span className="text-xl font-bold tracking-wider">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <button
          onClick={() =>
            document
              .getElementById("articles-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition group focus:outline-none"
          aria-label="Scroll to articles"
        >
          <span className="text-sm mb-2">Explore Articles</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1 group-hover:border-gray-400">
            <div className="w-1 h-3 bg-gray-300 rounded-full animate-bounce"></div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
