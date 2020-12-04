import React, { useRef, useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Dropdown from './elements/Dropdown';
import Modal from './elements/Modal';
import Todo from './Todo';
import '../styles/List.css';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useIsActive from '../hooks/useIsActive';
import { getList, putList, deleteList } from '../utils/api';
import { modalMessage } from '../utils/helper';

function List(props) {
    //vars
    const { listId } = useParams();
    const history = useHistory();

    //states
    const [currentList, setCurrentList] = useState(null);
    const [listName, setListName] = useState("");
    
    //util states
    const submitState = useIsActive();
    const dropdownState = useIsActive();
    const modalState = useIsActive();
    const editState = useIsActive();
    
    //refs
    const dropdownRef = useRef();
    useOnClickOutside(dropdownRef, dropdownState.deactivate);
    const modalRef = useRef();
    useOnClickOutside(modalRef, modalState.deactivate);
    const inputRef = useRef();
    useOnClickOutside(inputRef, editState.deactivate);

    //remount when list is updated
    useEffect(() => {
        const getListAPI = () => {
            getList(listId)
            .then((response) => {
                const list = response.data.targetList;
                setCurrentList(list);
                setListName(list.list_name);
            })
            .catch((error) => {
                console.log(error);
            });
        };
        getListAPI();
    }, [submitState.isActive, listId]);

    //edit list name
    async function handleSubmitForm(event) {
        event.preventDefault();
        if (!listName) return;

        const data = {
            list_name: listName
        }

        await putList(listId, data)
        .then(() => {
            submitState.toggle();
        })
        .catch((error) => {
            console.log(error);
        });

        editState.deactivate();
    }

    async function handleDelete() {
        await deleteList(listId)
        .then(() => {
            history.push('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //util functions
    function onChangeList(event) {
        setListName(event.target.value);
    }

    return (

        <div id="list-pg-container" className="container">
            { (currentList) 
            ? <> 
                { (modalState.isActive) &&           
                <div ref={modalRef}><Modal message={modalMessage} delete={handleDelete} cancel={modalState.deactivate} /></div> }
                
                <div className="header-container">
                    { (editState.isActive)
                        ? <div ref={inputRef} className="ref-container">
                            <form onSubmit={handleSubmitForm}> 
                                <input id="input-edit-list-name" name="editListName" value={listName} onChange={onChangeList} />
                                <input type="submit" value="Submit" hidden></input>
                            </form>
                        </div>
                        : <div id="list-header"><h1>{ currentList.list_name }</h1></div>
                    }
                    <div className="dropdown-container">
                        { (dropdownState.isActive)
                            ? <div ref={dropdownRef}><Dropdown edit={editState.activate} delete={modalState.activate}/></div>
                            : <button className="dropdown-btn" onClick={dropdownState.activate}>…</button>
                        }
                    </div>
                </div> 
                
                <Todo listId={listId} />  
            </>
            : <div className="loading">Loading list...</div>
            }
        </div>
    );
}

export default List;