import PropTypes from 'prop-types';

export default function PostCard({ post, setSelectedPostId }) {
    return (
        <div className="card-container">
            <div
                className="card"
                onClick={() => {
                    setSelectedPostId(post._id);
                }}
            >
                <h1>{post.title}</h1>
                {post.author && <p>Author: {post.author.username}</p>}
                <p>Price: {post.price}</p>
                <p>Description: {post.description}</p>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        price: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        author: PropTypes.object, 
        _id: PropTypes.string.isRequired, 
    }).isRequired,
    setSelectedPostId: PropTypes.func.isRequired,
};
