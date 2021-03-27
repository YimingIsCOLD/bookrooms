export type Room = {
  id: number;
  name: string;
  description: string;
  seats: number;
};

export type Rooms = Room[];

export type Timing = {
  label: string;
  value: Date;
  index: number;
};

export type SearchParams = {
  date: string;
  start_time: string;
  end_time: string;
  seats: number;
}
