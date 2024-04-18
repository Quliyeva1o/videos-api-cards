import { getAllmovies, deletemoviesByID, getmovieByID, putMovieByID } from "./main.js";

const cards = document.querySelector('.cards');
const apiurl = "https://6620bbfc3bf790e070b07208.mockapi.io/movies/movies";
const loader = document.querySelector(".loader");
const editModal = document.getElementById('editModal');
const saveChangesBtn = document.getElementById('saveChangesBtn');
const searchBtn = document.querySelector("#searchBtn")
const searchinp = document.getElementById("searchInput")
const sortSelect = document.getElementById("sortSelect")

function hideLoader() {
    loader.classList.add("d-none");
}

function showLoader() {
    loader.classList.remove("d-none");
}

function render() {
    showLoader();
    getAllmovies(apiurl)
        .then((res) => {
            let moviesarr = res.movies;
            renderMovies(moviesarr);
            search(moviesarr);
            sort(moviesarr);
        })
        .finally(() => {
            hideLoader();
        });
}

function search(moviesarr) {
    searchBtn.addEventListener('click', (e) => {
        const filteredMovies = moviesarr.filter(movie =>
            movie.title.toLowerCase().includes(searchinp.value.toLowerCase())
        );
        renderMovies(filteredMovies);
    });
}

function sort(moviesarr) {
    let newSortArr = [...moviesarr]
    sortSelect.addEventListener('change', (e) => {
        e.preventDefault()
        if (sortSelect.value == 'a-z') {
            newSortArr = newSortArr.sort((x, y) => x.title.localeCompare(y.title));
            renderMovies(newSortArr);
        }
        else if (sortSelect.value == 'z-a') {
            newSortArr = newSortArr.sort((x, y) => y.title.localeCompare(x.title));
            renderMovies(newSortArr);
        }

    })
}




function renderMovies(moviesarr) {
    cards.innerHTML = "";
    moviesarr.forEach(movie => {
        const card = createMovieCard(movie);
        cards.appendChild(card);
    });
}

function createMovieCard(movie) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-lg-3', 'col-md-6', 'col-sm-12');
    cardDiv.innerHTML = `
        <div class="card p-3">
            <h5>Title: ${movie.title}</h5>
            <p>Release Year: ${movie.realiseYear}</p>
            <img src="${movie.poster}" alt="Movie Poster">
            <p>Trailer Url: ${movie.trailerUrl}</p>
            <p>Genre: ${movie.genre}</p>
            <p>${movie.description}</p>
            <p class="text-danger">${movie.ageRestriction}+</p>
            <p>Country: ${movie.country}</p>
            <p>Director: ${movie.director}</p>
            <button class="btn btn-success editbtn mb-2" data-id="${movie.id}">Edit</button>
            <button class="btn delbtn mb-2" data-id="${movie.id}">Delete</button>
            <a href="detail.html?id=${movie.id}" class="btn detailbtn" data-id="${movie.id}">Detail</a>
        </div>`;
    const delBtn = cardDiv.querySelector(".delbtn");
    const editBtn = cardDiv.querySelector(".editbtn");
    delBtn.addEventListener('click', () => deleteMovie(movie.id));
    editBtn.addEventListener('click', () => openEditModal(movie.id));
    return cardDiv;
}

function deleteMovie(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deletemoviesByID(apiurl, id).then(() => {
                render();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            });
        }
    });
}

function openEditModal(id) {
    renderEditModal(id);
    editModal.style.display = 'block';
}

function closeModal() {
    editModal.style.display = 'none';
}

function saveChanges() {
    const movieId = document.getElementById('editMovieId').value;
    const editedMovie = {
        title: document.getElementById('editTitle').value,
        realiseYear: document.getElementById('editRealiseYear').value,
        poster: document.getElementById('editPoster').value,
        trailerUrl: document.getElementById('editTrailerUrl').value,
        genre: document.getElementById('editGenre').value,
        description: document.getElementById('editDescription').value,
        ageRestriction: document.getElementById('editAgeRestriction').value,
        country: document.getElementById('editCountry').value,
        director: document.getElementById('editDirector').value
    };
    putMovieByID(apiurl, movieId, editedMovie)
        .then(() => {
            render();
            closeModal();
        });
}

function renderEditModal(id) {
    getmovieByID(apiurl, id)
        .then((res) => {
            const movie = res.movies;
            document.getElementById('editTitle').value = movie.title;
            document.getElementById('editRealiseYear').value = movie.realiseYear;
            document.getElementById('editPoster').value = movie.poster;
            document.getElementById('editTrailerUrl').value = movie.trailerUrl;
            document.getElementById('editGenre').value = movie.genre;
            document.getElementById('editDescription').value = movie.description;
            document.getElementById('editAgeRestriction').value = movie.ageRestriction;
            document.getElementById('editCountry').value = movie.country;
            document.getElementById('editDirector').value = movie.director;
            document.getElementById('editMovieId').value = movie.id;
        });
}

saveChangesBtn.addEventListener('click', saveChanges);

window.onclick = function (event) {
    if (event.target == editModal) {
        closeModal();
    }
};

render();






