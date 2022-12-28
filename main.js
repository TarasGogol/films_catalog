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

let page = 1;

//DOM елементи
const filmsWrapper = document.querySelector(".films");
const loader = document.querySelector(".loader-wrapper");
const btnShowMore = document.querySelector(".show-more");



// Отримання і вивід топ 250 фільмів
async function fetchAndRenderFilms(){
	//Show preloader
	loader.classList.remove('none')

	//Fetch films data
	const data = await fetchData(url + `top?page=${page}`, options);
	if (data.pagesCount > 1) page++

	// Перевірка на додаткові сторінки і відображення кнопки
	if(data.pagesCount > 1){
		//Show button
		btnShowMore.classList.remove('none');
	}

	// Hide preloader
	loader.classList.add('none')

	//Render films on page
	renderFilms(data.films);

	//Hide btn if show last pages
	if(page > data.pagesCount) btnShowMore.classList.add('none');
}

async function fetchData(url, options){
	const response = await fetch(url, options);
	const data = await response.json()
	return data;
}

function renderFilms(films){
	for(film of films){
		const card = document.createElement('div');
		card.classList.add('card');
		card.id = film.filmId;
		
		card.onclick = openFilmDetails;

		const html = `
		<img src=${film.posterUrl} class="card__img">
		<h3 class="card__title">${film.nameEn}</h3>
		<p class="card__year">${film.year}</p>
		<p class="card__rate">rating ${film.rating}</p>`;

	card.insertAdjacentHTML('afterbegin', html)

	filmsWrapper.insertAdjacentElement('beforeend', card);
	}
}

async function openFilmDetails(e){
	// Id movie
	const id = e.currentTarget.id

	// get data movies
	const data = await fetchData(url + id, options)
	console.log(data);

	renderFilmsData(data);
}

function renderFilmsData(film){
	console.log("render");

	// 0. Перевірка на відкритий фільм і його видалення
	if(document.querySelector('.container-right'))document.querySelector('.container-right').remove();


	// 1. Render container-right
	const containerRight = document.createElement('div')
	containerRight.classList.add('container-right');
	document.body.insertAdjacentElement('beforeend', containerRight)


	// 2. btn close
	const btnClose = document.createElement('button');
	btnClose.classList.add('btn-close');
	btnClose.innerHTML = '<img src="./img/cancel.svg" alt="">';
	containerRight.insertAdjacentElement('afterbegin', btnClose);

	// 2.1 btn close on click - delete container

	btnClose.onclick = () => {
		containerRight.remove();
	}

	// 3. Details movie
	const html = `<div class="film">
	<div class="film__title">${film.nameOriginal}</div>
	<div class="film__img">
		<img src="${film.posterUrl}" alt="${film.posterUrl}">
	</div>
	<div class="film__desk">
		<p class="film__details">Year: ${film.year}</p>
		<p class="film__details">Rate: ${film.ratingKinopoisk}</p>
		<p class="film__details">Continuity: ${formatFilmLength(film.filmLength)}</p>
		<p class="film__details">Country: ${formatCountry(film.countries)}</p>
		<p class="film__text">${film.description}</p>
		</div>
	</div>`
	containerRight.insertAdjacentHTML('beforeend',html)
}

function formatFilmLength(value){
	let length = '';
	const hours = Math.floor(value/60);
	const minutes = value % 60;

	if(hours > 0) length += hours + 'г. ';
	if(minutes > 0) length += minutes + 'хв.'
	
	return length;
}

function formatCountry(data){
	let countries = '';

	for(country of data){
		countries += country.country;
		if(data.indexOf(country) + 1 < data.length) countries += ', '
	}
	return countries;
}

fetchAndRenderFilms().catch((err) => console.log(err))