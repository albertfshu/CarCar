import React, { useState, useEffect } from 'react'


function AutomobileForm() {
    const [color, setColor] = useState('')
    const [year, setYear] = useState('')
    const [vin, setVin] = useState('')
    const [models, setModels] = useState([])
    const [vehicleModel, setVehicleModel] = useState('')


    const colorChange = (e) => {
        const value = e.target.value;
        setColor(value);
    }

    const yearChange = (e) => {
        const value = e.target.value;
        setYear(value);
    }

    const vinChange = (e) => {
        const value = e.target.value;
        setVin(value);
    }

    const vehicleModelChange = (e) => {
        const value = e.target.value;
        setVehicleModel(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = vehicleModel;

        const automobileCreateUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(automobileCreateUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();
            console.log(newAutomobile);

            setColor('');
            setYear('');
            setVin('');
            setVehicleModel('');
        }
    }

    const fetchVehicleModelsData = async () => {
        const vehicleModelUrl = 'http://localhost:8100/api/models/';
        const response = await fetch(vehicleModelUrl);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }

    useEffect(() => {
        fetchVehicleModelsData()
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a service automobile</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
                <input value={color} onChange={colorChange} placeholder=" " required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color...</label>
            </div>
            <div className="form-floating mb-3">
                <input value={year} onChange={yearChange} placeholder=" " required type="text" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year...</label>
            </div>
            <div className="form-floating mb-3">
                <input value={vin} onChange={vinChange} placeholder=" " required type="vin" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN...</label>
            </div>
            <div className="mb-3">
                <select value={vehicleModel} onChange={vehicleModelChange} required id="vehicle-model" name="vehicle-model" className="form-select">
                <option value="">Choose a model...</option>
                {models.map(model => {
                    return (
                        <option key={ model.id } value = { model.id }>
                            {model.name}
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
    );
}

export default AutomobileForm;
