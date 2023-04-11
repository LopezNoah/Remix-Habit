import React, { useState } from 'react';

//TODO: Add props for default page start when creating new session.
// should use the last known max value for pageEnd

export function ReadingLogForm() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(0);

  const handleDateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDate(event.target.value);
  };

  const handleStartTimeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEndTime(event.target.value);
  };

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
    const durationInMs = minutes * 60 * 1000; // convert minutes to milliseconds
    setDuration(durationInMs);
  };

  return (
    <>
      <div>Log reading session</div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-around">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date" value={date} onChange={handleDateChange} />
        </div>
        <div className="flex justify-around">
          <label htmlFor="startTime">Start Time</label>
          <input type="time" name="startTime" id="startTime" value={startTime} onChange={handleStartTimeChange} />
        </div>
        <div className="flex justify-around">
          <label htmlFor="endTime">End Time</label>
          <input type="time" name="endTime" id="endTime" value={endTime} onChange={handleEndTimeChange} />
        </div>
        <div className="flex justify-around">
          <label htmlFor="duration">Page Start</label>
          <input type="number" name="pageStart" id="pageStart" value={pageStart} onChange={handlePageStartChange} />
        </div>
        <div className="flex justify-around">
          <label htmlFor="duration">Page End</label>
          <input type="number" name="pageEnd" id="pageEnd" value={pageEnd} onChange={handlePageEndChange} />
        </div>
        <div className="flex justify-around">
          <label htmlFor="duration">Duration (minutes)</label>
          <input type="number" name="duration" id="duration" value={duration / (60 * 1000)} onChange={handleDurationChange} />
        </div>
        <button type="submit">Submit</button>
      </div>
    </>
  );
}

export default ReadingLogForm;
