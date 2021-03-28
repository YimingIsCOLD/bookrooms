export type Timing = {
  label: string;
  value: Date;
  index: number;
};

export type Room = {
  id: number;
  name: string;
  description: string;
  seats: number;
};

export type Booking = {
  id: number;
  user_id: number;
  room: Room;
  date: string;
  start_time: string;
  end_time: string;
};
