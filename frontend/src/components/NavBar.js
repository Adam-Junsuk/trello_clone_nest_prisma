//Users/adam/trello_clone_nest_prisma/frontend/src/components/NavBar.js
import React, { useState } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import axios from 'axios';
import SearchResult from './SearchResult'; // SearchResult 컴포넌트를 import합니다.
import './NavBar.css';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const [searchResults, setSearchResults] = useState([]); // 상태를 변경 가능하도록 수정
  const [showModal, setShowModal] = useState(false); // 모달을 보여줄지 결정하는 상태

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    console.log('Logout Clicked');
    window.location.reload();
  };

  const handleSearch = async () => {
    if (searchQuery.length > 0) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/search',
          { query: searchQuery },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setSearchResults(response.data); // 검색 결과를 상태에 저장
        setShowModal(true); // 모달을 보여줍니다.
      } catch (error) {
        console.error('Search failed:', error);
        console.log(error.stack);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="/android-chrome-192x192.png"
          alt="logo"
          className="nav-logo"
        />
      </Link>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch();
          }}
          onKeyPress={handleKeyPress}
        />
        {showModal && (
          <div className="search-result-modal">
            {searchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                <span className="card-description">{result.description}</span>
                <span className="card-details">
                  Card: {result.cardId}, Column: {result.ColumnId}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="button-group">
        {accessToken ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <button>My Page</button>
          </>
        ) : (
          <>
            <Link to="/login">
              {' '}
              {/* Use Link to navigate to /login */}
              <button>Login</button>
            </Link>
            <button>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
