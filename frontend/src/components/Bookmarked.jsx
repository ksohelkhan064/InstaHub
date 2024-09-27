import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner"; // or any other notification library you're using
import { useSelector, useDispatch } from "react-redux";
import { updateBookmarks } from "@/redux/authSlice";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const Bookmarked = ({ postId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get the current user from Redux store
  const [isBookmarked, setIsBookmarked] = useState(
    user.bookmarks.includes(postId)
  ); // Local state to manage bookmark status

  // useEffect(() => {
  //     // Check if the post is already bookmarked
  //     if (user && user.bookmarks) {
  //         setIsBookmarked(user.bookmarks.includes(postId));
  //     }
  // }, [user, postId]);

  const bookmarkHandler = async () => {
    try {
      const res = await axios.post(
        `https://instahub-tvsa.onrender.com/api/v1/post/${postId}/bookmark`,
        {}, // Empty body for POST request
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsBookmarked(true); // Update local state
        dispatch(updateBookmarks({ postId, actionType: "bookmark" }));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
      toast.error("Failed to bookmark post");
    }
  };

  const unbookmarkHandler = async () => {
    try {
      const res = await axios.post(
        `https://instahub-tvsa.onrender.com/api/v1/post/${postId}/bookmark`,
        {}, // Empty body for POST request
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsBookmarked(false); // Update local state
        dispatch(updateBookmarks({ postId, actionType: "unbookmark" }));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error unbookmarking post:", error);
      toast.error("Failed to unbookmark post");
    }
  };

  return (
    // <span
    //     onClick={isBookmarked ? unbookmarkHandler : bookmarkHandler}
    //     className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'
    // >
    //     {isBookmarked ? 'Unbookmark' : 'Bookmark'}
    // </span>

    isBookmarked ? (
      <FaBookmark
        onClick={unbookmarkHandler}
        size={"24"}
        className="cursor-pointer text-gray-600"
      />
    ) : (
      <FaRegBookmark
        onClick={bookmarkHandler}
        size={"22px"}
        className="cursor-pointer hover:text-gray-600"
      />
    )
  );
};

export default Bookmarked;
