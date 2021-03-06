import React, { useState } from 'react'
import Switch from '@mui/material/Switch';
import DriverTrips from '../components/drivertrips.component'
import DriverAllTrips from '../components/driveralltrips.component'
import BackButton from '../components/backButton.component'
import form from '../modules/innerPage.module.css'
import AuthService from '../services/AuthService';

const MyTrips = () => {
    AuthService.checkToken();
    const [select, setSelect] = useState(false);
    
    const handleToggle = () => {
        setSelect(!select);
    }

    function Table() {
        if (select) {
            return <DriverAllTrips />;
        }
        return <DriverTrips />
    }

    return (
        <div className={form.authwrapper}>
            <div className={form.authinner_table}>
                <BackButton />
                <div>
                    <h3>Driver trips:</h3>
                    Completed trips<Switch onClick={() => handleToggle()} defaultChecked /> Upcoming trips
                    <Table />
                </div>
                <br></br>
            </div>
        </div>
    );
}
export default MyTrips;