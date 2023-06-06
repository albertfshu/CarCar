import React, { useEffect, useState } from 'react';


function AppointmentForm(){
    const [technicians, setTechs] = useState([]);
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician, setTech] = useState('');

    const vinChange = (e) => {
        const value = e.target.value;
        setVin(value);
    }

    const customerChange = (e) => {
        const value = e.target.value;
        setCustomer(value);
    }

    const dateChange = (e) => {
        const value = e.target.value;
        setDate(value);
    }

    const timeChange = (e) => {
        const value = e.target.value;
        setTime(value);
    }

    const technicianChange = (e) => {
        const value = e.target.value;
        setTech(value);
    }

    const reasonChange = (e) => {
        const value = e.target.value;
        setReason(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date_time = date;
        data.date_time = time;
        data.technician = technician;
        data.reason = reason;

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment);

            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setReason('');
            setTech('');
        }
    }


    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechs(data.technicians)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return(
    <>
    <div className="row">
    <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
        <h1>Create a service appointment</h1>
        <form onSubmit={handleSubmit} id="create-appointment-form">
        <div className="form-floating mb-3">
            <input value={vin} onChange={vinChange} placeholder="" required type="text" name="vin" id="vin" className="form-control" />
            <label htmlFor="vin">Automobile VIN</label>
        </div>
        <div className="form-floating mb-3">
            <input value={customer} onChange={customerChange} placeholder="" required type="text" name="customer" id="customer" className="form-control" />
            <label htmlFor="customer">Customer</label>
        </div>
        <div className="form-floating mb-3">
            <input value={date} onChange={dateChange} placeholder="" required type="date" name="date" id="date" className="form-control" />
            <label htmlFor="date">Date</label>
        </div>
        <div className="form-floating mb-3">
            <input value={time} onChange={timeChange} placeholder="" required type="time" name="time" id="time" className="form-control" />
            <label htmlFor="time">Time</label>
        </div>
        <div className="mb-3">
            <select value={technician} onChange={technicianChange} required id="tech" name="tech" className="form-select">
            <option value="">Choose a technician...</option>
            {technicians.map(technician => {
                return (
                    <option key={ technician.id } value = { technician.id }>
                        {technician.first_name}
                    </option>
                );
            })}
            </select>
        </div>
        <div className="form-floating mb-3">
            <input value={reason} onChange={reasonChange} placeholder="" required type="text" name="reason" id="reason" className="form-control" />
            <label htmlFor="reason">Reason</label>
        </div>
        <button className="btn btn-primary">Create</button>
        </form>
    </div>
    </div>
    </div>
    </>
    )
}

export default AppointmentForm;
