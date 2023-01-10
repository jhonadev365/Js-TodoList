import { Todo } from '../classes';
import { todoList} from '../index';

const divTodoList = document.querySelector('.todo-list');
const textInput =  document.querySelector('.new-todo');
const deleteCompleted = document.querySelector('.clear-completed');
const inputFilters = document.querySelector('.filters');
const selectedFilter = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo)=>{
	const htmlTodo = `<li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;
	const div = document.createElement('div');
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild);
	return div;
};


textInput.addEventListener('keyup' , (event) => {
	if (event.keyCode === 13 && textInput.value != '')
	{
		console.log(textInput.value);
		const nuevoTodo = new Todo(textInput.value);
		todoList.nuevoTodo(nuevoTodo);
		crearTodoHtml(nuevoTodo);
		textInput.value ='';
	}
});


divTodoList.addEventListener('click', (event)=>{
	const nameOfElement = event.target.localName; // toma el valor de que tipo es la etiqueta sobre la que se hizo click
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute('data-id');

	if (nameOfElement.includes('input')) {

		//Usamos el metodo de completar de la clase TODO
		todoList.marcarCompletado(todoId);

		//Cambia la clase de una etiqueta o sino existe lo pone
		todoElemento.classList.toggle('completed');
	}else if(nameOfElement.includes('button')){
		
		//Usamos el metodo de eliminar de la clase TODO
		todoList.eliminarCompletadosdo(todoId);

		//Eliminamos un elemento especificado
		divTodoList.removeChild(todoElemento); 
	}

	console.log(todoList);
	
});

deleteCompleted.addEventListener('click', (event)=>{
	todoList.eliminarCompletados();

	//NOTA

	/***
	 * ESTE METODO NO SIRVE PORQUE CUANDO EL ELEMENTO ES ELIMINADO
	 * SE SALTA ESE INDICE YA EL PROCESO LO TOMA COMO QUE YA SE REVISO Y PASA AL SIGUIENTE
	 * LOS ELEMENTOS SE RECORREN A PARTIR DE ALLI UN INDICE ATRAS DEL ELEMENTO ELIMINADO POR ESO SE SALTA
	 ***/


	// for (let i = 0; i < divTodoList.children.length; i++) {
	// 	const elemento = divTodoList.children[i];
	// 	if (elemento.classList.contains('completed')) {
	// 		divTodoList.removeChild(elemento);
	// 	}
	// }

	for (let i = divTodoList.children.length-1; i >= 0 ; i--) {
		const elemento = divTodoList.children[i];
		if (elemento.classList.contains('completed')) {
			divTodoList.removeChild(elemento);
		}
	}	

});


inputFilters.addEventListener('click', (event)=>{
	const filtro = event.target.text;
	if ( !filtro ) { return; }

	selectedFilter.forEach( elem => elem.classList.remove('selected'));
	event.target.classList.add('selected');

	for(const elemento of divTodoList.children){
		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		switch( filtro ){
			case 'Pendientes':
				if (completado) {elemento.classList.add('hidden');}
			break;

			case 'Completados':
				if (!completado) {elemento.classList.add('hidden');}
			break;
		}
	}
});