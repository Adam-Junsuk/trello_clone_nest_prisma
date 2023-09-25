// /Users/adam/trello_clone_nest_prisma/frontend/src/components/AllBoards.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import './AllBoards.css'; // CSS 파일 import

const AllBoards = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
  const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

  useEffect(() => {
    const fetchBoards = async () => {
      if (token) {
        try {
          const response = await api.get('/boards', {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
            },
          });
          setBoards(response.data);
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      } else {
        console.log('No access token found.');
      }
    };

    fetchBoards();
  }, [token]);

  return (
    <>
      {token ? (
        <ul className="boards-page-board-section-list">
          {boards.map((board) => (
            <li
              className="boards-page-board-section-list-item"
              key={board.boardId}
            >
              <Link
                to={`/boards/${board.boardId}`}
                className="board-tile mod-light-background"
              >
                <div className="board-tile-details is-badged">
                  <div
                    title={board.name}
                    dir="auto"
                    className="board-tile-details-name"
                  >
                    <div>{board.name}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          <li
            data-testid="create-board-tile"
            className="boards-page-board-section-list-item"
          >
            <div className="board-tile mod-add">
              <p>
                <span>Create new board</span>
              </p>
            </div>
          </li>
        </ul>
      ) : (
        <div className="center-container">
          <button className="login-button" onClick={() => navigate('/login')}>
            로그인 하러 가기
          </button>
        </div>
      )}
    </>
  );
};

export default AllBoards;
