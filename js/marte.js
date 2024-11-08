const NASA_API_KEY = 'AiLWgufhIp0226s0IrUtEkQxhyVKUMdUkhGkRWec';
let fotosDeMarte = [];
let currentIndex = 0;

function carregarFotosDeMarte() {
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      fotosDeMarte = data.photos;
      indiceAtual = 0;
      document.getElementById('mars-photo-container').innerHTML = '';
      mostrarMaisFotosDeMarte();
    })
    .catch(error => console.error('Erro ao carregar fotos de Marte:', error));
}

function mostrarMaisFotosDeMarte() {
  const photoContainer = document.getElementById('mars-photo-container');
  const showMoreButton = document.getElementById('show-more-button');
  const fotosToShow = fotosDeMarte.slice(currentIndex, currentIndex + 5);

  fotosToShow.forEach(photo => {
    const photoHTML = `
      <div class="mars-photo">
        <img src="${photo.img_src}" alt="Foto de Marte tirada pelo rover ${photo.rover.name}">
        <p>Data da Foto: ${photo.earth_date}<br>
        Rover: ${photo.rover.name} <br> Câmera: ${photo.camera.full_name}</p>
      </div>
    `;
    photoContainer.innerHTML+=photoHTML;
  });

  currentIndex += 5;
  
  if (currentIndex >= fotosDeMarte.length) {
    showMoreButton.style.display = 'none';
  } else {
    showMoreButton.style.display = 'block';
  }
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
          <p>Temperatura Máxima: ${clima.AT?.mx || 'N/A'} °C<br>
          Temperatura Mínima: ${clima.AT?.mn || 'N/A'} °C<br>
          Pressão: ${clima.PRE?.av || 'N/A'} Pa'<br>
          Velocidade do Vento: ${clima.HWS?.av || 'N/A'} m/s</p>
        </div>
      `;
    })
    .catch(error => console.error('Erro ao carregar dados de clima de Marte:', error));
}

carregarFotosDeMarte();
carregarClimaDeMarte();
