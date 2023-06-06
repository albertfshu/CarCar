import React, { useState, useEffect } from 'react';


function AppointmentList() {
    const [appointments, setAppointments] = useState()

    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
            for (let appointment in data.appointments){
                console.log(appointment.date_time)

            }
        }
    }


    useEffect(() => {
        fetchAppointments();
    }, [])

    const onFinish = async (finishID) => {
        const finishUrl = `http://localhost:8080/api/appointments/${finishID}/finish/`;
        const fetchConfig = {
            method: "put",
            headers:{
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(finishUrl, fetchConfig)
        if(response.ok) {
            fetchAppointments()
        }
    }

    const onCancel = async (cancelID) => {
        const cancelUrl = `http://localhost:8080/api/appointments/${cancelID}/cancel/`;
        const fetchConfig = {
            method: "put",
            headers:{
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(cancelUrl, fetchConfig)
        if(response.ok) {
            fetchAppointments()
        }
    }

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
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.customer }</td>
                    <td>{ appointment.date_time }</td>
                    <td>{ appointment.date_time }</td>
                    <td>{ appointment.technician }</td>
                    <td>{ appointment.reason }</td>
                    <td>
                        <button onClick={() => onFinish(appointment.id)} className="btn btn-primary">Finish</button>
                    </td>
                    <td>
                        <button onClick={() => onCancel(appointment.id)} className="btn btn-danger">Cancel</button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
      );
}

export default AppointmentList;
