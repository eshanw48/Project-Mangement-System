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


// globals
// --------------------

const auth = firebase.auth();
const db = firebase.firestore();
const rt = firebase.database();



// User Auth Helpers
// --------------------

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


// User Related Helpers
// --------------------

/**
 * Onboards a user by adding them to the firestore database
 * 
 * @param {string} name- name of user
 * @param {string} role - user role
 * @param {string} uid - unique user id
 * @param {string} teamCode - unique id of the users team
 */
export function onBoard(name, role, uid, teamCode) {
    db.collection("users").doc(uid).set({
        name: name,
        role: role,
        uid: uid,
        team: teamCode
    }, { merge: true })
        .then(function () {
            console.log("User onboarded");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

/**
 * Get user data from firestore
 * 
 * @param {string} uid - unique id of user
 * @return {Object} - response status details
 */
export function getUserData(uid) {
    return db.collection("users").doc(uid).get()
        .then(function (doc) {
            if (doc.exists) {
                return doc.data();
            }
            return null;
        }).catch(function (err) {
            console.log('Error getting documents', err);
        });
};

/**
 * Attaches a listener for the current user, calling the given
 * function on changes.
 * 
 * @param {function} cb - function to be called with changes
 * @return {function} - listener function to be used to detach later
 */
export function attachUserListener(cb) {
    const uid = auth.currentUser.uid;
    return db.collection("users").doc(uid)
        .onSnapshot(function (snapshot) {
            cb && cb(snapshot.data());
        });
}

/**
 * Detaches a listener for the current user, given the listener.
 * 
 * @param {function} listener - original listener set up
 * @param {Object} - completion of the detachment operation
 */
export function detachUserListener(listener) {
    return listener();
}


// Team Related Helpers
// --------------------

/**
 * Adds a team meamber to a team in the database. Will then onboard the user. 
 * 
 * @param {string} name- name of user
 * @param {string} role - user role
 * @param {string} uid - unique user id
 * @param {string} teamCode - unique id of the users team
 * @return {Object} - response status details
 */
export function joinTeam(name, role, uid, teamCode) {
    return db.collection("teams").doc(teamCode).update({
        members: firebase.firestore.FieldValue.arrayUnion(uid)
    })
        .then(function () {
            onBoard(name, role, uid, teamCode);
            console.log("User added to team");
        })
        .catch(function (error) {
            console.error("Error updating: ", error);
        });
}

/**
 * Genrates a team in the database. Will then onboard the user. 
 * 
 * @param {string} name- name of user
 * @param {string} role - user role
 * @param {string} uid - unique user id
 * @param {string} teamCode - unique id of the users team
 * @return {Object} - response status details
 */
export function generateTeam(name, role, uid, teamCode) {
    return db.collection("teams").doc(teamCode).set({
        id: teamCode,
        name: "MyTeam",
        description: "",
        manager: uid,
        members: [uid],
        tags: []
    }, { merge: true })
        .then(function () {
            onBoard(name, role, uid, teamCode);
            console.log("Team Generated");
        })
        .catch(function (error) {
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
    return db.collection("teams").doc(teamCode).get()
        .then(function (doc) {
            return !!doc.exists;
        }).catch(function (err) {
            console.log('Error checking for team', err);
        });
}

/**
 * Attaches a listener for a given team, calling the given
 * function on changes.
 * 
 * @param {string} team - UUID of the team
 * @param {function} cb - function to be called with changes
 * @return {function} - listener function to be used to detach later
 */
export function attachTeamListener(team, cb) {
    return db.collection("teams").doc(team)
        .onSnapshot(function (snapshot) {
            cb && cb(snapshot.data());
        });
}

/**
 * Detaches a listener for a given team, given the listener.
 * 
 * @param {function} listener - original listener set up
 * @param {Object} - completion of the detachment operation
 */
export function detachTeamListener(listener) {
    return listener();
}


// Task Related Helpers
// --------------------

/**
 * Creates a Task in the realtime database with the given data.
 * Also adds it to the appropriate Team in the database.
 * 
 * @param {string} team - UUID of the team for the task
 * @param {string} uid - UUID of task to be created
 * @param {Object} task - task to be created
 * @return {Object} - completion of the db update
 */
export function createTask(team, uid, task) {
    const path = team + "/" + uid;
    return rt.ref(path).set(task);
}

/**
 * Updates a task in the database with the given data.
 * 
 * @param {string} team - UUID of the team for the task
 * @param {string} uid - UUID of task to be created
 * @param {Object} changes - mapping of field/values to change
 * @return {Object} - completion of the db update
 */
export function updateTask(team, uid, changes) {
    const path = team + "/" + uid;
    return rt.ref(path).update(changes);
}

/**
 * Deletes a task from the given team.
 * 
 * @param {string} team - UUID of the team for the task
 * @param {string} uid - UUID of task to be deleted
 * @return {Object} - completion of the db update
 */
export function deleteTask(team, uid) {
    const path = team + "/" + uid;
    return rt.ref(path).remove();
}

/**
 * Attaches a listener for a given team's tasks, calling the given
 * function on changes.
 * 
 * @param {string} team - UUID of the team
 * @param {function} cb - function to be called with changes
 * @return {function} - listener function to be used to detach later
 */
export function attachTasksListener(team, cb) {
    return rt.ref(team).on("value", function(snapshot) {
        cb && cb(snapshot.val())
    });
}

/**
 * Detaches a listener for a given team's tasks given the team 
 * and listener function acquired.
 * 
 * @param {string} team - UUID of the team
 * @param {function} listener - original listener set up
 * @param {Object} - completion of the detachment operation
 */
export function detachTasksListener(team, listener) {
    return rt.ref(team).off(listener);
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
    attachUserListener,
    detachUserListener,
    generateTeam,
    teamExists,
    attachTeamListener,
    detachTeamListener,
    joinTeam,
    createTask,
    updateTask,
    attachTasksListener,
    detachTasksListener,
};
