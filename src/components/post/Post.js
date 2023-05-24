import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Post({ post }) {
  const BASE_URL = "http://127.0.0.1:8000";
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);
  console.log(post);

  useEffect(() => {
    post.img_url_type === "absolute"
      ? setImageUrl(post.img_url)
      : setImageUrl(BASE_URL + "/" + post.img_url);
  }, []);

  useEffect(() => {
    setComments(post.comments);
    // const getComments = async () => {
    //   try {
    //     const response = await fetch(`${BASE_URL}/comment/${post.id}`);
    //     const data = await response.json();
    //     setComments(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  }, []);

  return (
    <div className="post">
      <div className="post_header">
        <Avatar alt={post.caption} src="" />
        <div className="post_header_info">
          <h3>{post.user.username}</h3>
          <Button className="post_delete" color="error">
            <DeleteIcon />
          </Button>
        </div>
      </div>

      <img className="post_img" src={imageUrl} alt="pic" />
      <h4 className="post_text">{post.caption}</h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong className="post_comment_username">
              {comment.user.username}
            </strong>
            {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
}
