// Require de Express
const express = require('express');

// Require de FS
const fs = require('fs');

// Ejecución de Express
const app = express();

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

// Ruta Raíz / ➝ Home
app.get('/', function(req, res){
	res.send('Ni Superman, Iron Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!')
} );

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req,res) => {
	res.send(heroes);
});

// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/detalle/:id', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = heroes.filter(heroe => {
		return heroe.id == req.params.id;}) //Filtramos el array
	
// Si se encuentra al héroe se envía el nombre y su profesión
// Si NO se encuentra se envía el mensaje de no encontrado
	if(heroe[0] == undefined){
		res.send('Heroe no encontrado')
	}else{
		res.send(`Hola, mi nombre es ${heroe[0].nombre} y soy ${heroe[0].profesion}`)
	}
	
});

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get('/heroes/bio/:id/ok?', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = heroes.filter(heroe => {
		return heroe.id == req.params.id;}) ;

	// Si NO se encuentra al héroe se envía un mensaje
	// Si se encuentra al héroe:
		// Se pregunta si vino el parámetro Y el valor esperado y se envía la información
		// Si nó vino el parámetro se envía el mensaje de error
		if(heroe[0] == undefined){
			res.send('No encontramos un héroe para mostrarte su biografía')
		}else if(req.params.ok){
			res.send(`
			Héroe: ${heroe[0].nombre}\n
			 || Reseña: ${heroe[0].resenia}`)
		}else{
			res.send(`${heroe[0].nombre} dice: Lamento que no quieras saber más de mí :(`)
		}
	}
);

// Ruta Créditos
// 
app.get('/creditos', (req,res)=>
	res.send ('Autor: Sofía Vázquez'))

// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});