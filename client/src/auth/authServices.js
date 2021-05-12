function getCurrentUsername() {
  return JSON.parse(localStorage.getItem('username'));
}

function isLogged() {
  const user = JSON.parse(localStorage.getItem('username'));
  if (user) {
    return true;
  }
  return false;
}
// clear the local storage
function logout() {
  localStorage.removeItem('username');
}

module.exports = {
  getCurrentUsername, isLogged, logout,
};
