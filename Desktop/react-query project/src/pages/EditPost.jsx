import React from 'react'
import PostForm from '../components/PostForm'
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPost, updatePost } from '../api/posts';

const EditPost = () => {
  const queryClient = useQueryClient()

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

  const updatePostMutation =  useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['post']})
      navigate("/")
    }
  })

  // console.log(post)
  if(isLoading) return 'loading...';
  if(isError) return `Error: ${error.message}`;

  const handleSubmit = (updatedPost) => {
    updatePostMutation.mutate({id, ...updatedPost})
  }

  return (
    <div>
      <PostForm onSubmit={handleSubmit} initialValue={post}/>
      </div>
  )
}

export default EditPost