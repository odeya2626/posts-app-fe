import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getLocalStorage } from "../../hooks/useLocalStorage";

export default function Post({ post }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const currentUser = getLocalStorage("currentUser");
  // console.log(currentUser?.access_token);
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleDelete = async (e) => {
    e?.preventDefault();
    try {
      const requestOptions = {
        method: "DELETE",
        headers: new Headers({
          Authorization: `Bearer ${currentUser.access_token}`,
        }),
      };
      const response = await fetch(
        BASE_URL + "/post/delete/" + post.id,
        requestOptions
      );
      if (response.ok) {
        window.location.reload();
      }
      throw response;
    } catch (err) {
      console.log(err);
      alert("err");
    }
  };
  const postComment = async (e) => {
    e?.preventDefault();
    try {
      const json_string = JSON.stringify({
        text: comment,
        post_id: post.id,
        username: currentUser.username,
      });
      const requestOptions = {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${currentUser.access_token}`,
          "Content-Type": "application/json",
        }),
        body: json_string,
      };
      const response = await fetch(
        BASE_URL + "/comment/create",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setComments([...comments, data]);
        setComment("");
        return;
      }
      throw response;
    } catch (err) {
      console.log(err);
    }
  };
  // const fetchComments = async () => {
  //   try {
  //     const response = await fetch(BASE_URL + "/comment/all/" + post.id);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setComments(data);
  //     }
  //     throw response;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    post.img_url_type === "absolute"
      ? setImageUrl(post.img_url)
      : setImageUrl(BASE_URL + "/" + post.img_url);
  }, [BASE_URL, post.img_url, post.img_url_type]);

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  return (
    <div className="post">
      <div className="post_header">
        <Avatar alt={post.caption} src="" />
        <div className="post_header_info">
          <h3>{post.user.username}</h3>
          {post.creator_id === currentUser?.user_id && (
            <Button
              className="post_delete"
              color="error"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      </div>

      <img className="post_img" src={imageUrl} alt="pic" />
      <h4 className="post_text">{post.caption}</h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p key={comment.id}>
            <strong className="post_comment_username">
              {comment.username}:
            </strong>
            <span className="post_comment_text"> {comment.text} </span>
          </p>
        ))}
      </div>
      {currentUser?.access_token && (
        <form className="post_commentBox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            type="submit"
            disabled={!comment}
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
