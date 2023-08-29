export const Keypad = ({ handleClick, keypad: { key, value, id } }) => {
  return (
    <div className="buttons">
      <button onClick={() => handleClick(value)} id={id}>
        {key}
      </button>
    </div>
  );
};
