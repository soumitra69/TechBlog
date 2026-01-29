import { useState } from "react";
import ArticleCard from "./ArticleCard";
import ArticleModal from "./ArticleModal";


const ArticleGrid = ({ blogs }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <ArticleCard
            key={blog.id}
            blog={blog}
            onClick={() => handleArticleClick(blog)}
          />
        ))}
      </div>

      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ArticleGrid;
