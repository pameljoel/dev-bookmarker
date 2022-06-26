import { getFirestore, doc, setDoc } from "firebase/firestore";
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


export const saveDoc = async (data: any) => {
    const db = getFirestore(getApp());
    await setDoc(doc(db, "urls", getTimeEpoch()), data);
};