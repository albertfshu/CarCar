import React, { useState } from 'react';

function AddCustomer() {
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

  const [address, setAddress] = useState('');
  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_number: phoneNumber
    };
    console.log(data)

    const url = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const newCustomer = await response.json()
        console.log(newCustomer)
      console.log('Customer created successfully');
      setFirstName('');
      setLastName('');
      setAddress('');
      setPhoneNumber('');
    }
  };


  return (
    <>
    <div>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Customer</h1>
            <form onSubmit={handleSubmit} id="add-customer-form">
              <div className="mb-3">
                <div className="form-floating mb-3">
                  <input onChange={handleFirstNameChange} placeholder="First Name" value={firstName} required type="text" className="form-control"/>
                  <label htmlFor="first_name">First Name...</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleLastNameChange} placeholder="Last Name" value={lastName} required type="text" className="form-control"/>
                  <label htmlFor="last_name">Last Name...</label>
                </div>
                <input onChange={handleAddressChange} placeholder="Address" value={address} required type="text" className="form-control"/>
                <label htmlFor="address"></label>
              </div>
              <div className="form-floating mb-3">
                  <input onChange={handlePhoneNumberChange} placeholder="Phone Number" value={phoneNumber} required type="text" className="form-control"/>
                  <label htmlFor="phone_number">Phone Number...</label>
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

export default AddCustomer;
