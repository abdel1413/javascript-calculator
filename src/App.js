import { useState } from "react";
import "./App.css";
import "@fontsource/russo-one";

import { Data, operands, operators } from "./Components/Data";
import { HistoryField } from "./Components/DisplayInputs/HistoryField";
import { InputOutputField } from "./Components/DisplayInputs/InputOutputField";
import { Keyboard } from "./Components/Keyboard";
import { Footer } from "./Components/Footer";

/* eslint-disable no-eval */

function App() {
  const [data, setData] = useState(Data);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState("");

  const [overrideValue, setOverrideValue] = useState(false);

  //we can combine all the states in a single state object
  //const [state, setState] = useState({data:Data, value:'', history:'', overrideValue:false})

  const handleClick = (value) => {
    let operand = operands.find((num) => num === value);
    let operator = operators.find((op) => op === value);

    //make sure if = sign is clicked, to set override state to true;
    // clear whatever we have in history and value then
    //reset value to take new entered value passing by
    //history and then return reset history
    //note this is bcz of history is depending on value
    //and vice-versa. hence we need to do it synchronisely
    if (overrideValue) {
      handlClear();
      setOverrideValue(false);

      setHistory((v) => {
        setValue(value);
        return v + value;
      });
    } else {
      setValue(value);
      setHistory((v) => v + value);
    }

    switch (value) {
      case "=":
        handleEqual();
        setOverrideValue(true);
        break;
      case "AC":
        handlClear();
        break;
      case operand:
        handleOperand(value);
        break;
      case operator:
        handleOperator(value);
        break;
      case ".":
        handleDot(value);
        break;
      default:
        break;
    }
  };

  const handleOperand = (val) => {
    if (val === "0" && (value === "0" || history === "0")) {
      setValue(value);
      setHistory(value);
    } else {
      //value is not zero so get the last char
      let lastChar = value.charAt(value.length - 1);

      // if the value you entered is operator, just set the  value with the
      //it otherwise append it with the existing values
      let isLastChartOpe = lastChar === "*" || operators.includes(lastChar);
      if (isLastChartOpe) {
        setValue(`${val}`);
      } else {
        setValue(`${value}${val}`);
      }
    }
  };

  const handleOperator = (val) => {
    if (value.length) {
      setHistory(`${val}`);

      let bfLastChar = history.charAt(history.length - 2);

      let lastChar = history.charAt(history.length - 1);

      let bfLastCharInOpe =
        operators.includes(bfLastChar) || bfLastChar === "*";

      let lastCharInOpe = operators.includes(lastChar) || lastChar === "*";

      let overriedMultipleChar = val === "x" ? "*" : val;

      //check if the last car is operator and it's not -, and
      //also its previous char is operation, then override the
      // both chars with the current operation. but if only the
      //last char is operation then override it with
      //the current value
      //otherwise just append the char to the end.
      if (
        (lastCharInOpe && val !== "-") ||
        (bfLastCharInOpe && lastCharInOpe)
      ) {
        if (bfLastCharInOpe) {
          let updateValue = `${history.substr(0, history.length - 2)}${val}`;
          setHistory(updateValue);
        } else {
          setHistory(`${history.substr(0, history.length - 1)}${val}`);
        }
      } else {
        setHistory(`${history}${val}`);
      }
    }
  };

  const handlClear = () => {
    setHistory((v) => {
      setValue("");
      return "";
    });
  };

  const handleEqual = () => {
    let n = history.replace("x", "*");
    let lastChar = history.charAt(history.length - 1);

    if (history.length) {
      if (history.charAt(0) === "/" || history.charAt(0) === "x") {
        setHistory(history);
        setValue(value);
      } else if (
        history.charAt(history.length - 1) === "*" ||
        operators.includes(lastChar)
      ) {
        setHistory(history);
        setValue(history.substr(0, history.length - 1));
      } else {
        let result = eval(n);
        // setOverrideValue(true);
        setHistory(`${result}`);
        setValue(`${result}`);
      }
    }
  };

  const handleDot = (val) => {
    let lastChar = value.charAt(value.length - 1);

    if (!value.length) {
      setValue("0.");
      setHistory("0.");
    } else {
      //allow 0 after we enter a digit followed by dot (.)
      if (lastChar === "x" || operators.includes(lastChar)) {
        setValue(`${value}0.`);
        setHistory(`${history}0.`);
      } else {
        //avoid multiple dots in a segment/substring
        let isDot =
          lastChar === "." || value.includes(".")
            ? `${value}`
            : `${value}${val}`;

        setValue(isDot);
        //don't append dot (.) to history if it contains one already
        let hist =
          lastChar === val || value.includes(val)
            ? `${history}`
            : `${history}${val}`;
        setHistory(`${hist}`);
      }
    }
  };

  return (
    <div className="container">
      <div className="App">
        <HistoryField history={history} />
        <InputOutputField input={value} />
        <Keyboard handleClick={handleClick} data={data} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
