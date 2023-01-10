import {Todo} from '../classes';

export class TodoList{
	constructor(){
		// this.todos = [];
		this.cargarLocalStorage();
	}

	nuevoTodo(todo){
		this.todos.push(todo);
		this.guardarLocalStorage();
	}

	eliminarTodo(id){

		//De la lista original elimina el elemento con el id que le pasemos en el argumento
		this.todos = this.todos.filter(todo => todo.id != id);
		this.guardarLocalStorage();

	}
	marcarCompletado(id){
		for (const todo of this.todos) {
			
			console.log(id, todo.id);

			if (todo.id == id) {
				todo.completado = !todo.completado;
				this.guardarLocalStorage();
				break;
			}
		}
	}

	eliminarCompletados(){
		
		this.todos = this.todos.filter(todo=>!todo.completado);
		this.guardarLocalStorage();
	}

	guardarLocalStorage(){

		localStorage.setItem('todos', JSON.stringify(this.todos));

	}

	cargarLocalStorage(){
		this.todos = ( localStorage.getItem('todos') )
						? JSON.parse( localStorage.getItem('todos') )
													: [];

		this.todos = this.todos.map( obj => Todo.convertir( obj ));

	}

}