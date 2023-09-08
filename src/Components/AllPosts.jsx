import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import PostCard from "./Postcard";

export default function AllPosts({ setSelectedPostId }) {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const COHORT_NAME = '2302-ACC-PT-WEB-PT-C';

    async function handleClick(postId) {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts/${postId}`, {
                method: 'DELETE'
            });
            

            if (response.ok) {
                setPosts(prevPost => prevPost.filter(post => post.id !== postId));
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
                console.log(data.post);
                setPosts(data.data.post);
                console.log(data.results);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPosts();
    }, []); 

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>All Posts</h1>
            <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={handleSearchChange}
            />
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <PostCard
                            post={post}
                            setSelectedPostId={setSelectedPostId}
                        />
                        <button className="detailsButton" onClick={() => navigate(`/posts/${post.id}`)}>Details</button>
                        <button className="removeButton" onClick={() => handleClick(post.id)}>Remove Post</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

AllPosts.propTypes = {
    setSelectedPostId: PropTypes.func.isRequired,
};