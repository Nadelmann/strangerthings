import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import PostCard from "./Postcard";

export default function AllPosts({ setSelectedPostId, currentUser }) {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const COHORT_NAME = '2302-ACC-PT-WEB-PT-C';


    async function handleClick(postId) {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${currentUser.token}`, // Send user token for authorization
                },
            });

            if (response.ok) {
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            } else {
                console.log("Delete request failed.");
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts`);
                const data = await response.json();
                if (data.success) {
                    setPosts(data.data.posts); // Update to use data.data.posts
                } else {
                    console.error("Failed to fetch posts:", data.error);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchPosts();
    }, []);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredPosts = posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>All Posts</h1>
            {/* Search input */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
            />

            {/* Render filtered posts and delete buttons based on user authorization */}
            <div>
                {filteredPosts.map((post) => (
                    <div key={post._id}>
                        <PostCard
                            post={post}
                            setSelectedPostId={setSelectedPostId}
                        />
                        <button className="detailsButton" onClick={() => navigate(`/allposts/${post._id}`)}>Details</button>
                        {currentUser && currentUser.userId === post.userId && (
                            <button className="removeButton" onClick={() => handleClick(post._id)}>Remove Post</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

AllPosts.propTypes = {
    setSelectedPostId: PropTypes.func.isRequired,
    currentUser: PropTypes.object, // Current user information (including userId and token)
}

