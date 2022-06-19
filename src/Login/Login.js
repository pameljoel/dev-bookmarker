import React from 'react';
import {initializeApp, getApps, getApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import Home from "../home/Home";

if (getApps().length === 0) {
    initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
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

const Login = () => {
    const [user] = useAuthState(auth);

    return user ? <Home/> : <SignIn/>;
}

export default Login;