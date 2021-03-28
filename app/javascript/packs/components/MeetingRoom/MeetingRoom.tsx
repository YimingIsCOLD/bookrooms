import React from 'react';
import { Room } from '../../types';

type MeetingRoomProps = {
  room: Room;
  bookedDate?: string;
  alreadyBooked?: boolean;
  onClick?: (id: number) => void;
};

const MeetingRoom: React.FC<MeetingRoomProps> = (props) => {
  const { room, bookedDate, alreadyBooked, onClick } = props;

  return (
    <div className="flex flex-col bg-white rounded-md shadow">
      <div className="px-6 pt-6 pb-4 space-y-4">
        <div>
          <h1 className="text-xl font-semibold">{room.name}</h1>
          <p className="text-xs text-gray-500">Number of Seats: {room.seats}</p>
          <p className="text-xs text-gray-500">Booked on: {bookedDate}</p>
        </div>
        <p className="text-sm font-medium text-gray-500">{room.description}</p>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right rounded-b">
        <button
          className={`btn ${alreadyBooked ? 'btn-danger' : 'btn-primary'}`}
          onClick={() => onClick?.(room.id)}
        >
          {alreadyBooked ? 'Cancel' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default MeetingRoom;
