const repoOwner = "elbart0washere";
const repoName = "inversionistasdelcarajo.github.io";
const folderPath = "informes";

// Función para extraer la fecha del nombre del archivo
function extractDateFromName(fileName) {
  const match = fileName.match(/\d{8}/);
  return match ? new Date(`${match[0].slice(4, 8)}-${match[0].slice(2, 4)}-${match[0].slice(0, 2)}`) : null;
}

// Función para obtener los archivos de la carpeta 'informes' usando la API de GitHub
function fetchPDFs() {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;
  axios.get(apiUrl)
    .then(response => {
      const files = response.data
        .filter(file => file.name.endsWith('.pdf'))
        .map(file => ({
          name: file.name,
          download_url: file.download_url,
          date: extractDateFromName(file.name),
        }))
        .filter(file => file.date !== null);

      if (files.length > 0) {
        // Ordenar archivos por fecha en el nombre
        files.sort((a, b) => b.date - a.date);

        // Mostrar el último informe
        const latestFile = files[0];
        const latestLink = document.getElementById('latest-link');
        latestLink.textContent = `Descargar: ${latestFile.name}`;
        latestLink.setAttribute('href', latestFile.download_url);

        // Listar todos los informes en la lista
        const pdfList = document.getElementById('pdf-list');
        pdfList.innerHTML = "";
        files.forEach(file => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<a href="${file.download_url}" target="_blank">${file.name}</a>`;
          pdfList.appendChild(listItem);
        });
      } else {
        const latestLink = document.getElementById('latest-link');
        latestLink.textContent = "No hay informes disponibles.";
        latestLink.removeAttribute('href');
      }
    })
    .catch(error => console.error('Error al cargar los informes:', error));
}

// Cargar los PDFs al cargar la página
window.onload = fetchPDFs;
