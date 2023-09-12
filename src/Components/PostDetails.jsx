import PropTypes from 'prop-types';

export default function PostDetails({ selectedPost, onClose }) {
  if (!selectedPost) {
    return null; 
  }

  return (
    <div>
      <h2>Selected Post Details</h2>
      <p>Title: {selectedPost.title}</p>
      <p>Author: {selectedPost.author.username}</p>
      <p>Price: {selectedPost.price}</p>
      <p>Description: {selectedPost.description}</p>
      <button className="goBackButton" onClick={onClose}>Go Back</button>
    </div>
  );
}

PostDetails.propTypes = {
    selectedPost: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
  };
  