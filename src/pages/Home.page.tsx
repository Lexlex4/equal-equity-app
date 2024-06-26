import { useState } from 'react';
import { articlesData } from '@/components/Articles/articleData';
import ArticlePage from '@/components/Articles/ArticlePage';
import { Title, Group, Anchor } from '@mantine/core';

import './home.css';
import './app.css';

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
    if (!article) {
      return <Title>Article not found</Title>;
    }
    return <ArticlePage article={article} onBack={goBack} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">FINANCIAL TIMES</h1>
        <nav className="App-nav">
          <Group>
            <Anchor href="#home">Home</Anchor>
            <Anchor href="#world">World</Anchor>
            <Anchor href="#technology">Tech</Anchor>
            <Anchor href="#sports">Markets</Anchor>
            <Anchor href="#climate">Climate</Anchor>
            <Anchor href="#opinion">Opinion</Anchor>
          </Group>
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
