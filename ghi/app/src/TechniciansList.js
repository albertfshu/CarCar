import React, { useState, useEffect } from 'react';


function TechnicianList() {
    const [attendees, setAttendees] = useState()

    const fetchAttendees = async () => {
        const response = await fetch('http://localhost:8001/api/attendees/');

        if (response.ok) {
            const data = await response.json();
            setAttendees(data.attendees);
        }
    }

    useEffect(() => {
        fetchAttendees();
    }, [])

    if (attendees === undefined) {
        return undefined
    }
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Conference</th>
                </tr>
            </thead>
            <tbody>
            {attendees.map(attendee => {
                return (
                <tr key={attendee.href}>
                    <td>{ attendee.name }</td>
                    <td>{ attendee.conference }</td>
                </tr>
                );
            })}
            </tbody>
        </table>
      );
}

export default TechnicianList;
