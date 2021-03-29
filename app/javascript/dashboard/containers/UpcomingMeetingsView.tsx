import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Booking } from '../types';
import { BookedRoom } from '../components/Room';
import { getCSRFToken } from '../utils';

const UpcomingMeetingsView: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>();

  const handleCancel = async (id: number) => {
    try {
      let resp = await axios.delete(`http://localhost:3000/api/bookings/${id}`, {
        headers: {
          'X-CSRF-Token': getCSRFToken(),
        },
      });

      if (resp.status === 204) {
        resp = await axios.get<Booking[]>(`http://localhost:3000/api/bookings`);
        setBookings(resp.data);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    axios
      .get<Booking[]>(`http://localhost:3000/api/bookings`)
      .then((resp) => setBookings(resp.data));
  }, []);

  return (
    <div className="p-8 space-y-6">
      {bookings && bookings?.length > 0
        ? bookings.map((booking) => <BookedRoom key={booking.id} booking={booking} onClick={handleCancel}/>)
        : null}
    </div>
  );
};

export default UpcomingMeetingsView;
