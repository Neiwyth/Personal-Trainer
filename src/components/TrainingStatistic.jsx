import _ from "lodash";
import { useEffect, useState } from "react";
import { Bar, BarChart, Label, ResponsiveContainer, XAxis, YAxis } from "recharts";


function Statistics() {

    const [data, setData] = useState([]);


    const URL = 'https://traineeapp.azurewebsites.net/gettrainings'
    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(resData => {
                const groupedActivityData = _.groupBy(resData, 'activity');
                const sumByActivity = Object.keys(groupedActivityData).map(activity => ({
                    activity,
                    duration: _.sumBy(groupedActivityData[activity], 'duration')
                }));
                setData(sumByActivity);
            })
            .catch(e => console.log(e));
    }, []);



    return (
        <ResponsiveContainer width='100%' height={750}>
            <BarChart data={data}>
                <XAxis dataKey='activity' tick={{ stroke: 'white' }} />
                <YAxis tick={{ stroke: 'white' }}>
                    <Label value='Duration (min)' angle={-90} position='insideLeft' style={{ textAnchor: 'middle', stroke: 'white' }} />
                </YAxis>
                <Bar dataKey='duration' fill='skyblue' />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default Statistics;