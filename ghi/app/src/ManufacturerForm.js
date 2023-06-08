import React, { useState, useEffect } from 'react';


function ManufacturerForm(){
    const [manufacturerName, setManufacturer] = useState([])

    const manufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {}
        data.name = manufacturerName;

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json()
            console.log(newManufacturer);

            setManufacturer([]);
        }
    }


    return (
        <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a manufacturer</h1>
            <form onSubmit={ handleSubmit } id="create-manufacturer-form">
                <div className="form-floating mb-3">
                    <input value={ manufacturerName } onChange={ manufacturerChange } placeholder="Manufacturer Name..." required type="text" name="manufacturer" className="form-control" />
                    <label htmlFor="manufacturer">Manufacturer name...</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
        </div>
    );
}

export default ManufacturerForm;
