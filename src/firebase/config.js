import firebase from "firebase/app";
import "firebase/firestore";

import "firebase/storage";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1aH_Arw3qQ5cDw0LpOjTWBYbZSKKSG70",
  authDomain: "didi-site.firebaseapp.com",
  projectId: "didi-site",
  storageBucket: "didi-site.appspot.com",
  messagingSenderId: "717694767304",
  appId: "1:717694767304:web:3e9822dc9a4349d16295fd",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const projectAuth = firebase.auth();

export { projectFirestore, projectStorage, projectAuth };
