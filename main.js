const apiKey = "4fa85a04-56af-4127-ad30-1999f8a33e00"

const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
}


// fetch(url + 'top', options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))

const filmsWrapper = document.querySelector(".films");

async function fetchAndRenderFilms(){
	const response = await fetch(url + 'top', options);
	const data = await response.json()
	console.log(data);

	for(film of data.films){
		console.log(film);

		const html = `<div class="card">
		<img src=${film.posterUrl} class="card__img">
		<h3 class="card__title">${film.nameEn}</h3>
		<p class="card__year">${film.year}</p>
		<p class="card__rate">rating ${film.rating}</p>
	</div>`;

	filmsWrapper.insertAdjacentHTML('beforeend', html);
	}
}
fetchAndRenderFilms().catch((err) => console.log(err))