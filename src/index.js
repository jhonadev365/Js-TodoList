import './styles.css';

import {Todo, TodoList} from './classes'; //Con esta notacion busca el archivo index.js en la carpeta especificada.
import {crearTodoHtml} from './js/componentes'; 

export const todoList = new TodoList(); //instancia la clase y crea un array 

console.log(todoList.todos);

//PRIMERA FORMA
// todoList.todos.forEach(todo => crearTodoHtml(todo));

//SEGUNDA FORMA
todoList.todos.forEach(crearTodoHtml);
