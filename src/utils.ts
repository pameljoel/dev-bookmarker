import { getFirestore, doc, setDoc } from "firebase/firestore";
import {getApp} from "firebase/app";

export const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

const getTimeEpoch = () => {
    return new Date().getTime().toString();
}

export const saveDoc = async (data: any) => {
    const db = getFirestore(getApp());
    await setDoc(doc(db, "urls", getTimeEpoch()), data);
};