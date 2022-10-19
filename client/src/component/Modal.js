import React from 'react';

const Modal = ({ onConfirm, onClear, text }) => {
  return (
    <aside className="modal-container" onClick={onClear}>
      <div className="modal ">
        <h4>{text}</h4>
        <div className="btn-container">
          <button type="button" className="btn confirm-btn" onClick={onConfirm}>
            confirm
          </button>
          <button type="button" className="btn clear-btn" onClick={onClear}>
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
