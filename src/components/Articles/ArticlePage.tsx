import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Group, Button } from '@mantine/core';
import { BiChevronLeft } from 'react-icons/bi'; 
import './articlePage.css';

type ArticlePageProps = {
  article: { id: number, title: string, summary: string, content: string }
  onBack: () => void
}

// const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack }) => { ... };
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
      prompt = `
      You are an AI assistant who specialises in simplifying news articles from the financial services industry and making them easier to understand for laymen.

      You will be presented with an article from a financial publication, and your task is to simplify the article as follows:
      - Reduce the amount of jargon words used (e.g. EBITDA, EPS, etc. and replace these with concepts that are simple to understand)
      - Provide explanations in brackets when the use of jargon is unavoidable.
      - Include all of the content from the original article in your respoonse. Ensure none of the information is left out.
      `
    } else if (option === 'summarise') {
      prompt = `
      You are an AI assistant who specialises in summarising news articles. 

      You will be presented with an article from a news website. Your task is to break down the article into a series of easy to understand bullet points.

      Each important fact from the article should correspond to a single bullet point. Ensure as much of the article is included in your response as possible.

      Ensure that your summary will take no longer than 2 minutes to read.
      `
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
          temperature: option === "simplify" ? 0.7 : 0.2,
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
