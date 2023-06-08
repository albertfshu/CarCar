import React, { useState, useEffect } from 'react';


function AppointmentList() {
    const [appointments, setAppointments] = useState([])
    const [vip, setVip] = useState('');

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

    }


    const isCreated = (appointments) => appointments.status === "created";

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
            {appointments.filter(isCreated).map(appointment => {
                return (
                <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
                    <td>{ vip[appointment.vin] ? "yes" : "no" }</td>
                    <td>{ appointment.customer }</td>
                    <td>{ new Date(appointment.date_time).toLocaleDateString() }</td>
                    <td>{ new Date(appointment.date_time).toLocaleTimeString() }</td>
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
