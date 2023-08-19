export const Keypad = ({ keypad: { key, id } }) => {
  return (
    <div className="buttons">
      <button id={id}>{key}</button>
    </div>
  );
};
