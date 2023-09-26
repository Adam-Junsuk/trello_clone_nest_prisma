import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import './Board.css';
import CardDetails from './CardDetails';

const Board = () => {
  const [board, setBoard] = useState(null);
  const [newColumnName, setNewColumnName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { boardId } = useParams();
  const [showCardComposer, setShowCardComposer] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);
  const navigate = useNavigate(); // useNavigate 추가 추가

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const fetchBoard = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('No access token found.');
      navigate('/landing'); // 랜딩 페이지로 리디렉션
      return;
    }

    try {
      const response = await api.get(`/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoard(response.data);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };
  const handleAddCard = async (columnId) => {
    const token = localStorage.getItem('accessToken');
    const cardData = {
      name: 'New Card',
      description: newCardName, // Set the description to the value of newCardName
    };

    try {
      await api.post(`/columns/${columnId}/cards`, cardData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBoard();
      setNewCardName('');
      setShowCardComposer(false);
      setActiveColumnId(null);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };
  const handleAddColumn = async () => {
    const token = localStorage.getItem('accessToken');

    try {
      await api.post(
        '/columns',
        {
          name: newColumnName,
          order: 1,
          boardId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchBoard(); // Refresh the board to display the new column
      setShowInput(false); // Hide the input form
      setNewColumnName(''); // Clear the input
    } catch (error) {
      console.error('Error adding column:', error);
      if (error.response && error.response.data) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  const handleCardDetail = (cardId, columnId) => {
    setActiveCardId(cardId);
    setActiveColumnId(columnId);
    setShowCardDetails(true);
  };
  //* TO-DO - close card composer 안 보임
  return (
    <div
      id="board"
      style={{ backgroundColor: board ? board.backgroundColor : '#ffffff' }}
    >
      {board &&
        board.Columns.map((column) => (
          <div className="js-list list-wrapper" key={column.columnId}>
            <div className="list js-list-content">
              <div className="list-header js-list-header">
                <h2 className="list-header-name-assist">{column.name}</h2>
              </div>
              <div className="list-cards js-list-cards">
                {column.Cards.map((card) => (
                  <a
                    className="list-card"
                    key={card.cardId}
                    onClick={() =>
                      handleCardDetail(card.cardId, column.columnId)
                    } // columnId 추가
                  >
                    <div className="list-card-details">
                      <span className="list-card-title js-card-name">
                        {card.description}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
              {activeColumnId === column.columnId && showCardComposer ? (
                <div className="card-composer">
                  <div className="list-card js-composer">
                    <div className="list-card-details u-clearfix">
                      <textarea
                        className="list-card-composer-textarea js-card-title"
                        placeholder="Enter a title for this card…"
                        value={newCardName}
                        onChange={(e) => setNewCardName(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="cc-controls u-clearfix">
                    <div className="cc-controls-section">
                      <input
                        className="nch-button nch-button--primary confirm mod-compact js-add-card"
                        type="submit"
                        value="Add card"
                        onClick={() => handleAddCard(column.columnId)}
                      />
                      <a
                        className="icon-lg icon-close dark-hover js-cancel"
                        href="/frontend/public/cancel-icon-2048x2048-milcunum.png"
                        onClick={() => setShowCardComposer(false)}
                      ></a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <a
                    className="open-card-composer js-open-card-composer"
                    onClick={() => {
                      setActiveColumnId(column.columnId);
                      setShowCardComposer(true);
                    }}
                  >
                    Add a card
                  </a>
                  {activeColumnId === column.columnId && (
                    <button
                      className="close-card-composer"
                      onClick={() => {
                        setActiveColumnId(null);
                        setShowCardComposer(false);
                      }}
                    >
                      X
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      <div className="add-column-wrapper">
        {showInput ? (
          <>
            <input
              type="text"
              placeholder="New column name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
            />
            <button onClick={handleAddColumn}>Add Column</button>
          </>
        ) : (
          <button onClick={() => setShowInput(true)}>Add another list</button>
        )}
      </div>
      {showCardDetails && (
        <CardDetails
          cardId={activeCardId}
          columnId={activeColumnId} // columnId를 CardDetails에 전달
          onClose={() => setShowCardDetails(false)}
        />
      )}
    </div>
  );
};
export default Board;
