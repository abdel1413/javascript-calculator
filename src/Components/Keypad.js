export const Keypad = ({ handleClick, keypad: { key, value, id } }) => {
  return (
    <div className="buttons">
      <button onClick={handleClick} id={id} value={value}>
        {key}
      </button>
    </div>
  );
};
