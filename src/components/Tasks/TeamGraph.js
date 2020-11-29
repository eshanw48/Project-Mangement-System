// package dependencies
import React, { useContext,useState, useEffect  } from "react";
import { Button } from "react-bootstrap";
import taskStyle from "Styles/task.css";
import {Line} from 'react-chartjs-2';

import { UserContext } from "Components/UserSession";


function TeamGraph() {

    let { team, tasks } = useContext(UserContext);
    const [graphData, setGraphData] = React.useState([]);

    const graph = {
        labels: getDates(),
        datasets: graphData,
      }

    const graphOptions = {

        title:{
            display:true,
            text:'Tasks completed per week',
            fontSize:20
        },
        legend:{
            display:true,
            position:'right'
        },scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Week',
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

    useEffect(() => {
        setGraphData([]);
        generateData();
        
    },[tasks]);

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

    function generateData() {
        let assignees = {};
        //get names of all assignes
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
    
        var y=0;
        for (let key in assignees) {
            let newGraph = {
                label: key,
                fill: false,
                lineTension: 0,
                backgroundColor: colors[y],
                borderColor: colors[y],
                borderWidth: 3,
                data: assignees[key]
              };
            setGraphData(prevArray => [...prevArray, newGraph]);
            y++;
        }
    }

    return (
        <>
        <div style={{maxWidth:'1180px', height:"250px", margin: '20px auto'}}>
            <Line
            data={graph}
            options={graphOptions}
            />
        </div>
        </>
    )
}

// export for bundle
export default TeamGraph;
