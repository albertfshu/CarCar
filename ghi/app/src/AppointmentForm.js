import React, { useEffect, useState } from 'react';


function AppointmentForm(){
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [maxPresentations, setMaxPresentations] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [location, setLocation] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleStartChange = (event) => {
        const value = event.target.value;
        setStartDate(value);
    }

    const handleEndChange = (event) => {
        const value = event.target.value;
        setEndDate(value);
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
    }

    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAttendees(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.starts = startDate;
        data.ends = endDate;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;

        const conferencesUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferencesUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStartDate('');
            setEndDate('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
        }
    }


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
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
        <h1>Create a new conference</h1>
        <form onSubmit={handleSubmit} id="create-conference-form">
        <div className="form-floating mb-3">
            <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
            <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
            <input value={startDate} onChange={handleStartChange} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" />
            <label htmlFor="starts">Starts</label>
        </div>
        <div className="form-floating mb-3">
            <input value={endDate} onChange={handleEndChange} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control" />
            <label htmlFor="city">Ends</label>
        </div>
        <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <textarea value={description} onChange={handleDescriptionChange} className="form-control" name="description" id="description" rows="3"></textarea>
        </div>
        <div className="form-floating mb-3">
            <input value={maxPresentations} onChange={handleMaxPresentationsChange} placeholder="max_presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" />
            <label htmlFor="max_presentations">Maximum Presentations</label>
        </div>
        <div className="form-floating mb-3">
            <input value={maxAttendees} onChange={handleMaxAttendeesChange} placeholder="max_attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" />
            <label htmlFor="max_attendees">Maximum Attendees</label>
        </div>
        <div className="mb-3">
            <select value={location} onChange={handleLocationChange} required id="location" name="location" className="form-select">
            <option value="">Choose a location</option>
            {locations.map(location => {
                return (
                    <option key={ location.id } value = { location.id }>
                        {location.name}
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
    )
}

export default AppointmentForm;
