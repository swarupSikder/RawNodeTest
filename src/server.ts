import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server : Server = createServer((
    req : IncomingMessage,
    res : ServerResponse
    )=>{
    const url = req.url;
    const method = req.method;

    if(url === "/" && method === "GET"){
        res.writeHead(
            200,
            {"content-type":"text/plain"}
        );

        res.end("This is root route!")
    }
    else {
        res.writeHead(
            404,
            {"content-type":"text/plain"}
        );

        res.end("This route is not defined!")
    }
});

server.listen(5000, ()=>{
    console.log("Server is running at 5000");
})