import {
   FETCH_ORDERS,
   ADD_ORDER,
   DELETE_ORDER,
   UPDATE_ORDER,
   FETCH_ORDER_BY_EMAIL,
 } from "../constants/actionTypes.js";
 import * as api from "../api/index.js";
 
 export const fetchOrders = () => async (dispatch) => {
   try {
     const { data } = await api.fetchOrders();
     // console.log(data);
 
     dispatch({ type: FETCH_ORDERS, payload: data });
   } catch (error) {
     console.log(error);
   }
 };
 
 export const fetchOrderByEmail = (email) => async (dispatch) => {
   try {
     const { data } = await api.fetchOrderByEmail(email);
     console.log(data);
     dispatch({ type: FETCH_ORDER_BY_EMAIL, payload: data });
   } catch (error) {
     console.log(error);
   }
 };
 
 export const fetchOrderBymanufacturerEmail = (email) => async (dispatch) => {
   try {
     const { data } = await api.fetchOrderBymanufacturerEmail(email);
     console.log(data);
     dispatch({ type: FETCH_ORDER_BY_EMAIL, payload: data });
   } catch (error) {
     console.log(error);
   }
 };
 
 
 
 
 export const deleteOrder = (id) => async (dispatch) => {
   try {
     await api.deleteOrder(id);
 
     dispatch({ type: DELETE_ORDER, payload: id });
   } catch (error) {
     console.log(error);
   }
 };
 
 export const addOrder = (orderData) => async (dispatch) => {
   try {
     const { data } = await api.addOrder(orderData);
     console.log(JSON.stringify(data).length);
     dispatch({ type: ADD_ORDER, payload: data });
   } catch (error) {
     console.log(error);
   }
 };
 
 export const updateOrder = (id, updatedOrderData) => async (dispatch) => {
   try {
     const { data } = await api.updateOrder(id, updatedOrderData);
     dispatch({ type: UPDATE_ORDER, payload: data });
   } catch (error) {
     console.log(error);
   }
 };
 
 
<link href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic" rel="stylesheet" /> 