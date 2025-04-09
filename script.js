// Selecciona los contenedores principales
const charactersContainer = document.getElementById('characters');
const planetsContainer = document.getElementById('planets');

// Verifica que los elementos existan
if (!charactersContainer || !planetsContainer) {
  console.error('Error: No se encontraron los contenedores principales');
}

// Loader para mostrar durante las peticiones
const loader = `<div class="flex justify-center items-center h-32">
  <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
</div>`;

// Función genérica para obtener todos los registros de una API paginada
async function fetchAll(url) {
    let results = [];
    let nextUrl = url;
    
    while (nextUrl) {
      try {
        console.log("Fetching:", nextUrl);
        const response = await fetch(nextUrl);
        const data = await response.json();
        console.log("Respuesta:", data);
        
        // Se acumulan los items (si existen)
        if (data.items) {
          results = results.concat(data.items);
        } else if (Array.isArray(data)) {
          results = results.concat(data);
        }
        
        // Se actualiza la URL de la siguiente página (si existe)
        nextUrl = (data.links && data.links.next) ? data.links.next : null;
      } catch (error) {
        console.error("Error en la paginación:", error);
        nextUrl = null;
      }
    }
    
    return results;
}

// Funciones para obtener todos los personajes y planetas
async function fetchCharacters() {
    charactersContainer.innerHTML = loader; // Mostrar loader antes de fetch
    try {
        const url = 'https://dragonball-api.com/api/characters'; // Nota: Hay un typo en "characters"
        const characters = await fetchAll(url);
        displayCharacters(characters);
    } catch (error) {
        console.error("Error fetching characters:", error);
        charactersContainer.innerHTML = `<p class="text-red-500 text-center py-8">Error al cargar los personajes</p>`;
    }
}

async function fetchPlanets() {
    planetsContainer.innerHTML = loader; // Mostrar loader antes de fetch
    try {
        const url = 'https://dragonball-api.com/api/planets'; // Nota: Hay un typo en "planets"
        const planets = await fetchAll(url);
        displayPlanets(planets);
    } catch (error) {
        console.error("Error fetching planets:", error);
        planetsContainer.innerHTML = `<p class="text-red-500 text-center py-8">Error al cargar los planetas</p>`;
    }
}

// Funciones para renderizar en pantalla
function displayCharacters(characters) {
  // Verifica nuevamente que el contenedor existe
  if (!charactersContainer) {
      console.error('Error: El contenedor de personajes no existe');
      return;
  }
  
  charactersContainer.innerHTML = ''; // Limpiar el contenedor
  
  if (!characters || characters.length === 0) {
      charactersContainer.innerHTML = '<p class="text-center py-8">No se encontraron personajes</p>';
      return;
  }
  
  characters.forEach(character => {
      const card = createCharacterCard(character);
      charactersContainer.appendChild(card);
  });
}

function displayPlanets(planets) {
    planetsContainer.innerHTML = ''; // Limpiar el contenedor
    
    if (!planets || planets.length === 0) {
        planetsContainer.innerHTML = '<p class="text-center py-8">No se encontraron planetas</p>';
        return;
    }
    
    planets.forEach(planet => {
        const card = createPlanetCard(planet);
        planetsContainer.appendChild(card);
    });
}

function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300';
    
    const image = document.createElement('img');
    image.className = 'w-full h-48 object-cover';
    image.src = character.image || 'placeholder.jpg';
    image.alt = character.name;
    image.onerror = () => { image.src = 'placeholder.jpg'; }; // Fallback para imágenes rotas
    
    const cardBody = document.createElement('div');
    cardBody.className = 'p-4';
    
    const title = document.createElement('h2');
    title.className = 'text-xl font-bold mb-2 text-gray-800';
    title.textContent = character.name;
    
    const details = document.createElement('div');
    details.className = 'space-y-1';
    
    const race = document.createElement('p');
    race.className = 'text-gray-600';
    race.innerHTML = `<span class="font-semibold">Raza:</span> ${character.race || 'Desconocida'}`;
    
    details.appendChild(race);
    cardBody.appendChild(title);
    cardBody.appendChild(details);
    card.appendChild(image);
    card.appendChild(cardBody);
    
    return card;
}

function createCharacterCard(character) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full';
  
  // Character Image
  const imageContainer = document.createElement('div');
  imageContainer.className = 'relative h-48 overflow-hidden';
  
  const image = document.createElement('img');
  image.className = 'w-full h-full object-cover transition-transform duration-500 hover:scale-110';
  image.src = character.image || 'https://via.placeholder.com/300x400?text=DragonBall';
  image.alt = character.name;
  image.onerror = () => { 
    image.src = 'https://via.placeholder.com/300x400?text=DragonBall';
  };
  
  imageContainer.appendChild(image);
  card.appendChild(imageContainer);

  // Character Info
  const cardBody = document.createElement('div');
  cardBody.className = 'p-4 flex-grow flex flex-col';
  
  // Name with cool DBZ-style gradient text
  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400';
  title.textContent = character.name;
  
  // Details container
  const details = document.createElement('div');
  details.className = 'space-y-2 text-gray-700 flex-grow';
  
  // Race with icon
  const race = document.createElement('p');
  race.className = 'flex items-center';
  race.innerHTML = `
    <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="font-semibold">Raza:</span> ${character.race || 'Desconocida'}
  `;
  
  // Gender with icon
  const gender = document.createElement('p');
  gender.className = 'flex items-center';
  gender.innerHTML = `
    <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    <span class="font-semibold">Género:</span> ${character.gender || 'Desconocido'}
  `;
  
  // Affiliation with icon
  const affiliation = document.createElement('p');
  affiliation.className = 'flex items-center';
  affiliation.innerHTML = `
    <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <span class="font-semibold">Afiliación:</span> ${character.affiliation || 'Desconocida'}
  `;
  
  // Power Level (KI)
  const ki = document.createElement('p');
  ki.className = 'flex items-center';
  ki.innerHTML = `
    <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    <span class="font-semibold">Poder:</span> ${character.ki || 'Desconocido'}
  `;
  
  // Max Power Level
  const maxKi = document.createElement('p');
  maxKi.className = 'flex items-center';
  maxKi.innerHTML = `
    <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
    <span class="font-semibold">Poder Máximo:</span> ${character.maxKi || 'Desconocido'}
  `;
  
  // Description (only show if exists)
  if (character.description) {
    const desc = document.createElement('div');
    desc.className = 'mt-3 pt-3 border-t border-gray-200';
    desc.innerHTML = `
      <p class="text-sm italic text-gray-600">"${character.description}"</p>
    `;
    details.appendChild(desc);
  }
  
  // Append all details
  details.appendChild(race);
  details.appendChild(gender);
  details.appendChild(affiliation);
  details.appendChild(ki);
  details.appendChild(maxKi);
  
  cardBody.appendChild(title);
  cardBody.appendChild(details);
  card.appendChild(cardBody);
  
  return card;
}

// Código de navegación entre vistas
const btnCharacters = document.getElementById('btn-characters');
const btnPlanets = document.getElementById('btn-planets');
const charactersView = document.getElementById('characters-view');
const planetsView = document.getElementById('planets-view');

btnCharacters.addEventListener('click', () => {
    showView('characters');
    fetchCharacters();
});

btnPlanets.addEventListener('click', () => {
    showView('planets');
    fetchPlanets();
});

function showView(view) {
    if (view === 'characters') {
        charactersView.classList.remove('hidden');
        charactersView.classList.add('block');
        planetsView.classList.remove('block');
        planetsView.classList.add('hidden');
    } else {
        charactersView.classList.remove('block');
        charactersView.classList.add('hidden');
        planetsView.classList.remove('hidden');
        planetsView.classList.add('block');
    }
}

// Cargar inicialmente la vista de personajes
showView('characters');
fetchCharacters();