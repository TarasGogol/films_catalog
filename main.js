//Налаштування
const apiKey = "4fa85a04-56af-4127-ad30-1999f8a33e00"
const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
}

//DOM елементи
const filmsWrapper = document.querySelector(".films");
const loader = document.querySelector(".loader-wrapper");
const btnLoadMore = document.querySelector(".show-more");


// Отримання і вивід топ 250 фільмів
async function fetchAndRenderFilms(){
	//Show preloader
	loader.classList.remove('none')

	//Fetch films data
	const data = await fetchData(url + 'top', options);
	console.log(data);

	// Перевірка на додаткові сторінки і відображення кнопки
	if(data.pagesCount > 1){
		//Show button
		btnLoadMore.classList.remove('none');
	}

	// Hide preloader
	loader.classList.add('none')

	//Render films on page
	renderFilms(data.films);
}

async function fetchData(url, options){
	const response = await fetch(url, options);
	const data = await response.json()
	return data;
}

function renderFilms(films){
	for(film of films){
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