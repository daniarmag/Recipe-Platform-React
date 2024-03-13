import { collection, doc, getDocs, setDoc, where, query, orderBy } from "firebase/firestore";
import { db } from "../fireBase.js";

class FirestoreService {
    constructor() {
      this.collectionName = 'users';
    }
  
    async getDocsByField(fieldName, value) {
      const usersSnapshot = await getDocs(query(collection(db, this.collectionName), where(fieldName, '==', value)));
      return usersSnapshot;
    }

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

      if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          return userDoc.data();
      }

      return null;
  }
  
    async setDocWithId(docId, data) {
      const userRef = doc(db, this.collectionName, docId);
      await setDoc(userRef, data);
    }
  }

export default FirestoreService;