import React from "react";
import Post from "./post/Post";
import "../App.css";

export default function PostList({ posts }) {
  return (
    <div className="posts_list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
