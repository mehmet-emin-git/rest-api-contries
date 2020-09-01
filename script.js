const allCountries = document.getElementById('countries');
const toggleButton = document.getElementById('toggle');
const filterDropDown = document.getElementById('filter');
const filterRegion = filterDropDown.querySelectorAll('li');
const search = document.getElementById('search');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close');

getCountries();

async function getCountries() {
	const res = await fetch('https://restcountries.eu/rest/v2/all');
	const countries = await res.json();

	displayCountries(countries);
}

function displayCountries(countries) {
	allCountries.innerHTML = '';

	countries.forEach(country => {
		const countryEl = document.createElement('div');
		countryEl.classList.add('card');

		countryEl.innerHTML = `
            <div class="img-wrapper">
                <img src="${country.flag}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <small>Population:</small>
                    ${country.population}
                </p>
                <p class="country-region">
                    <small>Region:</small>
                    ${country.region}
                </p>
                <p>
                    <small>Capital:</small>
                    ${country.capital}
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
	const modalBody = modal.querySelector('.modal-body');
	const modalImg = modal.querySelector('img');

	modalImg.src = country.flag;

	modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p><strong>Native Name:</strong>${country.nativeName}</p>
        <p><strong>Population:</strong>${country.population}</p>
        <p><strong>Region:</strong>${country.region}</p>
        <p><strong>Sub Region:</strong>${country.subregion}</p>
        <p><strong>Capital:</strong>${country.capital}</p>
        <p><strong>Top Level Domain:</strong>${country.topLevelDomain[0]}</p>
        <p><strong>Currencies:</strong>${country.currencies.map(currency => currency.code)}</p>
        <p><strong>Languages:</strong>${country.languages.map(language => language.name)}</p>
    `;
}

// toggle theme - dark & light
toggleButton.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});

// show and hide the filters (li tags)
filterDropDown.addEventListener('click', () => {
	filterDropDown.classList.toggle('open');
});

// close the modal
closeButton.addEventListener('click', () => {
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
