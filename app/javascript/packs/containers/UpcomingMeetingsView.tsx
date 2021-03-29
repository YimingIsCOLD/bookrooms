import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Booking } from '../types';
import { BookedRoom } from '../components/Room';

const UpcomingMeetingsView: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>();

  useEffect(() => {
    axios
      .get<Booking[]>(`http://localhost:3000/api/bookings`)
      .then((resp) => setBookings(resp.data));
  }, []);

  return (
    <div className="p-8 space-y-6">
      {bookings && bookings?.length > 0
        ? bookings.map((booking) => <BookedRoom key={booking.id} booking={booking} />)
        : null}
    </div>
  );
};

export default UpcomingMeetingsView;
