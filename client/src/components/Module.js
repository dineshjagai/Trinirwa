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

export function getProfileData(id) {
  const getUrl = `/profile/${id}`;
  return axios({
    method: 'GET',
    url: getUrl,
  });
}

export function getFollowers(id) {
  const getUrl = `/followers/${id}`;
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
