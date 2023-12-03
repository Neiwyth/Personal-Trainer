/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState, Fragment } from "react";


function EditCustomer(props) {

    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    }

    const handleOpen = () => {
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        });
        setOpen(true);
    }

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const updateCustomer = () => {
        props.updateCustomer(customer, props.params.data.links[0].href);
        setOpen(false);
    }


    return (
        <Fragment>
            <Button style={{ margin: 5 }} variant='contained' color='primary' size="small" onClick={handleOpen}>Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='First name'
                        name='firstname'
                        value={customer.firstname}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Last name'
                        name='lastname'
                        value={customer.lastname}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Street address'
                        name='streetaddress'
                        value={customer.streetaddress}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Postcode'
                        name='postcode'
                        value={customer.postcode}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='City'
                        name='city'
                        value={customer.city}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Email'
                        name='email'
                        value={customer.email}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Phone'
                        name='phone'
                        value={customer.phone}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Cancel</Button>
                    <Button onClick={updateCustomer} color='primary'>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default EditCustomer