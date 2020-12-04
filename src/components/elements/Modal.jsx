import React from 'react';
import '../../styles/Modal.css'

function Modal(props) {
  function onClickDelete() {
    props.delete();
  }

  function onClickCancel() {
    props.cancel();
  }

  return (
    <div className="modal">
      {props.message}
      <p>This action cannot be undone.</p>
      <div className="btn-row">
        <button className="modal-delete-btn" onClick={onClickDelete}>Delete</button>
        <button className="modal-cancel-btn" onClick={onClickCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default Modal;
