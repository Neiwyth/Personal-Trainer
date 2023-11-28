import { Fragment, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from '@mui/material';
// import 'ag-grid-community/styles/ag-theme-material.css';


function Customerlist() {

    const [customers, setCustomers] = useState([]);

    const columns = [
        { field: 'firstname', filter: true, sortable: true },
        { field: 'lastname', filter: true, sortable: true },
        { field: 'streetaddress', filter: true, sortable: true },
        { field: 'postcode', filter: true, sortable: true },
        { field: 'city', filter: true, sortable: true },
        { field: 'email', filter: true, sortable: true },
        { field: 'phone', filter: true, sortable: true },
        {
            cellRenderer: params => <Button variant='contained' color='error' size='small' onClick={() => deleteCustomer(params)}>Delete</Button>,
            width: 120
        }
    ]

    useEffect(() => { getCustomers() }, []);
    const URL = 'http://traineeapp.azurewebsites.net/api/customers'

    const getCustomers = () => {
        fetch(URL)
            .then(res => res.json())
            .then(resData => {
                setCustomers(resData.content)
            })
            .catch(err => console.log(err));
    }

    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure?')) {
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(resData => {
                    if (resData.ok) {
                        alert('Customer deleted')
                        getCustomers()
                    } else {
                        alert('Something went wrong: ' + resData.status + ' ' + resData.statusText)
                    }
                })
                .catch(err => console.log(err));
        }
    }


    return (
        <Fragment>
            <div className='ag-theme-alpine-dark'
                style={{ height: '520px', width: 'auto', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressAutoPageSize={true}
                />
            </div>
        </Fragment >
    )
}

export default Customerlist