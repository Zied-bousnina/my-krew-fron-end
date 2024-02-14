import React, { useState } from "react";
import {
  format,
  getDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subDays,
  isSameDay,
} from "date-fns";
import Button from "../Button";
import EventCalendarModal from "../modals/pages/compte-rendu-activite/even-calendar-modal";

const WEEKDAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const EventCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayIndex = getDay(firstDayOfMonth);
  const endingDayIndex = getDay(lastDayOfMonth);

  const previousMonthDaysToShow = Array.from({ length: startingDayIndex }).map(
    (_, i) => format(subDays(firstDayOfMonth, startingDayIndex - i), "d")
  );

  const toggleDateSelection = (day) => {
    const index = selectedDates.findIndex((selectedDate) =>
      isSameDay(selectedDate, day)
    );
    if (index === -1) {
      setSelectedDates([...selectedDates, day]);
    } else {
      setSelectedDates(selectedDates.filter((_, i) => i !== index));
    }
  };
  const findDayIndexInWeek = (day) => {
    return getDay(day);
  };
  const isDateSelected = (day) =>
    selectedDates.some((selectedDate) => isSameDay(selectedDate, day));

  const closeModal = () => setActiveModal(false);
  const openModal = () => setActiveModal(true);
  const clearCalendar = () => {
    setSelectedDates([]);
  };

  return (
    <>
      <div className="container">
        <h2 className="text-2xl mb-4">{format(currentDate, "MMM yyyy")}</h2>
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
            {daysInMonth.map((day, index) =>
              findDayIndexInWeek(day) === 0 || findDayIndexInWeek(day) === 6 ? (
                <div
                  key={index}
                  className="bg-[#fefdf0] text-secondary-300 font-bold flex items-center justify-center h-[120px] rounded-md"
                >
                  {format(day, "d")}
                </div>
              ) : (
                <div
                  key={index}
                  className="p-1"
                  onClick={() => toggleDateSelection(day)}
                >
                  <div
                    className={`font-bold flex items-center cursor-pointer justify-center h-[120px] rounded-md duration-100 hover:scale-105 ${
                      isDateSelected(day) ? "bg-[#00c97b]" : "bg-secondary-100"
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                </div>
              )
            )}
            {Array.from({ length: WEEKDAYS.length - endingDayIndex - 1 }).map(
              (_, index) => {
                return (
                  <div className="p-1">
                    <div
                      key={`next-day-${index}`}
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
            text="Vider le CRA"
            className="border bg-white rounded-xl hover:bg-[#fefdf0] py-2 px-4"
            onClick={clearCalendar}
          />
        </div>
      </div>
    </>
  );
};

export default EventCalendar;

