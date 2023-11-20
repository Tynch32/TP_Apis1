const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

/*
const indexRouter = require('./routes/index');
const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);*/

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

app.use('/api/v1/movies',require('./routes/v1/movies.routes'));
app.use('/api/v1/genres',require('./routes/v1/genres.routes'));
//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
