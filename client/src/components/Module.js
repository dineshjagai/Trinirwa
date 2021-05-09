import axios from 'axios';

export function getUserInformation(username) {
  const prm = axios({
    method: 'GET',
    url: `/api/${username}`,
  });
  return prm;
}

// export function addInterest(newInterest, id) {
//   const addUrl = `/profile/interest/${id}`;
//   return axios({
//     method: 'POST',
//     url: addUrl,
//     data: {
//       interest: newInterest,
//     },
//   });
// }

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

// export function deleteInterest(interestToDelete, id) {
//   const delUrl = `/profile/delete/interest/${id}`;
//   return axios({
//     method: 'DELETE',
//     url: delUrl,
//     data: {
//       interest: interestToDelete,
//     },
//   });
// }

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

export function fetchTweets(id) {
  const getUrl = `/profile/tweet/${id}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

// export function getProfileData(id) {
//   const getUrl = `/profile/${id}`;
//   return axios({
//     method: 'GET',
//     url: getUrl,
//   });
// }

export function getProfileData(username) {
  const getUrl = `/profile/${username}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

// export function getFollowers(id) {
//   const getUrl = `/profile/followers/${id}`;
//   return axios({
//     method: 'GET',
//     url: getUrl,
//   });
// }
export function getFollowers(username) {
  const getUrl = `/profile/followers/${username}`;
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
  const delUrl = `/profile/delete/${id}`;
  return axios({
    method: 'DELETE',
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

// Home modules
export function getUsername(id) {
  return axios({
    method: 'GET',
    url: `/home/${id}`,
  });
}

export function addTweet(tweet, id) {
  return axios({
    method: 'POST',
    url: `/createTweet/${id}`,
    data: {
      content: tweet,
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

export const searchFriend = (username, input) => {
  console.log(`search friend ${username}, typeof ${typeof (input)}@@@@@@@@@@@@`);
  const promise = axios({
    method: 'GET',
    url: `/search/${username}/${input}`,
  });
  return promise;
};
