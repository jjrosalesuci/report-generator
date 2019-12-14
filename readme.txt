1- Paso instalar node 12
2- npm install

Para acceder a un reporte por la web ya mokeado
http://localhost:3000/emergency/html

para generarlo

curl -X POST \
  http://localhost:3000/emergency \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 41' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'Postman-Token: f54d0df8-3870-4679-ae10-e03afbbcdbd1,4a91a6b2-3ac3-48b8-a350-30601bf2ede9' \
  -H 'User-Agent: PostmanRuntime/7.20.1' \
  -H 'cache-control: no-cache' \
  -d '{
	"care": {
		"name":"Juan penacho"
	}
}'

Devuelve 

{
    "success": true,
    "file": "emergency-d8gom83d0k45m0w4f.pdf",
    "url": "http://localhost:3000/emergency-d8gom83d0k45m0w4f.pdf/pdf"
}