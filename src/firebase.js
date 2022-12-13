import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD3H2AN0cL6l7i5206PJZB6J35sUFUcBwY",
    authDomain: "netflix-clone-portfolio-d205b.firebaseapp.com",
    projectId: "netflix-clone-portfolio-d205b",
    storageBucket: "netflix-clone-portfolio-d205b.appspot.com",
    messagingSenderId: "663428155571",
    appId: "1:663428155571:web:88dc89945690d7ef2dc8c6"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export { auth, db };
  export default firebase;