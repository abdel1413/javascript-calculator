import { useState } from "react";
import "./App.css";
import "@fontsource/russo-one";
import { Data } from "./Components/Data";
import { FormalField } from "./Components/DisplayInputs/FormalField";
import { InputOutputField } from "./Components/DisplayInputs/InputOutputField";
import { Keyboard } from "./Components/Keyboard";

function App() {
  const [data, setData] = useState(Data);

  return (
    <div className="App">
      <div className="display-fields">
        <FormalField />
        <InputOutputField />
      </div>
      <div>
        <Keyboard data={data} />
      </div>
    </div>
  );
}

export default App;
