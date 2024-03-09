import { initializeApp } from 'firebase/app';
import config from './config.js';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebase = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

export {firebase, db, storage};