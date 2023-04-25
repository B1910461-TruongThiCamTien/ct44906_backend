const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create and Save a new cart
exports.create = async (req, res, next) => {
    console.log(req.body)

    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.create(req.body);
        return res.send(document);
    }catch (error){
        return next(
            new ApiError(500, "An error occured while creating the cart")
        );
    }
    //res.send({ message: "create handle" });
};

exports.findAll = async(req, res, next) => {
    let documents = [];

    try{
        const cartService = new CartService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await cartService.findByName(name);
        }else{
            documents = await cartService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving the cart")
        );
    }
    return res.send(documents);

};


exports.findUser = async(req, res, next) => {
    try{
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.findByUser(req.params.id);
        if(!document){
            return next(new ApiError(404, "cart not found"));
        }
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, `Error retrieving cart with id=${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "cart not found"));
        }
        return res.send({message: "cart was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating cart with id=${req.params.id}`)
        );
    }
};

exports.delete = async(req, res, next) => {
    try{
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.deleteAll(req.params.id);
        if(!document){
            return next(new ApiError(404, "cart not found"));
        }
        return res.send({message: "cart was deleted successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Could not delete cart with id=${req.params.id}`)
        );
    }
};

exports.findAllFavorite = async(_req, res, next) => {
    try{
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.findFavorite();
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving favorite carts")
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try{
        const cartService = new CartService(MongoDB.client);
        const deletedCount = await cartService.deleteAll();
        return res.send({
            message: `${deletedCount} carts were deleted successfully`,
        });
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while removing all carts")
        );
    }
};

// exports.create =  (req, res) => {
//     res.send({ message: "create handle" });
// };

// exports.update =  (req, res) => {
//     res.send({ message: "update handle" });
// };

// exports.delete =  (req, res) => {
//     res.send({ message: "delete handle" });
// };

// exports.deleteAll =  (req, res) => {
//     res.send({ message: "deleteAll handle" });
// };

// exports.findUser =  (req, res) => {
//     res.send({ message: "findUser handle" });
// };

// exports.findAll =  (req, res) => {
//     res.send({ message: "findAll handle" });
// };