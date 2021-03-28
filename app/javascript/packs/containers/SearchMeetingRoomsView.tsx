import axios from 'axios';
import React, { useState } from 'react';
import qs from 'qs';
import { addMonths, format, isAfter, isEqual } from 'date-fns';
import { DatePicker, DatePickerInput, Dropdown, NumberInput } from 'carbon-components-react';
import { Room, Timing } from '../types';
import { generateTimings, getCSRFToken } from '../utils';
import MeetingRoom from '../components/MeetingRoom';

type OnDropdownChange<T = Timing> = (data: { selectedItem: T }) => void;
type SearchParams = {
  date: string;
  start_time: string;
  end_time: string;
  seats: number;
};

// Generates timings from 09:00 to 18:00, thus 19 steps.
const timings = generateTimings('09:00', 30, 19);

const SearchMeetingRoomsView: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(timings[0]);
  const [endTime, setEndTime] = useState(timings[1]);
  const [seats, setSeats] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>();
  const [availableRooms, setAvailableRooms] = useState<Room[]>();

  const handleDateChanged = (dates: Date[]) => {
    if (dates && dates.length === 1) {
      setDate(dates[0]);
    }
  };

  const handleStartTimeChanged: OnDropdownChange = (data) => {
    const st = data.selectedItem;
    setStartTime(st);
    if (isEqual(st.value, endTime.value) || isAfter(st.value, endTime.value)) {
      setEndTime(timings[st.index + 1]);
    }
  };

  const handleEndTimeChanged: OnDropdownChange = (data) => {
    const et = data.selectedItem;
    setEndTime(et);
    if (isEqual(startTime.value, et.value) || isAfter(startTime.value, et.value)) {
      setStartTime(timings[et.index - 1]);
    }
  };

  const handleSeatsChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore https://github.com/carbon-design-system/carbon/issues/7457
    const value = e.imaginaryTarget.valueAsNumber;
    if (!isNaN(value)) {
      setSeats(value);
    }
  };

  const handleSearch = async () => {
    try {
      const data = {
        date: format(date, 'yyyy-MM-dd'),
        start_time: startTime.label,
        end_time: endTime.label,
        seats,
      };
      setSearchParams(data);

      const resp = await axios.get<Room[]>(`http://localhost:3000/api/search?${qs.stringify(data)}`);
      setAvailableRooms(resp.data);
    } catch (err) {
      throw err;
    }
  };

  const handleBookNow = async (id: number) => {
    try {
      const resp = await axios.post(
        'http://localhost:3000/api/bookings',
        {
          date: searchParams?.date,
          start_time: searchParams?.start_time,
          end_time: searchParams?.end_time,
          room_id: id,
        },
        {
          headers: {
            'X-CSRF-Token': getCSRFToken(),
          },
        }
      );

      if (resp.status === 204) {
        window.location.assign('/dashboard/upcoming');
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="w-80 h-full fixed p-6 bg-white shadow">
        <div className="flex flex-col items-center justify-between space-y-6">
          <div className="w-full">
            <DatePicker
              datePickerType="single"
              dateFormat="d-m-Y"
              minDate={new Date().toLocaleDateString()}
              maxDate={addMonths(new Date(), 12).toLocaleDateString()}
              value={new Date()}
              onChange={handleDateChanged}
            >
              <DatePickerInput autoComplete="off" id="date-picker-single" labelText="Date" />
            </DatePicker>
          </div>

          <div className="w-full">
            <Dropdown
              id="start-time-dropdown"
              items={timings.slice(0, timings.length - 1)}
              label={timings[0].label}
              titleText="Start Time"
              selectedItem={startTime}
              onChange={handleStartTimeChanged}
            />
          </div>

          <div className="w-full">
            <Dropdown
              id="start-time-dropdown"
              items={timings.slice(1, timings.length)}
              label={timings[1].label}
              titleText="End Time"
              selectedItem={endTime}
              onChange={handleEndTimeChanged}
            />
          </div>

          <div className="w-full">
            <NumberInput
              id="pax-input"
              helperText="Only accept numbers between 1 - 8"
              invalidText="Only accept numbers between 1 - 8"
              value={seats}
              min={1}
              max={8}
              label="Number of Seats"
              className="w-full"
              onChange={handleSeatsChanged}
            />
          </div>

          <button className="btn btn-primary w-full" onClick={handleSearch}>
            Find a Room
          </button>
        </div>
      </div>

      <div className="ml-80 p-8">
        <div className="space-y-6">
          {availableRooms?.map((room) => (
            <MeetingRoom
              key={room.id}
              room={room}
              onClick={handleBookNow}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchMeetingRoomsView;
