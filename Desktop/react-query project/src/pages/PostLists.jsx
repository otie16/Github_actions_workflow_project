import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddPost from "../components/AddPost";
import { useNavigate } from "react-router-dom";
import { deletePost, fetchPosts } from "../api/posts";

const PostLists = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // console.log(data)
  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // navigate("/");
    },
  });

  const handleDelete = (id) => {
    // console.log(id)  
    deletePostMutation.mutate(id)
  }
  // console.log(posts)
  return (
    <div>
      <AddPost />
      {posts.map((post) => (
        <div key={post.id} style={{ background: "#777" }}>
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post.title}
          </h2>
          <button onClick={() => navigate(`/post/${post.id}/edit`)}>
            Edit
          </button>
          <button onClick={()=> handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostLists;
