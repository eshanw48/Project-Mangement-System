/**
 * Constants to use throughout the app
 */


/**
 * Firebase web app config (allowed to be public, does not have to
 * be in environment variables, etc.)
 */
export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyB_fFQhlYkh2jtk9pZfhk3kz6_Inq28igQ",
    authDomain: "fss-pms.firebaseapp.com",
    databaseURL: "https://fss-pms.firebaseio.com",
    projectId: "fss-pms",
    storageBucket: "fss-pms.appspot.com",
    messagingSenderId: "50097669899",
    appId: "1:50097669899:web:d592c8efbd55f96fe3840e"
};

/**
 * Firebase Auth user friendly error messages
 */
export const FIREBASE_AUTH_ERR_MESSAGES = {
    "auth/wrong-password": "Wrong email or password",
};


// export constants
export default {
    FIREBASE_CONFIG,
    FIREBASE_AUTH_ERR_MESSAGES,
}

