const loader = document.querySelector(".loader")

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
        .finally(() => {
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
        .finally(() => {
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
    await axios.delete(url + `/${id}`)
        .then((res) => {
            response = res;
        }).catch((err) => {
            error = err;
        })
        .finally(() => {
            loader.classList.add("d-none")
        });
    return {
        response: response,
        error: error,
    };


}



export async function postMovie(url, newMovie) {
    let response = null;
    await axios.post(url , newMovie)
        .then((res) => {
            response = res;
        });
    return response;
}



export async function putMovieByID(url, id, updatedMovie) {
    let response = null;
    let error = null;
    await axios.put(url + `/${id}`, updatedMovie)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            error = err;
        });
    return {
        response: response,
        error: error,
    };
}


export async function patchMovieByID(url, id, updatedMovie) {
    const response = null;
    let error = null;
    await axios.patch(url + `/${id}`, updatedMovie)
        .then((res) => (response = res))
        .catch((err) => {
            error = err;
        });
    return {
        response: response,
        error: error,
    };
}
