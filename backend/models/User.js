// models/User.js

/**
 * Represents a User object.
 */
class User {
    constructor(uid, email, displayName, isAdmin) {
      this.uid = uid;
      this.email = email;
      this.displayName = displayName;
      this.isAdmin = isAdmin
    }
  }
  
  export default User;