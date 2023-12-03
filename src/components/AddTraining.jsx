/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, Fragment, useEffect } from "react";


function AddTraining(props) {

    const [training, setTraining] = useState({ date: '', duration: '', activity: '', customer: '' });
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const URL = 'https://traineeapp.azurewebsites.net/api/customers';

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleDateChange = (date) => {
        setTraining({ ...training, date: date });
    }

    const saveTraining = () => {
        props.addTraining(training);
        setOpen(false);
        setTraining({ date: '', duration: '', activity: '', customer: '' });
    }

    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(resData => {
                setCustomers(resData.content)
            })
            .catch(e => console.log(e))
    }, []);

    return (
        <Fragment>
            <Button style={{ margin: 10 }} variant='contained' color='primary' size="small" onClick={() => setOpen(true)}>Add training</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label='Date'
                            name='date'
                            format='DD.MM.YYYY HH:mm'
                            ampm={false}
                            value={training.date}
                            multiline
                            onChange={handleDateChange}
                            fullWidth />
                    </LocalizationProvider>

                    <TextField
                        margin='dense'
                        label='Duration'
                        name='duration'
                        value={training.duration}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Activity'
                        name='activity'
                        value={training.activity}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Customer'
                        name='customer'
                        select
                        value={training.customer}
                        onChange={handleInputChange}
                        fullWidth>

                        {customers.map((customer) => (
                            <MenuItem key={customer.links[0].href} value={customer.links[0].href}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Cancel</Button>
                    <Button onClick={saveTraining} color='primary'>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default AddTraining