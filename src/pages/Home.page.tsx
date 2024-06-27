import { useState } from 'react';
import { articlesData } from '@/components/Articles/articleData';
import ArticlePage from '@/components/Articles/ArticlePage';
import { AppShell, Title } from '@mantine/core';

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
    if (!article) {
      return <Title>Article not found</Title>;
    }
    return <ArticlePage article={article} onBack={goBack} />;
  }

  return (
    <div className="App">
      <AppShell header={{height: 60}} p='md'>
      <AppShell.Header bg='navy' c='white'>
        <Title>Financial Times</Title>
      </AppShell.Header>
      <AppShell.Main>
      <section id="home" className="article-section">
          <div className="articles-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.id}>
                <h3 onClick={() => openArticlePage(article.title)}>{article.title}</h3>
                <p>{article.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </AppShell.Main>
      </AppShell>
      
    </div>
  );
}

export default App;
