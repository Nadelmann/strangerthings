import { useState } from "react";

export function NewUserForm() {
  const [error, setError] = useState(null);
  const COHORT_NAME = '2302-ACC-PT-WEB-PT-C';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();


    try {
      const response = await fetch(
       `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(          
            {user: {
              username: username,
              password: password,
          },}
          ),

        }
      );
              if (response.ok) {
        console.log("User created successfully.");
      } else {
        console.log("User creation failed.");
        setError("User creation failed.");
      }
      const result = await response.json();
        return result; 

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2 className="heading">Sign Up</h2>

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        
        <label>
          Username:  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}>
          
          </input>
        </label>{" "}
        <br />
        
        <label>
         Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}> 
          
          </input>
        </label>{" "}
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}