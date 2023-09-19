import React from "react";

const BlogPost = ({ title, date, imageSrc, content }) => {
  return (
    <div className="flex flex-col lg:flex-row dark:shadow-lg dark:shadow-blue-500/50 bg-bgShade dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="lg:w-2/5 bg-white dark:bg-gray-900">
        <img
          src={imageSrc}
          alt="Blog Post Image"
          className="w-full h-auto dark:shadow-lg dark:shadow-blue-500/50 transition-transform transform hover:scale-105 hover:opacity-80"
        />
      </div>
      <div className="p-6 lg:w-3/5">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{date}</p>
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-transform transform hover:scale-105">
          Read More
        </button>
      </div>
    </div>
  );
};


const Article = () => {
  const blogPosts = [
    {
      title: "Happy Blog Day",
      date: "September 18, 2023",
      imageSrc:
        "https://hicaps.com.ph/wp-content/uploads/2022/01/blog-examples-for-students.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Happy Blog Day",
      date: "September 18, 2023",
      imageSrc:
        "https://hicaps.com.ph/wp-content/uploads/2022/01/blog-examples-for-students.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="dark:bg-custom-blue">
      <div className="lg:mx-12 mx-4 py-32" id="blog">
        <div className="mb-20">
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            My Article
          </p>
          <h2 className="md:text-5xl text-4xl text-headingcolor dark:text-white font-bold">
            My Blogs
          </h2>
        </div>
        {blogPosts.map((post, index) => (
          <BlogPost
            key={index}
            title={post.title}
            date={post.date}
            imageSrc={post.imageSrc}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Article;
