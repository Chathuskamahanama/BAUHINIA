import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBf8SnPm7MaKpp5ld3CxhCjq6dlMtxfJAk",
    authDomain: "bauhinia-c.firebaseapp.com",
    projectId: "bauhinia-c",
    storageBucket: "bauhinia-c.appspot.com",
    messagingSenderId: "1035709916231",
    appId: "1:1035709916231:web:a4680f6e6b7619171a7d62",
    measurementId: "G-MBSZ26WNLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);