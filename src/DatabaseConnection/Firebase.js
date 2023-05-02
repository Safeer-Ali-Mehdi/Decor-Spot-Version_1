// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/storage';

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8NcwRrLX7BI_WaoAryijDqrj7dhs8GFI",
  authDomain: "decorspot-318c4.firebaseapp.com",
  projectId: "decorspot-318c4",
  storageBucket: "decorspot-318c4.appspot.com",
  messagingSenderId: "3529064589",
  appId: "1:3529064589:web:b9418a3611948da3d522c4",
  measurementId: "G-0M0JGKX66W"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
export {auth};


export const db = getFirestore(app);