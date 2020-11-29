// package dependencies
import React, { useContext,useState, useEffect  } from "react";
import { Button } from "react-bootstrap";
import taskStyle from "Styles/task.css";
import {Line} from 'react-chartjs-2';

import { UserContext } from "Components/UserSession";


function TeamGraph() {

    let { tasks } = useContext(UserContext);
    const [graphData, setGraphData] = React.useState([]);

    //Contains the data and labels for the graph
    const graph = {
        labels: getDates(),
        datasets: graphData,
      }

    //Setting and formatting for the graph
    const graphSettings = {
        title:{
            display:true,
            text:'Tasks Completed',
            fontSize:20
        },
        legend:{
            display:true,
            position:'right'
        },scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'day',
                },
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Number of tasks',
                },
                ticks: {
                    beginAtZero: true,
                    precision: 0
                },
            }],
        },
    }

    //When tasks are changed the graph is updated with new data
    useEffect(() => {
        setGraphData([]);
        generateData();
        
    },[tasks]);

    //Sends an array of the last 7 days in (mon day) format
    function getDates(){
        const months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
        let dates = [];
        var x = 6;
        for(x;x>=0;x--){
            var date = new Date();
            date.setDate(date.getDate() - x);
            dates.push(months[date.getMonth()] + " " + date.getDate());
        }
        return dates;
    }

    //Generates data based on the tasks
    function generateData() {
        /*
            generates the object assignees containing the names of the assignees as keys and an array 
            containing the number of task completed in the last 7 days as the values
            for example
            {
                person1 : [2,3,4,3,2,1]
                person2 : [2,5,2,1,2,3]
                person3 : [2,3,1,3,4,1]
            }
        */
        let assignees = {};
        var x;
        for (x of tasks) {
            if(!(x.assigne in assignees)){
                assignees[x.assigne] = [0,0,0,0,0,0,0];
            }

            if(x.isCompleted){
                const currentDate = new Date();
                const completionDate = Date.parse(x.date);
                const diffTime = currentDate - completionDate;
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                assignees[x.assigne][6-diffDays]++;
                
            }
        }
        
        const colors =['rgba(0, 123, 255,0.4)','rgba(40, 167, 69,0.4)','rgba(220, 53, 69,0.4)','rgba(255, 193, 7,0.4)','rgba(23, 162, 184,0.4)','rgba(87, 192, 61,0.4)','rgba(236, 39, 39,0.4)']
    
        //iterates through the assigne object and creates a new data set for each assignee
        var y=0;
        for (let key in assignees) {
            let newDataSet = {
                label: key,
                fill: false,
                lineTension: 0,
                backgroundColor: colors[y],
                borderColor: colors[y],
                borderWidth: 3,
                data: assignees[key]
              };
            setGraphData(prevArray => [...prevArray, newDataSet]);
            y++;
        }
    }

    return (
        <>
        <div style={{maxWidth:'1180px', height:"250px", margin: '20px auto'}}>
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
