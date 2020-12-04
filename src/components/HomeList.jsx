import React from 'react';
import { Link } from "react-router-dom";
import HomeTodos from './HomeTodos';

function HomeList({ userLists }) {
    return (
        <>
        <h2>Lists</h2>
        <div className="align-lists">
            { userLists.map((list) => 
                <div key={list._id} className="list-container">
                    <Link to={`/list/${list._id}`} className="list-link">{list.list_name}</Link>
                    <HomeTodos todos={list.todos} />
                </div>
            )}
        </div>
        </>
    );
}

export default HomeList;