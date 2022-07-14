import jwt_decode from "jwt-decode";

export const getRole = async () => {
  const token = localStorage.getItem("userToken");
  if (token != null) {
    const tokenJSON = JSON.parse(localStorage.userToken);
    const refreshToken = tokenJSON.refreshToken;
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(accessToken);
    return decoded.data.role;
  }
};

export const isLoggedIn = async () => {
  const token = localStorage.getItem("userToken");
  if (token != null) {
    const tokenJSON = JSON.parse(localStorage.userToken);
    const refreshToken = tokenJSON.refreshToken;
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(accessToken);
    if (Date.now() > new Date(decoded.exp) * 1000) {
      localStorage.clear();
      return false;
    } else {
      return true;
    }
  } else {
    return false; //false
  }
};

export const checkRole = (role) => {
  const token = localStorage.getItem("userToken");
  if (token != null) {
    const tokenJSON = JSON.parse(localStorage.userToken);
    const refreshToken = tokenJSON.refreshToken;
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(accessToken);
    if (Date.now() > new Date(decoded.exp) * 1000) {
      localStorage.clear();
      return false;
    } else if (decoded.data.role === role) {
      return true;
    } else {
      return false;
    }
  } else {
    return false; //false
  }
};

export const getAccessToken = () => {
  const token = localStorage.getItem("userToken");
  if (token != null) {
    const tokenJSON = JSON.parse(localStorage.userToken);
    const refreshToken = tokenJSON.refreshToken;
    const accessToken = tokenJSON.accessToken;
    return accessToken;
  }
};
