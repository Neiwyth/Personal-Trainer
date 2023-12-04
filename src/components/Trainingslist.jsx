import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";
import AddTraining from "./AddTraining";
import { Button, Snackbar } from "@mui/material";



function Trainingslist() {

    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const columns = [
        {
            field: 'date', filter: true, sortable: true,
            cellRenderer: (data) => {
                return dayjs(data.value).format('DD.MM.YYYY HH:mm')
            }
        },
        { headerName: 'Duration (minutes)', field: 'duration', filter: true, sortable: true },
        { field: 'activity', filter: true, sortable: true },

        // conditionally render customer name if customer exists
        { headerName: 'Customer', valueGetter: (params) => params.data.customer ? params.data.customer.firstname + ' ' + params.data.customer.lastname : '', filter: true, sortable: true },
        {
            cellRenderer: params => <Button style={{ margin: 5 }} variant='contained' color='error' size='small' onClick={() => deleteTraining(params.data.id)}>Delete</Button>,
            width: 100
        }
    ]



    useEffect(() => { getTrainings() }, []);
    const URL = 'https://traineeapp.azurewebsites.net/gettrainings'
    const ADD_URL = 'https://traineeapp.azurewebsites.net/api/trainings'

    const getTrainings = () => {
        fetch(URL)
            .then(res => res.json())
            .then(resData => {
                setTrainings(resData)
            })
            .catch(e => console.log(e));
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(ADD_URL + `/${id}`, { method: 'DELETE' })
                .then(resData => {
                    if (resData.ok) {
                        setMsg('Training deleted successfully');
                        setOpen(true);
                        getTrainings();
                    } else {
                        alert('Something went wrong: ' + resData.status);
                    }
                })
                .catch(e => console.log(e));
        }
    }

    const addTraining = (training) => {
        fetch(ADD_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(res => {
                if (res.ok) {
                    setMsg('Training added successfully');
                    setOpen(true);
                    getTrainings();
                } else {
                    alert('Something went wrong: ' + res.status);
                }
            })
            .catch(e => console.log(e));
    }


    return (
        <Fragment>
            <AddTraining addTraining={addTraining} />
            <div className='ag-theme-alpine-dark'
                style={{ height: '520px', width: '57rem', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressAutoPageSize={true}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>
        </Fragment >
    )
}

export default Trainingslist;