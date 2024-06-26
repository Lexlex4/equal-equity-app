import { useState } from 'react';
import { articlesData } from '@/components/Articles/articleData';
import ArticlePage from '@/components/Articles/ArticlePage';
import { Title } from '@mantine/core';

import './home.css'
import './app.css'

function App() {
  const [articles] = useState(articlesData); // Use mocked article data
  const [selectedArticle, setSelectedArticle] = useState<string>();

  const openArticlePage = (articleTitle: string) => {
    setSelectedArticle(articleTitle);
  };

  const goBack = () => {
    setSelectedArticle(undefined);
  };

  if (selectedArticle) {
    const article = articles.find(article => article.title === selectedArticle);
    if (!article ) {
      return <Title>Article not found</Title>
    }
    return <ArticlePage article={article} onBack={goBack} />;
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
