const { getAllMovies, getMovieById, storeMovie, seEncuentraLaPelicula, updateMovie, deleteMovie } = require("../services/movies.services");
const createError = require('http-errors');
const paginate = require("express-paginate")
module.exports = {
    index: async (req, res) => {
        try{
            const {count, movies} = await getAllMovies(req.query.limit,req.skip);
            const pagesCount = Math.ceil(count/ req.query.limit);
            const currentPage = req.query.page;
            const pages = paginate.getArrayPages(req)(pagesCount,pagesCount,currentPage);
            return res.status(200).json({
                ok:true,
                meta : {
                    pagesCount,
                    currentPage,
                    pages
                },
                data:movies
            })
        }catch(error){
            return res.status(error.status || 500).json({
                ok:false,
                status: error.status || 500,
                error: error.message || 'Error al indexar movies'
            })
        }
        
    },
    show: async (req, res) => {
        try{
            const movie = await getMovieById(req.params.id);
            return res.status(200).json({
                ok:true,
                data:movie
            })
        }catch(error){
            return res.status(error.status || 500).json({
                ok:false,
                status: error.status || 500,
                error: error.message || 'Error al indexar movies'
            })
        }
    },
    store: async (req,res) =>{
        try{
            
            const {title,rating,release_date,awards,length,genre_id,actors} = req.body

            if([title,rating,release_date,awards].includes(''||undefined)){
                throw createError(400,'Todos los campos son obligatorios')
            }

            if(await seEncuentraLaPelicula(title)){
                throw createError(400,'Ya se encuentra la pelicula')
            }

            const movie = await storeMovie(req.body,actors);

            return res.status(200).json({
                ok:true,
                data:movie
            })
            

        }catch(error){
            return res.status(error.status || 500).json({
                ok:false,
                status: error.status || 500,
                error: error.message || 'Error, lo siento!'
            })
        }
    },
    update: async (req,res) =>{
        
        try {

            const movieUpdated = await updateMovie(req.params.id, req.body);

            return res.status(200).json({
                ok:true,
                message: 'Película actualizada con exito',
                data:movieUpdated
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                status: error.status || 500,
                error: error.message || 'Error, lo siento!'
            })
        }

    },
    delete: async (req,res)=>{
            try {
                
                await deleteMovie(req.params.id);
                
                return res.status(200).json({
                    ok:true,
                    message: 'Película eliminada',
                })
                
            } catch (error) {
                return res.status(error.status || 500).json({
                    ok:false,
                    status: error.status || 500,
                    error: error.message || 'Error, lo siento!'
                })
            }
    }

}