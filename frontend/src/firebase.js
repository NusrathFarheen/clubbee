// Firebase configuration for the Campus Club Management Suite
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvHUSMYd58GWO24up98ufiO9rVpXxTmE4",
  authDomain: "clubbee-123.firebaseapp.com",
  projectId: "clubbee-123",
  storageBucket: "clubbee-123.firebasestorage.app",
  messagingSenderId: "460963091345",
  appId: "1:460963091345:web:3d78a800ba49caf0208030",
  measurementId: "G-6C3WW8RTY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Test Firebase Storage initialization
console.log('Firebase Storage initialized:', !!storage);
console.log('Firebase Firestore initialized:', !!db);
console.log('Storage bucket:', firebaseConfig.storageBucket);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

export { auth, storage, db, analytics };
export default app;