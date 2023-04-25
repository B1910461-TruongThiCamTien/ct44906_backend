const express = require("express");
const cors = require("cors");
const productsRouter = require("./app/routes/product.route");
const cartsRouter = require("./app/routes/cart.route");
const usersRouter = require("./app/routes/user.route");
const ordersRouter = require("./app/routes/order.route");
//const authsRoute = require("./app/routes/auth.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);
//app.use("/api/auths", authsRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to senda shop application." });
});

// handle 404 response
app.use((req, res, next) => {
     return next(new ApiError(404, "Resource not found"));
});
 // define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;