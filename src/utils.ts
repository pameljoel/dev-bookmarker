import { collection, getFirestore, doc, setDoc, getDocs } from "firebase/firestore";
import {getApp, getApps, initializeApp} from "firebase/app";

export const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

const getTimeEpoch = () => {
    return new Date().getTime().toString();
}

export const initFirebaseApp = () => {
    if (getApps().length === 0) {

        return initializeApp({
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_APP_ID
        })
    } else {
        return getApp();
    }
}

export const fetchPosts = async (auth: any) => {
    const db = getFirestore(getApp());
    const messagesRef = collection(db, 'urls');
    // console.log('fetchPosts', { auth, db, messagesRef, uid: auth?.currentUser?.uid })

    const data = await getDocs(messagesRef);
    return [...data.docs].filter(doc => doc.data().author === auth.currentUser.uid).map(doc => doc.data());
};

export const saveDoc = async (data: any) => {
    const db = getFirestore(getApp());
    await setDoc(doc(db, "urls", getTimeEpoch()), data);
};