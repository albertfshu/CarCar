import React, { useState, useEffect } from 'react';


function ManufacturersList() {
    const [manufacturers, setManufacturers] = useState([])

    const fetchManufacturers = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchManufacturers();
    }, [])

    return (
        <>
        <h1>Manufacturers</h1>
        <table className="table table-striped">
            <thead>
                <th>Name</th>
            </thead>
            <tbody>
            {manufacturers.map(manufacturer => {
                return (
                    <tr key={ manufacturer.id }>
                    <td>{ manufacturer.name }</td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </>
    );
}

export default ManufacturersList;
