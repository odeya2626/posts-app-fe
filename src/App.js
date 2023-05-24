import "./App.css";
import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import Post from "./components/post/Post";

function App() {
  const BASE_URL = "http://127.0.0.1:8000";
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/post/all`);
      const data = await response.json();
      setPosts(data);
      // console.log(data[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <div className="app_posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      {/* <PostList posts={posts} /> */}
    </div>
  );
}

export default App;
