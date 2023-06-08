import React, { useState, useEffect } from 'react';


function VehicleModelForm(){
    const [modelName, setVehicle] = useState('');
    const [picture, setPicture] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');

    const modelChange = (e) => {
        const value = e.target.value;
        setVehicle(value);
    }

    const pictureChange = (e) => {
        const value = e.target.value;
        setPicture(value);
    }

    const manufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturer(value)
    }

    const handleVehicleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        data.name = modelName;
        data.picture_url = picture;
        data.manufacturer_id = manufacturer;

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(modelUrl, fetchConfig);
        if(response.ok) {
            const newModel = await response.json();
            console.log(newModel);

            setVehicle('');
            setPicture('');
            setManufacturer('');
        }
    }

    const fetchManufactures = async () => {
        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(manufacturersUrl);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufactures()
    }, []);

    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a vehicle model</h1>
            <form onSubmit={handleVehicleSubmit} id="create-vehicle-model-form">
                <div className="form-floating mb-3">
                    <input value={modelName} onChange={modelChange} placeholder="Model name..." required type="text" name="model" id="model" className="form-control" />
                    <label htmlFor="model">Model name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={picture} onChange={pictureChange} placeholder="Picture URL..." required type="text" name="picture" id="picture" className="form-control" />
                    <label htmlFor="picture">Picture URL...</label>
                </div>
                <div className="mb-3">
                    <select value={manufacturer} onChange={manufacturerChange} placeholder="" name="manufacturer" id="manufacturer" className="form-select" >
                    <option value="">Choose a manufacturer...</option>
                    {manufacturers.map(manufacturer => {
                        return (
                            <option key={ manufacturer.id } value={ manufacturer.id }>
                                { manufacturer.name }
                            </option>
                        );
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
        </div>
        </>
    );
}

export default VehicleModelForm;
