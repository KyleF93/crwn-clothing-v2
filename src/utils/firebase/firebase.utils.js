import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOKeWuv_vWlqh68qbaaLZOzXtIRqBuxdY",
    authDomain: "crwn-clothing-db-d2c4b.firebaseapp.com",
    projectId: "crwn-clothing-db-d2c4b",
    storageBucket: "crwn-clothing-db-d2c4b.appspot.com",
    messagingSenderId: "103740895746",
    appId: "1:103740895746:web:dc104ca6d674400396ad1b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log("error creating the user", error.message)
        }
    }

    return userDocRef;
}