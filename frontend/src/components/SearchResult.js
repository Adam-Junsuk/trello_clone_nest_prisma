import React from 'react';
import './SearchResult.css';

const SearchResult = ({ data }) => {
  return (
    <div className="search-result-modal">
      <h2>Search Results</h2>
      <ul>
        {data.map((card, index) => (
          <li key={index} className="search-result-item">
            <div className="card-name">{card.name}</div>
            <div className="card-description">{card.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
