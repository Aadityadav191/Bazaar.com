// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Firebase Authentication
import { getAnalytics } from "firebase/analytics"; // For Firebase Analytics (optional)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4_oa8rlAxujZneVYFRfoOObOfrZn2-G0",
  authDomain: "bazaar-8984d.firebaseapp.com",
  projectId: "bazaar-8984d",
  storageBucket: "bazaar-8984d.firebasestorage.app",
  messagingSenderId: "108108270828",
  appId: "1:108108270828:web:7ef828e616c2b81f8469c9",
  measurementId: "G-XHQQQBVNCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Analytics (optional, if you're using analytics)
const analytics = getAnalytics(app);

// Export auth to use in other parts of the app
export { auth, analytics };
