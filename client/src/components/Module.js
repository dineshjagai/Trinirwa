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

export function updatePassword(id, newPass, oldPass) {
  const upUrl = `/profile/password/${id}`;
  return axios({
    method: 'PUT',
    url: upUrl,
    data: {
      newPassword: newPass,
      oldPassword: oldPass,
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
  console.log(data);
  return axios({
    method: 'POST',
    url: `/createTweet/${data.username}`,
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

export const addUser = (usernameReg, passwordOneReg, firstName, lastName, email) => {
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

export function deleteTweet(tweetid) {
  const delUrl = `/tweet/delete/${tweetid}`;
  return axios({
    method: 'DELETE',
    url: delUrl,
  });
}
