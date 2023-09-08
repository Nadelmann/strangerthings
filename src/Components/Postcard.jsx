import PropTypes from 'prop-types';

export default function PostCard({ post, setSelectedPostId }) {
    return (
        <div className="card-container">
            <div
                className="card"
                onClick={() => {
                    setSelectedPostId(post.id);
                }}
            >
                <h1>{post.title}</h1>
                <p>Author: {post.author.username}</p>
                <p> {post.price}</p>
                <p> {post.description}</p>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        username: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        cohortId: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
    setSelectedPostId: PropTypes.func.isRequired,
};