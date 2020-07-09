import * as firebase from "firebase";
// import "firebase/firestore";
// import "firebase/auth";

import { FirebaseConfig } from "./keys";

firebase.initializeApp(FirebaseConfig);
const databaseRef = firebase.database().ref();
export const authRef = firebase.auth();

export const FIREBASE_AUTH_PERSIST = firebase.auth.Auth.Persistence.LOCAL;

export const gastosRef = databaseRef.child("gastos/");
export const gastosEditRef = (id) => databaseRef.child("gastos/" + id);
