
const detailCard = document.querySelector('.detail-card');
import { getmovieByID } from "./main.js";


const detailID = new URLSearchParams(window.location.search).get('id')
const url = "https://6620bbfc3bf790e070b07208.mockapi.io/movies/movies"

getmovieByID(url, detailID).then((res) => {
    const idarr = res.movies
    detailCard.classList.replace('d-none', 'd-block')
    detailCard.innerHTML = `
    <div class="card p-5">
    <h5>${idarr.title}</h5>
    <p>${idarr.realiseYear}</p>
    <img src="${idarr.poster}"></img>
    <p>${idarr.trailerUrl}</p>
    <p>${idarr.genre}</p>
    <p>${idarr.description}</p>
    <p>${idarr.ageRestriction}</p>
    <p>${idarr.country}</p>
    <p>${idarr.director}</p>
    <a href="index.html" class="btn detailbtn" data-id=${idarr.id} >go-back</a>
    </div>

`
})

