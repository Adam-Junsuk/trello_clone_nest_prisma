// /Users/adam/trello_clone_nest_prisma/frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NavBar from './components/NavBar'; // Import NavBar
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => (
  <div>
    <NavBar /> {/* Include NavBar */}
    <App />
  </div>
);

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);

reportWebVitals();
