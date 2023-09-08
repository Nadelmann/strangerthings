import { useState } from 'react';
import PropTypes from 'prop-types';


function Authentication({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null); 
  const COHORT_NAME = '2302-ACC-PT-WEB-PT-C';
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

 async function handleClick() {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.data && result.data.username) {
      setUsername(result.data.username);
    }

    setSuccessMessage(result.message);
  } catch (error) {
    setError(error.message);
  }
}

Authentication.propTypes = {
    token: PropTypes.string.isRequired, // Adjust the prop type as needed
  };

  return (
    <div>
      <h2>Authenticate</h2>
      {username && <p>Hello, {username}!</p>} 
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Register!</button>
    </div>
  );
}

export default Authentication;