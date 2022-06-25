import React from 'react';
import {initializeApp, getApps, getApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import Home from "../home/Home";

if (getApps().length === 0) {
    
    initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID
    })
} else {
    getApp();
}

const auth = getAuth();

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

function SignIn() {
    return (
        <div className="sign-in__container">
            <button className="sign-in__button" onClick={signInWithGoogle}><strong>Sign in </strong>with Google</button>
        </div>
    )
}

const Index = () => {
    const [user] = useAuthState(auth);

    return user ? <Home/> : <SignIn/>;
}

export default Index;