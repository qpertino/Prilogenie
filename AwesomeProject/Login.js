
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Здесь будет обработчик входа
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <form>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Войти</button>
      </form>
    </div>
  );
};

export default Login;
