import { getAllmovies, deletemoviesByID } from "./main.js"
const cards = document.querySelector('.cards')
const apiurl = "https://6620bbfc3bf790e070b07208.mockapi.io/movies/movies"

const loader = document.querySelector(".loader");

function hideLoader() {
    loader.classList.add("d-none");
}

function showLoader() {
    loader.classList.remove("d-none");
}
function render() {
    getAllmovies(apiurl).then((res) => {
        const moviesarr = res.movies
        moviesarr.forEach(movie => {
            cards.innerHTML += `
    <div class=" col-lg-3 col-md-6 col-sm-12 ">
    <div class="card p-3">
    <h5>${movie.title}</h5>
    <p>${movie.realiseYear}</p>
    <img src="${movie.poster}"></img>
    <p>${movie.trailerUrl}</p>
    <p>${movie.genre}</p>
    <p>${movie.description}</p>
    <p>${movie.ageRestriction}</p>
    <p>${movie.country}</p>
    <p>${movie.director}</p>
    <button class="btn detbtn" data-id=${movie.id} >del</button>
    </div></div>
    `
            let delBtns = document.querySelectorAll(".detbtn")
            delBtns.forEach((delbtn) => {
                delbtn.addEventListener('click', (e) => {
                    e.preventDefault()
                    deletemoviesByID(apiurl, e.target.dataset.id).then((response) => {
                        cards.textContent = ""
                        render();
                    })

                })
            })
        })

    })
}

render()