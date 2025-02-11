import React, { useState } from 'react';
import './App.css';
function App() {
  const maxSeats = 10;
  const [seatsLeft, setSeatsLeft] = useState(maxSeats);
  const [reservations, setReservations] = useState([]);
  const [guestCount, setGuestCount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const addReservation = () => {
    if (parseInt(guestCount) > seatsLeft) {
      alert('Not enough seats available!');
      return;
    }
    if (reservations.some(reservation => reservation.name === name)) {
      alert('Duplicate name found!');
      return;
    }
    const newReservation = {
      name,
      phone,
      guestCount: parseInt(guestCount),
      checkInTime: new Date().toLocaleString(),
      status: 'Checked In',
    };
    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - parseInt(guestCount));
    setGuestCount('');
    setName('');
    setPhone('');
  };
  const checkoutReservation = (index) => {
    const updatedReservations = [...reservations];
    const reservation = updatedReservations[index];
    if (reservation.status === 'Checked Out') {
      alert('This reservation has already checked out.');
      return;
    }
    reservation.status = 'Checked Out';
    setSeatsLeft(seatsLeft + reservation.guestCount);
    setReservations(updatedReservations);
  };
  const deleteReservation = (index) => {
    const updatedReservations = [...reservations];
    const reservation = updatedReservations[index];
    if (reservation.status === 'Checked In') {
      setSeatsLeft(seatsLeft + reservation.guestCount);
    }
    updatedReservations.splice(index, 1);
    setReservations(updatedReservations);
  };
  return (
    <div className="container">
      <h1>Restaurant Reservation System</h1>
      <div className="form-group">
        <label htmlFor="guestCount">Guest Count:</label>
        <input
          type="number"
          id="guestCount"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          placeholder="Enter number of guests"
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Customer Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
      <button onClick={addReservation}>Make Reservation</button>
      <h3 className='seats'>Seats Left: <span>{seatsLeft}</span></h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Check-in Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.name}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.checkInTime}</td>
              <td>{reservation.status}</td>
              <td>
                {reservation.status === 'Checked In' ? (
                  <button className="btn-checkout" onClick={() => checkoutReservation(index)}>
                    Click to Checkout
                  </button>
                ) : (
                  <button disabled>Checked Out</button>
                )}
                <button className="btn-delete" onClick={() => deleteReservation(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;