import { useState } from "react";
import Timer from "./components/Timer";

const App = () => {
  const [running, setRunning] = useState(false);

  return (
    <div>
      <Timer running={running} setRunning={setRunning} />
    </div>
  );
};

export default App;
