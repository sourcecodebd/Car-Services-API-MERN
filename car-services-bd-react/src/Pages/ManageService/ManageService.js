import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './ManageService.css';

const ManageService = ({ service, handleDeleteUser }) => {
    const { _id, name, price } = service;

    return (
        <div className="col-md-12 mx-auto overflow-auto">
            <table className="table table-custom">
                <thead>
                    <tr>
                        <th scope="col" className="table-width">Id</th>
                        <th scope="col" className="table-width">Service Name</th>
                        <th scope="col" className="table-width">Service Service Fee</th>
                        <th scope="col" className="table-width">Manage</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="table-width">{_id}</th>
                        <td className="table-width">{name}</td>
                        <td className="table-width">{price}</td>
                        <td>
                            <Link to={`update-service/${_id}`}>
                                <Button variant="contained" className="bg-warning text-dark"><i className="fas fa-user-edit"></i>
                                </Button>
                            </Link>
                        </td>
                        <td>
                            <Button onClick={() => handleDeleteUser(_id)} variant="contained" className="bg-danger text-white"><i className="fas fa-user-minus"></i></Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

export default ManageService;