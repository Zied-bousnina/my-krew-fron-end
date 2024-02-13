import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import * as yup from "yup";
import Flatpickr from "react-flatpickr";
import FormGroup from "@/components/ui/FormGroup";
import { getDay, isAfter, isEqual, set } from "date-fns";
import ErrorAlert from "@/components/ui/alert/error";

const EventCalendarModal = ({
  activeModal,
  onClose,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [error, setError] = useState(null);

  // Calculate the first and last day of the current month to le user choose only from current month
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const firstDayCurrentMonth = new Date(currentYear, currentMonth, 1);
  const lastDayCurrentMonth = new Date(currentYear, currentMonth + 1, 0);

  const handleStartDateChange = (date) => {
    setLocalStartDate(date[0]);
  };
  const handleEndDateChange = (date) => {
    setLocalEndDate(date[0]);
  };

  const handleFormSubmit = () => {
    const startDateIsNotWeekend =
      getDay(localStartDate) !== 0 && getDay(localStartDate) !== 6;
    const endDateIsNotWeekend =
      getDay(localEndDate) !== 0 && getDay(localEndDate) !== 6;

    if (localStartDate === null || localEndDate === null) {
      setError("Veuillez sélectionner une date de début et de fin.");
    } else if (!startDateIsNotWeekend || !endDateIsNotWeekend) {
      setError("Les dates de début et de fin ne peuvent pas être un week-end.");
    } else if (
      !isEqual(localStartDate, localEndDate) &&
      !isAfter(localEndDate, localStartDate)
    ) {
      setError("La date de fin doit être postérieure à la date de début.");
    } else {
      setStartDate(localStartDate);
      setEndDate(localEndDate);
      onClose();
      setError(null);
    }
  };

  useEffect(() => {
    if (!startDate && !endDate) {
      setLocalStartDate(null);
      setLocalEndDate(null);
    }
  }, [startDate, endDate]);

  return (
    <div>
      <Modal
        title="Choisir une date"
        labelclassName="btn-outline-dark"
        activeModal={activeModal}
        onClose={onClose}
      >
        <FormGroup label="date de début" id="default-picker">
          <Flatpickr
            className="form-control py-2"
            id="default-picker2"
            placeholder="yyyy, dd M"
            value={localStartDate}
            onChange={handleStartDateChange}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
              disable: [
                function (date) {
                  // Return true if the day is Saturday (6) or Sunday (0)
                  return date.getDay() === 0 || date.getDay() === 6;
                },
              ],
              enable: [
                {
                  from: firstDayCurrentMonth,
                  to: lastDayCurrentMonth,
                },
              ],
              onDayCreate: function (dObj, dStr, fp, dayElem) {
                // Check if the day is a Saturday or Sunday
                const date = dayElem.dateObj;
                if (date.getDay() === 0 || date.getDay() === 6) {
                  // Apply the redWeekend class to the day element
                  dayElem.classList.add("bg-[#fefdf0]");
                }
              },
            }}
          />
        </FormGroup>
        <FormGroup className="mt-2" label="date de fin" id="default-picker2">
          <Flatpickr
            className="form-control py-2"
            id="default-picker2"
            placeholder="yyyy, dd M"
            value={localEndDate}
            onChange={handleEndDateChange}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
              enable: [
                {
                  from: firstDayCurrentMonth,
                  to: lastDayCurrentMonth,
                },
              ],

              onDayCreate: function (dObj, dStr, fp, dayElem) {
                // Check if the day is a Saturday or Sunday
                const date = dayElem.dateObj;
                if (date.getDay() === 0 || date.getDay() === 6) {
                  // Apply the redWeekend class to the day element
                  dayElem.classList.add("bg-[#fefdf0]");
                }
              },
            }}
          />
        </FormGroup>

        <div className="mt-2"> {!!error && <ErrorAlert text={error} />}</div>
        <div className="ltr:text-right rtl:text-left mt-2">
          <button
            onClick={handleFormSubmit}
            className="btn btn-dark  text-center"
          >
            Selectioner
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EventCalendarModal;
