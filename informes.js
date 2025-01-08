document.addEventListener('DOMContentLoaded', function () {
    const pdfList = document.getElementById('pdf-list');
    const latestTitle = document.getElementById('latest-title');
    const latestLink = document.getElementById('latest-link');
  
    axios.get('informes/') // Reemplaza esto por la URL de tu carpeta de informes
      .then(response => {
        const files = response.data.files; // Ajusta según tu estructura
        const latestFile = files[0]; // El archivo más reciente
  
        latestTitle.textContent = latestFile.name;
        latestLink.href = `informes/${latestFile.name}`;
  
        files.forEach(file => {
          const pdfItem = document.createElement('div');
          pdfItem.classList.add('pdf-item');
          const pdfLink = document.createElement('a');
          pdfLink.href = `informes/${file.name}`;
          pdfLink.textContent = file.name;
          pdfItem.appendChild(pdfLink);
          pdfList.appendChild(pdfItem);
        });
      })
      .catch(error => {
        console.error('Error al cargar los informes', error);
      });
  });
  