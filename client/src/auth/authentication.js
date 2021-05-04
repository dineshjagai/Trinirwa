function isValidPassword(password) {
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  return strongRegex.test(password);
}

function isValidUsername(userName) {
  const valid = new RegExp('^[a-zA-Z0-9_]*$');
  return valid.test(userName);
}

function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isSamePassword(passwordOne, passwordTwo) {
  return (passwordOne === passwordTwo);
}

module.exports = {
  isValidPassword, isValidUsername, isValidEmail, isSamePassword,
};
