import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB9Chle8OljK41RclHe7DNVY688hguvoTc",
    authDomain: "thirstystudios-web-777.firebaseapp.com",
    projectId: "thirstystudios-web-777",
    storageBucket: "thirstystudios-web-777.firebasestorage.app",
    messagingSenderId: "1044748016225",
    appId: "1:1044748016225:web:f13115af2bfae02b3be820"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
