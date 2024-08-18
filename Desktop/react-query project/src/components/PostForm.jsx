import React, { useState } from "react";

const PostForm = ({ onSubmit, initialValue }) => {
  const [post, setPost] = useState({
    title: initialValue?.title || "",
    body: initialValue?.body || "",
  });

  const handleChangeInput = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };
  const renderField = (label, value) => (
    <div>
      <label>{label}</label>
      <input
        onChange={handleChangeInput}
        type="text"
        name={label.toLowerCase()}
        value={value}
      />
    </div>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(post);
    console.log("Submitted successfully");
    setPost({
      title: "",
      body: "", // Reset form fields to empty strings after submission
    });

    console.log(post);
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderField("Title", post.title)}
      {renderField("Body", post.body)}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
