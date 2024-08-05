import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  // if the modal is not open, do not render anything
  if (!isOpen) {
    return null;
  }

  //if modal is open, display the modal with a close button
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
