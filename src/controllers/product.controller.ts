import type { IncomingMessage, ServerResponse } from "http";

const productController = (req : IncomingMessage, res : ServerResponse) => {
    const url = req.url;
    const method = req.method;
    
    if(url === "/products" && method === "GET"){

        const products = [
            {
                id : 1,
                name: "product-1",
                price: 10,
            },
            {
                id : 2,
                name: "product-2",
                price: 30,
            },
            {
                id : 3,
                name: "product-3",
                price: 50,
            },
        ]

        res.writeHead(200, {"content-type":"application/json"});
        res.end(JSON.stringify({
            message : "This is products route!",
            data : products,
        }));
    }
    
    
    
}

export default productController;