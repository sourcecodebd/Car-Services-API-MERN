import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import useAuth from '../../hooks/useAuth';
import bgServiceDetails from '../../car-service-header.jpg';
import { useForm } from "react-hook-form";
import axios from 'axios';
// import { useHistory } from 'react-router';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddService = () => {
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

    const { user } = useAuth();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // let history = useHistory();
    const onSubmit = (data, e) => {
        console.log(data);
        const ENDPOINT = `services`;
        const URL = `http://localhost:5000/${ENDPOINT}`;
        axios.post(URL, data)
            .then(res => {
                if (res.data.insertedId) {
                    setMessage('Service Added Successfully!');
                    setOpen(true); // MUI Snackbar opens
                    reset();
                    // setTimeout(() => {
                    //     history.push('/services');
                    // }, 1000)
                }
            })
    };

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0.5, 0.5, 0.5, 0.5), rgba(0.9, 0.8, 0.9, 0.9)), URL(${bgServiceDetails})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
    }

    return (
        <div style={backgroundStyle} className="pt-2">
            <div className="alert alert-light col-md-6 mx-auto bg-danger text-white">
                <h4>{user?.displayName}! <i className="fas fa-plus-circle"></i> Add a Service</h4>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmit)} className="col-md-6 mx-auto d-flex flex-column gap-3 pt-3 pb-5" autoComplete="off">
                <input {...register("name", { required: true })} placeholder="Service Name" className="form-control" />
                {errors.name && <span className="red">Service Name Field is required!</span>}
                <input type="number" {...register("price", { required: true })} placeholder="Service Fee" className="form-control" />
                {errors.price && <span className="red">Service Fee Field is required!</span>}
                <textarea rows="7" {...register("description", { required: true })} placeholder="Description" className="form-control" />
                <input {...register("time", { required: true })} placeholder="Service Time" className="form-control" />
                {errors.time && <span className="red">Service Time Field is required!</span>}
                <input {...register("img_url", { required: true })} placeholder="Image URL" className="form-control" />
                {errors.img_url && <span className="red">Image URL Field is required!</span>}
                <Button type="submit" variant="contained">Continue</Button>
            </form>
        </div>
    );
};

export default AddService;