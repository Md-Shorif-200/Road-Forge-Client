import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firebase/firebase.init';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvier = ({children}) => {

    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()

    console.log(user);
    


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

    // firebase sign up
    const creatUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }


    //  firebase log in 

    const logIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }

    // google logIn system

    const googleLogIn = () => {
          setLoading(true);
          return signInWithPopup(auth,googleProvider)
    }

    // firebase  log out 

    const logOut = () => {
        setLoading(true)
         return signOut(auth)
    }



    // auth info
const authInfo = {
user,
creatUser,
logIn,
googleLogIn,
logOut

    }




    return (
        <AuthContext.Provider value={authInfo}>
                {children}
        </AuthContext.Provider>
    );
};

export default AuthProvier;