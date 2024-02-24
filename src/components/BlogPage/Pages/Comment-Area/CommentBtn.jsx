import {
  IconCornerUpLeft,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

const CommentBtn = ({
  commentData,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
}) => {
  // adding reply

  // console.log(setReplying, setDeleting, se)

  let counter = false;
  const showAddComment = () => {
    counter ? setReplying(false) : setReplying(true);
    counter = true;
  };

  // delete comment
  const showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  // edit comment
  const showEditComment = () => {
    setEditing(true);
  };

  return (
    <div className="comment--btn">
      <button
        className={`reply-btn ${
          !commentData.currentUser ? "" : "display--none"
        }`}
        onClick={showAddComment}
      >
        <IconCornerUpLeft />
      </button>
      <button
        className={`delete-btn ${
          commentData.currentUser ? "" : "display--none"
        }`}
        onClick={showDeleteModal}
      >
        <IconTrash />
      </button>
      <button
        className={`edit-btn ${commentData.currentUser ? "" : "display--none"}`}
        onClick={showEditComment}
      >
        <IconEdit />
      </button>
    </div>
  );
};

export default CommentBtn;
