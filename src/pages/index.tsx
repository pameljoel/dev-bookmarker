import React from 'react';
import Home from "../home/Home";
import {initFirebaseApp} from "../utils";
import Login from "../Login/Login";

initFirebaseApp();

const Index = () => {
    return <Login>
        <Home/>
    </Login>
}

export default Index;