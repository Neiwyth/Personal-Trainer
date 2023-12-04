/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment/moment';
import { Fragment, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TrainingCalendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => getTrainings(), []);
    const URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    const getTrainings = () => {
        fetch(URL)
            .then(res => res.json())
            .then(resData => {
                setEvents(eventFormat(resData))
            })
            .catch(e => console.log(e));
    }

    const eventFormat = (list) => {
        const newEventList = list.map((event) => {
            // null check for customer
            const customerName = event.customer ? event.customer.firstname + ' ' + event.customer.lastname : 'N/A';

            return {
                title: event.activity + ' - ' + customerName,
                start: moment(event.date).toDate(),
                end: moment(event.date).add(event.duration, 'minutes').toDate()
            }
        });
        return newEventList;
    }

    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor='start'
                    endAccessor='end'
                    step={60}
                    style={{
                        height: 700, width: 1500,
                        color: 'slategrey',
                    }}
                />
            </div>
        </Fragment>
    )
}

export default TrainingCalendar 