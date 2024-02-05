// auth.js
export const setAuthToken = (token) => {
    if (token) {
      // Apply the token to every request header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Remove the token from the request header
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('jwtToken');
  };
  
  export const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token; // Return true if token exists
  };
  