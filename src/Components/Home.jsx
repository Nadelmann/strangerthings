import PropTypes from 'prop-types'; 


function Home({ isLoggedIn }) {
  console.log("isLoggedIn:", isLoggedIn);
  return (
    <div id="main" className="home">
      <h1>Welcome to all things Strange!</h1>
      {isLoggedIn ? (
        <h2>Thank you for logging in! Stay Strange!</h2>
      ) : (
        <h2>Login or register Browse or Buy!</h2>
      )}
    </div>
  );
}


Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, 
};

export default Home;
