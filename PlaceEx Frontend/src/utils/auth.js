export function saveToken(token) {
  localStorage.setItem("placeex_token", token);
}

export function getToken() {
  return localStorage.getItem("placeex_token");
}

export function logout() {
  localStorage.removeItem("placeex_token");
  window.location.href = "/login"; // or redirect to home
}
