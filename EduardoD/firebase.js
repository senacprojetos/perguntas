// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXxROxwgMhkFV4W0kclg0qz2ZxF35wFO0",
  authDomain: "quiz-senac-fcbd8.firebaseapp.com",
  databaseURL: "https://quiz-senac-fcbd8-default-rtdb.firebaseio.com",
  projectId: "quiz-senac-fcbd8",
  storageBucket: "quiz-senac-fcbd8.firebasestorage.app",
  messagingSenderId: "455632348529",
  appId: "1:455632348529:web:46db46d688f3bf6c2342d0",
  measurementId: "G-KH98HQSRMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

window.db = db;
window.addDoc = addDoc;
window.collection = collection;