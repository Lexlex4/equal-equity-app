import React, { useState } from 'react';

const ArticlePage = ({ article, onSave }) => {
  const [editedContent, setEditedContent] = useState(article.content);

  const handleSave = () => {
    onSave({ ...article, content: editedContent });
  };

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="article-content"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ArticlePage;
