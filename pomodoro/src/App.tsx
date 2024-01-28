import { useState } from "react";
import Timer from "./components/Timer";

const App = () => {
  const [running, setRunning] = useState(false);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Timer running={running} setRunning={setRunning} />
    </div>
  );
};

export default App;
