import axios from "axios";

const inventoryBaseURL = "http://localhost:9001";
const orderBaseURL = "http://localhost:9002";

// const inventoryBaseURL = "https://29d211f9-7555-4ba3-ae92-5b0843a2a665-dev.e1-us-east-azure.choreoapis.dev/gdwj/inventory/restservice-8081-c5d/v1";
// const orderBaseURL = "https://29d211f9-7555-4ba3-ae92-5b0843a2a665-dev.e1-us-east-azure.choreoapis.dev/gdwj/order/restservice-8082-745/v1";

const inventoryAPI = axios.create({
  baseURL: inventoryBaseURL,
});

const orderAPI = axios.create({
  baseURL: orderBaseURL,
});

// Inventory API endpoints
export const fetchProducts = () => inventoryAPI.get("/api/v1/inventory/all");
export const fetchProductById = (id) => inventoryAPI.get(`/api/v1/inventory/fetch/${id}`);
export const deleteProduct = (id) => inventoryAPI.delete(`/api/v1/inventory/delete/${id}`);
export const addProduct = (productData) => inventoryAPI.post("/api/v1/inventory/add", productData);
export const updateDetails = (id, updatedProductData) =>
  inventoryAPI.put(`/api/v1/inventory/update/${id}`, updatedProductData);

// Order API endpoints
export const addOrder = (orderData) => orderAPI.post("/api/v1/order/add", orderData);
export const fetchOrders = () => orderAPI.get("/api/v1/order/all");
export const fetchOpenOrders = () => orderAPI.get("/api/v1/order/open");
export const fetchOrderByEmail = (userEmail) =>
  orderAPI.get(`/api/v1/order/fetch-by-customer-email/${userEmail}`);
export const fetchOrderBymanufacturerEmail = (manufacturerEmail) =>
  orderAPI.get(`/api/v1/order/fetch-by-manufacturer-email/${manufacturerEmail}`);
export const fetchOrderByDeliverId = (id) =>
  orderAPI.get(`/api/v1/order/fetch-by-deliver-id/${id}`);
export const updateOrder = (id, updatedOrderData) =>
  orderAPI.put(`/api/v1/order/update/${id}`, updatedOrderData);
export const deleteOrder = (id) => orderAPI.delete(`/api/v1/order/delete/${id}`);
