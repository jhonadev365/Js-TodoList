//IMPORTAMOS EL ARCHIVO DE CSS, pero debemos configurarlo en el archivo webpack.config.js
import '../css/componentes.css';

//UNA VEZ INSTALADO webpack DEBEMOS AÑADIR export A TODOS LO QUE QUERAMOS EXPORTAR



export const saludar =(nombre)=>{
	console.log('Creando etiqueta HTML');

	const h1 = document.createElement('h1');

	h1.innerText = `Hola!!! ${nombre}`;

	document.getElementById("cuadro").appendChild(h1);

}