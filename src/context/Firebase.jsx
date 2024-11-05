import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log("User", user);
      if (user) setUser(user);
      else setUser(null);
    });
  });

  // Define signupUserWithEmailAndPassword
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Define signinWithEmailAndPass separately at the same level
  const signinWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Sign in With Google
  const signingupWithGoogle = (email, password) => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  console.log(user);
  //fire store function
  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uplaodResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uplaodResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      photoUrl: user.photoURL,
    });
  };
  //user looged in status
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinWithEmailAndPass,
        signingupWithGoogle,
        handleCreateNewListing,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

// import { createContext, useContext, useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const FirebaseContext = createContext(null);

// const firebaseConfig = {
//   apiKey: "AIzaSyC5KDd43MWUADd-GggK618riBSX-2P4Ixw",
//   authDomain: "bookify-f02b5.firebaseapp.com",
//   projectId: "bookify-f02b5",
//   storageBucket: "bookify-f02b5.appspot.com",
//   messagingSenderId: "832459021461",
//   appId: "1:832459021461:web:59768cced92f0d1cc90f9c",
// };

// export const useFirebase = () => useContext(FirebaseContext);

// const firebaseApp = initializeApp(firebaseConfig);
// const firebaseAuth = getAuth(firebaseApp);
// const firestore = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);

// const googleProvider = new GoogleAuthProvider();

// export const FirebaseProvider = (props) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(firebaseAuth, (currentUser) => {
//       console.log("User state changed:", currentUser);
//       setUser(currentUser);
//     });
//   }, []);

//   const handleCreateNewListing = async (name, isbn, price, cover) => {
//     try {
//       if (!user) {
//         console.warn("User not authenticated. Cannot create listing.");
//         alert("You must be logged in to create a listing.");
//         return;
//       }

//       console.log("Preparing to upload image:", cover);
//       const imageRef = ref(
//         storage,
//         `uploads/images/${Date.now()}-${cover.name}`
//       );

//       // Upload the cover image to Firebase Storage
//       const uploadResult = await uploadBytes(imageRef, cover);
//       console.log("Image uploaded successfully:", uploadResult);

//       // Create a new document in Firestore
//       const docRef = await addDoc(collection(firestore, "books"), {
//         name,
//         isbn,
//         price,
//         imageURL: uploadResult.ref.fullPath,
//         userID: user.uid,
//         userEmail: user.email,
//         userName: user.displayName,
//         photoUrl: user.photoURL,
//       });
//       console.log("Document successfully created with ID:", docRef.id);

//       return docRef.id; // Return the document ID or any other result if needed
//     } catch (error) {
//       console.error("Error in handleCreateNewListing:", error);
//       throw error;
//     }
//   };

//   return (
//     <FirebaseContext.Provider
//       value={{
//         handleCreateNewListing,
//       }}
//     >
//       {props.children}
//     </FirebaseContext.Provider>
//   );
// };
