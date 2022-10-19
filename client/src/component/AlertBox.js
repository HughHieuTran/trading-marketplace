import React from 'react';

const Alert = (props) => {
  const { alertType, alertText } = props;
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
