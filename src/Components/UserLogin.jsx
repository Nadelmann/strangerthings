import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const COHORT_NAME = '2302-ACC-PT-WEB-PT-C';
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Please sign in.');
      return;
    }

    await login();
  };

  const login = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });

      console.log('Response:', response);

      const result = await response.json();

      if (response.ok) {
        if (result.data && result.data.token) {
          const token = result.data.token;
          localStorage.setItem('authToken', token);
          localStorage.setItem('username', result.data.username);

          await Authenticate(token);

          onLogin();

          navigate('/profile');
        }
      } else {
        setError(result.error ? result.error : 'Invalid username or password.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while logging in.');
    }
  };

  const Authenticate = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError('Authentication failed.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during authentication.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>} 
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserLogin;

UserLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
