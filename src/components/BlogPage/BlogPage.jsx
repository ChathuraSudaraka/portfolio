"use client";
import React, { useState, useEffect, useCallback } from "react";
import { blogs, comments as initialComments } from "./data";
import { useParams } from "react-router-dom";
import BlogLayout from "../../Layouts/BlogLayout";
import AddComment from "./Pages/Comment-Area/AddComment";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaUserCircle,
} from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FiEdit2, FiTrash2, FiMessageSquare } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

// Add Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
            <button
              onClick={() => (window.location.href = "/BlogApp")}
              className="text-blue-500 hover:underline"
            >
              Return to Blog List
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const BlogData = () => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === parseInt(id));
  const [comments, setComments] = useState(
    initialComments.filter((c) => c.blogId === parseInt(id))
  );
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [tags, setTags] = useState([
    "JavaScript",
    "React",
    "Web Development",
    "Programming",
  ]);
  const [activeTag, setActiveTag] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [replyingToId, setReplyingToId] = useState(null);

  useEffect(() => {
    if (blog && typeof blog.description === "string") {
      const wordsPerMinute = 200;
      const wordCount = blog.description.split(/\s+/).length;
      setReadingTime(Math.ceil(wordCount / wordsPerMinute));
    }
  }, [blog]);

  const addComment = (newComment) => {
    setComments((prev) => [
      ...prev,
      {
        ...newComment,
        id: prev.length + 1,
        blogId: parseInt(id),
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: [],
      },
    ]);
  };

  const addReply = (commentId, reply) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                ...reply,
                id: comment.replies.length + 1,
                createdAt: new Date().toISOString(),
                likes: 0,
              },
            ],
          };
        }
        return comment;
      })
    );
  };

  const handleLikeComment = (commentId) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditContent(content);
  };

  const saveEditedComment = (commentId) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, content: editContent };
        }
        return comment;
      })
    );
    setEditingCommentId(null);
    setEditContent("");
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
  };

  const generateTableOfContents = useCallback(() => {
    if (!blog?.description) return [];

    const markdown = blog.description;
    const headingRegex = /^(#+)\s+(.*)$/gm;
    const matches = [...markdown.matchAll(headingRegex)];

    return matches.map((match) => {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      return { level, text, id };
    });
  }, [blog?.description]);

  const [tableOfContents, setTableOfContents] = useState(
    generateTableOfContents()
  );

  useEffect(() => {
    setTableOfContents(generateTableOfContents());
  }, [generateTableOfContents]);

  const filteredBlogs = activeTag
    ? blogs.filter((blog) => blog.tags.includes(activeTag))
    : blogs;

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            Blog Not Found
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Sorry, the blog you are looking for could not be found. Please check
            the URL or try again later.
          </p>
          <a
            href="/BlogApp"
            className="text-blue-500 hover:underline text-sm sm:text-base inline-block"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <BlogLayout>
      <div className="px-2 md:px-16 lg:px-20 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <header className="mb-8">
          <div className="space-y-4">
            {/* Category Badge & Reading Time */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-black text-white rounded-full px-3 py-1 text-sm">
                {blog.category}
              </span>
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span className="text-blue-600 dark:text-blue-400">
                {readingTime} min read
              </span>
            </div>
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {blog.title}
            </h1>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                    activeTag === tag
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <FaUserCircle className="w-12 h-12 text-gray-900 dark:text-white" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  John Doe
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400">
                  Posted on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-2">
            {/* Featured Image spanning full width */}
            <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="text-lg text-gray-900 dark:text-white">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          padding: "1.5rem",
                          borderRadius: "0.75rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.5",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  p: ({ children }) => (
                    <p className="mb-4 leading-relaxed">{children}</p>
                  ),
                  h2: ({ children }) => (
                    <h2
                      className="mt-8 mb-4 font-bold"
                      id={children
                        .toLowerCase()
                        .replace(/ /g, "-")
                        .replace(/[^\w-]+/g, "")}
                    >
                      {children}
                    </h2>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-6 ml-6 list-disc space-y-2">
                      {children}
                    </ul>
                  ),
                }}
              >
                {blog.description}
              </ReactMarkdown>
              {/* Social Share */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FaTwitter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FaLinkedin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FaFacebook className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </button>
                </div>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isBookmarked ? (
                    <BsBookmarkFill className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <BsBookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {isBookmarked ? "Saved" : "Save for later"}
                  </span>
                </button>
              </div>
            </div>

            {/* New Comments Section Design with updated colors */}
            <section className="mt-16 w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Discussion ({comments.length})
                </h3>
                <button
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                                 border border-gray-200 dark:border-gray-700 rounded-lg 
                                 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Sort by Latest
                </button>
              </div>

              {/* Comment Form */}
              <div className="mb-8">
                <AddComment
                  buttonValue="Post Comment"
                  addComments={addComment}
                />
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800/90 rounded-lg p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      {comment.userAvatar ? (
                        <img
                          src={comment.userAvatar}
                          alt={comment.username}
                          className="w-10 h-10 rounded-full mt-1 ring-2 ring-gray-100 dark:ring-gray-700"
                        />
                      ) : (
                        <FaUserCircle className="w-10 h-10 rounded-full mt-1 ring-2 ring-gray-100 dark:ring-gray-700" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {comment.username}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 
                                       dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                            >
                              <span className="text-lg">♥</span>
                              <span>{comment.likes}</span>
                            </button>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleEditComment(comment.id, comment.content)
                                }
                                className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400"
                              >
                                <FiEdit2 size={14} />
                              </button>
                              <button
                                onClick={() => deleteComment(comment.id)}
                                className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400"
                              >
                                <FiTrash2 size={14} />
                              </button>
                              <button
                                onClick={() =>
                                  setReplyingToId(
                                    replyingToId === comment.id
                                      ? null
                                      : comment.id
                                  )
                                }
                                className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400"
                              >
                                <FiMessageSquare size={14} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {editingCommentId === comment.id ? (
                          <div className="mt-2">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-blue-500
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                              rows="3"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                              <button
                                onClick={() => setEditingCommentId(null)}
                                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => saveEditedComment(comment.id)}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {comment.content}
                          </p>
                        )}

                        {replyingToId === comment.id && (
                          <div className="mt-4">
                            <AddComment
                              buttonValue="Reply"
                              addComments={(newReply) => {
                                addReply(comment.id, newReply);
                                setReplyingToId(null);
                              }}
                              replyingTo={comment.username}
                            />
                          </div>
                        )}

                        {/* Replies with updated styling */}
                        {comment.replies.length > 0 && (
                          <div className="mt-6 pl-4 border-l-2 border-gray-100 dark:border-gray-700 space-y-6">
                            {comment.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="flex items-start gap-4"
                              >
                                {reply.userAvatar ? (
                                  <img
                                    src={reply.userAvatar}
                                    alt={reply.username}
                                    className="w-8 h-8 rounded-full mt-1 ring-2 ring-gray-100 dark:ring-gray-700"
                                  />
                                ) : (
                                  <FaUserCircle className="w-8 h-8 text-gray-900 dark:text-white" />
                                )}
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                        {reply.username}
                                      </h5>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(
                                          reply.createdAt
                                        ).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <button
                                      className="text-sm text-gray-500 hover:text-blue-500 
                                               dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                                      onClick={() =>
                                        handleLikeComment(reply.id)
                                      }
                                    >
                                      ♥ {reply.likes}
                                    </button>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar remains unchanged */}
          <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-8">
            {/* Table of Contents */}
            <nav className="hidden lg:block bg-gray-100 dark:dark:bg-gray-900/50 rounded-xl p-6">
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                Table of Contents
              </h4>
              <ul className="space-y-3 text-sm">
                {tableOfContents.map(({ level, text, id }) => (
                  <li key={id} className={`ml-${level * 2}`}>
                    <a
                      href={`#${id}`}
                      className="block text-blue-600 dark:text-blue-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Related Tags */}
            <div className="bg-gray-100 dark:dark:bg-gray-900/50 rounded-xl p-6">
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                Related Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogData;
