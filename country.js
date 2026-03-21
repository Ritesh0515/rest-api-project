const countryName = new URLSearchParams(location.search).get('name')
const flagImg = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const backButton = document.querySelector('.back-btn')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImg.src = country.flags.svg
    flagImg.alt = country.flags.alt
    countryNameH1.innerText = country.name.common
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      nativeName.innerText = country.name.common
    }
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    subRegion.innerText = country.subregion
    if (country.capital) {
      capital.innerText = country.capital.join(', ')
    } else {
      capital.innerText = 'No Capital'
    }
    topLevelDomain.innerHTML = country.tld.join(', ')
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    } else {
      currencies.innerText = 'undefined'
    }
    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(', ')
    } else {
      languages.innerText = 'N/A'
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountryData]) => {
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountryData.name.common
            borderCountryTag.href = `country.html?name=${borderCountryData.name.common}`
            borderCountries.append(borderCountryTag)
          })
      })
    } else {
      const na = document.createElement('span')
      na.innerText = 'N/A'
      borderCountries.append(na)
    }
  })
