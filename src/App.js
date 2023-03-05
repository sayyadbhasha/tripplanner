import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import DoneIcon from "@mui/icons-material/Done";
import { getTotalTime, taks, Time, createStep, subTract, addTime } from "./helper";
import BasicDateTimePicker from "./DatePicker";
import dayjs from "dayjs";

/* 
  if travel is more than capacity split into multiple travels
  add travel if less than capacity, don't split
*/

export default function App() {
  let counter = 0;
  let capactiy = {
    hours: 14,
    minutes: 0,
  };

  let addTravelsTime = {
    hours: 0,
    minutes: 0,
  };
  let childs = [];
  const sessionSteps = localStorage.getItem('steps');
  const [steps, setSteps] = React.useState(sessionSteps ? JSON.parse(sessionSteps): []);

  const generateTravelsV1 = () => {
    const stepsTemp = []
    taks.map((each, index) => {
      const totalTime = getTotalTime(each.totalTime);
      if (Time(totalTime).greater(capactiy)) {
        if (!Time(addTravelsTime).zeroTime()) {
          counter++;
          stepsTemp.push(createStep(`Day ${counter}`, "", childs));
          childs = [];
          addTravelsTime = { hours: 0, minutes: 0 };
        }
        let condition = totalTime;
        while (Time(condition).greater(capactiy)) {
          counter++;
          stepsTemp.push(
            createStep(`Day ${counter}`, "", [
              { ...each, availedTime: capactiy },
            ])
          );
          condition = subTract(condition, capactiy);
        }
        counter++;
        stepsTemp.push(
          createStep(`Day ${counter}`, "", [
            { ...each, availedTime: condition },
          ])
        );
      } else {
        const totalTimeConsideringNextTour = addTime(addTravelsTime, totalTime);
        if (Time(totalTimeConsideringNextTour).greater(capactiy)) {
          if (each.split) {
            const timeAvailableForSplit = subTract(capactiy, addTravelsTime);
            const remainingTimeAfterSplit = subTract(
              totalTime,
              timeAvailableForSplit
            );
            childs.push({ ...each, availedTime: timeAvailableForSplit });
            counter++;
            stepsTemp.push(createStep(`Day ${counter}`, "", childs));
            childs = [{ ...each, availedTime: remainingTimeAfterSplit }];
            addTravelsTime = remainingTimeAfterSplit;
          } else {
            counter++;
            stepsTemp.push(createStep(`Day ${counter}`, "", childs));
            childs = [{ ...each, availedTime: totalTime }];
            addTravelsTime = totalTime;
          }
        } else {
          childs.push({ ...each, availedTime: totalTime });
          addTravelsTime = addTime(addTravelsTime, totalTime);
        }
      }
      if (taks.length - 1 === index) {
        if (childs.length !== 0) {
          counter++;
          stepsTemp.push(createStep(`Day ${counter}`, "", childs));
          childs = [];
          addTravelsTime = { hours: 0, minutes: 0 };
        }
      }
    });
    setSteps([...stepsTemp])
  };


 React.useEffect(() => {
  localStorage.setItem('steps', JSON.stringify(steps))
}, [steps])

  return (
    <Box sx={{ maxWidth: 400 }}>
      <button onClick={() =>{ 
        setSteps(() => [])
        localStorage.setItem('steps', '')
         generateTravelsV1()
        }}>Generate Plan</button>
      <Stepper activeStep={1} orientation="vertical">
        {steps.map((step, index) => {
          let dateStatus = dayjs(step.startDate);
          return (
            <Step active key={step.label}>
              <StepLabel
                StepIconComponent={DoneIcon}
                optional={index === 2 ? null : null}
              >
                <b>{step.label}</b>
                <div style={{ marginTop: 10 }}>
                  <BasicDateTimePicker
                    setDate={(date) => {
                      const updatedSteps = steps.map((each, upIndex) => {
                        if (index === upIndex) {
                          return { ...each, startDate: date };
                        }
                        return each;
                      });
                      setSteps([...updatedSteps]);
                    }}
                    startDate={step.startDate}
                  />
                </div>
              </StepLabel>
              <StepContent>
                <Stepper activeStep={1} orientation="vertical">
                  {step.childs.map((stepChild, index) => (
                    <Step active key={stepChild.label}>
                      <StepLabel
                        StepIconComponent={DoneIcon}
                        optional={index === 2 ? null : null}
                      >
                        <div>{stepChild.label} </div>
                        <div>
                          {(() => {
                            // const arrivteFormatted = dayjs(dateStatus).format("MMM DD, dddd hh:mm A");
                            dateStatus = dayjs(dateStatus)
                              .add(stepChild.availedTime.hours, 'hour')
                              .add(stepChild.availedTime.minutes, 'minute');
                            const depatrueFormatted =
                              dayjs(dateStatus).format("MMM DD, dddd hh:mm A");
                            return (
                              <div>
                                {/* <div>Arrive at: <b>{arrivteFormatted}</b></div> */}
                                <div>Depature at: <b>{depatrueFormatted}</b></div>
                              </div>
                            );
                          })()}
                        </div>
                      </StepLabel>
                      <StepContent></StepContent>
                    </Step>
                  ))}
                </Stepper>
                {/* <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box> */}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
