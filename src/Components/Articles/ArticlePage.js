import React from 'react';
import '../Articles/articlePage.css';

const ArticlePage = ({ article, onBack }) => {
  return (
    <div className="article-page">
      <button onClick={onBack} className="back-button">Back</button>
      <h1>{article.title}</h1>
      <div
        className="article-content-display"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticlePage;
