import React, { ChangeEventHandler, useState } from 'react';
import type { ReadingSessionType } from '~/routes/books.$bookId.sessions';

//TODO: Add props for default page start when creating new session.
// should use the last known max value for pageEnd

export function ReadingLogForm( { session }: { session?: ReadingSessionType | null }) {
  const [date, setDate] = useState('');
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [pageStart, setPageStart] = useState(session?.PageEnd ?? 0);
  const [pageEnd, setPageEnd] = useState(session?.PageEnd ?? 0);

  const handleDateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDate(event.target.value);
  };

  // const handleStartTimeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setStartTime(event.target.value);
  // };

  // const handleEndTimeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setEndTime(event.target.value);
  // };

  const handlePageEndChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    const pageEndValue = Number(event.target.value);
    setPageEnd(pageEndValue);
  };

  const handlePageStartChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    const pageStartValue = Number(event.target.value);
    setPageStart(pageStartValue);
  };

  const handleDurationChange = (event: { target: { value: any; }; }) => {
    const minutes = event.target.value;
    const durationInMs = minutes;// * 60 * 1000; // convert minutes to milliseconds
    setDuration(durationInMs);
  };

  return (
    <>
      <div>Log reading session</div>
      <div className="flex flex-col gap-2">
        {/* <div className="flex justify-around">
          <label htmlFor="startTime">Start Time</label>
          <input type="time" name="startTime" id="startTime" value={startTime} onChange={handleStartTimeChange} />
        </div>
        <div className="flex justify-around">
          <label htmlFor="endTime">End Time</label>
          <input type="time" name="endTime" id="endTime" value={endTime} onChange={handleEndTimeChange} />
        </div> */}
        <div>
        <InputForm for="Date" id="date" placeholder="Date" type="date" value={date} onChange={handleDateChange} />
        </div>
        <div>
          <InputForm for="PageStart" id="pageStart" placeholder="Page Start" type="number" value={pageStart} onChange={handlePageStartChange} />
        </div>
        <div>
          <InputForm for="PageEnd" id="pageEnd" placeholder="Page End" type="number" value={pageEnd} onChange={handlePageEndChange} />
        </div>
        <div>
          <InputForm for="Duration" id="duration" placeholder="Duration (minutes)" type="number" value={duration} onChange={handleDurationChange} />
        </div>
        <button type="submit">Submit</button>
      </div>
    </>
  );
}


export function InputForm(props: { for: string, id: string, placeholder: string, type: string, value:string | number, onChange?:ChangeEventHandler<HTMLInputElement>}) {
  return (
<label
  htmlFor={ props.for }
  className="relative block overflow-hidden rounded-md border-slate-900 border-2 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
>
  <input
    type={ props.type }
    id={ props.id }
    name={ props.id }
    placeholder={ props.placeholder }
    onChange={ props.onChange}
    value={ props.value }
    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    className="absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
  >
    { props.placeholder }
  </span>
</label>

  )
}

export default ReadingLogForm;
