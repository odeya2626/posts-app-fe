import React from "react";
import Post from "./post/Post";
import "../App.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./loader/Loader";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    try {
      console.log(page, limit);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      console.log(data);
      const newList = [...data];
      console.log(newList);
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
      console.log(page, limit);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post?page=${page + 1}&limit=${limit}`
      );
      const data = await response.json();
      console.log(data);

      const newList = [...posts, ...data];
      console.log(newList);
      setPosts((posts) => newList);
      setPage((page) => page + 1);
      if (data.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post/all`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    getAllPosts();
  }, []);
  return (
    <div className="posts_list" id="scrollableDiv" style={{ overflow: "auto" }}>
      <InfiniteScroll
        dataLength={posts.length}
        next={getNextPosts}
        // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        // inverse={true}
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

// const getPosts = async () => {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/post/all`);
//     const data = await response.json();
//     const result = data.sort((a, b) => {
//       const t_a = a.timestamp.split(/[-T:]/);
//       const t_b = b.timestamp.split(/[-T:]/);
//       const d_a = new Date(
//         Date.UTC(t_a[0], t_a[1] - 1, t_a[2], t_a[3], t_a[4], t_a[5])
//       );
//       const d_b = new Date(
//         Date.UTC(t_b[0], t_b[1] - 1, t_b[2], t_b[3], t_b[4], t_b[5])
//       );
//       return d_b - d_a;
//     });
//     setPosts(result);
//     // console.log(data[1]);
//   } catch (error) {
//     console.log(error);
//   }
// };
