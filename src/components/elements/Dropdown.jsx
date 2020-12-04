import React from 'react';
import '../../styles/Dropdown.css';

function Dropdown(props) {
    function onClickEdit() {
        props.edit();
    }

    function onClickDelete() {
        props.delete();
    }

    return (
        <div className="dropdown-wrapper">
            <button className="dropdown-content" onClick={onClickEdit}>Edit</button>
            <button className="dropdown-content" onClick={onClickDelete}>Delete</button>
        </div>
    );
}

export default Dropdown;
