// apod.js

const NASA_API_KEY = 'AiLWgufhIp0226s0IrUtEkQxhyVKUMdUkhGkRWec'
const apodContainer = document.getElementById('apod-container');

fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then(response => response.json())
  .then(data => {
    apodContainer.innerHTML = `
      <h3>${data.title}</h3>
      <img src="${data.url}" alt="${data.title}">
      <p>${data.explanation}</p>
    `;
  })
  .catch(error => console.error('Erro ao carregar APOD:', error));


