import React from 'react';
import { Room } from '../../types';

type MeetingRoomProps = {
  onClick?: (id: number) => void;
} & Room;

const MeetingRoom: React.FC<MeetingRoomProps> = (props) => {
  const { onClick, id, name, description, seats } = props;

  return (
    <div className="flex flex-col bg-white rounded-md shadow">
      <div className="px-6 pt-6 pb-4 space-y-4">
        <div>
          <h1 className="text-xl font-semibold">{name}</h1>
          <p className="text-xs text-gray-500">Number of Seats: {seats}</p>
        </div>
        <p className="text-sm font-medium text-gray-500">{description}</p>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right rounded-b">
        <button className="btn-primary" onClick={() => onClick?.(id)}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MeetingRoom;
