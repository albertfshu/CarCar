import React, { useState, useEffect } from 'react';


function ServiceHistory() {
    const [appointments, setAppointments] = useState([])
    const [vin, setVin] = useState('');
    const [vip, setVip] = useState('');
    const [searchedAppointments, setSearchedAppointment] = useState([]);

    useEffect(() => {
        setSearchedAppointment(appointments);
    }, [appointments])

    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, [])

    const fetchAutomobiles = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        const autoVintoSold = {}
        if (response.ok) {
            const data = await response.json();
            for (let automobiles of data.autos) {
                const autoVin = automobiles.vin
                autoVintoSold[autoVin] = automobiles.sold
            }
            setVip(autoVintoSold)
        }

    };


    useEffect(() => {
        fetchAutomobiles();
    }, []);

    const vinChange = (e) => {
        const value = e.target.value;
        setVin(value);
    };

    const inputChange = () => {
        const filteredInput = appointments.filter((appointment) => appointment.vin.toLowerCase().includes(vin.toLowerCase()))
        setSearchedAppointment(filteredInput)
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            inputChange()
        }
    };

    if (appointments === undefined) {
        return undefined
    }
    return (
        <>
        <h1>Service History</h1>
        <form id="create-search-bar">
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <div className="input-group">
            <input onChange={vinChange} onKeyDown={handleKeyDown} placeholder="Search by VIN..." required type="search" name="vin" id="vin" aria-describedby="search-addon" className="form-control rounded" />
            <label htmlFor="vin"></label>
            <button onClick={inputChange} type="button" className="btn btn-outline-primary">Search</button>
            </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is Vip?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {searchedAppointments.map(appointment => {
                return (
                    <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
                    <td>{ vip[appointment.vin] ? "yes" : "no" }</td>
                    <td>{ appointment.customer }</td>
                    <td>{ new Date(appointment.date_time).toLocaleDateString() }</td>
                    <td>{ new Date(appointment.date_time).toLocaleTimeString() }</td>
                    <td>{ appointment.technician }</td>
                    <td>{ appointment.reason }</td>
                    <td>{ appointment.status }</td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </form>
    </>
      );
}

export default ServiceHistory;
