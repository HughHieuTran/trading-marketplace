import React from 'react';

const SelectFormRow = (props) => {
  const { name, labelText, onChange, options, value } = props;

  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        {options.indexOf(value) === -1 && (
          <option key={4} value={value}>
            {value}
          </option>
        )}
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectFormRow;
