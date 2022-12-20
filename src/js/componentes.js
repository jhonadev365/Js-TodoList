//IMPORTAMOS EL ARCHIVO DE CSS, pero debemos configurarlo en el archivo webpack.config.js
import '../css/componentes.css';

//UNA VEZ INSTALADO webpack DEBEMOS AÑADIR export A TODOS LO QUE QUERAMOS EXPORTAR



export const saludar =(nombre)=>{
	console.log('Creando etiqueta HTML');
	
	const validation= document.getElementById('message');

	if (validation == null) {
		console.log('No se encontro la etiqueta');

	}else{
		validation.innerText = `Hola!!! ${nombre}`;

	}

}