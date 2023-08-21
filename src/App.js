import { useState } from "react";
import "./App.css";
import "@fontsource/russo-one";
import { Data } from "./Components/Data";
import { HistoryField } from "./Components/DisplayInputs/HistoryField";
import { InputOutputField } from "./Components/DisplayInputs/InputOutputField";
import { Keyboard } from "./Components/Keyboard";

function App() {
  const [data, setData] = useState(Data);
  const [value, setValue] = useState("0");
  const [history, setHistory] = useState("");

  const handleClick = (e) => {
    setValue(e.target.value);

    if (e.target.value === "AC") {
      setHistory("");
      setValue("0");
    } else if (e.target.value === "=") {
      // console.log(value);
      //computeInputs(value);
      let solution = eval(value);
      setValue(solution);
      setHistory(value + e.target.value + solution);
    } else if (e.target.value === "NaN") {
      if (!NaN(value[-1])) {
        let newValue = value.slice(-1);
        setValue(newValue + e.target.value);
      }
    } else {
      let v = value + e.target.value;
      if (v[0] === "0") {
        v = v.slice(1);
      }
      setValue(v);
      let hist = history + e.target.value;
      setHistory(history + e.target.value);
    }
  };

  //covert the value to number
  const convertInputValue = (num) => {
    let numValue = Number(num);
    //let val = numValue.toLocaleString("en");

    // console.log("input", typeof numValue);
    return numValue;
  };

  let result = 0;
  const computeInputs = (inputvalues) => {
    if (typeof inputvalues !== Number) {
      // convertInputValue(inputvalues);
      inputvalues = Number(inputvalues);
      result = eval(inputvalues).toString();
    }
    console.log("rest", result);
    return result;
  };
  console.log("comput ", computeInputs(value));

  const resetHistory = (num) => {
    if ((num = "AC")) {
      setHistory("");
    } else {
      setHistory(history + num);
    }
  };

  return (
    <div className="App">
      <div className="display-fields">
        <HistoryField history={history} />
        <InputOutputField result={value} />
      </div>
      <div>
        <Keyboard handleClick={handleClick} data={data} />
      </div>
    </div>
  );
}

export default App;
