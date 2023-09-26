import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './AllBoards.css';
import CreateBoard from './CreateBoard';

const AllBoards = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      if (token) {
        try {
          const response = await api.get('/boards', {
            headers: {
              Authorization: `Bearer ${token}`,
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
      {showModal && <CreateBoard closeModal={toggleModal} />}
      {token ? (
        <ul className="boards-page-board-section-list">
          {boards.map((board) => (
            <li
              className="boards-page-board-section-list-item"
              key={board.boardId}
            >
              <Link
                to={`/boards/${board.boardId}`}
                className="board-tile"
                style={{ backgroundColor: board.backgroundColor }}
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
            <div
              className="board-tile mod-add"
              onClick={toggleModal}
              role="button"
              tabIndex={0}
            >
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
