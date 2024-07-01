import { useState } from 'react';
import { articlesData } from '@/components/Articles/articleData';
import ArticlePage from '@/components/Articles/ArticlePage';
import { AppShell, Title, Card, Text, Image } from '@mantine/core';
import logo from './logo.png';
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
    const article = articles.find((article) => article.title === selectedArticle);
    if (!article) {
      return <Title>Article not found</Title>;
    }
    return <ArticlePage article={article} onBack={goBack} />;
  }

  return (
    <div className="App">
      <AppShell header={{ height: 120 }} p="md"> 
        <AppShell.Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            src={logo}
            alt="Logo"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </AppShell.Header>
        <AppShell.Main>
          <section id="home" className="article-section">
            <div className="articles-grid">
              {articles.map((article) => (
                <Card
                  className="article-card"
                  shadow="sm"
                  padding="xl"
                  component="a"
                  href="#"
                  key={article.id}
                  onClick={() => openArticlePage(article.title)}
                  style={{ textDecoration: 'none' }}
                >
                  <Card.Section style={{ height: '160px' }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      className="card-image"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Card.Section>
                  <div className="article-card-content">
                    <Text fw={500} size="lg" mt="md">
                      <h3>{article.title}</h3>
                    </Text>
                    <Text mt="xs" size="sm">
                      <p>{article.summary}</p>
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </AppShell.Main>
      </AppShell>
    </div>
  );
}

export default App;
