import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggestedUsers:[],
        userProfile:null,
        selectedUser:null,

    },
    reducers:{
        // actions
        setAuthUser:(state,action) => {
            state.user = action.payload;
        },
        setSuggestedUsers:(state,action) => {
            state.suggestedUsers = action.payload;
        },
        setUserProfile:(state,action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser:(state,action) => {
            state.selectedUser = action.payload;
        },
        updateFollowing: (state, action) => {
            const { userId, actionType } = action.payload;
            if (actionType === 'follow') {
                if (!state.user.following.includes(userId)) {
                    state.user.following.push(userId);
                }
            } else if (actionType === 'unfollow') {
                state.user.following = state.user.following.filter(id => id !== userId);
            }
        },
        updateBookmarks: (state, action) => {
            const { postId, actionType } = action.payload;
            
            // Ensure user and bookmarks exist before proceeding

            // if (!state.user || !state.user.bookmarks) {
            //     state.user = { ...state.user, bookmarks: [] };
            // }

            if (actionType === 'bookmark') {
                if (!state.user.bookmarks.includes(postId)) {
                    state.user.bookmarks.push(postId);
                }
            } else if (actionType === 'unbookmark') {
                state.user.bookmarks = state.user.bookmarks.filter((id) => id !== postId);
            }
        },
    }
});
export const {
    setAuthUser, 
    setSuggestedUsers, 
    setUserProfile,
    setSelectedUser,
    updateFollowing,
    updateBookmarks,
} = authSlice.actions;
export default authSlice.reducer;