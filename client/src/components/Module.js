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

export function fetchFollowers(id) {
  return axios({
    method: 'GET',
    url: `/followers/${id}`,
  });
}
