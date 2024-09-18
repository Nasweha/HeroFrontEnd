import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import form1 from '../assets/superhero-397.gif'
import { Form } from 'react-bootstrap';
import { editApi, getGriviencesApi } from '../service/allApi';

function ViewGriviences({ grievanceId, onUpdate }) {

    const [show, setShow] = useState(false);
    const [view, setView] = useState({ fullname: "", emailId: "", phone: "", date: "", address: "", description: "", status: "" })


    const handleClose = () => setShow(false);
    
    const handleShow = async () => {
        console.log("Grievance ID:", grievanceId);
        
        try {
            const response = await getGriviencesApi(grievanceId); 
            if (response && response.data) {
                setView({
                    fullname: response.data.fullname || "",
                    emailId: response.data.emailId || "",
                    phone: response.data.phone || "",
                    date: response.data.date || "",
                    address: response.data.address || "",
                    description: response.data.description || "",
                    status: response.data.status || ""
                });
                setShow(true); 
            } else {
                console.error("No data found for the grievance.");
            }
        } catch (error) {
            console.error("Error fetching grievance details:", error);
        }
    };



    const handleUpdate = async () => {
        try {
            const response = await editApi(grievanceId, { status: view.status });
            console.log('Grievance updated successfully:', response);
            handleClose()
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Error updating grievance:", error);
        }
    };


    return (

        <div>
            <button className='btn btn-outline-primary '><FontAwesomeIcon icon={faEye} style={{ color: "red", }} onClick={handleShow} /></button>




            <Modal show={show} onHide={handleClose} style={{ height: "100vh" }}  >



                <Modal.Body className='' style={{ backgroundImage: 'radial-gradient(circle at 50.4% 50.5%, rgb(251, 32, 86) 0%, rgb(135, 2, 35) 90%)' }}>
                    <h3 className='text-center text-light mb-4'>Griviences</h3>
                    <div className='d-flex'>
                        <div className='h-100' >
                            <img src={form1} alt="" />
                        </div>
                        <form action="" className='w-100'>

                            <div className='mb-3 '>  <input type="text" placeholder='fullname' className='form-control' value={view.fullname} readOnly /></div>
                            <div className='mb-3 '>  <input type="text" placeholder='phone' className='form-control' value={view.phone} readOnly /></div>
                            <div className='mb-3 '>  <input type="text" placeholder='email' className='form-control' value={view.emailId} readOnly /></div>
                            <div className='mb-3 '>  <input type="text" placeholder='date ' className='form-control' value={view.date} readOnly /></div>
                            <div className='mb-3 '>  <input type="text" placeholder='Address' className='form-control' value={view.address} onChange={(e) => setView({ ...view, address: e.target.value })} /></div>
                            <div className='mb-3 '>  <textarea type="text" style={{ height: '200px' }} placeholder='Complaint' className='form-control' value={view.description} readOnly /></div>
                            <div className='mb-3'>

                                <Form.Select aria-label="Default select example" value={view.status} onChange={(e) => setView({ ...view, status: e.target.value })} >
                                    <option>Open this select menu</option>
                                    <option value="solved" className='text-success'>solved</option>
                                    <option value="In progress">In Progress</option>
                                    <option value="New">New</option>
                                </Form.Select>

                            </div>
                            <Button variant="primary" className='align-items-center justify-content-ceneter d-flex m-auto' onClick={handleUpdate} >
                                Add status
                            </Button>
                        </form>
                    </div>

                </Modal.Body>




            </Modal>
        </div>
    )
}

export default ViewGriviences