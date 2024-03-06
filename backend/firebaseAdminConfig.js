const admin = require("firebase-admin");

const serviceAccount = require("path/to/your/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com" // Replace with your database URL
});

const db = admin.firestore();
const storage = admin.storage();

export { db, storage };
