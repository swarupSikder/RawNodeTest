import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

const routeHandler = (req : IncomingMessage, res : ServerResponse) => {
    const url = req.url;
    const method = req.method;

    // ROOT ROUTE
    if(url === "/" && method === "GET"){
        res.writeHead(
            200,
            {"content-type":"application/json"}
        );

        res.end(JSON.stringify({message : "This is root route!"}))
    }
    // PRODUCT CONTROLLER
    else if(url?.startsWith("/products")){
        productController(req, res);
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