// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJNpgLEMvWuVs34U3WxhPJk5SrFx-48Yk",
    authDomain: "quiz-senac-9d993.firebaseapp.com",
    projectId: "quiz-senac-9d993",
    storageBucket: "quiz-senac-9d993.firebasestorage.app",
    messagingSenderId: "258272404493",
    appId: "1:258272404493:web:fe1b29941a1975472ba144",
    measurementId: "G-E754VNJFTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);