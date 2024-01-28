import { useState, useEffect } from "react";

interface TimerProps {
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
const Timer = ({ running, setRunning }: TimerProps) => {
  const [phase, setPhase] = useState("work");
  const [iteration, setIteration] = useState(1);
  const [time, setTime] = useState({
    minutes: 25,
    seconds: 0,
  });

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
      <div className="flex justify-center items-center font-rubik md:text-8xl text-7xl italic ">
        <h1>
          {`${time.minutes < 10 ? "0" : ""}${time.minutes}:${
            time.seconds < 10 ? "0" : ""
          }${time.seconds}`}
        </h1>
      </div>
      <div className="flex items-center justify-center mt-5 gap-x-2 text-xl font-mono font-semibold">
        <div
          className="border-2 border-black w-[100px] h-[50px] p-4 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black hover:text-white"
          onClick={() => setRunning(!running)}
        >
          {running ? "Stop" : "Start"}
        </div>
        <div
          className="border-2 border-black w-[100px] h-[50px] p-4 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black hover:text-white"
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
