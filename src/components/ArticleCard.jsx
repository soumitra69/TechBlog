import { highlightMatches, truncateText } from "../utils/filterPosts";
import formatDate from "../utils/formatDate";


const ArticleCard = ({ blog, onClick, searchQuery = "" }) => {
  const renderHighlightedText = (text) => {
    if (!searchQuery || !text) {
      return <span>{truncateText(text, 100)}</span>;
    }

    const parts = highlightMatches(text, searchQuery);

    return (
      <>
        {parts.map((part, index) =>
          part.isMatch ? (
            <mark key={index} className="bg-yellow-200 px-1 rounded">
              {truncateText(part.text, 100)}
            </mark>
          ) : (
            <span key={index}>{truncateText(part.text, 100)}</span>
          ),
        )}
      </>
    );
  };

  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Read article: ${blog.title}`}
    >
      {blog.photo_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.photo_url}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            {blog.category}
          </span>
          <time dateTime={blog.created_at} className="text-sm text-gray-500">
            {formatDate(blog.created_at)}
          </time>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {renderHighlightedText(blog.title)}
        </h2>

        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {renderHighlightedText(blog.description)}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
            aria-label={`Read more about ${blog.title}`}
          >
            Read More
            <svg
              className="w-4 h-4 ml-1"
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
    </article>
  );
};

export default ArticleCard;
