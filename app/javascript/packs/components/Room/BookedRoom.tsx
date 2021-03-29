import React from 'react';
import { Booking } from '../../types';

type BookedRoomProps = {
  booking: Booking;
  onClick?: (id: number) => void;
};

const BookedRoom: React.FC<BookedRoomProps> = (props) => {
  const { booking, onClick } = props;

  return (
    <div className="flex flex-col bg-white rounded-md shadow">
      <div className="px-6 pt-6 pb-4 space-y-4">
        <div>
          <h1 className="text-xl font-semibold">{booking.room.name}</h1>
          <p className="text-xs text-gray-500">Number of Seats: {booking.room.seats}</p>
          <p className="text-xs text-gray-500">Date: {booking?.date}</p>
          <p className="text-xs text-gray-500">Start Time: {booking.start_time}</p>
          <p className="text-xs text-gray-500">End Time: {booking.end_time}</p>
        </div>
        <p className="text-sm font-medium text-gray-500">{booking.room.description}</p>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right rounded-b">
        <button className="btn btn-danger" onClick={() => onClick?.(booking.room.id)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookedRoom;
