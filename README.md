# DragonBall API Project

Este es un proyecto web que consume la [DragonBall API](https://dragonball-api.com) para mostrar personajes y planetas del universo de Dragon Ball. La aplicación presenta dos secciones principales (personajes y planetas) y ofrece funcionalidades interactivas, tales como:

- Visualización de todos los personajes y planetas en una sola consulta (sin paginación).
- Tarjetas con información resumida y efecto hover.
- Modal interactivo para ver detalles ampliados de cada elemento.
- (Opcional) Selector para transformaciones en personajes (si la propiedad se encuentra en la respuesta).

## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API](#api)
- [Licencia](#licencia)
- [Contribucion](#contribución)

## Características

- **Tarjetas Dinámicas:** Se generan tarjetas para personajes y planetas, mostrando imagen, nombre y detalles adicionales.
- **Modal Detallado:** Al hacer clic en una tarjeta se muestra un modal con información ampliada.
- **Carga sin Paginación:** Se han configurado las peticiones a la API para que muestren todos los ítems (por ejemplo, utilizando el parámetro `limit`).
- **Responsive y UI Interactiva:** Utiliza Tailwind CSS para una interfaz moderna, adaptable a diferentes dispositivos.

## Tecnologías

- **HTML5** – Estructura básica de la página.
- **CSS/Tailwind CSS** – Estilos y diseño responsivo.
- **JavaScript (Vanilla)** – Lógica de generación dinámica de contenido, manejo de API y eventos.
- **Fetch API** – Para realizar las peticiones a la DragonBall API.

## Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/Manusitox360/DragonBallAPI.git
    ```

2. **Accede a la carpeta del proyecto:**

    ```bash
    cd dragonball-api-project
    ```

    Abre el proyecto en tu editor de código favorito.

3. **Inicia un servidor local:**

    Puedes utilizar cualquier servidor estático. Por ejemplo, con Live Server en VS Code o utilizando `http-server`:

    ```bash
    npm install -g http-server
    http-server .
    ```

    Abre la URL proporcionada por el servidor en tu navegador.

## Uso

### Visualización de Personajes y Planetas:

La aplicación tiene dos botones principales:

- **Personajes:** Muestra la lista completa de personajes.
- **Planetas:** Muestra la lista completa de planetas.

### Modal de Detalle:

- Al hacer clic en cualquier tarjeta se despliega un modal con información detallada.
- (Si se cuenta con la propiedad `transformations` en algún personaje, se mostrará un desplegable para seleccionar diferentes transformaciones y actualizar los datos del modal).

## Estructura del Proyecto

```bash
dragonball-api-project/
├── index.html           # Archivo HTML principal
├── script.js            # Lógica de JavaScript para el manejo de API, tarjetas y modal
├── styles.css           # (Opcional) Estilos personalizados adicionales o configuración de Tailwind
└── README.md            # Documentación y guía del proyecto
```

## API

El proyecto utiliza la DragonBall API para obtener los datos.  
Para evitar la paginación, se ha modificado la URL de peticiones incluyendo el parámetro `limit`:

- **Personajes:**  
  `https://dragonball-api.com/api/characters?limit=1000`

- **Planetas:**  
  `https://dragonball-api.com/api/planets?limit=1000`

## Licencia

Este proyecto se distribuye bajo la MIT License.

## Contribución 

- **Manuel Espinosa:**  [![GitHub](https://img.shields.io/badge/GitHub-Perfil-black?style=flat-square&logo=github)](https://github.com/Manusitox360)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/manuel-espinosa-guillén-950781294/)
[![Correo](https://img.shields.io/badge/Email-Contacto-red?style=flat-square&logo=gmail)](mailto:espinosaguillenmanuel@gmail.com)