import "./form-input.scss";

const TextField = ({ labelText, ...inputProps }) => {
  const className = `form-input-label ${
    labelText && inputProps.value.length ? "shrink" : ""
  }`;
  return (
    <div className="group">
      <input className="form-input" {...inputProps} />
      {labelText && (
        <label htmlFor={inputProps.name} className={className}>
          {labelText}
        </label>
      )}
    </div>
  );
};

export default TextField;
