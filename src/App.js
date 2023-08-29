import { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/russo-one";
import { Data, operands, operators } from "./Components/Data";
import { HistoryField } from "./Components/DisplayInputs/HistoryField";
import { InputOutputField } from "./Components/DisplayInputs/InputOutputField";
import { Keyboard } from "./Components/Keyboard";
/* eslint-disable no-eval */
function App() {
  const [data, setData] = useState(Data);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState("");
  const [output, setOutput] = useState("");

  const handleOutput = () => {
    setOutput(value);
  };
  useEffect(() => {
    handleOutput();
  }, [value]);

  const handleClick = (value) => {
    let operand = operands.find((num) => num === value);

    let operator = operators.find((op) => op === value);

    setValue(value);
    setHistory((v) => v + value);
    switch (value) {
      case "=":
        handleEqual();
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

    // let eValue = e.target.value;
    // //setValue(value);

    // let v = value + eValue;

    // if (v[0] === "0" && v[1] !== ".") {
    //   v = value.slice(1);
    // } else {
    //   setValue(v);
    //   setHistory(history + eValue);
    // }

    // // if (!value.length) {
    // //   setValue("0.");
    // //   setHistory("0.");
    // // }

    // for (let i = 0; i < value.length; i++) {
    //   let temp = Number(value[value.length - 1]);
    //   let conv = Number(eValue);
    //   if (eValue === "AC") {
    //     setHistory("");
    //     setValue("");
    //     return;
    //   } else if (eValue === ".") {
    //     //
    //     setValue(
    //       value[value.length - 1] === "." || value.includes(".")
    //         ? `${value}`
    //         : `${value}.`
    //     );
    //     //
    //   } else if (
    //     value[value.length - 1] === eValue &&
    //     isNaN(temp) &&
    //     isNaN(conv)
    //   ) {
    //     let v = value.substr(0, value.length - 1);
    //     setValue(eval(v) + eValue);
    //     setHistory(eval(v) + eValue);
    //   } else {
    //     if (isNaN(temp) && isNaN(conv)) {
    //       let v = value.substr(0, value.length - 1);
    //       setValue(v + eValue);
    //       setHistory(v + eValue);
    //     } else {
    //       setValue(value + eValue);
    //       setHistory(value + eValue);
    //     }
    //   }

    //   /**
    //    *  (temp === "-" ||
    //    temp === "+" ||
    //    temp === "*" ||
    //    temp === "/" ||
    //    temp === ".") &&
    //    (eValue === "-" ||
    //    eValue === "+" ||
    //    eValue === "*" ||
    //    eValue === "/" ||
    //    eValue === ".")
    //    */

    //   //evaluate the inputs using switch statement
    //   switch (eValue) {
    //     case "=":
    //       let solution = eval(value);
    //       if (solution % 1 === 0) {
    //         setValue(`${solution}`);
    //         setHistory(`${value} ${eValue} ${solution.toFixed(2)}`);

    //         return;
    //       } else {
    //         setValue(solution.toFixed(2));
    //         setHistory(`${value} ${eValue} ${solution.toFixed(2)}`);
    //       }

    //       break;

    //     // case "+":
    //     //   let sol = eval(value);
    //     //   setValue(sol + eValue);
    //     //   setHistory(`${sol}${eValue}`);
    //     //   break;
    //     // case "-":
    //     //   setValue(`${eval(value)}${eValue}`);
    //     //   setHistory(`${eval(value)}${eValue}`);
    //     //   break;
    //     // case "*":
    //     //   setValue(`${eval(value)}${eValue}`);
    //     //   setHistory(`${eval(value)} ${eValue}`);
    //     //   break;
    //     // case "/":
    //     //   setValue(`${eval(value)}${eValue}`);
    //     //   setHistory(`${eval(value)} ${eValue}`);
    //     //   break;
    //     default:
    //       return;
    //   }
    // }
  };

  const handleOperand = (val) => {
    if (!value.length) {
      setValue(`${val}`);
      setHistory(`${val}`);
    } else {
      //value exist and it has some chars.
      //check if the value char intered is 0
      if (val === "0" && (value === "0" || history === "0")) {
        setValue(value);
        setHistory(value);
      } else {
        //char is not zero so get the last char
        let lastChar = value.charAt(value.length - 1);

        let isLastChartOpe = lastChar === "x" || operators.includes(lastChar);
        if (isLastChartOpe) {
          setValue(`${val}`);
        } else {
          setValue(`${value}${val}`);
        }

        // setHistory(isLastChartOpe ? `${value}` : `${history}${val}`);
      }
    }
  };

  const handleOperator = (val) => {
    if (value.length) {
      //setValue(`${value}`);
      setHistory(`${val}`);
      // }

      let bfLastChar = value.charAt(value.length - 2);
      // console.log("bf", bfLastChar);
      let lastChar = value.charAt(value.length - 1);
      // console.log("last", lastChar);

      let bfLastCharInOpe =
        operators.includes(bfLastChar) || bfLastChar === "x";
      let lastCharInOpe = operators.includes(lastChar) || lastChar === "x";

      let overriedMultipleChar = val === "x" ? "*" : val;
      // let overrid = "*";

      if (
        (lastCharInOpe && val !== "-") ||
        (bfLastCharInOpe && lastCharInOpe)
      ) {
        if (bfLastCharInOpe) {
          let updateValue = `${value.substr(0, value.length - 2)}${val}`;
          setValue(updateValue);
          //setHistory(updateValue);
        } else {
          ///

          setValue(`${value.substr(0, value.length - 1)}${val}`);
        }
      } else {
        setHistory(`${value}${val}`);
      }
    }
  };

  const handlClear = () => {
    setValue("");
    setHistory("");
  };

  const handleEqual = () => {
    let n = history.replace("x", "*");
    let result = eval(n);
    setValue(`${result}`);
    setHistory((v) => `${v}${result}`);
  };

  const handleDot = (val) => {
    let lastChar = value.charAt(value.length - 1);

    if (!value.length) {
      setValue("0.");
      setHistory("0.");
    } else {
      if (lastChar === "x" || operators.includes(lastChar)) {
        //  setValue(value)
        setValue(`${value}0.`);
        setHistory(`${history}.`);
      } else {
        //avoid multiple dots in a segment/substring
        let isDot =
          lastChar === "." || value.includes(".")
            ? `${value}`
            : `${value}${val}`;

        setValue(isDot);
        //handled
        let hist =
          lastChar === val || value.includes(val)
            ? `${history}`
            : `${history}${val}`;
        setHistory(`${hist}`);
      }
    }
  };

  return (
    <div className="App">
      <div className="display-fields">
        <HistoryField history={history} />
        <InputOutputField input={value || output || 0} />
      </div>
      <div>
        <Keyboard handleClick={handleClick} data={data} />
      </div>
    </div>
  );
}

export default App;
