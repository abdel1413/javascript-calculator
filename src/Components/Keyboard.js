import { Keypad } from "./Keypad";

export const Keyboard = ({ data }) => {
  return (
    <div className="keyboard">
      {data.map((item) => {
        return <Keypad keypad={item} />;
      })}
    </div>
  );
};
