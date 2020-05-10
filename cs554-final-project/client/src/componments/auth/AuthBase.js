import * as firebase from 'firebase';
import "firebase/auth";

export const app = firebase.initializeApp({
    apiKey: "AIzaSyB8NOrnu1w_ZfYxyuuk5Y0_IW-S4TP8KOE",
    authDomain: "finalproject-e61f4.firebaseapp.com",
    databaseURL: "https://finalproject-e61f4.firebaseio.com",
    projectId: "finalproject-e61f4",
    storageBucket: "finalproject-e61f4.appspot.com",
    messagingSenderId: "475010037597",
    appId: "1:475010037597:web:afce5dcd6071b059a61ab4"
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();