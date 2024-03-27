import { collection, doc, getDocs, setDoc, where, query, orderBy } from "firebase/firestore";
import { db } from "../fireBase.js";

/**
 * Service class for Firestore operations.
 */
class FirestoreService {
    constructor() {
      this.collectionName = 'users';
    }
  
    // Retrieves documents from Firestore based on a field value.
    async getDocsByField(fieldName, value) {
      const usersSnapshot = await getDocs(query(collection(db, this.collectionName), where(fieldName, '==', value)));
      return usersSnapshot;
    }

    // Retrieves a single document from Firestore based on a field value.
    async getSingleDocByField(fieldName, value) {
      // Create a case-insensitive version of the value for the query
      const caseInsensitiveValue = value.toLowerCase();

      // Query with orderBy and startAt/endAt for case-insensitive search
      const usersSnapshot = await getDocs(
          query(
              collection(db, this.collectionName),
              where(fieldName, '==', caseInsensitiveValue),
              where(fieldName, '==', value ),
              orderBy(fieldName)
          )
      );

      // Returns data if userSnapShot is not empty.
      if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          return userDoc.data();
      }

      return null;
  }
    // Sets a document in Firestore with a specified ID.
    async setDocWithId(docId, data) {
      const userRef = doc(db, this.collectionName, docId);
      await setDoc(userRef, data);
    }
  }

export default FirestoreService;