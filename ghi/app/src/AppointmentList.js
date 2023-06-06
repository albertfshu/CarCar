import React, { useState, useEffect } from 'react';


function AppointmentList() {
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
                    <td>{ appointment.name }</td>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.customer }</td>
                    <td>{ appointment.date_time }</td>
                    <td>{ appointment.date_time }</td>
                    <td>{ appointment.technician }</td>
                    <td>{ appointment.status }</td>
                </tr>
                );
            })}
            </tbody>
        </table>
      );
}

export default AppointmentList;
