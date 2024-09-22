import cookie from "react-cookies";

export function CheckUserToken() {
  const user_cookies = cookie.load("user_token");

  if (!user_cookies) {
    window.location.assign("/");
  }
}
