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
      // Filtrar y procesar los archivos PDF
      const files = response.data
        .filter(file => file.name.endsWith('.pdf'))
        .map(file => ({
          name: file.name,
          download_url: file.download_url,
          date: extractDateFromName(file.name),
        }))
        .filter(file => file.date !== null); // Filtrar archivos sin fecha válida

      if (files.length > 0) {
        // Ordenar archivos por la fecha extraída del nombre
        files.sort((a, b) => b.date - a.date);

        // Mostrar el último informe
        const latestFile = files[0];
        document.getElementById('latest-title').textContent = latestFile.name;
        document.getElementById('latest-title').style.display = "block";
        document.getElementById('latest-link').setAttribute('href', latestFile.download_url);

        // Listar todos los informes en una lista ordenada
        const pdfList = document.getElementById('pdf-list');
        pdfList.innerHTML = ""; // Limpiar lista existente
        files.forEach(file => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<a href="${file.download_url}" target="_blank">${file.name}</a>`;
          pdfList.appendChild(listItem);
        });
      } else {
        document.getElementById('latest-title').textContent = "No hay informes disponibles.";
        document.getElementById('latest-link').style.display = "none";
      }
    })
    .catch(error => console.error('Error al cargar los informes:', error));
}

// Cargar los PDFs al cargar la página
window.onload = fetchPDFs;
