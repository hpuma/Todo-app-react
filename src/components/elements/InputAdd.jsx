import React from 'react';

function InputAdd(props) {
  function onChange(event) {
    props.onChangeInput(event);
  }

  function handleSubmit(event) {
    props.handleSubmitForm(event);
  }

  return (
    <form onSubmit={handleSubmit} className="input-add-container">
        <div className="flex-row-add">
            <input id={props.inputId} className="flex-item-add" placeholder={props.placeholder} value={props.value} onChange={onChange}/>
            <button id={props.buttonId} className="flex-item-add" type="submit" disabled={ !(props.value) }>{props.buttonLabel}</button>
        </div>
    </form>
  );
}

InputAdd.defaultProps = {
  placeholder:"Enter Input", 
  buttonLabel:"Add",
}

export default InputAdd;