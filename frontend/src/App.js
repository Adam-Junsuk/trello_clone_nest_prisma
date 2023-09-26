import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AllBoards from './components/AllBoards'; // AllBoards 컴포넌트를 불러옵니다.
import Board from './components/Board'; // Board 컴포넌트를 import합니다.
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/all-boards" element={<AllBoards />} />
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
