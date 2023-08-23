import { Keypad } from "./Keypad";

export const Keyboard = ({ handleClick, data }) => {
  return (
    <div className="keyboard">
      {data.map((item) => {
        return <Keypad handleClick={handleClick} keypad={item} />;
      })}
    </div>
  );
};
