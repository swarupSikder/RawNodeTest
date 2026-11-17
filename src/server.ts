import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server : Server = createServer((
    req : IncomingMessage,
    res : ServerResponse
    )=>{
    const url = req.url;
    const method = req.method;

    if(url === "/" && method === "GET"){
        console.log("This root route");
    }
    else {
        console.log("This root is not defined");
    }
});

server.listen(5000, ()=>{
    console.log("Server is running at 5000");
})