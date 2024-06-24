import React, { useState } from 'react';
import axios from 'axios';
import '../Articles/articlePage.css';

const ArticlePage = ({ article, onBack }) => {
  const [simplifiedContent, setSimplifiedContent] = useState(article.content);

  const handleSimplify = async () => {
    const openaiApiKey = 'sk-proj-IvINA3UAUq9RcTDcs8xJT3BlbkFJT2BWEZNKPDARwKxhxl00';

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Simplify the following article content to be easier to read.' },
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

  return (
    <>
      <div className="article-page">
        <button onClick={onBack} className="back-button">Back</button>
        <button className='back-button' onClick={handleSimplify}>Beginner</button>

        <h1>{article.title}</h1>
        <div
          className="article-content-display"
          dangerouslySetInnerHTML={{ __html: simplifiedContent }}
        />
      </div>

      <div></div>
    </>
  );
};

export default ArticlePage;
