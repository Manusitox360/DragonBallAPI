document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const charactersContainer = document.getElementById('characters');
  const planetsContainer = document.getElementById('planets');
  const btnCharacters = document.getElementById('btn-characters');
  const btnPlanets = document.getElementById('btn-planets');
  
  // Verificación de elementos
  if (!charactersContainer || !planetsContainer || !btnCharacters || !btnPlanets) {
    console.error('Error: Elementos del DOM no encontrados');
    return;
  }

  // Loader
  const loader = `
    <div class="col-span-full flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
    </div>
  `;

  // Función para formatear números grandes (para los personajes, si se requiere)
  function formatNumber(num) {
    if (!num) return 'Desconocido';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // =====================================================
  // Funciones para el Modal de detalle (show)
  // =====================================================

  // Función para abrir el modal con contenido personalizado
  function showDetail(data, type) {
    const modal = document.getElementById('detail-modal');
    const modalContent = document.getElementById('modal-content');

    // Limpiar contenido previo
    modalContent.innerHTML = '';

    // Creamos un contenedor interno para el scroll (altura máxima y scroll automático)
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'max-h-[80vh] overflow-y-auto';

    // Título
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold mb-4';
    title.textContent = data.name;

    // Imagen ampliada con tamaño controlado
    const img = document.createElement('img');
    img.src = data.image || 'https://via.placeholder.com/300x400?text=DragonBall';
    img.alt = data.name;
    // Limitar la altura máxima de la imagen para que no ocupe demasiado espacio en pantalla
    img.className = 'w-full object-contain mb-4';
    img.style.maxHeight = '300px';

    // Descripción (si existe)
    const description = document.createElement('p');
    description.className = 'text-gray-700 mb-4';
    description.textContent = data.description || 'No hay información adicional.';

    // Contenido extra según tipo
    const extra = document.createElement('div');
    extra.className = 'mt-4';
    if (type === 'character') {
      const race = document.createElement('p');
      race.innerHTML = `<strong>Raza:</strong> ${data.race || 'Desconocida'}`;
      const gender = document.createElement('p');
      gender.innerHTML = `<strong>Género:</strong> ${data.gender || 'Desconocido'}`;
      const affiliation = document.createElement('p');
      affiliation.innerHTML = `<strong>Afiliación:</strong> ${data.affiliation || 'Desconocida'}`;
      const ki = document.createElement('p');
      ki.innerHTML = `<strong>Poder:</strong> ${data.ki ? data.ki.toLocaleString() : 'Desconocido'}`;
      const maxKi = document.createElement('p');
      maxKi.innerHTML = `<strong>Poder Máx:</strong> ${data.maxKi ? data.maxKi.toLocaleString() : 'Desconocido'}`;
      extra.append(race, gender, affiliation, ki, maxKi);
    } else if (type === 'planet') {
      const status = document.createElement('p');
      const estado = data.isDestroyed ? 'Destruido' : 'Activo';
      status.innerHTML = `<strong>Estado:</strong> ${estado}`;
      extra.appendChild(status);
    }

    // Agregar todos los elementos al wrapper para scroll
    contentWrapper.append(title, img, description, extra);
    // Agregar el wrapper al contenedor del modal
    modalContent.appendChild(contentWrapper);

    // Mostrar modal quitando la clase 'hidden'
    modal.classList.remove('hidden');
  }

  // Función para cerrar el modal
  function closeModal() {
    const modal = document.getElementById('detail-modal');
    modal.classList.add('hidden');
  }

  // Listener para botón de cierre
  document.getElementById('modal-close').addEventListener('click', closeModal);
  // Cierra el modal al hacer clic fuera del contenido
  document.getElementById('detail-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });

 
  // Tarjetas y funciones para personajes y planetas
  

  // Tarjeta de Personaje 
  function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border-2 border-orange-100';
    
    // Imagen del personaje
    const imgContainer = document.createElement('div');
    imgContainer.className = 'relative h-48 overflow-hidden bg-gray-200 flex items-center justify-center';
    
    const img = document.createElement('img');
    img.className = 'max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105';
    img.src = character.image || 'https://via.placeholder.com/300x400?text=DragonBall';
    img.alt = character.name;
    img.onerror = () => { img.src = 'https://via.placeholder.com/300x400?text=DragonBall'; };

    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    
    // Contenido de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.className = 'p-4 flex-grow flex flex-col';
    
    // Nombre
    const name = document.createElement('h2');
    name.className = 'text-2xl font-bold mb-2 dbz-text';
    name.textContent = character.name;
    
    // Detalles
    const details = document.createElement('div');
    details.className = 'space-y-2 text-gray-700 flex-grow';
    
    // Raza
    const race = document.createElement('p');
    race.className = 'flex items-start';
    race.innerHTML = `
      <span class="font-semibold min-w-[80px]">Raza:</span>
      <span class="flex-grow">${character.race || 'Desconocida'}</span>
    `;
    
    // Género
    const gender = document.createElement('p');
    gender.className = 'flex items-start';
    gender.innerHTML = `
      <span class="font-semibold min-w-[80px]">Género:</span>
      <span class="flex-grow">${character.gender || 'Desconocido'}</span>
    `;
    
    // Afiliación
    const affiliation = document.createElement('p');
    affiliation.className = 'flex items-start';
    affiliation.innerHTML = `
      <span class="font-semibold min-w-[80px]">Afiliación:</span>
      <span class="flex-grow">${character.affiliation || 'Desconocida'}</span>
    `;
    
    // Poder (KI)
    const ki = document.createElement('p');
    ki.className = 'flex items-start';
    ki.innerHTML = `
      <span class="font-semibold min-w-[80px]">Poder:</span>
      <span class="flex-grow">${formatNumber(character.ki)}</span>
    `;
    
    // Poder Máximo
    const maxKi = document.createElement('p');
    maxKi.className = 'flex items-start';
    maxKi.innerHTML = `
      <span class="font-semibold min-w-[80px]">Poder Máx:</span>
      <span class="flex-grow">${formatNumber(character.maxKi)}</span>
    `;
    
    // Descripción (si existe)
    if (character.description) {
      const desc = document.createElement('div');
      desc.className = 'mt-3 pt-3 border-t border-gray-200';
      desc.innerHTML = `
        <p class="text-sm text-gray-600 line-clamp-3" title="${character.description}">
          ${character.description}
        </p>
      `;
      details.appendChild(desc);
    }
    
    // Agregar elementos a detalles
    details.appendChild(race);
    details.appendChild(gender);
    details.appendChild(affiliation);
    details.appendChild(ki);
    details.appendChild(maxKi);
    
    cardBody.appendChild(name);
    cardBody.appendChild(details);
    card.appendChild(cardBody);
    
    // Evento para mostrar detalle en el modal
    card.addEventListener('click', function() {
      showDetail(character, 'character');
    });
    
    return card;
  }

  function displayCharacters(characters) {
    try {
      const container = charactersContainer;
      // Limpieza segura
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      if (!characters?.length) {
        container.innerHTML = `
          <div class="col-span-full text-center py-12">
            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="mt-4 text-lg font-medium text-gray-600">No se encontraron personajes</p>
          </div>
        `;
        return;
      }
      
      characters.forEach(character => {
        container.appendChild(createCharacterCard(character));
      });
      
    } catch (error) {
      console.error('Error en displayCharacters:', error);
      document.body.innerHTML = `
        <div class="p-8 text-red-500 text-center">
          Error crítico: ${error.message}
        </div>
      `;
    }
  }

  async function fetchCharacters() {
    try {
      charactersContainer.innerHTML = loader;
      const response = await fetch('https://dragonball-api.com/api/characters?limit=1000');
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        displayCharacters(data.items);
      } else {
        displayCharacters([]);
      }
    } catch (error) {
      console.error('Error al cargar personajes:', error);
      charactersContainer.innerHTML = `
        <div class="col-span-full text-center py-12 text-red-500">
          Error al cargar los personajes
        </div>
      `;
    }
  }

  // Tarjeta de Planeta
  function createPlanetCard(planet) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border-2 border-orange-100';
    
    // Contenedor de imagen del planeta
    const imgContainer = document.createElement('div');
    imgContainer.className = 'relative h-48 overflow-hidden bg-gray-200 flex items-center justify-center';
    
    const img = document.createElement('img');
    img.className = 'max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105';
    img.src = planet.image || 'https://via.placeholder.com/300x400?text=DragonBall';
    img.alt = planet.name;
    img.onerror = () => { img.src = 'https://via.placeholder.com/300x400?text=DragonBall'; };
    
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    
    // Contenido de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.className = 'p-4 flex-grow flex flex-col';
    
    // Nombre del planeta
    const name = document.createElement('h2');
    name.className = 'text-2xl font-bold mb-2 dbz-text';
    name.textContent = planet.name;
    
    // Detalles del planeta
    const details = document.createElement('div');
    details.className = 'space-y-2 text-gray-700 flex-grow';
    
    // Estado del planeta
    const status = document.createElement('p');
    status.className = 'flex items-start';
    const estado = planet.isDestroyed ? 'Destruido' : 'Activo';
    status.innerHTML = `
      <span class="font-semibold min-w-[80px]">Estado:</span>
      <span class="flex-grow">${estado}</span>
    `;
    
    // Descripción (si existe)
    if (planet.description) {
      const desc = document.createElement('div');
      desc.className = 'mt-3 pt-3 border-t border-gray-200';
      desc.innerHTML = `
        <p class="text-sm text-gray-600 line-clamp-3" title="${planet.description}">
          ${planet.description}
        </p>
      `;
      details.appendChild(desc);
    }
    
    details.appendChild(status);
    cardBody.appendChild(name);
    cardBody.appendChild(details);
    card.appendChild(cardBody);
    
    // Evento para mostrar detalle en el modal
    card.addEventListener('click', function() {
      showDetail(planet, 'planet');
    });
    
    return card;
  }
  
  function displayPlanets(planets) {
    try {
      const container = planetsContainer;
      // Limpieza segura
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      if (!planets?.length) {
        container.innerHTML = `
          <div class="col-span-full text-center py-12">
            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="mt-4 text-lg font-medium text-gray-600">No se encontraron planetas</p>
          </div>
        `;
        return;
      }
      
      planets.forEach(planet => {
        container.appendChild(createPlanetCard(planet));
      });
      
    } catch (error) {
      console.error('Error en displayPlanets:', error);
      document.body.innerHTML = `
        <div class="p-8 text-red-500 text-center">
          Error crítico: ${error.message}
        </div>
      `;
    }
  }

  async function fetchPlanets() {
    try {
      planetsContainer.innerHTML = loader;
      const response = await fetch('https://dragonball-api.com/api/planets?limit=1000');
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        displayPlanets(data.items);
      } else {
        displayPlanets([]);
      }
    } catch (error) {
      console.error('Error al cargar planetas:', error);
      planetsContainer.innerHTML = `
        <div class="col-span-full text-center py-12 text-red-500">
          Error al cargar los planetas
        </div>
      `;
    }
  }


  // Event Listeners para cambiar de vista
  
  btnCharacters.addEventListener('click', () => {
    document.getElementById('characters-view').classList.remove('hidden');
    document.getElementById('planets-view').classList.add('hidden');
    fetchCharacters();
  });

  btnPlanets.addEventListener('click', () => {
    document.getElementById('planets-view').classList.remove('hidden');
    document.getElementById('characters-view').classList.add('hidden');
    fetchPlanets();
  });

  // Carga inicial (por defecto, personajes)
  fetchCharacters();
});
