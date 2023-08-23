import { useState } from "react";
import "./App.css";
import "@fontsource/russo-one";
import { Data } from "./Components/Data";
import { HistoryField } from "./Components/DisplayInputs/HistoryField";
import { InputOutputField } from "./Components/DisplayInputs/InputOutputField";
import { Keyboard } from "./Components/Keyboard";

function App() {
  const [data, setData] = useState(Data);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState("");

  const handleClick = (e) => {
    let eValue = e.target.value;
    //setValue(value);

    let v = value + eValue;

    if (v[0] === "0" && v[1] !== ".") {
      v = value.slice(1);
    }
    setValue(v);
    // let hist = history + eValue;
    setHistory(history + eValue);

    if (eValue === "AC") {
      setHistory("");
      setValue("");
      return;
    }

    for (let i = 0; i < value.length; i++) {
      if (value[value.length - 1] === eValue) {
        let v = value.substr(0, value.length - 1);
        setValue(v + eValue);
        setHistory(v + eValue);
      } else {
        let temp = Number(value[value.length - 1]);
        let conv = Number(eValue);
        /**
       *  (temp === "-" ||
            temp === "+" ||
            temp === "*" ||
            temp === "/" ||
            temp === ".") &&
          (eValue === "-" ||
            eValue === "+" ||
            eValue === "*" ||
            eValue === "/" ||
            eValue === ".")
       */

        if (isNaN(temp) && isNaN(conv)) {
          let v = value.substr(0, value.length - 1);

          setValue(v + eValue);
          setHistory(v + eValue);
        } else {
          setValue(value + eValue);
          setHistory(value + eValue);
        }
      }
    }
    //evaluate the inputs using switch statement
    switch (eValue) {
      case "=":
        let solution = eval(value);
        if (solution % 1 === 0) {
          setValue(solution);
          setHistory(`${value} ${eValue} ${solution}`);
        } else {
          setValue(solution.toFixed(2));
          setHistory(`${value} ${eValue} ${solution.toFixed(2)}`);
        }
        break;
      case "+":
        setValue(eval(value) + eValue);
        setHistory(`${eval(value)} ${eValue}`);
        break;
      case "-":
        setValue(`${eval(value)}${eValue}`);
        setHistory(`${eval(value)} ${eValue}`);
        break;
      case "*":
        setValue(`${eval(value)}${eValue}`);
        setHistory(`${eval(value)} ${eValue}`);
        break;
      case "/":
        setValue(`${eval(value)}${eValue}`);
        setHistory(`${eval(value)} ${eValue}`);
        break;
      default:
        return;
    }

    // if (eValue === "=") {
    //   let solution = eval(value);
    //   if (solution % 1 === 0) {
    //     setValue(solution);
    //     setHistory(value + " " + eValue + " " + solution);
    //   } else {
    //     setValue(solution.toFixed(2));
    //     setHistory(value + " " + eValue + " " + solution.toFixed(2));
    //   }
    // }
  };

  // //covert the value to number
  // const convertInputValue = (num) => {
  //   let numValue = Number(num);
  //   //let val = numValue.toLocaleString("en");

  //   // console.log("input", typeof numValue);
  //   return numValue;
  // };

  // let result = 0;

  // const computeInputs = (inputvalues) => {
  //   if (typeof inputvalues !== Number) {
  //     // convertInputValue(inputvalues);
  //     inputvalues = Number(inputvalues);
  //     result = eval(inputvalues).toString();
  //   }

  //   return result;
  // };
  // console.log("comput ", computeInputs(value));

  // const resetHistory = (num) => {
  //   if ((num = "AC")) {
  //     setHistory("");
  //   } else {
  //     setHistory(history + num);
  //   }
  // };

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
