const loader= document.querySelector(".loader")
export async function getAllmovies(url) {
    let movies = null;
    let error = null;
    await axios
        .get(url)
        .then((result) => {
            movies = result.data;
        })
        .catch((err) => {
            error = err;
        })
        .finally(()=>{
            loader.classList.add("d-none")
            });
    return {
        movies: movies,
        error: error,
    };
}

export async function getmovieByID(url, id) {
    let movie = null;
    let error = null;
    await axios
        .get(url + `/${id}`)
        .then((result) => {
            movie = result.data;
        })
        .catch((err) => {
            error = err;
        })
        .finally(()=>{
            loader.classList.add("d-none")
            });
    return {
        movies: movie,
        error: error,
    };
}

export async function deletemoviesByID(url, id) {
    let response = null;
    let error = null;
    await axios.delete(url + `/${id}`).then((res) => {
        response = res;
    }).catch((err) => {
        error = err;
    })
    .finally(()=>{
        loader.classList.add("d-none")
        });
    return {
        response: response,
        error: error,
    };


}