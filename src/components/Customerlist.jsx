import { Fragment, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from '@mui/material';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
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
            cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} />,
            width: 100
        },
        {
            cellRenderer: params => <Button style={{ margin: 5 }} variant='contained' color='error' size='small' onClick={() => deleteCustomer(params)}>Delete</Button>,
            width: 100
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
                        alert('Customer deleted');
                        getCustomers();
                    } else {
                        alert('Something went wrong: ' + resData.status);
                    }
                })
                .catch(e => console.log(e));
        }
    }

    const addCustomer = (customer) => {
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(resData => {
                if (resData.ok) {
                    alert('Customer added');
                    getCustomers();
                } else {
                    alert('Something went wrong: ' + resData.status);
                }
            })
            .catch(e => console.log(e));
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(resData => {
                if (resData.ok) {
                    alert('Customer updated');
                    getCustomers();
                } else {
                    alert('Something went wrong: ' + resData.status);
                }
            })
            .catch(e => console.log(e))
    }


    return (
        <Fragment>
            <AddCustomer addCustomer={addCustomer} />
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