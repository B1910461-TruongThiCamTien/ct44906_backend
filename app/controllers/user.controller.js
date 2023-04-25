const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create and Save a new user
exports.create = async (req, res, next) => {
    console.log(req.body)
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    }catch (error){
        return next(
            new ApiError(500, "An error occured while creating the user")
        );
    }
    //res.send({ message: "create handle" });
};

exports.findAll = async(req, res, next) => {
    let documents = [];

    try{
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await userService.findByName(name);
        }else{
            documents = await userService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving the user")
        );
    }
    return res.send(documents);

};


exports.findOne = async(req, res, next) => {
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, `Error retrieving user with id=${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "user not found"));
        }
        return res.send({message: "user was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
};

exports.delete = async(req, res, next) => {
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.deleteAll(req.params.id);
        if(!document){
            return next(new ApiError(404, "user not found"));
        }
        return res.send({message: "user was deleted successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Could not delete user with id=${req.params.id}`)
        );
    }
};


exports.deleteAll = async (_req, res, next) => {
    try{
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} users were deleted successfully`,
        });
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while removing all users")
        );
    }
};
// exports.deleteAll =  (req, res) => {
//     res.send({ message: "deleteAll handle" });
// };
