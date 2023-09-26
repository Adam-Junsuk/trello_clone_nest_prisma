import React, { useState } from 'react';
import axios from 'axios';
import './CreateBoard.css';

const CreateBoard = ({ closeModal }) => {
  const [boardName, setBoardName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#0000');
  const token = localStorage.getItem('accessToken');

  const handleCreateBoard = async () => {
    const data = {
      name: boardName,
      backgroundColor: selectedColor,
      description: '', // Optional
    };

    try {
      const response = await axios.post('http://localhost:3000/boards', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.message === '보드가 생성되었습니다.') {
        console.log('Board created:', response.data);
        closeModal(); // Close the modal
        window.location.reload();
      }
    } catch (error) {
      console.error('Board creation failed:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateBoard();
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="create-board">
      <input
        type="text"
        placeholder="Enter board name"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="color-options">
        {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'].map(
          (color) => (
            <button
              key={color}
              className={`color-button ${
                selectedColor === color ? 'selected' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            />
          ),
        )}
      </div>
      <button onClick={handleCreateBoard}>Create Board</button>
    </div>
  );
};

export default CreateBoard;
