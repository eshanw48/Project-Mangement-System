// package dependencies
import React, { useContext, useEffect } from "react";
import { Line } from "react-chartjs-2";

// local components
import { UserContext } from "Components/UserSession";

// utility functions and constants
import { MONTH_LABELS, GRAPH_COLORS, MONTH_DATES } from "Utilities/constants";


/**
 * Productivity graph config settings (see below)
 */
const graphSettings = {
    title: {
        display: true,
        text: "Tasks Completed",
        fontSize: 20
    },
    legend: {
        display: true,
        position: "right"
    }, scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: false,
                labelString: "day",
            },
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: "Number of tasks",
            },
            ticks: {
                beginAtZero: true,
                precision: 0
            },
        }],
    },
};


/**
 * Renders a graph of overall productivity for the current team.
 */
function TeamGraph() {
    // load in tasks data
    let { tasks } = useContext(UserContext);

    // keep track of graph data
    const [graphData, setGraphData] = React.useState([]);

    // contains the data and labels for the graph
    const graph = {
        labels: getDates(),
        datasets: graphData,
    };

    // setting and formatting for the graph

    //When tasks are changed the graph is updated with new data
    useEffect(() => {
        setGraphData([]);
        generateData();

    }, [tasks]);

    //Sends an array of the last 7 days in (mon day) format
    function getDates() {
        let dates = [];
        var x = 6;
        for (x; x >= 0; x--) {
            var date = new Date();
            date.setDate(date.getDate() - x);
            dates.push(MONTH_LABELS[date.getMonth()] + " " + date.getDate());
        }
        return dates;
    }

    /**
     * Processes and creates data representing the number of tasks completed
     * in the last week per team member. Resulting data is in the form of:
     * {
     *      "John Doe": [2, 3, 4, 2, 3]
     * }
     * 
     */
    function generateData() {
        let assignees = {};
        var x;
        for (x of tasks) {
            if (!(x.assigne in assignees)) {
                assignees[x.assigne] = [0, 0, 0, 0, 0, 0, 0];
            }
            if (x.isCompleted) {
                const currentDate = new Date();
                const completionDate = new Date(Date.parse(x.date));
                var diffTime = 0;
                if (currentDate.getMonth() === currentDate.getMonth()) {
                    diffTime = currentDate.getDate() - completionDate.getDate();
                }
                else {
                    diffTime = MONTH_DATES[completionDate.getMonth()] - completionDate.getDate();
                    diffTime += currentDate.getDate();
                }
                assignees[x.assigne][6 - diffTime]++;
                
            }
        }

        // iterate through the assigne object and create a new data
        // set for each assignee
        var y = 0;
        for (let key in assignees) {
            let newDataSet = {
                label: key,
                fill: false,
                lineTension: 0,
                backgroundColor: GRAPH_COLORS[y],
                borderColor: GRAPH_COLORS[y],
                borderWidth: 3,
                data: assignees[key]
            };
            setGraphData(prevArray => [...prevArray, newDataSet]);
            y++;
        }
    }

    return (
        <>
            <div style={{ maxWidth: "1180px", height: "250px", margin: "20px auto" }}>
                <Line
                    data={graph}
                    options={graphSettings}
                />
            </div>
        </>
    )
}

// export for bundle
export default TeamGraph;
