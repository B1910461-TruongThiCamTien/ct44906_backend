const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create and Save a new order
exports.create = async (req, res, next) => {
    console.log(req.body)

    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        return res.send(document);
    }catch (error){
        return next(
            new ApiError(500, "An error occured while creating the order")
        );
    }
    //res.send({ message: "create handle" });
};

exports.findAll = async(req, res, next) => {
    let documents = [];

    try{
        const orderService = new OrderService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await orderService.findByName(name);
        }else{
            documents = await orderService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving the order")
        );
    }
    return res.send(documents);

};


exports.findUser = async(req, res, next) => {
    try{
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findByUser(req.params.id);
        if(!document){
            return next(new ApiError(404, "order not found"));
        }
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, `Error retrieving order with id=${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "order not found"));
        }
        return res.send({message: "order was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating order with id=${req.params.id}`)
        );
    }
};

exports.delete = async(req, res, next) => {
    try{
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.deleteAll(req.params.id);
        if(!document){
            return next(new ApiError(404, "order not found"));
        }
        return res.send({message: "order was deleted successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Could not delete order with id=${req.params.id}`)
        );
    }
};

exports.findAllFavorite = async(_req, res, next) => {
    try{
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findFavorite();
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving favorite orders")
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try{
        const orderService = new OrderService(MongoDB.client);
        const deletedCount = await orderService.deleteAll();
        return res.send({
            message: `${deletedCount} orders were deleted successfully`,
        });
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while removing all orders")
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