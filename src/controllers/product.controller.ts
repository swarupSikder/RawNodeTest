import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product";

const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    const urlParams = url?.split("/");
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

    // GET ALL PRODUCTS
    if (url === "/products" && method === "GET") {
        const products = productService();

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "This is products route!",
            data: products,
        }));
    }
    // GET A SINGLE PRODUCT
    else if (method === "GET" && id !== null) {
        const products = productService();
        const product = products.find((p: IProduct) => p.id === id);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Product retrieved successfully!!!",
            data: product,
        }));
    }



}

export default productController;