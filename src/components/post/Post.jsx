import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import ImageComponent from "../image/ImageComponent";
import { useUserContext } from "../../context/UserContext";
import { addComment, deletePost } from "../../api";

export default function Post({ post }) {
  const { currentUser } = useUserContext();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleDelete = async (e) => {
    e?.preventDefault();
    try {
      const response = await deletePost(post.id);
      if (response.status === 200) {
        window.location.reload();
      }

      throw response;
    } catch (err) {
      console.log(err);
    }
  };
  const postComment = async (e) => {
    e?.preventDefault();
    try {
      const json_string = {
        text: comment,
        post_id: post.id,
        username: currentUser.username,
      };

      const response = await addComment(json_string);
      if (response.status === 201) {
        const data = response?.data;
        setComments([...comments, data]);
        setComment("");
        return;
      }
      throw response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  return (
    <div className="post">
      <div className="post_header">
        <Avatar alt={post.caption} src={post.user.profile_img || ""} />
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
      <ImageComponent post={post} />

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
