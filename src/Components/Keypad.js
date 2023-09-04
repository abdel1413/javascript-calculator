export const Keypad = ({ handleClick, keypad: { key, id } }) => {
  return (
    <div className="buttons">
      <button onClick={() => handleClick(key)} id={id}>
        {key}
      </button>
    </div>
  );
};
