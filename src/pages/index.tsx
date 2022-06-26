import React from 'react';
import {initializeApp, getApps, getApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import Home from "../home/Home";
import { initFirebaseApp } from "../utils";

initFirebaseApp();
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