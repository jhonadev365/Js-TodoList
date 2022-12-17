const HtmlWebPackPlugin = require('html-webpack-plugin');

//***IMPORTAR EL PLUGIN DE ESTILOS GLOBALES
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//***IMPORTA EL PLUGIN PARA MINIFICAR, REDUCIR TAMAÑO, A LOS ARCHIVOS DE ESTILOS
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//***ALTERNATIVA AL PLUGIN DE ARRIBA YA QUE ESTA DEPRECADO
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

//***ESTE PLUGIN AYUDA A MANTENER LOS RECURSOS ESTATICOS ORDENADOS 
//***COMO EL PROYECTO INICIAL 
const CopyPlugin = require("copy-webpack-plugin"); 


//***MINIFICA LOS ARCHIVOS. 
const MinifyPlugin = require("babel-minify-webpack-plugin");


module.exports = {
	output: {
//*** RESETEA EL NOMBRE DEL ARCHIVO MAIN PRINCIPAL.
		filename: 'main.[contenthash].js',
		assetModuleFilename: 'assets/[name][ext]',
		clean: true,
	},
	//DEVELOPMENT = tiene comentarios y espacios
	//PRODUCTION = NO tiene comentarios y espacios
	mode: 'production',
	//INSTANCIACION A EL PLUGIN CSS MINIFIER
	optimization: {
	    minimizer: [
	      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
	      // `...`,
	      new CssMinimizerPlugin(),
	    ],
	  },
	//AQUI DEFINIMOS COMO DEBE DE USARSE ALGUN MODULO EXISTENTE
	module: {
		
		rules: [

//***DEFINICION DE REGLAS PARA BABEL
			{
		        test: /\.m?js$/,
		        exclude: /node_modules/,
		        use: {
		          loader: "babel-loader",
		          options: {
		            presets: ['@babel/preset-env']
		          } 
		        }
		    },
			{
				test: /\.css$/,

//***NOMBRE DEL ARCHIVO DE ESTILOS GLOBAL QUE SERA EXCLUIDO
//***SINO SE HACE ESTO PODRIA PRODUCIR ERRORES 
				exclude: /style\.css$/,

				use:[
					'style-loader',
					'css-loader'
				]
			},
//***REGLAS PARA EL ESTILO GLOBALE
			{
				test: /style\.css$/,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader'
				]	
			},
			{
				test: /\.html$/i,
				use: [{
					loader: 'html-loader',
					options:{
						//HACE QUE LAS LINEAS DEL DOCUMENTO html SE VEAN DE UNA SOLA LINEA
						minimize: false
					},
				}]
			},
//*** PROVOCA UN ERROR AL DUPLICAR LAS IMAGENES.

/*
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
						loader: 'file-loader',
						options: {
							esModule: false
						}
					}]
			}
*/
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: 'asset/resource',
			}

		]
	},
	plugins: [
		
//***CREA UNA CARPETA DONDE ESTARAN LOS RECURSOS DEL PROUECTO EN LA CARPETA dist
		new CopyPlugin({
			patterns: [
					{ from: 'src/assets', to: 'assets/'},
				],
		}),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
//***NOMBRE DEL ARCHIVO DE ESTILOS GLOBAL QUE SERA EXCLUIDO
		new MiniCssExtractPlugin({

//***EN CASO DE PONER [name].[contentHash].css EL NOMBRE DEL ARCHIVO
//***DE ESTILOS GLOBALES ESTARA CON UN NUMERO HASH
//***PREVIENE QUE LOS ARCHIVOS SE GUARDEN EN EL CACHE 
			//filename: '[name].[contenthash].css',

//***FORMA NORMAL CUANDO AUN ESTEMOS EN PRODUCTICION 
			
			filename: '[name].[contenthash].css',

//***EVITA QUE SE NOS MUESTREN warnings
			ignoreOrder: false
		}),

//***ESTE PLUGIN PUEDE SEGUIR SIN PARAMETROS.
		new MinifyPlugin(),
	
	] 


}