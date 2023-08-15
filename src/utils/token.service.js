/* eslint-disable class-methods-use-this */
class TokenService {
  getToken() {
    const token = localStorage.getItem('accessToken');

    return token;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setToken(token) {
    localStorage.setItem('accessToken', token);
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  clearStorage() {
    localStorage.clear();
  }
}

export default new TokenService();
