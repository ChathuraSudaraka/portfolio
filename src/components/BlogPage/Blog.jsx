import React from "react";

const Blog = () => {
  const blogPosts = [
    { id: 1, title: "Post 1", content: "Content of Post 1" },
    { id: 2, title: "Post 2", content: "Content of Post 2" },
    // Add more blog posts here
  ];

  return (
    <div className="pt-44">
      <h1>Posts</h1>
      {blogPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
