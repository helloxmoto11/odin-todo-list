import {deleteTodo, getTodos} from "./app";


const todos = getTodos()

todos.forEach(item => {
    document.createElement('div')
})


const button = document.createElement('button');
button.addEventListener('click', (e) => {
    deleteTodo(1)
})