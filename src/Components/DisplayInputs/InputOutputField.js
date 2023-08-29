export const InputOutputField = ({ input, output }) => {
  return <input id="display" value={input ? input : 0} />;
};

// InputOutputField.defaultProps = { result: 0 };
// InputOutputField.defaultProps = { result: props.result };
