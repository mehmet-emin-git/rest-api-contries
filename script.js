const allCountries = document.getElementById('countries');
const toggleButton = document.getElementById('toggle');
const filterDropDown = document.getElementById('filter');
const filterRegion = filterDropDown.querySelectorAll('li');
const search = document.getElementById('search');
const modal = document.getElementById('modal');
const backBtn = document.getElementById('back');

getCountries();

async function getCountries() {
	const res = await fetch('https://restcountries.eu/rest/v2/all');
	const countries = await res.json();

	displayCountries(countries);
}

function truncateString(str, num) {
	return str.length > num ? str.slice(0, num) + "..." : str;
}

function displayCountries(countries) {
	allCountries.innerHTML = '';

	countries.forEach(country => {
		const countryEl = document.createElement('div');
		countryEl.classList.add('card');

		countryEl.innerHTML = `
            <div class="img-wrapper">
                <img src="${country.flag}" alt="${country.name}" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${truncateString(country.name, 18)}</h3>
                <p>
                    <small>Population: </small>
                    ${country.population}
                </p>
                <p class="country-region">
                    <small>Region: </small>
                    ${country.region}
                </p>
                <p>
                    <small>Capital:</small>
                    ${truncateString((country.capital),15)}
                </p>
            </div>
        `;

		countryEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			showCountryDetails(country);
		});

		allCountries.appendChild(countryEl);
	});
}



function showCountryDetails(country) {
	const wrapperBody = modal.querySelector('.wrapper-body');
	const modalImg = modal.querySelector('img');

	modalImg.src = country.flag;

	wrapperBody.innerHTML = `
		<div>
			<h2>${truncateString(country.name, 20)}</h2>
			<p><span>Native Name: </span>${country.nativeName}</p>
			<p><span>Population: </span>${country.population}</p>
			<p><span>Region: </span>${country.region}</p>
			<p><span>Sub Region: </span>${country.subregion}</p>
			<p><span>Capital: </span>${country.capital}</p>
		</div>

		<div>		
			<p><span>Top Level Domain: </span>${country.topLevelDomain[0]}</p>
			<p><span>Currencies: </span>${country.currencies.map(currency => currency.code)}</p>
			<p><span>Languages: </span>${country.languages.map(language => language.name)}</p>
		</div>
    `;
}

// "borders": [
// 	"IRN",
// 	"PAK",
// 	"TKM",
// 	"UZB",
// 	"TJK",
// 	"CHN"
// 	],

// toggle theme - dark & light
toggleButton.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});

// show and hide the filters (li tags)
filterDropDown.addEventListener('click', () => {
	filterDropDown.classList.toggle('open');
});

// close the modal
backBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

search.addEventListener('input', e => {
	const { value } = e.target;
	const countryName = document.querySelectorAll('.country-name');

	countryName.forEach(name => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			// .card -> .card-body -> .country-name
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});

// add a filter on the li's inside the .dropdown
filterRegion.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;
		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(value) || value === 'All') {
				// .card -> .card-body -> .country-region
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});
