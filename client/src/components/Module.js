import axios from 'axios';

export function getUserInformation(username) {
  const prm = axios({
    method: 'GET',
    url: `/api/${username}`,
  });
  return prm;
}

export function addInterest(newInterest, username) {
  const addUrl = `/profile/interest/${username}`;
  return axios({
    method: 'POST',
    url: addUrl,
    data: {
      interest: newInterest,
    },
  });
}

export function deleteInterest(interestToDelete, username) {
  const delUrl = `/profile/delete/interest/${username}`;
  return axios({
    method: 'DELETE',
    url: delUrl,
    data: {
      interest: interestToDelete,
    },
  });
}

export function fetchTweets(username) {
  const getUrl = `/profile/tweet/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function fetchAllTweets(username) {
  const getUrl = `/tweets/all/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function getProfileData(username) {
  const getUrl = `/profile/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function getFollowers(username) {
  const getUrl = `/profile/followers/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function getTweets(username) {
  const getUrl = `/profile/tweets/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

// export function getFriends(id) {
//   const getUrl = `/profile/friends/${id}`;
//   return axios({
//     method: 'GET',
//     url: getUrl,
//   });
// }

export function getFriends(username) {
  const getUrl = `/profile/friends/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function deactivateProfile(id, inputPassword) {
  const delUrl = `/profile/deactivate/${id}`;
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
  const delUrl = `/profile/reactivate/${id}`;
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
  const upUrl = `/profile/password/${username}`;
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
  const upUrl = '/resetPassword';
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
  const insUrl = `/block/${id}`;
  return axios({
    method: 'POST',
    url: insUrl,
    data: {
      follower: username,
    },
  });
}

export function getBlockedFollowers(username) {
  const insUrl = `/blocked/${username}`;
  return axios({
    method: 'GET',
    url: insUrl,
  });
}

export function unBlockUser(username, blocked) {
  const insUrl = `/unblock/${username}`;
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
    url: `/home/${id}`,
  });
}

// Home modules
export function getAvatar(user) {
  return axios({
    method: 'GET',
    url: `/profile/avatar/${user}`,
  });
}

export function addTweet(data) {
  console.log('picture:', data.user);
  return axios({
    method: 'POST',
    url: `/createTweet/${data.user}`,
    data: {
      content: data.content,
      tweet_date: data.tweet_date,
      type: data.type,
      tweetId: data.tweet_id,
    },
  });
}

export function followUser(id, username) {
  const insUrl = `/follow/${id}`;
  return axios({
    method: 'POST',
    url: insUrl,
    data: {
      follower: username,
    },
  });
}

export function unfollowUser(id, username) {
  const insUrl = `/unfollow/${id}`;
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
    url: `/followers/${id}`,
  });
}

export function fetchAllFollowers(username) {
  return axios({
    method: 'GET',
    url: `/all/followers/${username}`,
  });
}

export const addUser = (usernameReg, passwordOneReg, firstName, lastName, email) => {
  // const user
  localStorage.setItem('username', JSON.stringify(usernameReg));
  const prm = axios({
    method: 'POST',
    url: '/register',
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
    url: '/userUid',
    data: {
      username: usernameReg,
    },
  });
  return prm;
};

export const userLogin = (usernameReg, password) => {
  const prm = axios({
    method: 'POST',
    url: '/login',
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
    url: '/uploadProfilePicture',
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
//     url: '/uploadFile',
//     data: {
//     },
//   });
//   return prm;
// };
export const searchFriend = (username, input) => {
  console.log(`search friend ${username}, typeof ${typeof (input)}@@@@@@@@@@@@`);
  const promise = axios({
    method: 'GET',
    url: `/search/${username}/${input}`,
  });
  return promise;
};

export function deleteTweet(tweetId) {
  const delUrl = `/tweet/delete/${tweetId}`;
  return axios({
    method: 'DELETE',
    url: delUrl,
  });
}

export function hideTweet(tweetId, username) {
  const postUrl = `/tweet/hide/${tweetId}`;
  return axios({
    method: 'POST',
    url: postUrl,
    data: {
      username,
    },
  });
}

export function updateTweetLikes(tweetId, tweetLikes) {
  const putUrl = `/tweet/likes/${tweetId}`;
  return axios({
    method: 'PUT',
    url: putUrl,
    data: {
      likes: tweetLikes,
    },
  });
}

export function updateTweetBlocks(tweetId, tweetBlocks) {
  const putUrl = `/tweet/likes/${tweetId}`;
  return axios({
    method: 'PUT',
    url: putUrl,
    data: {
      blocks: tweetBlocks,
    },
  });
}

export function isLiked(user, tweetId) {
  const getUrl = `/tweet/isliked/${user}/${tweetId}/`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function likeTweet(user, tweetId) {
  const insUrl = `/tweet/like/${user}/`;
  return axios({
    method: 'POST',
    url: insUrl,
    data: {
      tweetid: tweetId,
    },
  });
}

export function unLikeTweet(user, tweetId) {
  const putUrl = `/tweet/unlike/${user}/`;
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
    url: `/numberFailedLogins/${username}`,
  });
  return prm;
};

export const updateNumberFailedLogins = (username, numberOfFailedLogins) => {
  const addUrl = '/updateNumberFailedLogins';
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
    url: `/dateUserLastLockedOut/${username}`,
  });
  return prm;
};

export const setLockOutTime = (username) => {
  const addUrl = '/setLockOutTime';
  return axios({
    method: 'POST',
    url: addUrl,
    data: {
      username,
    },
  });
};
