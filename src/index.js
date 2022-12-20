import {saludar} from './js/componentes';
import './style.css';

//const nombre = 'Error ';

const element_btn = document.getElementById("btn_greet");
const element_input = document.getElementById("usr_name");

element_btn.addEventListener('click', function (){
	if (element_input.value != '') {
		saludar(element_input.value);
	}else{
		alert('Ingrese un nombre valido...');
	}
});

