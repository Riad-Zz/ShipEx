import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../Firebase/Firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider() ;

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //---------------------Register / Login With Google---------------------- 
    const googleLogin = ()=>{
        return signInWithPopup(auth,googleProvider) ;
    } 

    //----------------------Register With Email and password---------------------
    const EmailRegister = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //--------------------------------Email Login--------------------------- 
    const emailLogin = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password) ;
    }

    //------------------------Update a User Profile-------------------------
    const updateUser = (updatedInfo) => {
        return updateProfile(auth.currentUser , updatedInfo) ;
    } 

    //------------------------Observer------------------------------ 
    useEffect(()=>{
        const tracking = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser) ;
            setLoading(false)
        })
        return ()=>{
            tracking() ;
        }
    },[])

    const PasswordReset = (auth,email) =>{
        return sendPasswordResetEmail(auth, email) ;
    }

    //----------------------------LogOut------------------------------
    const logOut = ()=>{
        return signOut(auth) 
    }

    const AuthData = {
        user,
        setUser,
        loading,
        setLoading ,
        googleLogin ,
        logOut ,
        EmailRegister ,
        updateUser ,
        emailLogin ,
        PasswordReset
    }


    return (
        <div>
            <AuthContext value={AuthData}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;