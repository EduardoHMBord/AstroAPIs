const NASA_API_KEY = 'AiLWgufhIp0226s0IrUtEkQxhyVKUMdUkhGkRWec'

function carregarFotosDeMarte() {
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const photoContainer = document.getElementById('mars-photo-container');
      photoContainer.innerHTML = data.photos.slice(0, 5).map(photo => `
        <div class="mars-photo">
          <img src="${photo.img_src}" alt="Foto de Marte tirada pelo rover ${photo.rover.name}">
          <p>Data da Foto: ${photo.earth_date}</p>
          <p>Rover: ${photo.rover.name} | Câmera: ${photo.camera.full_name}</p>
        </div>
      `).join('');
    })
    .catch(error => console.error('Erro ao carregar fotos de Marte:', error));
}

function carregarClimaDeMarte() {
  fetch(`https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`)
    .then(response => response.json())
    .then(data => {
      const weatherContainer = document.getElementById('mars-weather-container');
      const sol = Object.keys(data).find(key => key !== 'sol_keys' && key !== 'validity_checks');
      const clima = data[sol];

      weatherContainer.innerHTML = `
        <div class="mars-weather">
          <h3>Sol: ${sol}</h3>
          <p>Temperatura Máxima: ${clima.AT?.mx || 'N/A'} °C</p>
          <p>Temperatura Mínima: ${clima.AT?.mn || 'N/A'} °C</p>
          <p>Pressão: ${clima.PRE?.av || 'N/A'} Pa</p>
          <p>Velocidade do Vento: ${clima.HWS?.av || 'N/A'} m/s</p>
        </div>
      `;
    })
    .catch(error => console.error('Erro ao carregar dados de clima de Marte:', error));
}

carregarFotosDeMarte();
carregarClimaDeMarte();
