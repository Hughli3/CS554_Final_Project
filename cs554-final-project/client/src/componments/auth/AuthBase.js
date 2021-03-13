// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import "firebase/auth";

export const app = firebase.initializeApp({
    apiKey: "AIzaSyBqcjeHSZBvF_8eB7Zk8dHpaSztkRF8FuU",
    authDomain: "rentsit-c6ba5.firebaseapp.com",
    databaseURL: "https://rentsit-c6ba5-default-rtdb.firebaseio.com",
    projectId: "rentsit-c6ba5",
    storageBucket: "rentsit-c6ba5.appspot.com",
    messagingSenderId: "784633422302",
    appId: "1:784633422302:web:9ca3fcf12727dea9c3fd4f",
    measurementId: "G-HD7GTSYNJE"

});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const emailProvider = firebase.auth.EmailAuthProvider;