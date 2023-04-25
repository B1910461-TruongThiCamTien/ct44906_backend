const { ObjectId } = require("mongodb");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("carts");
    }
    
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
        const cart = {
            userId: payload.userId,
            productId: payload.productId,
            quantity: payload.quantity,
            img: payload.img,
            name: payload.name,
            price: payload.price,
            status: payload.status,
        };
        // Remove undefined fields
        Object.keys(cart).forEach(
            (key) => cart[key] === undefined && delete cart[key]
        );
        return cart;
    }

    async create(payload) {
        const cart = this.extractConactData(payload);
        const result = await this.Cart.findOneAndUpdate(
            cart,
            { $set: { status: cart.status === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Cart.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findByUser(userId) {
        return await this.find({
            userId: { $regex: new RegExp(userId), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Cart.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
        
    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Cart.deleteMany({});
        return result.deletedCount;
    }
        
}

module.exports = CartService;