import React from "react";
import Post from "./post/Post";
import "../App.css";
import { useEffect, useState } from "react";

export default function PostList() {
  const BASE_URL = "http://127.0.0.1:8000";
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/post/all`);
      const data = await response.json();
      const result = data.sort((a, b) => {
        const t_a = a.timestamp.split(/[-T:]/);
        const t_b = b.timestamp.split(/[-T:]/);
        const d_a = new Date(
          Date.UTC(t_a[0], t_a[1] - 1, t_a[2], t_a[3], t_a[4], t_a[5])
        );
        const d_b = new Date(
          Date.UTC(t_b[0], t_b[1] - 1, t_b[2], t_b[3], t_b[4], t_b[5])
        );
        return d_b - d_a;
      });
      setPosts(result);
      // console.log(data[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="posts_list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
