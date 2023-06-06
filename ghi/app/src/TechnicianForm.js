import React, { useEffect, useState } from 'react';


function TechnicianForm() {
    const [firstName, setFirst] = useState('');
    const [secondName, setSecond] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const firstNameChange = (e) => {
        const value = e.target.value;
        setFirst(value)
    }

    const secondNameChange = (e) => {
        const value = e.target.value;
        setSecond(value)
    }

    const employeeIDChange = (e) => {
        const value = e.target.value;
        setEmployeeID(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = {};
        data.first_name = firstName;
        data.last_name = secondName;
        data.employee_id = employeeID;
        console.log(data);

        const TechnicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response =  await fetch(TechnicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);

            setFirst('');
            setSecond('');
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
                <input value={secondName} onChange={secondNameChange} placeholder="Second name..." required type="text" name="second-name" id="second-name" className="form-control" />
                <label htmlFor="second-name">Second name</label>
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
