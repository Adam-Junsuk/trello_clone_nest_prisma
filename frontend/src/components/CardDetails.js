import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './CardDetails.css';

const CardDetails = ({ cardId, columnId, onClose }) => {
  const [cardDetails, setCardDetails] = useState(null);
  const [newComment, setNewComment] = useState(''); // 댓글 작성을 위한 상태

  useEffect(() => {
    fetchCardDetails();
  }, [cardId, columnId]);

  const fetchCardDetails = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await api.get(`columns/${columnId}/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCardDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      await api.post(
        `cards/${cardId}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNewComment(''); // 댓글 작성 후 input 초기화
      fetchCardDetails(); // 댓글 추가 후 카드 상세 정보 다시 불러오기
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="card-details-overlay">
      <div className="card-details-modal">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {cardDetails && (
          <>
            <h2 className="card-title">{cardDetails.name}</h2>
            <p className="card-description">{cardDetails.description}</p>
            <div className="card-comments">
              {cardDetails.Comments.map((comment) => (
                <div className="comment" key={comment.commentId}>
                  <span className="comment-user">{comment.User.username}</span>
                  <span className="comment-content">{comment.content}</span>
                  <span className="comment-date">{comment.createdAt}</span>
                </div>
              ))}
              {/* 댓글 작성 창 */}
              <input
                className="nch-textfield__input"
                type="text"
                placeholder="Write a comment…"
                aria-placeholder="Write a comment…"
                aria-label="Write a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleCommentSubmit}>Submit Comment</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardDetails;
