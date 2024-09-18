import { faMasksTheater } from '@fortawesome/free-solid-svg-icons/faMasksTheater';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Navbar2() {

  const navigate = useNavigate(); 

 
  const handleLogout = () => {
    sessionStorage.removeItem("existingUser"); 
    sessionStorage.removeItem("token"); 
    navigate('/'); 
  };

  return (
    <div>
      <Navbar
        className="bg-body-tertiary"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50.4% 50.5%, rgb(251, 32, 86) 0%, rgb(135, 2, 35) 90%)',
        }}
      >
        <Container>
          <Navbar.Brand href="#home" className="d-flex me-auto">
            <h3 className="text-light">
              <FontAwesomeIcon
                icon={faMasksTheater}
                spin
                spinReverse
                size="xl"
                style={{ color: '#2275b4' }}
                className="me-2 text-center"
              />
              YourHero
            </h3>
          </Navbar.Brand>
          <div className="ms-auto">
            <button className="btn btn-outline-primary text-light shadow" onClick={handleLogout}>Logout</button>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar2;
