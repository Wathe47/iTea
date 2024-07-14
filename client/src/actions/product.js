import {
   FETCH_PRODUCTS,
   CREATE_PRODUCT,
   UPDATE_PRODUCT,
   FETCH_PRODUCTS_BY_ID,
   ADD_DISCOUNT,
 } from "../constants/actionTypes";
 import * as api from "../api/index.js";
 
 export const fetchProducts = () => async (dispatch) => {
   try {
     const { data } = await api.fetchProducts();
     dispatch({ type: FETCH_PRODUCTS, payload: data });
   } catch (error) {
     console.log(error);
   }
 };

 export const fetchProductById = (id) => async (dispatch) => {
   try {
     const { data } = await api.fetchProductById(id);
     console.log(data);
     dispatch({ type: FETCH_PRODUCTS_BY_ID, payload: data });
   } catch (error) {
     console.log(error);
   }
 };
 
 
 
 export const deleteProduct = (id) => async (dispatch) => {
   try {
     await api.deleteProduct(id);
 
     dispatch({ type: "DELETE", payload: id });
   } catch (error) {
     console.log(error);
   }
 };
 
 
 
 export const addProduct = (productData) => async (dispatch) => {
   try {
     const { data } = await api.addProduct(productData);
     dispatch({ type: CREATE_PRODUCT, payload: data });
   } catch (error) {
     console.log(error);
   }
 };
 
 
 
 export const updateDetails = (id, updatedProductData) => async (dispatch) => {
   try {
     const { data } = await api.updateDetails(id, updatedProductData);
     dispatch({ type: UPDATE_PRODUCT, payload: data });
     return data;
   } catch (error) {
     console.log(error);
   }
 };
 
 