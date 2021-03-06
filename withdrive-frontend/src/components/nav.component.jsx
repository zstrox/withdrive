import { Navbar, Nav, Container } from 'react-bootstrap';
import withdriveLogoSmall from "../images/withdrive-w.png";
import AuthService from "../services/AuthService";
import React,{ Fragment } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import text from '../modules/text.module.css'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { store } from 'react-notifications-component';


var isLoggedIn = 0;

if (AuthService.getCurrentUser() !== null && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN")) {
    isLoggedIn = 1;
} else if (AuthService.getCurrentUser() !== null) {
    isLoggedIn = 2;
}
const ENDPOINT = "http://localhost:8080/ws";
const Navigation = () => {

    const [stompClient, setStompClient] = React.useState(null);
    
    React.useEffect(() => {
        // use SockJS as the websocket client
        const socket = SockJS(ENDPOINT);
        
        // Set stomp to use websockets
        const stompClient = Stomp.over(socket);
        // connect to the backend
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/greetings', (data) => {
                onMessageReceived(data);
            });
        });
        // maintain the client for sending and receiving
        setStompClient(stompClient);
    }, []);

    function onMessageReceived(data) {
        const result = JSON.parse(data.body);
        store.addNotification({
            title: "Message from the admin:",
            message: result.content,
            type: "info",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });

    };


    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {

            console.log(anchorRef.current.contains(event.target));
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);



    let menu = '';

    if (isLoggedIn === 0) {
        menu = (
            <Fragment>
                <Nav.Link href='/sign-in'>Login</Nav.Link>
                <Nav.Link href='/sign-up'>Sign Up</Nav.Link>
            </Fragment>
        )
    } else if (isLoggedIn === 1) {
        menu = (
            <Fragment>
                <Nav.Link href='/view-users'>View Users</Nav.Link>
                <Nav.Link href='/send-alerts'>Send Alert</Nav.Link>
                <Nav.Link onClick={()=>{stompClient.disconnect();}} href='/sign-out'>Sign Out</Nav.Link>
            </Fragment>
        )
    } else {
        menu = (
            <Fragment>
                <Nav.Link href='/my-profile'>My Profile</Nav.Link>
                <Nav.Link href='' onClick={()=>{window.location.href = "mailto:mail.withdrive@gmail.com?subject=Withdrive Contact";}}>Contact</Nav.Link>
                <div>

                    <Nav.Link
                        ref={anchorRef}

                        onClick={handleToggle}
                    >
                        Ride Navigator

                    </Nav.Link>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <a className={text.hide} href='/create-trip'><MenuItem onClick={handleClose}>Create Ride</MenuItem></a>
                                            <a className={text.hide} href='/my-trips'><MenuItem onClick={handleClose}>My Rides</MenuItem></a>
                                            <a className={text.hide} href='/driver-trips'><MenuItem onClick={handleClose}>Driver Rides</MenuItem></a>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
                <Nav.Link onClick={()=>{stompClient.disconnect();}} href='/sign-out'>Sign Out</Nav.Link>
            </Fragment>
        )
    }

    return (
        <>

            <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="me-auto my-2 my-lg-0">
                            <Navbar.Brand href='/'>
                                <img src={withdriveLogoSmall} width="33" height="33" className="d-inline-block align-top"></img>
                            </Navbar.Brand>
                            <Nav.Link href='/'>withdrive</Nav.Link>
                            <Nav.Link href='/view-trips'>View Rides</Nav.Link>
                        </Nav>
                        <Nav>
                            {menu}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;