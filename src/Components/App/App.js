import React, { useState } from 'react';
import './App.css'; // Import local styles for App
import ArticlePage from '../Articles/ArticlePage';
import { articlesData } from '../Articles/articleData';

function App() {
  const [articles] = useState(articlesData); // Use mocked article data
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openArticlePage = (articleTitle) => {
    setSelectedArticle(articleTitle);
  };

  const goBack = () => {
    setSelectedArticle(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedArticle) {
    const article = articles.find(article => article.title === selectedArticle);
    return <ArticlePage article={article} onBack={goBack} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-content">
          <h1 className="App-title">FINANCIAL TIMES</h1>
          <button className="nav-toggle" onClick={toggleNav}>
            ☰
          </button>
          <nav className={`App-nav ${isNavOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#world">World</a></li>
              <li><a href="#technology">Tech</a></li>
              <li><a href="#markets">Markets</a></li>
              <li><a href="#climate">Climate</a></li>
              <li><a href="#opinion">Opinion</a></li>
            </ul>
          </nav>
          <div className="App-search">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-button">🔍</button>
          </div>
        </div>
      </header>
      <main className="App-content">
        <section id="home" className="article-section">
          <h2>Home</h2>
          <div className="articles-grid">
            {filteredArticles.map((article) => (
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
