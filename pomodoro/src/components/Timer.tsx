import { useState, useEffect } from "react";

interface TimerProps {
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
const Timer = ({ running, setRunning }: TimerProps) => {
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
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [time, running]);
  return (
    <div>
      {`${time.minutes} : ${time.seconds < 10 ? "0" : ""}${time.seconds}`}
      <div className="flex gap-x-4">
        <div
          className="border-2 border-zinc-400 w-[100px] h-[50px] p-4 rounded-xl flex items-center justify-center cursor-pointer"
          onClick={() => setRunning(!running)}
        >
          {running ? "Stop" : "Start"}
        </div>
        <div
          className="border-2 border-zinc-400 w-[100px] h-[50px] p-4 rounded-xl flex items-center justify-center cursor-pointer"
          onClick={() => {
            setRunning(false);
            setTime({ minutes: 25, seconds: 0 });
          }}
        >
          Reset
        </div>
      </div>
    </div>
  );
};

export default Timer;
