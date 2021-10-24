import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import bgServiceDetails from '../../car-service-header.jpg';
import useAuth from '../../hooks/useAuth';
import ManageService from '../ManageService/ManageService';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageServices = () => {
    // MUI Snackbar starts
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const [services, setServices] = useState([]);
    useEffect(() => {
        const ENDPOINT = `services`;
        const URL = `http://localhost:5000/${ENDPOINT}`;
        fetch(URL)
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])

    const handleDeleteUser = (id) => {
        const proceed = window.confirm('Are you sure you want to remove this particular service?');
        if (proceed) {
            axios.delete(`http://localhost:5000/services/${id}`)
                .then(res => {
                    if (res.data.deletedCount === 1) {
                        const deleted = services.filter(service => service._id !== id);
                        setServices(deleted);
                        setMessage('Service Removed Successfully!');
                        setOpen(true);
                    }
                });
        }
    }

    const { user } = useAuth();

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0.5, 0.5, 0.5, 0.5), rgba(0.9, 0.8, 0.9, 0.9)), URL(${bgServiceDetails})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
    }

    return (
        <div style={backgroundStyle} className="pt-2 pb-3">
            <div className="alert alert-light col-md-6 mx-auto bg-danger text-white">
                <h4>{user?.displayName}! <i className="fas fa-plus-circle"></i> Manage a Service</h4>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <span className="badge bg-primary position-relative">
                Service Availble
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {services.length}
                    <span className="visually-hidden">unread messages</span>
                </span>
            </span>
            <div className="bg-white mt-3 col-md-8 mx-auto shadow rounded-2">
                {
                    services?.map(service => <ManageService
                        service={service}
                        key={service._id}
                        handleDeleteUser={handleDeleteUser}
                    />)
                }
            </div>
        </div>
    );
};

export default ManageServices;