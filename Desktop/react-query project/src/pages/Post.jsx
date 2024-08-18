import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPost } from "../api/posts";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id)

  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });

  // console.log(post)
  if(isLoading) return 'loading...';
  if(isError) return `Error: ${error.message}`;
  return (
    <div>
       <button onClick={() => navigate(`/`)}>back to list posts</button> 
        <h1>{post.title}</h1> 
      <p>{post.body}</p> 
    Post 
    </div>
  );
};

export default Post;
