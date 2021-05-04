import axios from 'axios';

export function getUserInformation(username) {
  const prm = axios({
    method: 'GET',
    url: `/api/${username}`,
  });
  return prm;
}

export function addInterest(newInterest, id) {
  const addUrl = `/profile/interest/${id}`;
  return axios({
    method: 'POST',
    url: addUrl,
    data: {
      interest: newInterest,
    },
  });
}

export function deleteInterest(interestToDelete, id) {
  const delUrl = `/profile/delete/interest/${id}`;
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

export function getFollowers(id) {
  const getUrl = `/profile/followers/${id}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function deleteProfile(id) {
  const delUrl = `/profile/delete/${id}`;
  return axios({
    method: 'DELETE',
    url: delUrl,
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
