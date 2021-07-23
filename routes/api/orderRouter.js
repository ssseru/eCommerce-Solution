const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");
const { isAuth } = require("../utils/util");

const router = express.Router();

// /api/orders/mine
// only authenticated users have access to this route
router.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // find user orders via user._id from OrderModel
    const orders = await Order.find({ user: req.user._id });
    // console.log('orders:', orders);

    res.send(orders);
  })
);

// /apil/orders/
// use expressAsyncHandler to catch error from async function
router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      return res.status(400).send({ message: "Cart is empty" });
    }

    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    // console.log('req.user', req.user);

    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  })
);

// /api/orders/:id
//use isAuth to ensure only authenticated users can see order details
router.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //get the order from db
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
