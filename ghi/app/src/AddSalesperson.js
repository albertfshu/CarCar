import React, { useState } from 'react';

function AddSalesperson() {
  const [firstName, setFirstName] = useState('');


  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const [lastName, setLastName] = useState('');
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const [employeeId, setEmployeeId] = useState('');
  const handleEmployeeIdChange = (event) => {
    const value = event.target.value;
    setEmployeeId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };
    console.log(data)

    const url = 'http://localhost:8090/api/salespeople/';
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const newSalesperson = await response.json()
        console.log(newSalesperson)
      console.log('Salesperson created successfully');
      setFirstName('');
      setLastName('');
      setEmployeeId('');
    }
  };


  return (
    <>
    <div>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Salesperson</h1>
            <form onSubmit={handleSubmit} id="add-sales-person-form">
              <div className="mb-3">
                <div className="form-floating mb-3">
                  <input onChange={handleFirstNameChange} placeholder="First Name" value={firstName} required type="text" className="form-control"/>
                  <label htmlFor="first_name">First Name...</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleLastNameChange} placeholder="Last Name" value={lastName} required type="text" className="form-control"/>
                  <label htmlFor="last_name">Last Name...</label>
                </div>
                <input onChange={handleEmployeeIdChange} placeholder="Employee ID" value={employeeId} required type="text" className="form-control"/>
                <label htmlFor="employee_id"></label>
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddSalesperson;
