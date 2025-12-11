import React, { createContext, useState } from 'react';
import { getAuth } from "firebase/auth";
import app from '../../Firebase/Firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const AuthData = {
        user,
        setUser,
        loading,
        setLoading
    }


    return (
        <div>
            <AuthContext value={AuthData}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;