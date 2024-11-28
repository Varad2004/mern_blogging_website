import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC1WP5RQrWmsPZg004A6U4BNG6IezuQ5C8",
  authDomain: "mern-blog-fe15c.firebaseapp.com",
  projectId: "mern-blog-fe15c",
  storageBucket: "mern-blog-fe15c.appspot.com",
  messagingSenderId: "291455860835",
  appId: "1:291455860835:web:b43189576b2a64754a7856",
  measurementId: "G-7PBCEWR050"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth,provider).then((result)=>{
        user = result.user
    })
    .catch((err) =>{
        console.log(err)
    })
    return user;
}