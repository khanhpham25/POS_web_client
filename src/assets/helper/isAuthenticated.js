export const isAuthenticated = () => {
  const user = localStorage.user;
  const token = localStorage.token;

  if (user && token) return true;

  return false;
};
