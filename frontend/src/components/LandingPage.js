// /Users/adam/trello_clone_nest_prisma/frontend/src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Trello Clone</h1>
      </header>
      <main className="landing-main">
        <section className="intro-section">
          <h2>Organize your projects in a fun, flexible way.</h2>
          <p>
            From planning to execution, Trello Clone helps you get more work
            done.
          </p>
        </section>
        <section className="cta-section">
          <button className="cta-button">Sign Up - It's Free!</button>
        </section>
      </main>
      <footer className="landing-footer">
        <p>© 2023 Trello Clone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
