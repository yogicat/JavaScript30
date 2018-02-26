const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const prom = fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    //  wordToMatch
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.city.match(regex);
  });
}

function displayMatch() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(item => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = item.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = item.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${item.population}</span>
      </li>
  `
  }).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatch);
searchInput.addEventListener('keyup', displayMatch);