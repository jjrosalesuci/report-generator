## Instalar el proyecto

1- Paso instalar node 12
2- npm install

Documentacion del template engine

https://ejs.co/#docs

# Para acceder a un reporte por la web ya mokeado

http://localhost:3000/<report>/html

Para generarl un reporte se invoca donde index seria el id del reporte.

curl --location --request POST 'http://localhost:3000/index' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Mock Name",
  "lastName": "Mock Last Name"
}'

Esta llamada retorna la url donde esta disponible el PDF. 

{
    "success": true,
    "file": "<report>-d8gom83d0k45m0w4f.pdf",
    "url": "http://localhost:3000/index-d8gom83d0k45m0w4f.pdf/pdf"
}

En este caso pepe es el id del reporte y en el body debe ir un campo html con el codigo html para generar el PDF

curl -X POST \
  http://localhost:3000/htmlraw/index \
  -d '{
	"html":"<p>Prueba</p>"
}'