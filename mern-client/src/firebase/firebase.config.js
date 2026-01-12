// Import Firebase SDKs

import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";



// Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDfOGTODK-2eGj9U-D2uCMaLAEFvyojPwE",

  authDomain: "shikha-kendra.firebaseapp.com",

  projectId: "shikha-kendra",

  storageBucket: "shikha-kendra.appspot.com", // ⚠️ IMPORTANT FIX

  messagingSenderId: "841396106964",

  appId: "1:841396106964:web:63bffbc07af40a6e39ed41",

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);



// EXPORT THESE 👇

export const storage = getStorage(app);

export const auth = getAuth(app);



export default app;
