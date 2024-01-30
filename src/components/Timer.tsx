import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

interface TimerProps {
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
const Timer = ({ running, setRunning }: TimerProps) => {
  const mapPhaseToTime = (
    phase: string
  ): { minutes: number; seconds: number } => {
    if (phase === "Focus") {
      return { minutes: 25, seconds: 0 };
    }
    if (phase === "Short Break") {
      return { minutes: 5, seconds: 0 };
    }
    return { minutes: 15, seconds: 0 };
  };

  const [phase, setPhase] = useState({ title: "Focus", iteration: 1 });
  const [time, setTime] = useState(mapPhaseToTime(phase.title));

  useEffect(() => {
    if (!running) return;

    const timerId = setTimeout(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        setPhase(() => {
          if (phase.title !== "Focus") {
            return { title: "Focus", iteration: phase.iteration + 1 };
          } else if (phase.iteration % 4 === 0) {
            return { title: "Long Break", iteration: phase.iteration };
          }
          return { title: "Short Break", iteration: phase.iteration };
        });
        setRunning(() => false);
        setTime(() => mapPhaseToTime(phase.title));
      } else if (time.seconds === 0) {
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
      <div className="flex flex-col justify-center items-center font-rubik">
        <h3 className="text-xl mb-5">{`${phase.title} ${phase.iteration}`}</h3>
        <Tilt>
          <div className="width-[250px] h-[200px] bg-white/40 backdrop-blur-4xl rounded-xl shadow-xl px-7 flex items-center justify-center border-4 border-black">
            <h1 className="md:text-8xl text-7xl italic mt-5 cursor-default">
              {`${time.minutes < 10 ? "0" : ""}${time.minutes}:${
                time.seconds < 10 ? "0" : ""
              }${time.seconds}`}
            </h1>
          </div>
        </Tilt>
      </div>
      <div className="flex items-center justify-center mt-5 gap-x-2 text-xl font-mono font-semibold">
        <div
          className="border-4 border-black w-[100px] h-[50px] p-4 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black hover:text-white"
          onClick={() => setRunning(!running)}
        >
          {running ? "Stop" : "Start"}
        </div>
        <div
          className="border-4 border-black w-[100px] h-[50px] p-4 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black hover:text-white"
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
