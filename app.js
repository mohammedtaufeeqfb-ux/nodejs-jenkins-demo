const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from Jenkins CI/CD Pipeline!, webhook V5.0 final");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
