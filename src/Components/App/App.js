import React, { useState } from 'react';
import './App.css'; // Import local styles for App
import ArticlePage from '../Articles/ArticlePage';
import { articlesData } from '../Articles/articleData';

function App() {
  const [articles, setArticles] = useState(articlesData); // Use mocked article data
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openArticlePage = (articleTitle) => {
    setSelectedArticle(articleTitle);
  };

  const saveEditedArticle = (editedArticle) => {
    const updatedArticles = articles.map(article =>
      article.id === editedArticle.id ? editedArticle : article
    );
    setArticles(updatedArticles);
    setSelectedArticle(null); // Close the article page after saving
  };

  const goBack = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    const article = articles.find(article => article.title === selectedArticle);
    return <ArticlePage article={article} onSave={saveEditedArticle} onBack={goBack} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">FINANCIAL TIMES</h1>
        <nav className="App-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#world">World</a></li>
            <li><a href="#technology">Tech</a></li>
            <li><a href="#sports">Markets</a></li>
            <li><a href="#climate">Climate</a></li>
            <li><a href="#opinion">Opinion</a></li>
          </ul>
        </nav>
      </header>
      <main className="App-content">
        <section id="home" className="article-section">
          <h2>Home</h2>
          <div className="articles-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.id}>
                <h3 onClick={() => openArticlePage(article.title)}>{article.title}</h3>
                <p>{article.summary}</p>
              </article>
            ))}
          </div>
        </section>
        {/* Repeat similar structure for other sections */}
      </main>
    </div>
  );
}

export default App;
