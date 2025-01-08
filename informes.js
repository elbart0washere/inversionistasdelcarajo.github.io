const repoOwner = "elbart0washere";
const repoName = "inversionistasdelcarajo.github.io";
const folderPath = "informes";

// Función para obtener los archivos de la carpeta 'informes' usando la API de GitHub
function fetchPDFs() {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;
  axios.get(apiUrl)
    .then(response => {
      const files = response.data.filter(file => file.name.endsWith('.pdf'));

      if (files.length > 0) {
        // Mostrar el último PDF subido
        const latestFile = files.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        document.getElementById('latest-title').textContent = latestFile.name;
        document.getElementById('latest-link').setAttribute('href', latestFile.download_url);

        // Listar todos los archivos PDF
        const pdfList = document.getElementById('pdf-list');
        files.forEach(file => {
          const listItem = document.createElement('div');
          listItem.classList.add('pdf-item');
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
