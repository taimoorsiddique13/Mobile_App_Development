
import firebase from 'firebase/compat/app';
import { getFirestore, collection, doc, getDocs,setDoc } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyATfVxRrQGmUA8YOt0xiQnQTpR3D7ROYuA",
  authDomain: "sp21mad.firebaseapp.com",
  projectId: "sp21mad",
  storageBucket: "sp21mad.appspot.com",
  messagingSenderId: "863675615055",
  appId: "1:863675615055:web:3e74464f4c2ca59be8a73a",
  measurementId: "G-B257MSLBN0"
};

const app = firebase.initializeApp(firebaseConfig);
export const db= getFirestore(app);
const auth = getAuth(app);


export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };










