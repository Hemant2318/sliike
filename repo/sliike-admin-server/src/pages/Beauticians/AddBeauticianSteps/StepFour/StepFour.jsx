import React, { useRef, useState } from "react";
import { commonRoute, timeIntervals } from "utils/constants";
import SwitchBox from "components/form/SwitchBox/SwitchBox";
import Button from "components/form/Button/Button";
import CheckBox from "components/form/CheckBox/CheckBox";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { stepFour } from "store/globalSlice";
import Dropdown from "components/form/Dropdown/Dropdown";
import * as Yup from "yup";

const defaultData = [
  {
    id: 1,
    day: "Monday",
    startTime: "",
    endTime: "",
    breakStartTime: "",
    breakEndTime: "",
    isOpen: false,
    isShow: false,
  },
  {
    id: 2,
    day: "Tuesday",
    startTime: "",
    endTime: "",
    breakStartTime: "",
    breakEndTime: "",
    isOpen: false,
    isShow: false,
  },
  {
    id: 3,
    day: "Wednesday",
    startTime: "",
    endTime: "",
    breakStartTime: "",
    breakEndTime: "",
    isOpen: false,
    isShow: false,
  },
  {
    id: 4,
    day: "Thursday",
    startTime: "",
    endTime: "",
    breakStartTime: "",
    breakEndTime: "",
    isOpen: false,
    isShow: false,
  },
  {
    id: 5,
    day: "Friday",
    startTime: "",
    endTime: "",
    breakStartTime: "",
    breakEndTime: "",
    isOpen: false,
    isShow: false,
  },
  {
    id: 6,
    day: "Saturday",
    startTime: "",
    endTime: "",
    breakStartTime: "",
    breakEndTime: "",
    isOpen: false,
    isShow: false,
  },
  {
    id: 7,
    day: "Sunday",
    startTime: "",
    endTime: "",
    breakStartTime: "",
    breakEndTime: "",
    isOpen: false,
    isShow: false,
  },
];

const StepFour = ({ activeStep, setActiveStep }) => {
  const validationSchema = Yup.object().shape({
    dayDetails: Yup.array().of(
      Yup.object().shape({
        endTime: Yup.lazy((_, o) => {
          const { isShow } = o?.parent;
          if (isShow) {
            return Yup.string().test(
              "endTime",
              "End time must be greater than start time",
              function (endTime) {
                const { startTime } = this.parent;
                return startTime && endTime && startTime < endTime;
              }
            );
          } else {
            return Yup.string();
          }
        }),
        breakStartTime: Yup.lazy((_, o) => {
          const { isShow } = o?.parent;
          if (isShow) {
            return Yup.string().test(
              "breakStartTime",
              "Break time must be in between start time to end time",
              function (breakStartTime) {
                const { startTime } = this.parent;
                return (
                  startTime && breakStartTime && startTime < breakStartTime
                );
              }
            );
          } else {
            return Yup.string();
          }
        }),
        breakEndTime: Yup.lazy((_, o) => {
          const { isShow } = o?.parent;
          if (isShow) {
            return Yup.string().test(
              "breakEndTime",
              "Break end-time must be greater than break start-time",
              function (breakEndTime) {
                const { breakStartTime } = this.parent;
                return (
                  breakStartTime &&
                  breakEndTime &&
                  breakStartTime < breakEndTime
                );
              }
            );
          } else {
            return Yup.string();
          }
        }),
      })
    ),
  });

  const [initialValues, setInitialValues] = useState({
    dayDetails: defaultData,
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSaveTime = async (value) => {
    setBtnLoading(true);

    const payload = { beauticianId: params?.bId, ...value };
    const response = await dispatch(stepFour(payload));
    if (response?.status === 200) {
      navigate(commonRoute.beauticians);
    }

    setBtnLoading(false);
  };

  return (
    <div id="step-four-container">
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        onSubmit={handleSaveTime}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values, errors, handleChange, submitForm, setFieldValue } =
            props;

          const { firstSlot, dayDetails } = values;

          const isShowCheckBoxes = dayDetails?.some((o) => o.isShow);

          return (
            <>
              {dayDetails?.map((elem, index) => {
                const {
                  startTime,
                  endTime,
                  id,
                  day,
                  isOpen,
                  isShow,
                  breakEndTime,
                  breakStartTime,
                } = elem;
                const {
                  endTime: errEndTime,
                  breakStartTime: errBreakStartTime,
                  breakEndTime: errBreakEndTime,
                } = errors?.["dayDetails"]?.[index] || {};

                return (
                  <form key={index}>
                    <div
                      className="p-3 d-flex align-items-center border rounded my-3 gap-4 flex-wrap"
                      key={index}
                    >
                      {isShowCheckBoxes && (
                        <CheckBox
                          // key={id}
                          id={`dayDetails[${index}][isOpen]`}
                          // value={isOpen}
                          checked={isOpen}
                          onChange={(e) => {
                            if (!firstSlot) {
                              // console.log("IF");
                              setFieldValue("firstSlot", id);
                              setFieldValue(
                                `dayDetails[${index}].isOpen`,
                                true
                              );
                              setFieldValue(
                                `dayDetails[${index}].isShow`,
                                true
                              );

                              // setFieldValue(`dayDetails[${index}]`, {
                              //   id: id,
                              //   day: day,
                              //   // startTime: "",
                              //   // endTime: "",
                              //   // breakStartTime: "",
                              //   // breakEndTime: "",
                              //   isOpen: true,
                              //   isShow: true,
                              // });
                            } else {
                              // console.log("ELSE");
                              if (firstSlot === id) {
                                setFieldValue("firstSlot", "");
                                setFieldValue(`dayDetails[${index}]`, {
                                  id: id,
                                  day: day,
                                  // startTime: "",
                                  // endTime: "",
                                  // breakStartTime: "",
                                  // breakEndTime: "",
                                  isOpen: false,
                                  isShow: false,
                                });
                              } else {
                                // console.log(isOpen);
                                if (isOpen) {
                                  setFieldValue(`dayDetails[${index}]`, {
                                    id: id,
                                    day: day,
                                    startTime: "",
                                    endTime: "",
                                    breakStartTime: "",
                                    breakEndTime: "",
                                    isOpen: false,
                                    isShow: false,
                                  });
                                } else {
                                  const findSlot = dayDetails.find(
                                    (o) => o.id === firstSlot
                                  );
                                  setFieldValue(`dayDetails[${index}]`, {
                                    ...findSlot,
                                    id: id,
                                    day: day,
                                  });
                                }
                                // console.log("FIND SLOT", findSlot?.startTime);
                                // console.log("FIND SLOT", findSlot?.endTime);
                                // console.log("FIND SLOT", findSlot?.breakStartTime);
                                // console.log("FIND SLOT", findSlot?.endTime);
                              }
                            }
                          }}
                        />
                      )}

                      <span className="text-17-500 color-black-100">
                        {elem?.day}:
                      </span>

                      <SwitchBox
                        checked={isShow}
                        onChange={(e) => {
                          // handleToggle(e, elem);
                          setFieldValue(`dayDetails[${index}].isShow`, !isShow);
                        }}
                      />

                      {isShow && (
                        <>
                          <div className="pe-3 d-flex gap-2 flex-wrap">
                            <div className="d-flex gap-2 ">
                              <Dropdown
                                id={`dayDetails[${index}[startTime]]`}
                                value={startTime}
                                options={timeIntervals}
                                optionValue="time"
                                optionKey="time"
                                onChange={handleChange}
                              />

                              <span className="center-text">To</span>

                              <Dropdown
                                id={`dayDetails[${index}[endTime]]`}
                                value={endTime}
                                options={timeIntervals}
                                optionValue="time"
                                optionKey="time"
                                error={errEndTime}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="d-flex gap-2 ">
                              {/* <span className="text-nowrap">Break Time</span> */}
                              <Dropdown
                                id={`dayDetails[${index}[breakStartTime]]`}
                                value={breakStartTime}
                                options={timeIntervals}
                                optionValue="time"
                                optionKey="time"
                                error={errBreakStartTime}
                                onChange={handleChange}
                              />

                              <span className="center-text">To</span>

                              <Dropdown
                                id={`dayDetails[${index}[breakEndTime]]`}
                                value={breakEndTime}
                                options={timeIntervals}
                                optionValue="time"
                                optionKey="time"
                                error={errBreakEndTime}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </form>
                );
              })}
              <div className="d-flex gap-3">
                <Button
                  btnText="Previous"
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                />
                <Button
                  btnText="SAVE"
                  btnStyle="PD"
                  onClick={submitForm}
                  btnLoading={btnLoading}
                  // disabled={isEqual(values, initialValues)}
                />
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default StepFour;
