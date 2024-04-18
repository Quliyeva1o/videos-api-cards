import { postMovie } from "./main.js";
const apiurl = "https://6620bbfc3bf790e070b07208.mockapi.io/movies/movies";

const addbtn=document.getElementById("addbtn")
addbtn.addEventListener('click', function(event) {
    event.preventDefault();
   let newMovie={
        title: document.getElementById('newTitle').value,
        realiseYear: document.getElementById('newRealiseYear').value,
        poster: document.getElementById('newPoster').value,
        trailerUrl: document.getElementById('newTrailerUrl').value,
        genre: document.getElementById('newGenre').value,
        description: document.getElementById('newDescription').value,
        ageRestriction: document.getElementById('newAgeRestriction').value,
        country: document.getElementById('newCountry').value,
        director: document.getElementById('newDirector').value
    }
    
    
    postMovie(apiurl, newMovie)
        .then(() => {
            window.location.href = "index.html"; 
        })
        .catch(error => {
            console.error('Error adding movie:', error);
        });
});