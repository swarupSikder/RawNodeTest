import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    const urlParams = url?.split("/");
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

    // GET ALL PRODUCTS
    if (url === "/products" && method === "GET") {
        try {
            const products = productService();
            sendResponse(res, true, 200, "All Products retrieved successfully!!!", products);
        } catch (err) {
            sendResponse(res, false, 500, "Server Error!!!");
        }
    }
    // GET A SINGLE PRODUCT
    else if (method === "GET" && id !== null) {
        try {
            const products = productService();
            const product = products.find((p: IProduct) => p.id === id);

            if (!product) {
                sendResponse(res, false, 404, "Product Not Found!!!");
            }
            sendResponse(res, true, 200, "Product retrieved successfully!!!", product);
        } catch (err) {
            sendResponse(res, false, 500, "Server Error!!!");
        }
    }
    // CREATE A NEW PRODUCT
    else if (method === "POST" && url === "/products") {
        try {
            const body = await bodyParser(req);
            const newProduct = {
                id: Date.now(),
                ...body
            }

            const products = productService();
            products.push(newProduct);
            createProduct(products);
            sendResponse(res, true, 201, "Product created successfully!!!", newProduct);
        } catch (err) {
            sendResponse(res, false, 500, "Server Error!!!");
        }
    }
    // UPDATE A PRODUCT BY ID
    else if (method === "PUT" && id !== null) {
        try {
            const body = await bodyParser(req);
            const products = productService();
            const index = products.findIndex((p: IProduct) => p.id === id);

            if (index < 0) {
                sendResponse(res, false, 404, "Product Not Found!!!");
            }

            products[index] = {
                id: products[index].id,
                ...body
            }

            createProduct(products);

            sendResponse(res, true, 200, "Product Updated successfully!!!", products[index]);
        } catch (err) {
            sendResponse(res, false, 500, "Server Error!!!");
        }
    }
    // DELETE A PRODUCT
    else if (method === "DELETE" && id !== null) {
        try {
            const products = productService();
            const index = products.findIndex((p: IProduct) => p.id === id);

            if (index < 0) {
                sendResponse(res, false, 404, "Product Not Found!!!");
            }

            products.splice(index, 1);
            createProduct(products);

            sendResponse(res, true, 200, "Product Deleted successfully!!!");
        } catch (err) {
            sendResponse(res, false, 500, "Server Error!!!");
        }
    }
}

export default productController;