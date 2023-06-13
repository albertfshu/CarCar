import React, { useEffect, useState } from 'react';


function TechnicianForm() {
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const firstNameChange = (e) => {
        const value = e.target.value;
        setFirst(value)
    }

    const lastNameChange = (e) => {
        const value = e.target.value;
        setLast(value)
    }

    const employeeIDChange = (e) => {
        const value = e.target.value;
        setEmployeeID(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeID;

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response =  await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);

            setFirst('');
            setLast('');
            setEmployeeID('');
        }
    }


    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input value={firstName} onChange={firstNameChange} placeholder="First name..." required type="text" name="first-name" id="first-name" className="form-control" />
                <label htmlFor="first-name">First name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={lastName} onChange={lastNameChange} placeholder="Last name..." required type="text" name="last-name" id="last-name" className="form-control" />
                <label htmlFor="last-name">Last name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={employeeID} onChange={employeeIDChange} placeholder="Employee ID..." required type="text" name="employeeID" id="employeeID" className="form-control" />
                <label htmlFor="employeeID">Employee ID</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
    );
}

export default TechnicianForm;
