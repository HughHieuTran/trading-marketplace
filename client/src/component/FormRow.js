import React from 'react';

const FormRow = (props) => {
  const { type, name, value, handleChange, labelText } = props;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        name={name}
        className="form-input "
        type={type}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default FormRow;
