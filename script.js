const countriesContainer = document.querySelector('.countries-container')
const filterRegion = document.querySelector('#region-filter')

fetch(
  'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,subregion,languages,currencies,borders,cca3',
)
  .then((res) => res.json())
  .then(renderCountries)

filterRegion.addEventListener('change', (e) => {
  console.log(e.target.value)
  fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
  countriesContainer.innerHTML = ''

  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `./country.html?name=${country.name.common}`

    countryCard.innerHTML = `
            <img src=${country.flags.svg} alt=${country.flags.alt}>
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
`

    countriesContainer.append(countryCard)
  })
}
