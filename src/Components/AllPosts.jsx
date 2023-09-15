import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import PostCard from "./Postcard";
import PostDetails from "./PostDetails";

export default function AllPosts({ setSelectedPostId }) {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);
    const COHORT_NAME = '2302-ACC-PT-WEB-PT-C';

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts`);
                const data = await response.json();
                if (data.success) {
                    setPosts(data.data.posts); 
                } else {
                    console.error("Failed to fetch posts:", data.error);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchPosts();
    }, []);

    const handleDetailsClick = (post) => {
        setSelectedPost(post); 
    };

    const handleCloseDetails = () => {
        setSelectedPost(null);
    };

    const filteredPosts = posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>All Posts</h1>
            {/* ... */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredPosts.map((post) => (
                <div key={post._id}>
                    <PostCard post={post} setSelectedPostId={setSelectedPostId} />
                    <button
                        className="detailsButton"
                        onClick={() => handleDetailsClick(post)}
                    >
                        Details
                    </button>
                </div>
            ))}

            {selectedPost && ( 
                <PostDetails
                    selectedPost={{
                        ...selectedPost,
                        price: parseFloat(selectedPost.price) 
                    }}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
}


AllPosts.propTypes = {
    setSelectedPostId: PropTypes.func.isRequired,
};
