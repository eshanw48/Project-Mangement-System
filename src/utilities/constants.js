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


/**
 * Labels for each calendar month
 */
export const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];


export const GRAPH_COLORS = [
    "rgba(0, 123, 255, 0.4)",
    "rgba(40, 167, 69, 0.4)",
    "rgba(220, 53, 69, 0.4)",
    "rgba(255, 193, 7, 0.4)",
    "rgba(23, 162, 184, 0.4)",
    "rgba(87, 192, 61, 0.4)",
    "rgba(236, 39, 39, 0.4)",
]


// export constants
export default {
    FIREBASE_CONFIG,
    FIREBASE_AUTH_ERR_MESSAGES,
    MONTH_LABELS,
    GRAPH_COLORS,
}

