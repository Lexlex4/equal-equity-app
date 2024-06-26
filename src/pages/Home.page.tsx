import React, { useState } from 'react';
import { articlesData } from '@/components/Articles/articleData';
import ArticlePage from '@/components/Articles/ArticlePage';
import { Title, Card, Image, Text } from '@mantine/core';

import './home.css';
import './app.css';

function App() {
  const [articles] = useState(articlesData); // Use mocked article data
  const [selectedArticle, setSelectedArticle] = useState<number | undefined>();

  const openArticlePage = (articleId: number) => {
    setSelectedArticle(articleId);
  };

  const goBack = () => {
    setSelectedArticle(undefined);
  };

  if (selectedArticle !== undefined) {
    const article = articles.find(article => article.id === selectedArticle);
    if (!article) {
      return <Title>Article not found</Title>;
    }
    return <ArticlePage article={article} onBack={goBack} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">FINANCIAL TIMES</h1>
      </header>
      <main className="App-content">
        <section id="home" className="article-section">
          <div className="articles-grid">
            {articles.map((article) => (
              <Card
                key={article.id}
                shadow="sm"
                padding="xl"
                component="article"
                className="article-card"
                onClick={() => openArticlePage(article.id)}
              >
                <Card.Section>
                  <Image
                    src={article.imageUrl} 
                    alt={article.title}
                    h={160}
                  />
                </Card.Section>
                <Card.Section>
                  <Text size="lg" weight={500} mt="md">
                    {article.title}
                  </Text>
                  <Text size="sm" mt="xs" color="dimmed">
                    {article.summary}
                  </Text>
                </Card.Section>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
