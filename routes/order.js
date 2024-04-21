import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getAdminOrders, getMyOrders, getOrderDetails, paymentVerification, placeOrder, placeOrderOnline, processOrder } from "../controllers/order.js";

const router = express.Router();


router.post("/createorder", isAuthenticated , placeOrder)

router.post("/createorderonline", isAuthenticated,placeOrderOnline)

router.post("/paymentverification", isAuthenticated,paymentVerification)


router.get("/myorders", isAuthenticated, getMyOrders);

router.get("/order/:id", isAuthenticated, getOrderDetails);   ////DoubtFul as wrong orderDetails getting clumsy..

//Add Admin Middleware
router.get("/admin/orders", isAuthenticated, authorizeAdmin , getAdminOrders);   ////DoubtFul as wrong orderDetails getting clumsy..
router.get("/admin/order/:id", isAuthenticated, authorizeAdmin , processOrder);   




export default router;