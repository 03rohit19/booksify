import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyC5KDd43MWUADd-GggK618riBSX-2P4Ixw",
  authDomain: "bookify-f02b5.firebaseapp.com",
  projectId: "bookify-f02b5",
  storageBucket: "bookify-f02b5.firebasestorage.app",
  messagingSenderId: "832459021461",
  appId: "1:832459021461:web:59768cced92f0d1cc90f9c",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  // Define signupUserWithEmailAndPassword
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Define signinWithEmailAndPass separately at the same level
  const signinWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailAndPassword, signinWithEmailAndPass }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
