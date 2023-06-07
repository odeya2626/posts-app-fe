import React from "react";
import Post from "./post/Post";
import "../App.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./loader/Loader";

export default function PostList() {
  const limit = 3;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getLatestPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      const newList = [...data];

      setPosts((posts) => newList);

      if (data.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getNextPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post?page=${page + 1}&limit=${limit}`
      );
      const data = await response.json();
      const newList = [...posts, ...data];
      setPosts((posts) => newList);
      setPage((page) => page + 1);
      if (data.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const getAllPosts = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/post/all`);
  //     const data = await response.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getLatestPosts();
  }, []);
  return (
    <div className="posts_list" id="scrollableDiv" style={{ overflow: "auto" }}>
      <InfiniteScroll
        dataLength={posts.length}
        next={getNextPosts}
        hasMore={hasMore}
        loader={<Loader />}
        scrollableTarget="scrollableDiv"
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
