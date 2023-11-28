import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";



function Trainingslist() {

    const [trainings, setTrainings] = useState([]);

    const columns = [
        {
            field: 'date', filter: true, sortable: true,
            cellRenderer: (data) => {
                return dayjs(data.value).format('DD.MM.YYYY HH:mm')
            }
        },
        { headerName: 'Duration (minutes)', field: 'duration', filter: true, sortable: true },
        { field: 'activity', filter: true, sortable: true },
        { headerName: 'Customer', valueGetter: (params) => params.data.customer.firstname + ' ' + params.data.customer.lastname, filter: true, sortable: true },
    ]



    useEffect(() => { getTrainings() }, []);
    const URL = 'https://traineeapp.azurewebsites.net/gettrainings'

    const getTrainings = () => {
        fetch(URL)
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                setTrainings(resData)
            })
            .catch(err => console.log(err));
    }



    return (
        <Fragment>
            <div className='ag-theme-alpine-dark'
                style={{ height: '520px', width: 'auto', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressAutoPageSize={true}
                />
            </div>
        </Fragment >
    )
}

export default Trainingslist;