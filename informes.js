const repoOwner = "elbart0washere"; // Tu usuario en GitHub
const repoName = "inversionistasdelcarajo.github.io"; // Tu repositorio
const folderPath = "informes"; // La carpeta donde están los PDFs

// Función para obtener los archivos de la carpeta 'informes' usando la API de GitHub
function fetchPDFs() {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;
  axios.get(apiUrl)
    .then(response => {
      const files = response.data.filter(file => file.name.endsWith('.pdf'));

      if (files.length > 0) {
        // Mostrar el último PDF subido
        const latestFile = files.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        document.getElementById('latest-pdf').innerHTML = `<a href="${latestFile.download_url}" target="_blank">Ver el último informe: ${latestFile.name}</a>`;

        // Listar todos los archivos PDF
        const pdfList = document.getElementById('pdf-list');
        files.forEach(file => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<a href="${file.download_url}" target="_blank">${file.name}</a>`;
          pdfList.appendChild(listItem);
        });
      } else {
        document.getElementById('latest-pdf').innerText = "No hay informes disponibles.";
      }
    })
    .catch(error => console.error('Error al cargar los informes:', error));
}

// Cargar los PDFs al cargar la página
window.onload = fetchPDFs;
