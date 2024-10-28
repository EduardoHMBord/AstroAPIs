let currentIndex = 0;
let mediaItems = [];

// Função de pesquisa para buscar mídias da NASA
function pesquisarMidia() {
  const termoPesquisa = document.getElementById("search-input").value;
  const mediaType = document.getElementById("media-type-filter").value;
  
  if (!termoPesquisa) {
    alert("Por favor, insira um termo de pesquisa.");
    return;
  }

  let url = `https://images-api.nasa.gov/search?q=${termoPesquisa}`;
  if (mediaType) {
    url += `&media_type=${mediaType}`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      mediaItems = data.collection.items;
      currentIndex = 0;
      document.getElementById("media-results").innerHTML = "";
      mostrarMaisMidia();
    })
    .catch(error => console.error("Erro ao buscar mídia:", error));
}

function mostrarMaisMidia() {
  const mediaResults = document.getElementById("media-results");
  const itemsToShow = mediaItems.slice(currentIndex, currentIndex + 10);

  if (itemsToShow.length === 0) {
    mediaResults.innerHTML += "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  itemsToShow.forEach(item => {
    const mediaType = item.data[0].media_type;
    const title = item.data[0].title;
    const description = item.data[0].description || "Sem descrição disponível.";
    
    let mediaHTML = `<div class="media-item"><h3>${title}</h3><p>${description}</p>`;

    if (mediaType === "image") {
      const imageUrl = item.links[0].href;
      mediaHTML += `<img src="${imageUrl}" alt="${title}" loading="lazy">`;
    } else if (mediaType === "video") {
      const videoUrl = item.href;
      
      fetch(videoUrl)
        .then(response => response.json())
        .then(videoData => {
          const videoLink = videoData.find(link => link.includes(".mp4"));
          if (videoLink) {
            mediaHTML += `<p><a href="${videoLink}" target="_blank">Ver Vídeo</a></p>`;
            mediaResults.innerHTML += mediaHTML + "</div>";
          }
        })
        .catch(error => console.error("Erro ao buscar link de vídeo:", error));
      
      return;
    } else if (mediaType === "audio") {
      const audioUrl = item.href;
      
      fetch(audioUrl)
        .then(response => response.json())
        .then(audioData => {
          const audioLink = audioData.find(link => link.includes(".mp3"));
          if (audioLink) {
            mediaHTML += `<p><a href="${audioLink}" target="_blank">Ouvir Áudio</a></p>`;
            mediaResults.innerHTML += mediaHTML + "</div>";
          }
        })
        .catch(error => console.error("Erro ao buscar link de áudio:", error));
      
      return;
    }

    mediaHTML += "</div>";
    mediaResults.innerHTML += mediaHTML;
  });

  currentIndex += 10;
  
  const showMoreButton = document.getElementById("show-more-button");
  showMoreButton.style.display = currentIndex < mediaItems.length ? "block" : "none";
}
 