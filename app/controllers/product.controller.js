// const ProductService = require("../services/product.service");
// const MongoDB = require("../utils/mongodb.util");
// const ApiError = require("../api-error");

// Create and Save a new product
exports.create =  (req, res) => {
    res.send({ message: "create handle" });
};

exports.findAll =  (req, res) => {
    res.send({ message: "findAll handle" });
};

exports.findOne =  (req, res) => {
    res.send({ message: "findOne handle" });
};

exports.update =  (req, res) => {
    res.send({ message: "update handle" });
};

exports.delete =  (req, res) => {
    res.send({ message: "delete handle" });
};

exports.findAllFavorite =  (req, res) => {
    res.send({ message: "findAllFavorite handle" });
};

exports.deleteAll =  (req, res) => {
    res.send({ message: "deleteAll handle" });
};

































// // const ProductService = require("../services/product.service");
// // const MongoDB = require("../utils/mongodb.util");
// // const ApiError = require("../api-error");

// // Create and Save a new product
// exports.create = async (req, res, next) => {
//     console.log(req.body)
//     if(!req.body?.name) {
//         return next(new ApiError(400, "Name can not be empty"));
//     }

//     try {
//         const productService = new ProductService(MongoDB.client);
//         const document = await productService.create(req.body);
//         return res.send(document);
//     }catch (error){
//         return next(
//             new ApiError(500, "An error occured while creating the product")
//         );
//     }
//     //res.send({ message: "create handle" });
// };

// exports.findAll = async(req, res, next) => {
//     let documents = [];

//     try{
//         const productService = new ProductService(MongoDB.client);
//         const { name } = req.query;
//         if(name){
//             documents = await productService.findByName(name);
//         }else{
//             documents = await productService.find({});
//         }
//     }catch(error){
//         return next(
//             new ApiError(500, "An error occurred while retrieving the product")
//         );
//     }
//     return res.send(documents);

// };

// exports.findOne = async(req, res, next) => {
//     try{
//         const productService = new ProductService(MongoDB.client);
//         const document = await productService.findById(req.params.id);
//         if(!document){
//             return next(new ApiError(404, "product not found"));
//         }
//         return res.send(document);
//     }catch(error){
//         return next(
//             new ApiError(500, `Error retrieving product with id=${req.params.id}`)
//         );
//     }
// };

// exports.update = async(req, res, next) => {
//     if(Object.keys(req.body).length === 0){
//         return next(new ApiError(400, "Data to update can not be empty"));
//     }

//     try{
//         const productService = new ProductService(MongoDB.client);
//         const document = await productService.update(req.params.id, req.body);
//         if(!document){
//             return next(new ApiError(404, "product not found"));
//         }
//         return res.send({message: "product was updated successfully"});
//     }catch(error){
//         return next(
//             new ApiError(500, `Error updating product with id=${req.params.id}`)
//         );
//     }
// };

// exports.delete = async(req, res, next) => {
//     try{
//         const productService = new ProductService(MongoDB.client);
//         const document = await productService.deleteAll(req.params.id);
//         if(!document){
//             return next(new ApiError(404, "product not found"));
//         }
//         return res.send({message: "product was deleted successfully"});
//     }catch(error){
//         return next(
//             new ApiError(500, `Could not delete product with id=${req.params.id}`)
//         );
//     }
// };

// exports.findAllFavorite = async(_req, res, next) => {
//     try{
//         const productService = new ProductService(MongoDB.client);
//         const document = await productService.findFavorite();
//         return res.send(document);
//     }catch(error){
//         return next(
//             new ApiError(500, "An error occurred while retrieving favorite products")
//         );
//     }
// };

// exports.deleteAll = async (_req, res, next) => {
//     try{
//         const productService = new ProductService(MongoDB.client);
//         const deletedCount = await productService.deleteAll();
//         return res.send({
//             message: `${deletedCount} products were deleted successfully`,
//         });
//     }catch(error){
//         return next(
//             new ApiError(500, "An error occurred while removing all products")
//         );
//     }
// };