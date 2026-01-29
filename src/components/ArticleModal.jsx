import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import formatDate from "../utils/formatDate";
import { useSEO } from "../hooks/useSEO";

const ArticleModal = ({ article, isOpen, onClose }) => {
  const { seoData, structuredData } = useSEO(article);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
              aria-label="Close modal"
            >
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
            </button>

            <article className="p-6">
              {article.photo_url && (
                <img
                  src={article.photo_url}
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  loading="lazy"
                />
              )}

              <header className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {article.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                  {article.title}
                </h1>
                <div className="flex items-center text-gray-600 space-x-4">
                  <time dateTime={article.created_at}>
                    {formatDate(article.created_at)}
                  </time>
                  <span>•</span>
                  <span>By User {article.user_id}</span>
                </div>
              </header>

              <div className="prose max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: article.content_html }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>

              <footer className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-gray-600">Last updated:</span>
                  <time dateTime={article.updated_at} className="font-medium">
                    {formatDate(article.updated_at)}
                  </time>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition"
                  >
                    Close
                  </button>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleModal;
