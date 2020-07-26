import React, { useEffect, useState } from 'react';
import db from './firebase'
// import firebase from "firebase/app";
export const AuthContext = React.createContext();

// export const GoogleSignOn = new firebase.auth.GoogleAuthProvider()
// GoogleSignOn.setCustomParameters({
//     'prompt': 'select_account'
// });

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        db.auth().onAuthStateChanged(setCurrentUser);
    }, []); // We pass [] so this f'n only runs once when authprovider is mounted

    return (
        <AuthContext.Provider
            value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

