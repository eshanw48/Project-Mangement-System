/**
 * Handles User Session data and context
 */

// dependencies
import React, { useState, useEffect, useReducer } from "react";

// helper functions
import firebase from "Utilities/Firebase";

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
    const [team, setTeam] = useState(null);
    const [tasks, setTasks] = useReducer(parseTasks, []);

    const sessionData = {
        user,
        team,
        tasks,
    };

    // processes tasks from JSON format to array format
    function parseTasks(_, data) {
        if (data === null) {
            data = {};
        }
        return Object.keys(data).map(uid => ({ uid, ...data[uid] }));
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
            // set up listener for changes in user db
            await firebase.attachUserListener(data => {
                setUser(curr => ({ ...curr, ...data }));
                setOnboard(!!data?.name);
            });
        }
        setAuthed(!!user);
    }

    // set auth state listener on component mount, detach
    // listener on component unmount
    useEffect(() => {
        const detach = firebase.onAuthStateChanged(handleAuthStateChange);
        return detach;
    }, [])

    // set up listener on the team and all the tasks
    useEffect(() => {
        const team = user?.team;
        if (!team) return;

        // set up listener on team
        const teamListener = firebase.attachTeamListener(team, data => {
            setTeam(curr => ({ uid: data.id, ...curr, ...data }));
        });
        // set up listener on team's task list
        const taskListener = firebase
            .attachTasksListener(team, data => setTasks(data));

        // detach listeners on unmount
        function detach() {
            firebase.detachTeamListener(teamListener);
            firebase.detachTasksListener(team, taskListener);
        }

        return detach;
    }, [user?.team]);

    return (
        <UserContext.Provider value={sessionData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserSession
