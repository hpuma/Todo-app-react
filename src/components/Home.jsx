import React, { useState, useEffect } from 'react';
import HomeList from './HomeList';
import '../styles/Home.css';
import InputAdd from './elements/InputAdd';
import { getHome, postHome } from '../utils/api';
import useIsActive from '../hooks/useIsActive';

function Home({ currentUser }) {
    //states
    const [listName, setInputName] = useState("");
    const [userLists, setUserLists] = useState([]);
    const [loading, setLoading] = useState(false); //useIsActive creates dependency warning
    const submitState = useIsActive();

    //remount when new list is added
    useEffect(() => {
        if (!currentUser) return;

        const getListsAndTodos = () => { 
            getHome()
            .then((response) => {
                setLoading(false);
                const lists = response.data.allLists;
                setUserLists(lists);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        };
        setLoading(false);
        getListsAndTodos();
    }, [submitState.isActive, currentUser]);

    //add new list
    async function handleSubmitForm(event) {
        event.preventDefault();
        if (!listName) return;

        const data = { list_name: listName };

        await postHome(data)
        .then(() => {
            setInputName("");
        })
        .catch((error) => {
            console.log(error);
        });

        submitState.toggle();
    }

    //util functions
    function onChangeList(event) {
        setInputName(event.target.value);
    }

    return (
        <div className="container">
            <div className="home-container">
            { (currentUser)
                ? <>
                    <h1> Welcome {currentUser.name}!</h1>
                    { (loading) 
                        ? <div className="loading">Loading lists...</div>
                        : (userLists[0])
                        ? <HomeList userLists={userLists} />
                        : <p className="body">Create your first list</p>
                    }
                    <InputAdd inputId="list-name" buttonId="list-add" placeholder="Enter List Name" value={listName} onChangeInput={onChangeList} buttonLabel="Add list" handleSubmitForm={handleSubmitForm} />
                </>
                : <>
                    <h1> Welcome User!</h1>
                    <p>Please sign up or log in to create lists.</p>
                </>
            }
            </div>
        </div>
    );
}

export default Home;