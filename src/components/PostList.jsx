import React from "react";
import Post from "./post/Post";
import "../App.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./loader/Loader";
import { getPostsPage } from "../api";

export default function PostList() {
  const limit = 3;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getLatestPosts = async () => {
    try {
      const response = await getPostsPage(page, limit);
      const data = response.data;
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
      const response = await getPostsPage(page + 1, limit);
      const data = response.data;

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
