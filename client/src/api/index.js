import axios from "axios";

// const inventoryBaseURL = "http://localhost:9001/api/inventory";
// const orderBaseURL = "http://localhost:9002/api/order";

const inventoryBaseURL = "https://itea-inventory.onrender.com";
const orderBaseURL = "https://itea-order.onrender.com";

const inventoryService = axios.create({
   baseURL: inventoryBaseURL,
});

const orderService = axios.create({
   baseURL: orderBaseURL,
});

// Inventory API endpoints
export const fetchProducts = () => inventoryService.get("/all");
export const fetchProductById = (id) => inventoryService.get(`/fetch/${id}`);
export const deleteProduct = (id) => inventoryService.delete(`/delete/${id}`);
export const addProduct = (productData) => inventoryService.post("/add", productData);
export const updateDetails = (id, updatedProductData) =>
   inventoryService.put(`/update/${id}`, updatedProductData);

// Order API endpoints
export const addOrder = (orderData) => orderService.post("/add", orderData);
export const fetchOrders = () => orderService.get("/all");
export const fetchOpenOrders = () => orderService.get("/open");
export const fetchOrderByEmail = (userEmail) =>
   orderService.get(`/fetch-by-customer-email/${userEmail}`);
export const fetchOrderBymanufacturerEmail = (manufacturerEmail) =>
   orderService.get(`/fetch-by-manufacturer-email/${manufacturerEmail}`);
export const fetchOrderByDeliverId = (id) =>
   orderService.get(`/fetch-by-deliver-id/${id}`);
export const updateOrder = (id, updatedOrderData) =>
   orderService.put(`/update/${id}`, updatedOrderData);
export const deleteOrder = (id) => orderService.delete(`/delete/${id}`);
