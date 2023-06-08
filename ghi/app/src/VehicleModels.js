import React, { useState, useEffect } from 'react';


function VehiclesList() {
    const [vehicles, setVehicles] = useState([])


    const fetchVehicleModels = async () => {
        const response = await fetch('http://localhost:8100/api/models/')

        if (response.ok) {
            const data = await response.json();
            setVehicles(data.models);
        }
    }

    useEffect(() => {
        fetchVehicleModels();
    }, [])

    return (
        <>
        <h1>Models</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
            {vehicles.map(vehicle => {
                return (
                <tr key={vehicle.id}>
                    <td>{ vehicle.name }</td>
                    <td>{ vehicle.manufacturer.name }</td>
                    <td><img src={ vehicle.picture_url } height="200" width="350"/></td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </>
    );
}

export default VehiclesList;
