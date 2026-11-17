import type { IncomingMessage, ServerResponse } from "http";

const routeHandler = (req : IncomingMessage, res : ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if(url === "/" && method === "GET"){
        res.writeHead(
            200,
            {"content-type":"application/json"}
        );

        res.end(JSON.stringify({message : "This is root route!"}))
    }
    else if(url?.startsWith("/products") && method === "GET"){
        res.writeHead(
            200,
            {"content-type":"application/json"}
        );

        res.end(JSON.stringify({message : "This is products route!"}))
    }
    else {
        res.writeHead(
            404,
            {"content-type":"application/json"}
        );

        res.end(JSON.stringify({message: "This route is not defined!"}))
    }
}

export default routeHandler;