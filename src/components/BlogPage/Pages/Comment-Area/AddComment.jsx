import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const AddComment = ({ buttonValue, addComments, replyingTo }) => {
  const [comment, setComment] = useState("");

  const clickHandler = () => {
    if (comment.trim() === "") return;

    const newComment = {
      content: comment,
      createdAt: new Date(),
      username: "You", // Replace with actual user data
      userAvatar: "/default-avatar.jpg", // Replace with actual user avatar
      likes: 0,
      replies: [],
    };

    addComments(newComment);
    setComment("");
  };

  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-lg shadow-sm">
      <textarea
        className="w-full min-h-[100px] p-4 text-gray-700 dark:text-gray-300 bg-transparent
                   border border-gray-200 dark:border-gray-700 rounded-t-lg 
                   resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder={
          replyingTo ? `Reply to ${replyingTo}...` : "What are your thoughts?"
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <FaUserCircle className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-500">Commenting as Guest</span>
        </div>
        <div className="flex gap-2">
          {replyingTo && (
            <button
              onClick={() => addComments(null)}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800"
            >
              Cancel
            </button>
          )}
          <button
            onClick={clickHandler}
            disabled={!comment.trim()}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg
                     hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonValue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
