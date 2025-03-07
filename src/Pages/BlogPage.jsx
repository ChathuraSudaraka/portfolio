"use client";
import React, { useState, useEffect, useCallback } from "react";
import { blogs, comments as initialComments } from "../context/data";
import { useParams, Navigate } from "react-router-dom";
import BlogLayout from "../components/Layouts/BlogLayout";
import AddComment from "../components/common/AddComment";
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
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

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
              onClick={() => (window.location.href = "/blog")}
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
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [replyingToId, setReplyingToId] = useState(null);
  // FIX: Move useCallback before any conditional logic and make it not dependent on blog
  // This ensures it's always defined in the same order
  const generateTableOfContents = useCallback((description) => {
    if (!description) return [];

    // Handle both HTML and Markdown content
    const markdown = description;

    // Match both Markdown headings and HTML headings
    const headingRegexMd = /^(#+)\s+(.*)$/gm;
    const headingRegexHtml = /<h([1-6])[^>]*>(.*?)<\/h\1>/g;

    let matches = [];

    // Try to match Markdown headings first
    if (typeof markdown === "string") {
      const mdMatches = [...(markdown.matchAll?.(headingRegexMd) || [])];

      matches = mdMatches.map((match) => {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text
          .toLowerCase()
          .replace(/<[^>]*>/g, "") // Remove any HTML tags
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        return { level, text, id };
      });

      // If no Markdown headings found, try HTML headings
      if (matches.length === 0 && markdown.includes("<h")) {
        let htmlMatch;
        while ((htmlMatch = headingRegexHtml.exec(markdown)) !== null) {
          const level = parseInt(htmlMatch[1], 10);
          // Remove HTML tags from heading text
          const rawText = htmlMatch[2];
          const text = rawText.replace(/<[^>]*>/g, "").trim();
          const id = text
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

          matches.push({ level, text, id });
        }
      }
    }

    return matches;
  }, []);

  // Define tableOfContents state AFTER the useCallback
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    document.title = blog ? `${blog.title}` : "Blog";
    console.log("BlogPage - Looking for blog with ID:", id);

    try {
      // Get user blogs from localStorage
      const userBlogsStr = localStorage.getItem("userBlogs");
      const userBlogs = userBlogsStr ? JSON.parse(userBlogsStr) : [];
      console.log("User blogs from localStorage:", userBlogs);

      // First check user blogs from localStorage with exact string match
      let foundBlog = userBlogs.find((b) => String(b.id) === String(id));
      console.log("Found in userBlogs?", foundBlog ? "Yes" : "No");

      // If not found, check default blogs
      if (!foundBlog) {
        foundBlog = blogs.find((b) => String(b.id) === String(id));
        console.log("Found in default blogs?", foundBlog ? "Yes" : "No");
      }

      setBlog(foundBlog);

      // Set tags from the found blog or use default tags if not available
      if (foundBlog) {
        // Extract tags safely, ensuring it's always an array
        const blogTags = Array.isArray(foundBlog.tags)
          ? foundBlog.tags
          : ["JavaScript", "React", "Web Development", "Programming"];
        setTags(blogTags);
      } else {
        // Default tags if blog not found
        setTags(["JavaScript", "React", "Web Development", "Programming"]);
      }

      // Calculate reading time if blog is found
      if (foundBlog && typeof foundBlog.description === "string") {
        const wordsPerMinute = 200;
        const cleanText = foundBlog.description.replace(/<[^>]*>/g, "");
        const wordCount = cleanText.split(/\s+/).length;
        setReadingTime(Math.ceil(wordCount / wordsPerMinute));

        // Update table of contents
        setTableOfContents(generateTableOfContents(foundBlog.description));
      }

      // Set comments for this blog
      setComments(initialComments.filter((c) => c.blogId === parseInt(id)));

      setLoading(false);
    } catch (err) {
      console.error("Error loading blog:", err);
      setError("Failed to load blog. Please try again.");
      setLoading(false);
    }
  }, [id, generateTableOfContents]);

  // Show loading state
  if (loading) {
    return (
      <BlogLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </BlogLayout>
    );
  }

  // Show error message
  if (error) {
    return (
      <BlogLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => (window.location.href = "/blog")}
              className="mt-4 text-blue-500 hover:underline"
            >
              Return to Blog List
            </button>
          </div>
        </div>
      </BlogLayout>
    );
  }

  // Redirect if blog not found
  if (!blog) {
    return <Navigate to="/404" replace />;
  }

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

  const filteredBlogs = activeTag
    ? blogs.filter((blog) => blog.tags.includes(activeTag))
    : blogs;

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
              {blog.author?.avatar ? (
                <img
                  src={blog.author.avatar}
                  alt={blog.author?.name || blog.author || "Author"}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/icon.png";
                  }}
                />
              ) : (
                <FaUserCircle className="w-12 h-12 text-gray-900 dark:text-white" />
              )}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {blog.author?.name || blog.author || "Anonymous"}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400">
                  Posted on{" "}
                  {new Date(
                    blog.createdAt || blog.date || Date.now()
                  ).toLocaleDateString()}
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
                src={blog.image || "/assets/project/project-placeholder.jpg"}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="text-lg text-gray-900 dark:text-white">
              {blog && blog.description ? (
                // Unified approach to handle both HTML and Markdown content
                <div
                  className="tiptap ProseMirror prose dark:prose-invert max-w-none 
                           prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                           prose-p:my-4 prose-p:leading-relaxed
                           prose-a:text-blue-600 dark:prose-a:text-blue-400
                           prose-img:rounded-lg prose-img:my-6
                           prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                           prose-blockquote:my-6 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                           prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:p-0.5
                           prose-pre:bg-gray-900 dark:prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg
                           prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6
                           prose-li:mb-1 prose-li:pl-1"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />
              ) : (
                <p>No content available for this blog post.</p>
              )}

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
            <nav className="hidden lg:block bg-gray-100 dark:bg-gray-900/50 rounded-xl p-6">
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                Table of Contents
              </h4>

              {tableOfContents.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {tableOfContents.map(({ level, text, id }, index) => (
                    <li
                      key={`${id}-${index}`}
                      style={{
                        paddingLeft: `${(level - 1) * 0.75}rem`,
                        borderLeft:
                          level > 1
                            ? "1px solid rgba(209, 213, 219, 0.5)"
                            : "none",
                      }}
                      className="py-1"
                    >
                      <a
                        href={`#${id}`}
                        className="block text-blue-600 dark:text-blue-400 hover:text-black dark:hover:text-white transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(id);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  No headings found in this article
                </p>
              )}
            </nav>

            {/* Related Tags */}
            <div className="bg-gray-100 dark:dark:bg-gray-900/50 rounded-xl p-6">
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                Related Tags
              </h4>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                  >
                    #{typeof tag === "string" ? tag : "tag"}
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
