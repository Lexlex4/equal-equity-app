import React, { useState } from 'react';
import './App.css';
import ArticlePage from './ArticlePage';

function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openArticlePage = (articleTitle) => {
    setSelectedArticle(articleTitle);
  };

  if (selectedArticle) {
    return <ArticlePage title={selectedArticle} />;
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
            <article className="article-card">
              <h3 onClick={() => openArticlePage('Article Title 1')}>Article Title 1</h3>
              <p>This is a summary of the first article.</p>
            </article>
            <article className="article-card">
              <h3 onClick={() => openArticlePage('Article Title 2')}>Article Title 2</h3>
              <p>This is a summary of the second article.</p>
            </article>
            <article className="article-card">
              <h3 onClick={() => openArticlePage('Article Title 3')}>Article Title 3</h3>
              <p>This is a summary of the third article.</p>
            </article>
            {/* Add more articles as needed */}
          </div>
        </section>
        {/* Repeat similar structure for other sections */}
      </main>
    </div>
  );
}

export default App;
