export const InputOutputField = (props) => {
  return <input id="display" value={props.result ? props.result : 0} />;
};

// InputOutputField.defaultProps = { result: 0 };
// InputOutputField.defaultProps = { result: props.result };
