// models/User.js
class User {
    constructor(uid, email, displayName, isAdmin) {
      this.uid = uid;
      this.email = email;
      this.displayName = displayName;
      this.isAdmin = isAdmin
    }
  }
  
  export default User;