import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Articles/articlePage.css';

const ArticlePage = ({ article, onBack }) => {
  const [simplifiedContent, setSimplifiedContent] = useState(article.content);

  useEffect(() => {
    setSimplifiedContent(article.content);
  }, [article]);

  const handleSimplify = async () => {
    const simplificationPrompt = "Explain the following article content in simple terms suitable for a 5-year-old:";
    
    const openaiApiKey = 'sk-proj-IvINA3UAUq9RcTDcs8xJT3BlbkFJT2BWEZNKPDARwKxhxl00';

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: simplificationPrompt },
            { role: 'user', content: simplifiedContent },
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

      const simplifiedText = response.data.choices[0].message.content;
      setSimplifiedContent(simplifiedText);
    } catch (error) {
      console.error('Error fetching simplified content:', error);
    }
  };

  const formatContent = (content) => {
    const paragraphs = content.split('\n\n');
    const formattedContent = paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));

    return formattedContent;
  };

  return (
    <div className="article-page">
      <button onClick={onBack} className="back-button">Back</button>
      <button className='back-button' onClick={handleSimplify}>Simplify</button>

      <h1>{article.title}</h1>
      <div className="article-summary">
        <p>{article.summary}</p>
      </div>
      <div className="article-content">
        {typeof simplifiedContent === 'string' ? (
          <div className="article-content-display">
            {formatContent(simplifiedContent)}
          </div>
        ) : (
          <div className="article-content-display">
            {simplifiedContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
