import React from "react";
import PostForm from "./PostForm";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";

const AddPost = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["posts"]}); // Refetch posts list after successful post creationry
      console.log("success");
    }
  });

  const handleAddPost = (post) => {
    createPostMutation.mutate({
      id: uuidv4(),
      ...post,
    });
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <PostForm onSubmit={handleAddPost} initialValue={{}} />
    </div>
  );
};

export default AddPost;
