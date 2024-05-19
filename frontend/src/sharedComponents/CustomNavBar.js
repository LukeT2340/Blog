// Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
    const [searchText, setSearchText] = useState(null);
    const navigate = useNavigate();

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchText}`);
    }

    return (
        <Navbar data-bs-theme="light" className={`${styles.navBar} border-bottom `} expand='md'>
            <Navbar.Brand href="/articles" className='mx-3'>Swift Tutorials</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-3' />
            <Navbar.Collapse id="basic-navbar-nav" className="mx-3">
                <Nav className="mr-auto align-items-left">
                    <Nav.Link href="/articles" className="d-flex align-items-center">
                        Articles
                    </Nav.Link>
                    <Nav.Link href="/about" className="d-flex align-items-center">
                        About
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>

            <Nav className="d-none d-lg-flex ml-auto mx-3">
                {/* Search bar positioned to the right */}
                <Form className="" onSubmit={handleSearchSubmit}>
                    <FormControl
                        type="text"
                        placeholder="Search Swift Tutorials"
                        className={`${styles.searchField}`}
                        value={searchText}
                        onChange={handleSearchTextChange}
                    />
                </Form>
            </Nav>
        </Navbar>
      );
    
};

export default CustomNavbar;


/*

<NavDropdown title="more">
<NavDropdown.Item href="#action/3.1">Pics</NavDropdown.Item>
<NavDropdown.Item href="#action/3.2">Videos</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item href="#action/3.4">More...</NavDropdown.Item>
</NavDropdown>
                    <Nav.Link href="/categories" className="d-flex align-items-center">
                        <FaTags size={18} className="me-1" style={{ color: 'rgb(var(--accent-color))' }} /> Categories
                    </Nav.Link>
                                        <Nav.Link href="/home" className="d-flex align-items-center">
                        <FaHome size={18} className="me-1" /> Home
                    </Nav.Link>
*/