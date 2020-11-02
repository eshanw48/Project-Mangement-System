/**
 * Utility functions for Firebase
 */

// dependencies
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

// constants dependencies
import { FIREBASE_CONFIG } from "Utilities/constants";


// initialize single Firebase app globally
try {
    firebase.initializeApp(FIREBASE_CONFIG);
} catch (err) {
    console.log(err);
}


// global APIs from Firebase to use
const auth = firebase.auth();


/**
 * User Auth Helpers
 */


/**
 * Signs in with given user credentials.
 * 
 * @param {string} email - account email
 * @param {string} password - account password
 * @return {Object} - user auth details
 */
export async function signIn(email, password) {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user;
}

/**
 * Signs up with given user credentials, automatically signing them
 * in immediately after.
 * 
 * @param {string} email - account email
 * @param {string} password - account password
 * @return {Object} - user auth details
 */
export async function signUp(email, password) {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    return user;
}

/**
 * Signs the current user out, clearing the user session.
 * 
 * @return {Object} - sign out response
 */
export async function signOut() {
    return await auth.signOut();
}

/**
 * Sends a password reset link to the given email.
 * 
 * @param {string} email - email of user
 * @return {Object} - response status details
 */
export async function resetPassword(email) {
    return await auth.sendPasswordResetEmail(email);
}

/**
 * Sets the given function as the handler for user auth state changes.
 * The function will be called whenever user a user signs in, out, etc.
 * 
 * @param {function} cb - function to call on state changes
 * @return {function} - function to detach listener
 */
export function onAuthStateChanged(cb) {
    return auth.onAuthStateChanged(cb);
}



/**
 * Function Exports
 */
export default {
    signIn,
    signUp,
    signOut,
    resetPassword,
    onAuthStateChanged,
};
