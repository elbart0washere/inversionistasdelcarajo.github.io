const repoOwner = "elbart0washere";
const repoName = "inversionistasdelcarajo.github.io";
const folderPath = "informes";

// Extrae la fecha del nombre del archivo (formato YYYYMMDD)
function extractDateFromName(fileName) {
  const match = fileName.match(/\d{8}/);
  return match ? new Date(`${match[0].slice(0, 4)}-${match[0].slice(4, 6)}-${match[0].slice(6, 8)}`) : null;
}

// Agrupa los archivos por mes y año
function groupByMonth(files) {
  return files.reduce((groups, file) => {
    const yearMonth = file.date.toISOString().slice(0, 7); // YYYY-MM
    if (!groups[yearMonth]) groups[yearMonth] = [];
    groups[yearMonth].push(file);
    return groups;
  }, {});
}

// Obtener y mostrar los informes
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
        .filter(file => file.date !== null)
        .sort((a, b) => b.date - a.date); // Ordenar por fecha descendente
      
      if (files.length > 0) {
        // Mostrar el último informe destacado
        const latestFile = files.shift();
        const latestLink = document.getElementById('latest-link');
        latestLink.textContent = `Descargar: ${latestFile.name}`;
        latestLink.setAttribute('href', latestFile.download_url);
        
        // Agrupar los archivos restantes por mes
        const groupedFiles = groupByMonth(files);
        
        // Construir la lista de informes agrupados
        const pdfList = document.getElementById('pdf-list');
        pdfList.innerHTML = "";
        
        Object.keys(groupedFiles).forEach(month => {
          const monthHeader = document.createElement('h3');
          monthHeader.textContent = month;
          pdfList.appendChild(monthHeader);
          
          groupedFiles[month].forEach(file => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${file.download_url}" target="_blank">${file.name}</a>`;
            pdfList.appendChild(listItem);
          });
        });
      } else {
        document.getElementById('latest-link').textContent = "No hay informes disponibles.";
      }
    })
    .catch(error => console.error('Error al cargar los informes:', error));
}

// Cargar los PDFs al iniciar la página
window.onload = fetchPDFs;
