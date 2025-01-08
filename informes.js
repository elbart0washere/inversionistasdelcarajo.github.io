/* Reset de márgenes y padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Diseño base */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
  color: #212529;
  text-align: center;
  padding: 50px 20px;
}

/* Contenedor centralizado */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Título de la página */
.title {
  font-size: 48px;
  color: #343a40;
  font-weight: 700;
  margin-bottom: 20px;
}

/* Subtítulo */
.subheading {
  font-size: 18px;
  color: #6c757d;
  margin-bottom: 40px;
}

/* Estilo de las tarjetas */
.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  margin: 30px 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card h2 {
  font-size: 24px;
  color: #495057;
  margin-bottom: 15px;
}

.card a {
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  border: 2px solid #007bff;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.card a:hover {
  background-color: #007bff;
  color: white;
}

/* Estilo de la lista de informes */
.pdf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.pdf-item {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.pdf-item:hover {
  transform: translateY(-5px);
}

.pdf-item a {
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.pdf-item a:hover {
  color: #0056b3;
}

/* Pie de página */
.footer {
  margin-top: 50px;
  font-size: 16px;
  color: #6c757d;
}

.footer a {
  color: #007bff;
  text-decoration: none;
}

.footer a:hover {
  color: #0056b3;
}
