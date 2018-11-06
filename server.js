
// EXPRESS.JS SERVER

function handleRequest(request, response) {
    response.end("Path hit: " + request.url);
}

var server = http.createServer(handleRequest);

server.listen(port, function() {
    console.log("Server listening on: http://localhost:" + port)
});