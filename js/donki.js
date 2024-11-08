const NASA_API_KEY = 'AiLWgufhIp0226s0IrUtEkQxhyVKUMdUkhGkRWec';
let donkiEvents = [];
let currentIndex = 0;
let eventTypeGlobal='';

function validarDatas(startDate, endDate) {
  const inicio = new Date(startDate);
  const fim = new Date(endDate);
  
  if (inicio > fim) {
    alert("A data de início não pode ser posterior à data de fim.");
    return false;
  }
  return true;
}

function carregarEventosDONKI() {
  const eventType = document.getElementById('event-type').value;
  const startDate = document.getElementById('start-date').value || '2023-01-01';
  const endDate = document.getElementById('end-date').value || '2023-12-31';

  if (!validarDatas(startDate, endDate)) {
    return;
  }
  
  eventTypeGlobal=eventType;

  const url = `https://api.nasa.gov/DONKI/${eventType}?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;

  const eventsContainer = document.getElementById('donki-events-container');
  eventsContainer.innerHTML = '<p>Carregando eventos espaciais...</p>';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      donkiEvents = data;
      currentIndex = 0;
      eventsContainer.innerHTML = '';

      if (donkiEvents.length === 0) {
        eventsContainer.innerHTML = '<p>Nenhum evento encontrado para as datas selecionadas.</p>';
        document.getElementById('show-more-button').style.display = 'none';
        return;
      }

      mostrarMaisEventos();
      document.getElementById('show-more-button').style.display = donkiEvents.length > 5 ? 'block' : 'none';
    })
    .catch(error => {
      console.error('Erro ao carregar eventos DONKI:', error);
      eventsContainer.innerHTML = '<p>Erro ao carregar dados dos eventos.</p>';
    });
}

function mostrarMaisEventos() {
  const eventsContainer = document.getElementById('donki-events-container');
  const eventsToShow = donkiEvents.slice(currentIndex, currentIndex + 5);

  eventsToShow.forEach(event => {
    let eventHTML = `<div class="donki-event"><h3>Evento: ${event.activityID || event.flrID || 'Sem ID'}</h3>`;

    if (eventTypeGlobal === 'CME') {
      eventHTML += `
        <p>Data de Início: ${event.startTime || 'N/A'}</p>
        <p>Velocidade: ${event.cmeAnalyses ? event.cmeAnalyses[0].speed + ' km/s' : 'N/A'}</p>
        <p>Direção: ${event.cmeAnalyses ? event.cmeAnalyses[0].latitude + '°, ' + event.cmeAnalyses[0].longitude + '°' : 'N/A'}</p>
      `;
    } else if (eventTypeGlobal === 'FLR') {
      eventHTML += `
        <p>Data de Pico: ${event.peakTime || 'N/A'}</p>
        <p>Classe: ${event.classType || 'N/A'}</p>
        <p>Região Ativa: ${event.sourceLocation || 'N/A'}</p>
      `;
    } else if (eventTypeGlobal === 'IPS') {
      eventHTML +=`
        <p>Data: ${event.eventTime || 'N/A'}</p>
        <p>Catálogo: ${event.catalog || 'N/A'}</p>
        <p>Local: ${event.location || 'N/A'}</p>
      `;
    }

    eventHTML += `</div>`;
    eventsContainer.innerHTML += eventHTML;
  });

  currentIndex += 5;
  

  document.getElementById('show-more-button').style.display = currentIndex < donkiEvents.length ? 'block' : 'none';
}