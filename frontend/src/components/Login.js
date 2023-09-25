import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS 파일을 import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      if (response.status === 201) {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        navigate('/all-boards');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 처리 로직
  };

  const handleSignup = () => {
    // 회원가입 페이지로 이동
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          로그인
        </button>
        <button onClick={handleSignup} className="signup-button">
          이메일로 회원가입
        </button>
        <button onClick={handleGoogleLogin} className="google-login-button">
          구글 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
