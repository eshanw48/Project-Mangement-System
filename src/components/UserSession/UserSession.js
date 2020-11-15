/**
 * Handles User Session data and context
 */ 

// dependencies
import React, { useState, useEffect } from 'react';

// helper functions
import firebase from 'Utilities/Firebase';


// React Context to hold user session related data
export const UserContext = React.createContext(null);


/**
 * Component to handle user auth state changes, fetching and storing
 * user data to use throughout the rest of the app.
 * 
 * @param {Object} props - component props
 * @param {function} props.setAuthed - function to set auth state
 * @param {array} children - children components to render
 */
const UserSession = ({ setAuthed, setOnboard, children }) => {
    const [user, setUser] = useState(null);

    const sessionData = {
        user,
    };

    /**
     * Fetches user data from Firebase and stores in local state
     * 
     * @param {string} uid - uid of user to fetch
     */
    async function fetchUserData(uid) {  
        const userData = await firebase.getUserData(uid); 
        if(userData!==null){
            setUser({ name: userData.name,role: userData.role,uid:userData.uid,team: userData.team});
        }
        setOnboard(!!userData); 
    }

    /**
     * Handler for uesr auth state changes. Fetches user data on change
     * when user is valid (e.g. after sign in).
     * 
     * @param {Object} user - user object data from Firebase
     */
    async function handleAuthStateChange(user) {
        if (user && user.uid) {
            setUser({ uid: user.uid });
            await fetchUserData(user.uid);
        }
        setAuthed(!!user);
    }

    // set auth state listener on component mount, detach
    // listener on component unmount
    useEffect(() => {
        const detach = firebase.onAuthStateChanged(handleAuthStateChange);
        return detach;
    }, [])

    return (
        <UserContext.Provider value={sessionData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserSession
