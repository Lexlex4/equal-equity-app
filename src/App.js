import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">News Website</h1>
        <nav className="App-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#world">World</a></li>
            <li><a href="#technology">Technology</a></li>
            <li><a href="#sports">Sports</a></li>
            <li><a href="#entertainment">Entertainment</a></li>
          </ul>
        </nav>
      </header>
      <main className="App-content">
        <section id="home" className="article-section">
          <h2>Home</h2>
          <div className="articles-grid">
            <article className="article-card">
              <h3>Article Title 1</h3>
              <p>This is a summary of the first article.</p>
            </article>
            <article className="article-card">
              <h3>Article Title 2</h3>
              <p>This is a summary of the second article.</p>
            </article>
            <article className="article-card">
              <h3>Article Title 3</h3>
              <p>This is a summary of the third article.</p>
            </article>
            {/* Add more articles as needed */}
          </div>
        </section>
        {/* Repeat similar structure for other sections */}
      </main>
    </div>
  );
}

export default App;
