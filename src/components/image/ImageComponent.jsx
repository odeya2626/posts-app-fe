import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import "./ImageComponent.css";

export default function ImageComponent({ post }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    // setIsLoading(false);
    setIsError(true);
  };

  useEffect(() => {
    post.img_url_type === "absolute"
      ? setImageUrl(post.img_url)
      : setImageUrl(BASE_URL + "/" + post.img_url);
  }, [BASE_URL, post.img_url, post.img_url_type]);

  return (
    <div>
      <Skeleton
        variant="rectangular"
        className="post_img"
        style={{ display: isLoading ? "block" : "none" }}
      />
      <img
        src={imageUrl}
        alt={post.caption}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className="post_img image-animation"
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
}
