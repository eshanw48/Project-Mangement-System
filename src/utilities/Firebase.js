/**
 * Utility functions for Firebase
 */

// dependencies
import firebase from "firebase/app"
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
const db = firebase.firestore();

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
 * Onboards a user by adding them to the firestore database
 * 
 * @param {string} name- name of user
 * @param {string} role - user role
 * @param {string} uid - unique user id
 * @param {string} teamCode - unique id of the users team
 */
export function onBoard(name,role,uid,teamCode) {
   db.collection("users").doc(uid).set({
        name: name,
        role: role,
        uid: uid,
        team: teamCode
    })
    .then(function() {
        console.log("User onboarded");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

/**
 * Adds a team meamber to a team in the database. Will then onboard the user. 
 * 
 * @param {string} name- name of user
 * @param {string} role - user role
 * @param {string} uid - unique user id
 * @param {string} teamCode - unique id of the users team
 * @return {Object} - response status details
 */
export function joinTeam(name,role,uid,teamCode) {
    return db.collection("teams").doc(teamCode).update({
        members: firebase.firestore.FieldValue.arrayUnion(uid)
     })
     .then(function() {
         onBoard(name,role,uid,teamCode);
         console.log("User added to team");
     })
     .catch(function(error) {
         console.error("Error updating: ", error);
     });
 }


/**
 * Get user data from firestore
 * 
 * @param {string} uid - unique id of user
 * @return {Object} - response status details
 */
export function getUserData(uid) {
    
    var result;
    return db.collection("users").doc(uid).get()
      .then(function (doc) {
        if (doc.exists) {
          result = doc.data();
          return result;
        } else {
          result = null;
          return result;
        }
      }).catch (function (err) {
        console.log('Error getting documents', err);
      });
};

/**
 * Genrates a team in the database. Will then onboard the user. 
 * 
 * @param {string} name- name of user
 * @param {string} role - user role
 * @param {string} uid - unique user id
 * @param {string} teamCode - unique id of the users team
 * @return {Object} - response status details
 */
export function generateTeam(name,role,uid,teamCode) {
    return db.collection("teams").doc(teamCode).set({
         id: teamCode,
         name: "MyTeam",
         description: "",
         manager: uid,
         members: [uid],
         tags:[]
     })
     .then(function() {
         onBoard(name,role,uid,teamCode);
         console.log("Team Generated");
     })
     .catch(function(error) {
         console.error("Error writing document: ", error);
     });
 }

 /**
 * Checks if the team exists in the database 
 *
 * @param {string} teamCode - unique id of the users team
 * @return {boolean} - if the team exists in the database
 */
 export function teamExists(teamCode) {
    var result;
    return db.collection("teams").doc(teamCode).get()
      .then(function (doc) {
        if (doc.exists) {
          return true;
        } else {
          return false;
        }
      }).catch (function (err) {
        console.log('Error checking for team', err);
      });
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
    onBoard,
    getUserData,
    generateTeam,
    teamExists,
    joinTeam
};
