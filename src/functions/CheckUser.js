const UserChecker = ({ cookies }) => {
  if (!cookies.user_token) {
    window.location.replace("/");
  }
};

export default UserChecker;
