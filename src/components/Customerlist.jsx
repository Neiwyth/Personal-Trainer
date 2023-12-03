import { Fragment, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, IconButton, Snackbar } from '@mui/material';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { CSVLink } from 'react-csv';
import { FileDownload } from '@mui/icons-material';
// import 'ag-grid-community/styles/ag-theme-material.css';


function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

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

    const csvData = [
        ['Firstname', 'Lastname', 'Streetaddress', 'Postcode', 'City', 'Email', 'Phone'], //headers
        ...customers.map(customer => [ //rows
            customer.firstname, customer.lastname, customer.streetaddress, customer.postcode, customer.city, customer.email, customer.phone])
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
                        setMsg('Customer deleted successfully');
                        setOpen(true);
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
                    setMsg('Customer added successfully');
                    setOpen(true);
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
                    setMsg('Customer updated successfully');
                    setOpen(true);
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

            <IconButton style={{ left: 750, top: 53, zIndex: 2 }}>
                <CSVLink data={csvData} filename='customerdata.csv'>
                    <FileDownload />
                </CSVLink>
            </IconButton>

            <div className='ag-theme-alpine-dark'
                style={{ height: '520px', width: 'auto', margin: 'auto', zIndex: 1 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressAutoPageSize={true}
                />
            </div>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </Fragment >
    )
}

export default Customerlist