import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import Count from '../component/Count';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllGriviencesApi, deleteDataApi } from '../service/allApi';
import ViewGriviences from '../component/ViewGriviences';

function DashBoard() {
  const [griviences, setGriviences] = useState([]);
  const [deletedata, setDeletedata] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); //  keyword search
  const [statusFilter, setStatusFilter] = useState(''); //  status filter
  const [startDate, setStartDate] = useState(''); // date start
  const [endDate, setEndDate] = useState(''); // date end

  const fetchGriviences = async () => {
    try {
      const result = await getAllGriviencesApi();
      setGriviences(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const result = await deleteDataApi(id);
      console.log('Deleting id:', id);
      setDeletedata(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGriviences();
    setDeletedata(false);
  }, [deletedata]);

  const handleUpdate = () => {
    fetchGriviences(); 
};

  
  const filteredGrievances = griviences.filter((grivience) => {
    const matchesKeyword =
      searchTerm === '' ||
      grivience.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grivience.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(grivience.date).toLocaleDateString().includes(searchTerm); 

    const matchesStatus = statusFilter === '' || grivience.status === statusFilter;

    const grievanceDate = new Date(grivience.date);
    const matchesDate =
      (!startDate || grievanceDate >= new Date(startDate)) &&
      (!endDate || grievanceDate <= new Date(endDate));

    return matchesKeyword && matchesStatus && matchesDate;
  });

  const totalGriviences = griviences.length;
  const pendingCount = griviences.filter((g) => g.status === 'New').length;
  const resolvedCount = griviences.filter((g) => g.status === 'solved').length;
  const inProgressCount = griviences.filter((g) => g.status === 'In progress').length;

  return (
    <div className='' style={{ background: 'white' }}>
      <Navbar />
      <Count
        total={totalGriviences}
        New={pendingCount}
        solved={resolvedCount}
        inProgress={inProgressCount}
      />
      <div className='container mt-5'>
        
        <div className='container mb-5'>
          <div className='row g-2'>
            
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <input
                type='text'
                className='form-control'
                placeholder='Search by keyword or date...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            
            <div className='col-lg-3 col-md-3 col-sm-6'>
              <DropdownButton
                id='dropdown-basic-button'
                title={
                  <span>
                    <FontAwesomeIcon icon={faFilter} />
                    Filter
                  </span>
                }
                variant='danger'
                className='w-100'
              >
                <Dropdown.ItemText className='bg-primary text-light'>
                  Filter by Status
                </Dropdown.ItemText>
                <Dropdown.Item as='button' onClick={() => setStatusFilter('New')}>
                  New
                </Dropdown.Item>
                <Dropdown.Item as='button' onClick={() => setStatusFilter('solved')}>
                  Solved
                </Dropdown.Item>
                <Dropdown.Item as='button' onClick={() => setStatusFilter('In progress')}>
                  In Progress
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.ItemText className='bg-primary text-light'>
                  Filter by Date
                </Dropdown.ItemText>
                <div className='px-3'>
                  <input
                    type='date'
                    className='form-control mb-2'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type='date'
                    className='form-control'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </DropdownButton>
            </div>

           
            <div className='col-lg-3 col-md-3 col-sm-6'>
              <button
                className='btn btn-outline-danger w-100'
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setStartDate('');
                  setEndDate('');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Grievances Table */}
        <div className='table-responsive'>
          <Table className='table table-hover table-primary table-sm shadow  text-center'>
            <thead className='table-danger' style={{lineHeight:'40px'}}>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Submitted At</th>
                <th>Address</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className=''>
              {filteredGrievances?.map((grivience, index) => (
                <tr key={grivience._id} className=' '>
                  <td>{index + 1}</td>
                  <td>{grivience.fullname}</td>
                  <td>{grivience.emailId}</td>
                  <td>{grivience.phone}</td>
                  <td>{new Date(grivience.date).toLocaleDateString()}</td>
                  <td>{grivience.address.slice(0, 15)}...</td>
                  <td>{grivience.description.slice(0, 35)}...</td>
                  <td><h6 className='text-success'>{grivience.status}</h6></td>
                  <td className=''>
                    <div className='d-flex'>
                      <button className='btn me-2 btn-outline-danger '>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: '#2a82d5' }}
                          onClick={() => deleteData(grivience._id)}
                        />
                      </button>
                      <ViewGriviences grievanceId={grivience._id} onUpdate={handleUpdate}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className='m-5'>
        <hr />
        <h6 className='text-center text-danger m-5'>
          © 2024 YourHero. All Rights Reserved.
        </h6>
      </div>
    </div>
  );
}

export default DashBoard;
