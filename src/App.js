import React, { useEffect } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { fetchDate, addDataBase } from "./reducers/date-reducer";

export default function App() {
  const [date, setStartDate] = React.useState(new Date());

  const stateTime = useSelector((state) => state.dateReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCalendarClose = () => {
    return dispatch(addDataBase(date));
  };

  return (
    <div className="App">
      <h1>Date Booking</h1>
      <h2>Chose date</h2>
      <DatePicker
        selected={date}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        placeholderText="Booking date"
        showTimeSelect
        excludeTimes={stateTime.filter((d) => {
          return d.getDate() === date.getDate();
        })}
        dateFormat=" MMMM d, yyyy HH:mm"
        timeFormat="HH:mm"
        onCalendarClose={handleCalendarClose}
        className="date-custom"
      />
    </div>
  );
}
