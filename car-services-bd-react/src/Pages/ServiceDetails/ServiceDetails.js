import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import bgServiceDetails from '../../car-service-header.jpg';

const ServiceDetails = () => {
    const { serviceId } = useParams();
    const [singleService, setSingleService] = useState({});

    useEffect(() => {
        const URL = `http://localhost:5000/services/details/${serviceId}`
        fetch(URL)
            .then(res => res.json())
            .then(data => setSingleService(data));
    }, [serviceId]);

    const justify = {
        textAlign: 'justify',
    }
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0.2, 0.2, 0.2, 0.2), rgba(0.8, 0.8, 0.8, 0.8)), URL(${bgServiceDetails})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
    }

    return (
        <div className="pt-5" style={backgroundStyle}>
            <div className="card shadow col-md-6 mx-auto px-5 py-3 bg-dark text-info border-white rounded-3 mt-3">
                <h3><i className="fas fa-id-card"></i> {serviceId}</h3>
                <h3><i className="fas fa-car"></i> {singleService?.name}</h3>
                <p style={justify}>{singleService?.description}</p>
            </div>
        </div>
    );
};

export default ServiceDetails;