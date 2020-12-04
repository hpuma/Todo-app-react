const { getAPI, putAPI, postAPI, deleteAPI } = require("./axios");

const SIGNUP_URL = "signup/auth";
const LOGIN_URL = "login/auth";
const HOME_URL = "list/";
const HOMELIST_URL = "list/all";

//auth api calls
const postSignup = (data) => postAPI(SIGNUP_URL, data);
const postLogin = (data) => postAPI(LOGIN_URL, data)

//home api calls
const postHome = (data) => postAPI(HOME_URL, data);
const getHome = () => getAPI(HOMELIST_URL);

//list api calls
const getList = (listId) => getAPI(`list/${listId}`);
const putList = (listId, data) => putAPI(`list/${listId}`, data);
const deleteList = (listId) => deleteAPI(`list/${listId}`);

//todo api calls
const getTodo = (listId) => getAPI(`list/${listId}/todos`);
const postTodo = (listId, data) => postAPI(`todo/${listId}`, data);
const putTodo = (todoId, data) => putAPI(`todo/${todoId}`, data);
const deleteTodo = (todoId) => deleteAPI(`todo/${todoId}`);
const toggleTodo = (todoId, data) => putAPI(`todo/${todoId}/toggle`, data);

export { 
    postSignup,
    postLogin,
    getHome,
    postHome, 
    getList,
    putList,
    deleteList,
    getTodo,
    postTodo,
    putTodo,
    deleteTodo,
    toggleTodo
}