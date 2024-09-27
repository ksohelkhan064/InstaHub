import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // or any other notification library you're using
import { useDispatch, useSelector } from "react-redux";

// use this when you want to store follwoing in store
import { updateFollowing } from "@/redux/authSlice"; // Adjust path if necessary

const Follow = ({ userIdToFollow }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isFollowing, setIsFollowing] = useState(
    user?.following.includes(userIdToFollow)
  );

  const followHandler = async () => {
    try {
      const res = await axios.post(
        `https://instahub-tvsa.onrender.com/api/v1/user/followorunfollow/${userIdToFollow}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsFollowing(true);

        // uncomment it when you use store for the tracking of following and unfollowing

        dispatch(
          updateFollowing({ userId: userIdToFollow, actionType: "follow" })
        );
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error following user:", error);
      toast.error("Failed to follow user");
    }
  };

  const unfollowHandler = async () => {
    try {
      const res = await axios.post(
        `https://instahub-tvsa.onrender.com/api/v1/user/followorunfollow/${userIdToFollow}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsFollowing(false);
        // uncomment it when you use store for the tracking of following and unfollowing

        dispatch(
          updateFollowing({ userId: userIdToFollow, actionType: "unfollow" })
        );
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("Failed to unfollow user");
    }
  };

  return (
    <span onClick={isFollowing ? unfollowHandler : followHandler}>
      {isFollowing ? "Unfollow" : "Follow"}
    </span>

    //     isFollowing ?
    //     <span
    //         onClick={followHandler}
    //         className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'
    //     >
    //         UnFollow
    //     </span>  :

    //     <span
    //     onClick={followHandler}
    //     className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'
    // >
    //     Follow
    // </span>
  );
};

export default Follow;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner"; // Notification library
// import { useSelector } from "react-redux";

// const Follow = ({ userIdToFollow }) => {
//     const { user } = useSelector(state => state.auth);
//   const [isFollowing, setIsFollowing] = useState(user?.following.includes(userIdToFollow) || false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetch follow status initially to set the button state
//     const fetchFollowStatus = async () => {
//       try {
//         const response = await axios.get(
//           `https://instahub-tvsa.onrender.com/api/v1/user/followorunfollow/${userIdToFollow}`,
//           { withCredentials: true }
//         );
//         setIsFollowing(response.data.isFollowing);
//       } catch (error) {
//         console.error("Error fetching follow status:", error);
//       }
//     };

//     fetchFollowStatus();
//   }, [userIdToFollow]);

//   const handleFollowOrUnfollow = async () => {
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `https://instahub-tvsa.onrender.com/api/v1/user/followorunfollow/${userIdToFollow}`,
//         {},
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         setIsFollowing(response.data.isFollowing);
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error following/unfollowing user:", error);
//       toast.error("Failed to process request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//     isFollowing ? <span onClick={handleFollowOrUnfollow} className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]" >Follow</span> : <span onClick={handleFollowOrUnfollow} className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]" >UnFollow</span>
//   );
// };

// export default Follow;
