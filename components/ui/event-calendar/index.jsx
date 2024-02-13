import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subDays,
  isEqual,
} from "date-fns";
import React, { useState } from "react";
import Button from "../Button";
import EventCalendarModal from "../modals/pages/compte-rendu-activite/even-calendar-modal";
const WEEKDAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const EventCalendar = ({ }) => {
  //*start and end date state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //*modal logic
  //modal state and function
  const [activeModal, setActiveModal] = useState(false);
  const closeModal = () => {
    setActiveModal(false);
  };
  const openModal = () => {
    setActiveModal(true);
  };
  //*calendar logic
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  //get the index of the days before and after the current month
  const startingDayIndex = getDay(firstDayOfMonth);
  const endingDayIndex = getDay(lastDayOfMonth);

  //the subDays is subtract a number of days from a date
  //the format to get the new date from subtracted date and "d" is to get the day of the month
  const previousMonthDaysToShow = Array.from({ length: startingDayIndex }).map(
    (_, i) => {
      // console.log("firstDayOfMonth:",firstDayOfMonth);
      // console.log("startingDayIndex:",startingDayIndex);
      return format(subDays(firstDayOfMonth, startingDayIndex - i), "d");
    }
  );

  const findDayIndexInWeek = (day) => {
    return getDay(day);
  };

  const selectedDaysInMonth = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const isDaySelected = (day) => {
    return selectedDaysInMonth.some((selectedDay) => isEqual(selectedDay, day));
  };

  //clear the calender
  const clearCalender = () => {
    setStartDate(null);
    setEndDate(null);
  }
  return (
    <>
      <EventCalendarModal
        activeModal={activeModal}
        onClose={closeModal}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />

      <div className="container">
        <div className="">
          <h2 className="text-2xl mb-4 ">{format(currentDate, "MMM yyyy")}</h2>

        </div>
        <div className="border border-slate-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-7 bg-[#fefdf0] border border-b-slate-800 p-4">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center font-bold">
                {day}.
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {previousMonthDaysToShow.map((day, index) => (
              <div key={`prev-day-${index}`} className="p-1">
                <div className="font-bold flex items-center justify-center h-[120px] text-secondary-300 rounded-md">
                  {day}
                </div>
              </div>
            ))}
            {daysInMonth.map((day, index) => (
              <div className="p-1">
                {findDayIndexInWeek(day) === 0 ||
                findDayIndexInWeek(day) === 6 ? (
                  <div
                    key={index}
                    className="bg-[#fefdf0] text-secondary-300 font-bold flex items-center justify-center h-[120px] rounded-md"
                  >
                    {format(day, "d")}
                  </div>
                ) : (
                  <div
                    key={index}
                    className={`${
                      !!startDate && !!endDate && isDaySelected(day)
                        ? "bg-[#00c97b]"
                        : "bg-secondary-100"
                    } font-bold flex items-center justify-center h-[120px] rounded-md`}
                  >
                    {format(day, "d")}
                  </div>
                )}
              </div>
            ))}
            {Array.from({ length: WEEKDAYS.length - endingDayIndex - 1 }).map(
              (_, index) => {
                return (
                  <div className="p-1">
                    <div
                      key={`empty-${index}`}
                      className="font-bold flex items-center justify-center h-[120px] text-secondary-300 rounded-md"
                    >
                      {index + 1}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="mt-6 flex gap-4 items-center">
        <Button
            text=" Remplir le CRA"
            className="border bg-white rounded-xl hover:bg-[#fefdf0] py-2 px-4"
            onClick={openModal}
          />
        <Button
            text=" Vider le CRA"
            className="border bg-white rounded-xl hover:bg-[#fefdf0] py-2 px-4"
            onClick={clearCalender}
          />
        </div>
      </div>
    </>
  );
};

export default EventCalendar;
