// ArticlePage.js
import React from 'react';

const ArticlePage = ({ title }) => {
  let mockedContent = '';
  switch (title) {
    case 'Article Title 1':
      mockedContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis ligula nec enim consequat, et volutpat urna venenatis. Quisque ut faucibus augue. Duis convallis magna a turpis pharetra, vel fringilla purus fringilla.';
      break;
    default:
      mockedContent = 'No content available.';
      break;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{mockedContent}</p>
    </div>
  );
};

export default ArticlePage;
