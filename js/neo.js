const NASA_API_KEY = 'AiLWgufhIp0226s0IrUtEkQxhyVKUMdUkhGkRWec';
const neoContainer = document.getElementById('neo-container');

fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`)
  .then(response => response.json())
  .then(data => {
    neoContainer.innerHTML = data.near_earth_objects.map(neo => `
      <div class="neo-item">
        <h3>${neo.name}</h3>
        <p>Magnitude: ${neo.absolute_magnitude_h}</p>
        <p>Diâmetro estimado: ${neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
        <p>Perigoso: ${neo.is_potentially_hazardous_asteroid ? 'Sim' : 'Não'}</p>
      </div>
    `).join('');
  })
  .catch(error => console.error('Erro ao carregar NEOs:', error));


