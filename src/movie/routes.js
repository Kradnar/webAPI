const { Router } = require("express");
const movieRouter = Router();
const { } = require("../middleware");
const { createMovie, getAllMovies, readMovie, updateMovie, deleteMovie } = require("./controllers");

movieRouter.post("/movie", createMovie);      //? creates a movie, hashes password
movieRouter.get("/movie", getAllMovies);      //? displays list of current movies names
movieRouter.patch("/movie", updateMovie);     //? Updates a movie
movieRouter.delete("/movie", deleteMovie);    //? Delete's a movie specified by moviename


module.exports = movieRouter;