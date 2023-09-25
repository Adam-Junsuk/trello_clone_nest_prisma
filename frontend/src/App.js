// /Users/adam/trello_clone_nest_prisma/frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AllBoards from './components/AllBoards'; // AllBoards 컴포넌트를 불러옵니다.
import Board from './components/Board'; // Board 컴포넌트를 import합니다.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/all-boards" element={<AllBoards />} />{' '}
        <Route path="/boards/:boardId" element={<Board />} />{' '}
        {/* 이 라인을 추가합니다. */}
        {/* AllBoards 컴포넌트를 라우트에 추가합니다. */}
        {/* 다른 라우트들 */}
      </Routes>
    </Router>
  );
}

export default App;
