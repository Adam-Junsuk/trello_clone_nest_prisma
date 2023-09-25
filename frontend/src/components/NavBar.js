// /Users/adam/trello_clone_nest_prisma/frontend/src/components/NavBar.js
import './NavBar.css';
import React from 'react';

const NavBar = () => {
  const accessToken = localStorage.getItem('accessToken');

  // 로그아웃 함수: 로컬 스토리지의 accessToken을 삭제
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    console.log('Logout Clicked');
  };

  return (
    <nav className="h6cTkFlRRMBKw_ BmAIu14hHF8Yky">
      {/* ...other nav elements... */}
      <div>
        {accessToken ? (
          <>
            {/* 로그아웃 버튼에 handleLogout 함수 연결 */}
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => console.log('My Page Clicked')}>
              My Page
            </button>
          </>
        ) : (
          <>
            <button onClick={() => console.log('Login Clicked')}>Login</button>
            <button onClick={() => console.log('Sign Up Clicked')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
