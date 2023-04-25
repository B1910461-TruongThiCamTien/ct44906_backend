const express = require("express");
const carts = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .get(carts.findAll)
    .post(carts.create)
    .delete(carts.deleteAll);

router.route("/:userId")
    .get(carts.findUser);

router.route("/:id")
    .put(carts.update)
    .delete(carts.delete);

module.exports = router;
