import { useState } from "react";

export function NewUserForm() {
  const [error, setError] = useState(null);
  const COHORT_NAME = '2302-ACC-PT-WEB-PT-C';

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userData = {
      username: formData.get("username"),
      password: formData.get("password"),

    };

    try {
      const response = await fetch(
       `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        console.log("User created successfully.");
      } else {
        console.log("User creation failed.");
        setError("User creation failed.");
      }
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
          Username: <input type="text" name="Username" />
        </label>{" "}
        <br />
        <label>
          Password: <input type="password" name="password" />
        </label>{" "}
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}