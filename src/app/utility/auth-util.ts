export class AuthUtil {
    // private static accessToken = 'auth token';
  
    static getAuthToken() {
      return localStorage.getItem('accessToken');
    }
  
    static getCurrentUser() {
      return localStorage.getItem('currentUser');
    }
  
    // static removeAuthToken() {
    //   localStorage.removeItem();
    // }
  }