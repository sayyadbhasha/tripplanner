import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import { getTotalTime, minutesToTime } from "./helper";

const taks = [
  {
    label: "Starting From Hyderabad",
    totalTime: {
      travel: {
        hours: 0,
        minutes: 30,
      },
      spend: {
        hours: 0,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Raichur Fort, Raichur",
    totalTime: {
      travel: {
        hours: 5,
        minutes: 32,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Hemakuta Hill Temple, Hampi",
    totalTime: {
      travel: {
        hours: 3,
        minutes: 4,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Daroji Sloth Bear Sanctuary",
    totalTime: {
      travel: {
        hours: 0,
        minutes: 20,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Tungabhadra Dam",
    totalTime: {
      travel: {
        hours: 0,
        minutes: 42,
      },
      spend: {
        hours: 1,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Koppal fort",
    totalTime: {
      travel: {
        hours: 0,
        minutes: 34,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Dharwad",
    totalTime: {
      travel: {
        hours: 2,
        minutes: 34,
      },
      spend: {
        hours: 4,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa",
    totalTime: {
      travel: {
        hours: 3,
        minutes: 16,
      },
      spend: {
        hours: 24,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local 2",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local 2",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local 2",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
  {
    label: "Goa Local 2",
    totalTime: {
      travel: {
        hours: 1,
        minutes: 0,
      },
      spend: {
        hours: 2,
        minutes: 0,
      },
    },
    description: "",
  },
];

const createStep = (label, description, childs = []) => {
  return { label, description, childs };
};

const Time = (time1) => {
  return {
    greater: (time2) => {
      if (time1.hours === time2.hours) {
        return time1.minutes > time2.minutes;
      }
      return time1.hours > time2.hours;
    },
    lesser: (time2) => {
      if (time1.hours === time2.hours) {
        return time1.minutes < time2.minutes;
      }
      return time1.hours < time2.hours;
    },
    zeroTime: () => {
      return time1.hours === 0 && time1.minutes === 0;
    },
  };
};

const addTime = (item1, item2) => {
  const item1Minutes = item1.hours * 60 + item1.minutes;
  const item2Minutes = item2.hours * 60 + item2.minutes;
  const additionMinutes = item1Minutes + item2Minutes;
  return minutesToTime(additionMinutes);
};

const subTract = (item1, item2) => {
  const item1Minutes = item1.hours * 60 + item1.minutes;
  const item2Minutes = item2.hours * 60 + item2.minutes;
  const additionMinutes = item1Minutes - item2Minutes;
  return minutesToTime(Math.abs(additionMinutes));
};

const steps = [];

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
/* 
  if travel is more than capacity split into multiple travels
  add travel if less than capacity, don't split
*/

const generateTravelsV1 = () => {
  taks.map((each, index) => {
    const totalTime = getTotalTime(each.totalTime);
    if (Time(totalTime).greater(capactiy)) {
      if (!Time(addTravelsTime).zeroTime()) {
        counter++;
        steps.push(createStep(`Day ${counter}`, "", childs));
        childs = [];
        addTravelsTime = { hours: 0, minutes: 0 };
      }
      let condition = totalTime;
      while (Time(condition).greater(capactiy)) {
        counter++;
        steps.push(
          createStep(`Day ${counter}`, "", [{ ...each, availedTime: capactiy }])
        );
        condition = subTract(condition, capactiy);
      }
      counter++;
      steps.push(
        createStep(`Day ${counter}`, "", [{ ...each, availedTime: condition }])
      );
    } else {
      const totalTimeConsideringNextTour = addTime(addTravelsTime, totalTime);
      if (Time(totalTimeConsideringNextTour).greater(capactiy)) {
        counter++;
        steps.push(createStep(`Day ${counter}`, "", childs));
        childs = [{ ...each, availedTime: totalTime }];
        addTravelsTime = totalTime;
      } else {
        childs.push({ ...each, availedTime: totalTime });
        addTravelsTime = addTime(addTravelsTime, totalTime);
      }
    }
    if (taks.length - 1 === index) {
      if (childs.length !== 0) {
        counter++;
        steps.push(createStep(`Day ${counter}`, "", childs));
        childs = [];
        addTravelsTime = { hours: 0, minutes: 0 };
      }
    }
  });
};

generateTravelsV1();

console.log(steps);

export default function App() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={1} orientation="vertical">
        {steps.map((step, index) => (
          <Step active key={step.label}>
            <StepLabel
              StepIconComponent={DoneIcon}
              optional={index === 2 ? null : null}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Stepper activeStep={1} orientation="vertical">
                {step.childs.map((step, index) => (
                  <Step active key={step.label}>
                    <StepLabel
                      StepIconComponent={DoneIcon}
                      optional={index === 2 ? null : null}
                    >
                      {step.label} {step.availedTime.hours} Hours,{" "}
                      {step.availedTime.minutes.toFixed(2)} Minutes
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
        ))}
      </Stepper>
    </Box>
  );
}
