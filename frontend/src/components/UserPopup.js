// UserPopup.js
import React from 'react';

const UserPopup = ({ users, onUserSelect }) => {
  return (
    <div className="pop-over-content">
      <input type="text" placeholder="Search members" />
      <ul className="pop-over-member-list">
        {users.map((user) => (
          <li key={user.id}>
            <a href="#" onClick={() => onUserSelect(user)}>
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPopup;
