import { useState, useEffect } from "react";

const App = () => {
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState({ minutes: 25, seconds: 0 });

  useEffect(() => {
    if (!running) return;

    const timerId = setTimeout(() => {
      if (time.minutes === 0 && time.seconds === 0) return;
      if (time.seconds === 0) {
        setTime(() => ({ minutes: time.minutes - 1, seconds: 59 }));
      } else {
        setTime(() => ({ minutes: time.minutes, seconds: time.seconds - 1 }));
      }
      return () => {
        clearTimeout(timerId);
      };
    }, 1000);
  }, [time, running]);
  return (
    <div>{`${time.minutes} : ${time.seconds < 10 ? "0" : ""}${
      time.seconds
    }`}</div>
  );
};

export default App;
