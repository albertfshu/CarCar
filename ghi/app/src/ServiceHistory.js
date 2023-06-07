import React, { useState, useEffect } from 'react';


function ServiceHistory() {
    const [appointments, setAppointments] = useState()

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

    if (appointments === undefined) {
        return undefined
    }
    return (
        <form action="/" method="get">
            <h1>Service History</h1>
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <input type="text" id="header-search" placeholder="Search by VIN..." name="search"/>
            <button type="submit">Search</button>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {appointments.map(appointment => {
                return (
                    <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
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
      );
}

export default ServiceHistory;
