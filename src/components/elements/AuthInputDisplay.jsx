import React from 'react';

function InputDisplay(props) {
    function onChange(event) {
        props.onChangeInput(event);
    }
    
    return (
        <div className="auth-flex-row">
            <label for={props.id} className="auth-flex-item">{props.label}</label>
            <input id={props.id} name={props.name} className="auth-flex-item" type={props.type} placeholder={props.placeholder} value={props.value} onChange={onChange}/>
        </div>
    );
}

InputDisplay.defaultProps = {
    label:"Input:",
    type:"text", 
    placeholder:"Enter Input", 
}

export default InputDisplay;