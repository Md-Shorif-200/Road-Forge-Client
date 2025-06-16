import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../Firebase/firebase.init';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvier = ({children}) => {

    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);


    // Firebase observer
    useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth,currentUser => {
                    setUser(currentUser);
                        setLoading(false)

                        return () => {
                             return unsubscribe()
                        }

            } )
    })

    // creat new user
    const creatUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const authInfo = {
creatUser

    }
    return (
        <AuthContext.Provider value={authInfo}>
                {children}
        </AuthContext.Provider>
    );
};

export default AuthProvier;