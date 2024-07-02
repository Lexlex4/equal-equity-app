import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Group, Button } from '@mantine/core';
import { BiChevronLeft } from 'react-icons/bi'; 
import './articlePage.css';

type ArticlePageProps = {
  article: { id: number, title: string, summary: string, content: string }
  onBack: () => void
}

const ArticlePage = ({ article, onBack }: ArticlePageProps) => {
  const [content, setContent] = useState(article.content);
  const [loading, setLoading] = useState(false);
  const [currentLoadingButton, setCurrentLoadingButton] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState(article.content);

  useEffect(() => {
    setContent(article.content);
    setOriginalContent(article.content);
  }, [article]);

  const handleChange = async (option: string) => {
    if (option === 'original') {
      setContent(originalContent);
      return;
    }

    let prompt;
    if (option === 'simplify') {
      prompt = "Explain the following article content in simple terms suitable for someone who has no knowledge of the finance world to understand:";
    } else if (option === 'summarise') {
      prompt = "Summarize the following article content into bullet points and format them one under the other:";
    }

    const openaiApiKey = 'sk-proj-IvINA3UAUq9RcTDcs8xJT3BlbkFJT2BWEZNKPDARwKxhxl00';
    setLoading(true);
    setCurrentLoadingButton(option);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: content },
          ],
          max_tokens: 2048,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`,
          },
        }
      );

      const modifiedText = response.data.choices[0].message.content;
      setContent(modifiedText);
    } catch (error) {
      console.error('Error fetching modified content:', error);
    } finally {
      setLoading(false);
      setCurrentLoadingButton(null);
    }
  };

  const formatContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph.split('\n').map((line, i) => (
        <span key={i}>{line}<br/></span>
      ))}</p>
    ));
  };

  return (
    <div className="article-page">
      <Group>
        <Button 
          variant="transparent" 
          onClick={onBack} 
          className="back-button" 
          leftSection={<BiChevronLeft size={18} />}
        >
        Back
        </Button>
        <Button
          variant="default"
          onClick={() => handleChange('simplify')}
          loading={loading && currentLoadingButton === 'simplify'}
          className="action-button" 
        >
          Simplify
        </Button>
        <Button
          variant="default"
          onClick={() => handleChange('summarise')}
          loading={loading && currentLoadingButton === 'summarise'}
          className="action-button"
        >
          Summarise
        </Button>
        <Button
          variant="default"
          onClick={() => handleChange('original')}
          className="action-button"
        >
          Original
        </Button>
      </Group>

      <h1>{article.title}</h1>
      <div className="article-summary">
        <p>{article.summary}</p>
      </div>
      <div className="article-content">
        <div className="article-content-display">
          {formatContent(content)}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
