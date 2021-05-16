import axios from 'axios';

export function getUserInformation(username) {
  const prm = axios({
    method: 'GET',
    url: `/api/api/${username}`,
  });
  return prm;
}

export function addInterest(newInterest, username) {
  const addUrl = `/api/profile/interest/${username}`;
  return axios({
    method: 'POST',
    url: addUrl,
    data: {
      interest: newInterest,
    },
  });
}

export function deleteInterest(interestToDelete, username) {
  const delUrl = `/api/profile/delete/interest/${username}`;
  return axios({
    method: 'DELETE',
    url: delUrl,
    data: {
      interest: interestToDelete,
    },
  });
}

export function fetchTweets(username) {
  const getUrl = `/api/profile/tweet/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function fetchAllTweets(username) {
  const getUrl = `/api/tweets/all/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function fetchAllTweetsPaginated(username, pageNumber, limit) {
  const getUrl = `/api/tweeters/all/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
    params: { page: pageNumber, limit },

  });
}

export function getTweetCount(username) {
  const getUrl = `/api/tweets/count/all/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}
export function getProfileData(username) {
  const getUrl = `/api/profile/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function getFollowers(username) {
  const getUrl = `/api/profile/followers/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function getTweets(username) {
  const getUrl = `/api/profile/tweets/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

// export function getFriends(id) {
//   const getUrl = `/api/profile/friends/${id}`;
//   return axios({
//     method: 'GET',
//     url: getUrl,
//   });
// }

export function getFriends(username) {
  const getUrl = `/api/profile/friends/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function deactivateProfile(id, inputPassword) {
  const delUrl = `/api/profile/deactivate/${id}`;
  return axios({
    method: 'PUT',
    url: delUrl,
    data: {
      password: inputPassword,
    },
  });
}

// reactivate the account
export function reactivateProfile(id, inputPassword) {
  const delUrl = `/api/profile/reactivate/${id}`;
  return axios({
    method: 'PUT',
    url: delUrl,
    data: {
      password: inputPassword,
    },
  });
}

// change the password in the profile page
export function updatePassword(username, newPass, oldPass) {
  const upUrl = `/api/profile/password/${username}`;
  return axios({
    method: 'PUT',
    url: upUrl,
    data: {
      newPassword: newPass,
      oldPassword: oldPass,
    },
  });
}

// change the password in the login page
export function resetPassword(username, newPassword) {
  const upUrl = '/api/resetPassword';
  return axios({
    method: 'PUT',
    url: upUrl,
    data: {
      username,
      password: newPassword,
    },
  });
}

export function blockFollower(id, username) {
  const insUrl = `/api/block/${id}`;
  return axios({
    method: 'POST',
    url: insUrl,
    data: {
      follower: username,
    },
  });
}

export function getBlockedFollowers(username) {
  const insUrl = `/api/blocked/${username}`;
  return axios({
    method: 'GET',
    url: insUrl,
  });
}

export function unBlockUser(username, blocked) {
  const insUrl = `/api/unblock/${username}`;
  return axios({
    method: 'PUT',
    url: insUrl,
    data: {
      follower: blocked,
    },
  });
}

// Home modules
export function getUsername(id) {
  return axios({
    method: 'GET',
    url: `/api/home/${id}`,
  });
}

// Home modules
export function getAvatar(user) {
  return axios({
    method: 'GET',
    url: `/api/profile/avatar/${user}`,
  });
}

export function addTweet(data) {
  return axios({
    method: 'POST',
    url: `/api/createTweet/${data.user}`,
    data: {
      content: data.content,
      tweet_date: data.tweet_date,
      type: data.type,
      tweetId: data.tweet_id,
    },
  });
}

export function addComment(data) {
  return axios({
    method: 'POST',
    url: `/api/comment/add/${data.user}`,
    data: {
      commentId: data.comment_id,
      tweetId: data.tweet_id,
      content: data.content,
      timestamp: data.timestamp,
    },
  });
}

export function getAllCommentsForTweet(tweetId) {
  return axios({
    method: 'GET',
    url: `/api/tweet/comments/all/${tweetId}`,
  });
}

export function updateTweetComments(tweetId, newNumComments) {
  return axios({
    method: 'PUT',
    url: `/api/tweet/comments/${tweetId}`,
    data: {
      comments: newNumComments,
    },
  });
}

export function updateComment(commId, newContent) {
  return axios({
    method: 'PUT',
    url: `/api/tweet/comment/update/${commId}`,
    data: {
      content: newContent,
    },
  });
}

export function deleteComment(commId) {
  return axios({
    method: 'DELETE',
    url: `/api/tweet/comment/delete/${commId}`,
  });
}

export function followUser(id, username) {
  const insUrl = `/api/follow/${id}`;
  return axios({
    method: 'POST',
    url: insUrl,
    data: {
      follower: username,
    },
  });
}

export function unfollowUser(id, username) {
  const insUrl = `/api/unfollow/${id}`;
  return axios({
    method: 'PUT',
    url: insUrl,
    data: {
      follower: username,
    },
  });
}

export function fetchFollowers(id) {
  return axios({
    method: 'GET',
    url: `/api/followers/${id}`,
  });
}

export function fetchAllFollowers(username) {
  return axios({
    method: 'GET',
    url: `/api/all/followers/${username}`,
  });
}

export const addUser = (usernameReg, passwordOneReg, firstName, lastName, email) => {
  // const user
  localStorage.setItem('username', JSON.stringify(usernameReg));
  const prm = axios({
    method: 'POST',
    url: '/api/register',
    data: {
      username: usernameReg,
      password: passwordOneReg,
      first_name: firstName,
      last_name: lastName,
      email,
    },
  });
  return prm;
};

export const getUid = (usernameReg) => {
  const prm = axios({
    method: 'POST',
    url: '/api/userUid',
    data: {
      username: usernameReg,
    },
  });
  return prm;
};

export const userLogin = (usernameReg, password) => {
  const prm = axios({
    method: 'POST',
    url: '/api/login',
    data: {
      username: usernameReg,
      password,
    },
  });
  return prm;
};

export const addProfilePicture = (username, profilePicture) => {
  const prm = axios({
    method: 'POST',
    url: '/api/uploadProfilePicture',
    data: {
      username,
      profilePicture,
    },
  });
  return prm;
};

// export const uploadFile = () => {
//   const prm = axios({
//     method: 'POST',
//     url: '/api/uploadFile',
//     data: {
//     },
//   });
//   return prm;
// };
export const searchFriend = (username, input) => {
  console.log(`search friend ${username}, typeof ${typeof (input)}@@@@@@@@@@@@`);
  const promise = axios({
    method: 'GET',
    url: `/api/search/${username}/${input}`,
  });
  return promise;
};

export function deleteTweet(tweetId) {
  const delUrl = `/api/tweet/delete/${tweetId}`;
  return axios({
    method: 'DELETE',
    url: delUrl,
  });
}

export function hideTweet(tweetId, username) {
  const postUrl = `/api/tweet/hide/${tweetId}`;
  return axios({
    method: 'POST',
    url: postUrl,
    data: {
      username,
    },
  });
}

export function updateTweetLikes(tweetId, tweetLikes) {
  const putUrl = `/api/tweet/likes/${tweetId}`;
  return axios({
    method: 'PUT',
    url: putUrl,
    data: {
      likes: tweetLikes,
    },
  });
}

export function updateTweetBlocks(tweetId, tweetBlocks) {
  const putUrl = `/api/tweet/likes/${tweetId}`;
  return axios({
    method: 'PUT',
    url: putUrl,
    data: {
      blocks: tweetBlocks,
    },
  });
}

export function isLiked(user, tweetId) {
  const getUrl = `/api/tweet/isliked/${user}/${tweetId}/`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function likeTweet(user, tweetId) {
  const insUrl = `/api/tweet/like/${user}/`;
  return axios({
    method: 'POST',
    url: insUrl,
    data: {
      tweetid: tweetId,
    },
  });
}

export const getHiders = (tweetId) => {
  const prm = axios({
    method: 'GET',
    url: `/api/tweet/hiders/all/${tweetId}`,
  });
  return prm;
};

export const getSuggestions = (username) => {
  const prm = axios({
    method: 'GET',
    url: `/api/profile/suggestions/${username}`,
  });
  return prm;
};

export function unLikeTweet(user, tweetId) {
  const putUrl = `/api/tweet/unlike/${user}/`;
  return axios({
    method: 'PUT',
    url: putUrl,
    data: {
      tweetid: tweetId,
    },
  });
}

export const getNumberFailedLogins = (username) => {
  const prm = axios({
    method: 'GET',
    url: `/api/numberFailedLogins/${username}`,
  });
  return prm;
};

export const updateNumberFailedLogins = (username, numberOfFailedLogins) => {
  const addUrl = '/api/updateNumberFailedLogins';
  return axios({
    method: 'POST',
    url: addUrl,
    data: {
      username,
      numberOfFailedLogins,
    },
  });
};

export const getDateUserLastLockedOut = (username) => {
  const prm = axios({
    method: 'GET',
    url: `/api/dateUserLastLockedOut/${username}`,
  });
  return prm;
};

export const setLockOutTime = (username) => {
  const addUrl = '/api/setLockOutTime';
  return axios({
    method: 'POST',
    url: addUrl,
    data: {
      username,
    },
  });
};

/* -------------------------------------------------------------------------- */
/* ------------------------------MESSAGING----------------------------------- */
/* -------------------------------------------------------------------------- */

export function addMessage(data) {
  return axios({
    method: 'POST',
    url: `/api/createMessage/${data.user}/${data.receiver}`,
    data: {
      content: data.content,
      message_date: data.message_date,
      type: data.type,
      messageId: data.message_id,
    },
  });
}

export function fetchMessages(username, receiver) {
  const getUrl = `/api/profile/messages/${username}/${receiver}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function updateHasRead(username, receiver) {
  return axios({
    method: 'POST',
    url: `/api/hasRead/${username}/${receiver}`,
    data: {
    },
  });
}
