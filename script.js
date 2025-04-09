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
    const url = 'https://dragonball-api.com/api/characters';
    const characters = await fetchAll(url);
    displayCharacters(characters);
  }
  
  async function fetchPlanets() {
    const url = 'https://dragonball-api.com/api/planets';
    const planets = await fetchAll(url);
    displayPlanets(planets);
  }
  
  // Funciones para renderizar en pantalla
  
  function displayCharacters(characters) {
    const container = document.getElementById('characters-container');
    container.innerHTML = ''; // Limpiar contenido previo
    
    if (!characters || characters.length === 0) {
      container.innerHTML = '<p>No se encontraron personajes</p>';
      return;
    }
    
    characters.forEach(character => {
      // Se omiten los objetos vacíos o sin imagen
      if (!character || !character.image) return;
      
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Raza: ${character.race || "Desconocida"}</p>
        <p>Ki: ${character.ki || "N/A"}</p>
      `;
      container.appendChild(card);
    });
  }
  
  function displayPlanets(planets) {
    const container = document.getElementById('planets-container');
    container.innerHTML = ''; // Limpiar contenido previo
    
    if (!planets || planets.length === 0) {
      container.innerHTML = '<p>No se encontraron planetas</p>';
      return;
    }
    
    planets.forEach(planet => {
      if (!planet || !planet.image) return;
      
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${planet.image}" alt="${planet.name}">
        <h3>${planet.name}</h3>
      `;
      container.appendChild(card);
    });
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
      charactersView.style.display = 'block';
      planetsView.style.display = 'none';
    } else {
      charactersView.style.display = 'none';
      planetsView.style.display = 'block';
    }
  }
  
  // Cargar inicialmente la vista de personajes
  showView('characters');
  fetchCharacters();
  